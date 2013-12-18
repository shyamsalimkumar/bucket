#!/usr/bin/env node

var config = require('./config.js'),
    open = require('open'),
    http = require('http'),
    request = require('request'),
    prompt = require('prompt'),
    querystring = require('querystring'),
    // git = require('nodegit'),
    bucket = {};

bucket.init = function () {
    var args = process.argv.slice(2);
    this._command = args[0].toLowerCase();
    this.config = config;

    this._getOwnerRepoName(args[1]);
    if (this._command == 'pullreq') {
        this._getIssueId(args[2]);
        this._getPullReqTask(args[3]);
    } else if (this._command == 'fork') {
        this._getCustomRepoName(args[2]);
    }

    this[this._command]();
};
bucket.create = function () {
    var repoUrl = this.config.repoDetails;
    this._credsReq = true;
    this._type = 'POST';
    this._url = repoUrl.join('/');

    this._beginRequest();
};
// bucket.cloneRepo = function () {};
bucket.fork = function () {
    var repoUrl = [this.config.fork().join('/'),
        this.config.forkCommnds.fork];
    this._credsReq = true;
    this._type = 'POST';
    this._url = repoUrl.join('/');
    this._postData.name = this._customForkName;

    this._beginRequest();
};
bucket.pullreq = function () {
    var repoUrl = [this.config.repoDetails.join('/'),
        this.config.pullRequests.join('/')];
    if (this.pullReqActivity) {
        repoUrl.push(this.config.pullRequestsCommnds[this.pullReqActivity]);
    }

    this._url = repoUrl.join('/').replace('{id}', this.issueId || '');

    this._beginRequest();
};
bucket.wiki = function () {
    var wikiUrl = 'https://www.bitbucket.org/{username}/{repoName}/wiki'
        .replace('{username}', this._owner || '')
        .replace('{repoName}', this._repoName || '');
    
    open(wikiUrl);
};
bucket._getCustomRepoName = function (name) {
    this._customForkName = (name) ? name : this._repoName;
};
bucket._getOwnerRepoName = function (param) {
    if (param) {
        var paramArray = param.split('/');

        this._owner = paramArray[0];
        this._repoName = paramArray[1];
    } else {
        this._getCurrentRepoInfo();
    }
};
bucket._getCurrentRepoInfo = function () {
    // Write code to read the current folder details from the .git/config file
    // git.repo('.git', function(error, repository) {
    //     if (error) throw error;

    //     console.log(repository);
    // });
};
bucket._getIssueId = function (param) {
    if (param) {
        this.issueId = param;
    }
};
bucket._getPullReqTask = function (param) {
    if (param) {
        this.pullReqActivity = param;
    }
};
bucket._beginRequest = function () {
    this._url = this._url.replace('{owner}', this._owner || '');

    this._url = this._url.replace('{repoName}', this._repoName || '');

    if (! (this._owner && this._repoName)) {
        this._url = this._url.replace('//', '');
    }

    var schema = {
            properties: {
                username: {
                    pattern: /^[a-zA-Z\s\-]+$/,
                    message: 'Username must be only letters, spaces, or dashes',
                    required: true
                },
                password: {
                    hidden: true,
                    required: true
                }
            }
        },
        self = this;

    if (this._credsReq) {
        prompt.start();
        prompt.get(schema, function (err, result) {
            self._credUsername = result.username;
            self._credPassword = result.password;
            self._sendRequest();
        });
    } else {
        this._sendRequest();
    }
};
bucket._sendRequest = function () {
    var req = request[this._type.toLowerCase()]([this.config.baseUrl.join('/'), this._url].join('/'),
        function (err, resp, bod) {
            if (err || (!err && resp.statusCode >= 400)) {
                self._onError(resp);
            }

            if (!err && resp.statusCode == 200) {
                self._parseOutput(resp);
            }
        }),
        self = this;

    if (this._credsReq) {
        req.auth(this._credUsername, this._credPassword);
    }

    if (!!Object.keys(this._postData).length) {
        req.form().append('name', this._customForkName);
    }
};
bucket._parseOutput = function (data) {
    var forkedRepoName = this._customForkName;

    if (this._command === 'fork') {
        console.log('Repo was forked into "{forkedRepoName}"'.replace('{forkedRepoName}', forkedRepoName));
    } else if (this._command === 'create') {
        console.log('Repo was create at "{repoName}"'.replace('{repoName}', this._repoName));
    }
};
bucket._onError = function (data) {
    console.log(data.statusCode);
    if (data.body) {
        try {
            console.log(JSON.parse(data.body).error.message);            
        } catch (e) {
            this._predefinedErrors(data.statusCode);
        }
    } else {
        this._predefinedErrors(data.statusCode);
    }
};
bucket._predefinedErrors = function (statusCode) {
    console.log(this.config.errorCodes[statusCode]);
};
bucket._credPassword;
bucket._credUsername;
bucket._credsReq = false;
bucket._postData = {};
bucket._type = 'GET';

module.exports = bucket;

/*
Create a repo
Clone a repo
Fork a repo
Pull request
Browse wiki
 */