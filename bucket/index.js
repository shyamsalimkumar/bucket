#!/usr/bin/env node

var config = require('./config.js'),
    open = require('open'),
    http = require('http'),
    request = require('request'),
    prompt = require('prompt'),
    querystring = require('querystring'),
    bucket = require('commander'),
    Bucket = {};

Bucket.init = function (command, options) {
    var args = process.argv.slice(2);
    this._command = command.toLowerCase();
    this.config = config;
    this._options = options;

    this._getOwnerRepoName(args[1]);
    if (this._command === 'pullreq') {
        this._getIssueId(options.issueId);
        this._getPullReqTask(options.pullReqActivity);
    }

    this[this._command]();
};
Bucket.create = function () {
    var repoUrl = this.config.repoDetails;
    this._credsReq = true;
    this._type = 'POST';
    this._url = repoUrl.join('/');

    this._beginRequest();
};
// Bucket.cloneRepo = function () {};
Bucket.fork = function () {
    var repoUrl = [this.config.fork().join('/'),
        this.config.forkCommnds.fork];
    this._credsReq = true;
    this._type = 'POST';
    this._url = repoUrl.join('/');
    this._postData.name = this._customForkName;

    this._beginRequest();
};
Bucket.pullreq = function () {
    var repoUrl = [this.config.repoDetails.join('/'),
        this.config.pullRequests.join('/')];
    if (this.pullReqActivity) {
        repoUrl.push(this.config.pullRequestsCommnds[this.pullReqActivity]);
    }

    this._url = repoUrl.join('/').replace('{id}', this.issueId || '');

    this._beginRequest();
};
Bucket.wiki = function () {
    var wikiUrl = 'https://www.bitbucket.org/{username}/{repoName}/wiki'
        .replace('{username}', this._owner || '')
        .replace('{repoName}', this._repoName || '');
    
    open(wikiUrl);
};
Bucket.addRemote = function () {
    // code to add a remote
};
Bucket._getCustomRepoName = function (name) {
    this._customForkName = (name) ? name : this._repoName;
};
Bucket.help = function () {
    var i;

    if (this._options.length > 0) {
        var helpText = this.config.help[this._options[0]];
        if (helpText) {
            console.log(helpText);
        } else {
            console.log('No help for that command');
        }
        return;
    }

    var keys = Object.keys(this.config.help);

    for (i = 0; i < keys.length; i++) {
        console.log('%s:\n' + this.config.help[keys[i]] + '\n', keys[i]);
    }
};
Bucket._getOwnerRepoName = function (param) {
    if (param) {
        var paramArray = param.split('/');

        this._owner = paramArray[0];
        this._repoName = paramArray[1];
    } else {
        this._getCurrentRepoInfo();
    }
};
Bucket._getCurrentRepoInfo = function () {
    // Write code to read the current folder details from the .git/config file
    // git.repo('.git', function(error, repository) {
    //     if (error) throw error;

    //     console.log(repository);
    // });
};
Bucket._getIssueId = function (param) {
    if (param) {
        this.issueId = param;
    }
};
Bucket._getPullReqTask = function (param) {
    if (param) {
        this.pullReqActivity = param;
    }
};
Bucket._beginRequest = function () {
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
Bucket._sendRequest = function () {
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
Bucket._parseOutput = function (data) {
    var forkedRepoName = this._customForkName;

    if (this._command === 'fork') {
        console.log('Repo was forked into "%s"', forkedRepoName);

    } else if (this._command === 'create') {
        console.log('Repo was create at "%s"', this._repoName);
    }
};
Bucket._onError = function (data) {
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
Bucket._predefinedErrors = function (statusCode) {
    console.log(this.config.errorCodes[statusCode]);
};
Bucket._credPassword;
Bucket._credUsername;
Bucket._credsReq = false;
Bucket._postData = {};
Bucket._type = 'GET';

bucket
    .version('0.0.1');

bucket
    .command('create <username> <repoName>')
    .description('Create a repo at https://bitbucket.org/<username>/<repo>.git')
    .action(function (username, repoName) {
        var commandName = this.rawArgs[2];
        console.log("Creating repo at 'https://bitbucket.org/%s/%s.git' ...",
            username, repoName);
        Bucket.init(commandName, {username: username, repoName: repoName});
    });

bucket
    .command('fork [customForkName]')
    .description('Fork the currently cloned repo')
    .action(function (customForkName) {
        var currentUser = currentUser(),
            repoName = customForkName || '',
            commandName = this.rawArgs[2];
        console.log("Forking into 'https://bitbucket.org/%s/%s.git' ...",
            currentUser, repoName);
        Bucket.init(commandName, {username: currentUser, repoName: repoName});
        console.log("Adding %s as remote for 'https://bitbucket.org/%s/%s.git' ...",
            currentUser, currentUser, repoName);
    });

bucket
    .command('pullreq')
    .description('Send a pull request to the current repo')
    .action(function () {
        var commandName = this.rawArgs[2];
        console.log("Sending a pull request to 'https://bitbucket.org/%s/%s.git' ...",
            repoOwner, repoName);
    });

bucket
    .command('browse [wiki]')
    .option('-o, --owner <repoOwner>', 'The owner of the repo')
    .option('-r, --repo-name <repoName>', 'The name of the repo')
    .description('Browse the repo or its wiki')
    .action(function (wiki, options) {
        var owner = options.owner || '',
            repoName = options.repoName || '',
            commandName = this.rawArgs[2];
        if (wiki) {
            console.log("Opening the repo wiki at 'https://www.bitbucket.org/%s/%s/wiki' ...",
                owner, repoName);
            Bucket.init('wiki', {owner: owner, repoName: repoName});
            return false;
        }

        console.log("Opening the repo at 'https://bitbucket.org/%s/%s.git' ...",
            owner, repoName);
        Bucket.init(commandName, {owner: owner, repoName: repoName});
    });

bucket
    .command('help [command]')
    .description('Help for the commands')
    .action(function (command) {
        var commandName = this.rawArgs[2];
        Bucket.init(commandName, this.rawArgs.slice(3));
    });

bucket.parse(process.argv);

module.exports = bucket;

/*
Create a repo
Clone a repo
Fork a repo
Pull request
Browse wiki
 */