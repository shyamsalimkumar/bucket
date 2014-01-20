var config = require('../config'),
    request = require('request'),
    prompt = require('prompt'),
    Bucket;

// Constructor
Bucket = function (command, options) {
    var args = process.argv.slice(2);
    this._command = command.toLowerCase();
    this._options = options;
    this._config = config;
    this._getOwnerRepoName(args[1]);

    if (this._command === 'pullreq' && !!options) {
        this._getIssueId(options.issueId);
        this._getPullReqTask(options.pullReqActivity);
    }
    // if (this._command === 'fork') {
    //     this._getCustomRepoName(options.customRepoName);
    // }    

    this[this._command]();
};
// Create a repo
Bucket.prototype.create = function () {
    var repoUrl = this._config.repoDetails;
    this._credsReq = true;
    this._type = 'POST';
    this._url = repoUrl.join('/');

    this._beginRequest();
};
// Fork a repo
Bucket.prototype.fork = function () {
    var repoUrl = [this._config.fork().join('/'),
        this._config.forkCommnds.fork];
    this._credsReq = true;
    this._type = 'POST';
    this._url = repoUrl.join('/');
    this._postData.name = this._customForkName;

    this._beginRequest();
};
// Send a pull request
Bucket.prototype.pullreq = function () {
    var repoUrl = [this._config.repoDetails.join('/'),
        this._config.pullRequests.join('/')];
    if (this.pullReqActivity) {
        repoUrl.push(this._config.pullRequestsCommnds[this.pullReqActivity]);
    }

    this._url = repoUrl.join('/').replace('{id}', this.issueId || '');

    // If sending a pull request to the cloned repo
    if (!this._options) {
        this._type = 'POST';
    }

    this._beginRequest();
};
// Read wiki of a repo
Bucket.prototype.wiki = function () {
    var wikiUrl = 'https://www.bitbucket.org/{username}/{repoName}/wiki'
        .replace('{username}', this._owner || '')
        .replace('{repoName}', this._repoName || '');
    
    open(wikiUrl);
};
// Add a remote to the current repo
Bucket.prototype.addRemote = function () {
    // code to add a remote
};
// Get custom name for a repo
Bucket.prototype._getCustomRepoName = function (name) {
    this._customForkName = (name) ? name : this._repoName;
};
// Show help
Bucket.prototype.help = function () {
    var i;

    if (this._options && this._options.length > 0) {
        var helpText = this._config.help[this._options[0]];
        if (helpText) {
            console.log(helpText);
        } else {
            console.log('No help for that command');
        }
        return;
    }

    var keys = Object.keys(this._config.help);

    for (i = 0; i < keys.length; i++) {
        console.log('%s:\n' + this._config.help[keys[i]] + '\n', keys[i]);
    }
};
// Get the name of the repo
Bucket.prototype._getOwnerRepoName = function (param) {
    if (param) {
        var paramArray = param.split('/');

        this._owner = paramArray[0];
        this._repoName = paramArray[1];
    } else {
        this._getCurrentRepoInfo();
    }
};
// Get git config info on the current repo
Bucket.prototype._getCurrentRepoInfo = function () {
    // Write code to read the current folder details from the .git/config file
    // git.repo('.git', function(error, repository) {
    //     if (error) throw error;

    //     console.log(repository);
    // });
};
// Get the id of the issue
Bucket.prototype._getIssueId = function (param) {
    if (param) {
        this.issueId = param;
    }
};
// Get the type of task for the pull request
Bucket.prototype._getPullReqTask = function (param) {
    if (param) {
        this.pullReqActivity = param;
    }
};
// Begin sending the request
Bucket.prototype._beginRequest = function () {
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
            if (result.username && result.password) {
                self._sendRequest();
            } else {
                console.log('Username and password are required');
            }
        });
    } else {
        this._sendRequest();
    }
};
// Send the request
Bucket.prototype._sendRequest = function () {
    var req = request[this._type.toLowerCase()]([this._config.baseUrl.join('/'), this._url].join('/'),
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

    if (!!Object.keys(this._postData).length && this._command === 'fork') {
        req.form().append('name', this._customForkName);
    }
};
// Parse the output recieved
Bucket.prototype._parseOutput = function (data) {
    var forkedRepoName = this._customForkName;

    if (this._command === 'fork') {
        console.log('Repo was forked into "%s"', forkedRepoName);

    } else if (this._command === 'create') {
        console.log('Repo was create at "%s"', this._repoName);
    }
};
// Display the appropriate error message
Bucket.prototype._onError = function (data) {
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
// Predefined set of errors based on http status code
Bucket.prototype._predefinedErrors = function (statusCode) {
    console.log(this._config.errorCodes[statusCode]);
};
Bucket.prototype._credPassword;
Bucket.prototype._credUsername;
Bucket.prototype._credsReq = false;
Bucket.prototype._postData = {};
Bucket.prototype._type = 'GET';

module.exports = Bucket;