var config = require( '../config' ),
    request = require( 'request' ),
    open = require( 'open' ),
    prompt = require( 'prompt' ),
    sys = require( 'sys' ),
    exec = require( 'child_process' ).exec,
    Git = require('./git.js'),
    Bucket;

// Constructor
Bucket = function ( command, options ) {
    'use strict';
    var args = process.argv.slice( 2 );
    this._command = command.toLowerCase();
    this._options = options;
    this._config = config;
    this._getOwnerRepoName( args[ 1 ] );

    if ( this._command === 'clone' ) {
        this._folderName = options.folderName || '';
    }
    if ( this._command === 'pullreq' && !!options ) {
        this._getIssueId( options.issueId );
        this._getPullReqTask( options.pullReqActivity );
    }
    // if (this._command === 'fork') {
    //     this._getCustomRepoName(options.customRepoName);
    // }

    if ( Bucket.prototype.hasOwnProperty( this._command ) ) {
        this[ this._command ]();
    }
};
// Create a repo
Bucket.prototype.create = function () {
    'use strict';
    var repoUrl = this._config.repoDetails;
    this._credsReq = true;
    this._type = 'POST';
    this._url = repoUrl.join( '/' );

    this._beginRequest();
};
// Clone a repo
Bucket.prototype.clone = function () {
    'use strict';
    var gitCloneCmd = 'git clone https://www.bitbucket.org/{username}/{repoName} {folderName}'
        .replace( '{username}', this._owner )
        .replace( '{repoName}', this._repoName )
        .replace( '{folderName}', this._folderName );
    this._gitProcess = exec( gitCloneCmd, function ( error, stdout, stderr ) {
        if ( error ) {
            console.error( stderr );
        } else {
            console.log( stdout );
        }
    } );
};
// Fork a repo
Bucket.prototype.fork = function () {
    'use strict';
    var repoUrl = [ this._config.fork()
        .join( '/' ),
        this._config.forkCommnds.fork
    ];
    this._credsReq = true;
    this._type = 'POST';
    this._url = repoUrl.join( '/' );
    this._postData.name = this._customForkName;

    this._beginRequest();
};
// Send a pull request
Bucket.prototype.pullreq = function () {
    'use strict';
    var repoUrl = [ this._config.repoDetails.join( '/' ),
        this._config.pullRequests.join( '/' )
    ];
    if ( this.pullReqActivity ) {
        repoUrl.push( this._config.pullRequestsCommnds[ this.pullReqActivity ] );
    }

    this._url = repoUrl.join( '/' )
        .replace( '{id}', this.issueId || '' );

    // If sending a pull request to the cloned repo
    if ( !this._options ) {
        this._type = 'POST';
    }

    this._beginRequest();
};
// Read wiki of a repo
Bucket.prototype.wiki = function () {
    'use strict';
    var wikiUrl = 'https://www.bitbucket.org/{username}/{repoName}/wiki'
        .replace( '{username}', this._owner || '' )
        .replace( '{repoName}', this._repoName || '' );

    open( wikiUrl );
};
// Add a remote to the current repo
Bucket.prototype.addRemote = function () {
    // code to add a remote
};
// Get custom name for a repo
Bucket.prototype._getCustomRepoName = function ( name ) {
    'use strict';
    this._customForkName = ( name ) ? name : this._repoName;
};
// Show help
Bucket.prototype.help = function () {
    'use strict';
    var i;

    if ( this._options && this._options.length > 0 ) {
        var helpText = this._config.help[ this._options[ 0 ] ];
        if ( helpText ) {
            console.log( helpText );
        } else {
            console.log( 'No help for that command' );
        }
        return;
    }

    var keys = Object.keys( this._config.help );

    for ( i = 0; i < keys.length; i++ ) {
        console.log( '%s:\n' + this._config.help[ keys[ i ] ] + '\n', keys[ i ] );
    }
};
// Get the name of the repo
Bucket.prototype._getOwnerRepoName = function ( param ) {
    'use strict';
    if ( param ) {
        var paramArray = param.split( '/' );

        this._owner = paramArray[ 0 ];
        this._repoName = paramArray[ 1 ];
    } else {
        this._getCurrentRepoInfo();
    }
};
// Get the id of the issue
Bucket.prototype._getIssueId = function ( param ) {
    'use strict';
    if ( param ) {
        this.issueId = param;
    }
};
// Get the type of task for the pull request
Bucket.prototype._getPullReqTask = function ( param ) {
    'use strict';
    if ( param ) {
        this.pullReqActivity = param;
    }
};
// Begin sending the request
Bucket.prototype._beginRequest = function () {
    'use strict';
    this._url = this._url.replace( '{owner}', this._owner || '' );

    this._url = this._url.replace( '{repoName}', this._repoName || '' );

    if ( !( this._owner && this._repoName ) ) {
        this._url = this._url.replace( '//', '' );
    }

    if ( this._credsReq ) {
        this._sendRequestWithCreds();
    } else {
        this._sendRequest();
    }
};
// Send the request with the auth creds
Bucket.prototype._sendRequestWithCreds = function () {
    'use strict';
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

    prompt.start();
    prompt.get( schema, function ( err, result ) {
        self._credUsername = result.username;
        self._credPassword = result.password;
        if ( result.username && result.password ) {
            self._sendRequest();
        } else {
            console.log( 'Username and password are required' );
        }
    } );
};
// Send the request
Bucket.prototype._sendRequest = function () {
    'use strict';
    var req = request[ this._type.toLowerCase() ]( [ this._config.baseUrl.join( '/' ), this._url ].join( '/' ),
            function ( err, resp, bod ) {
                if ( err || ( !err && resp.statusCode >= 400 ) ) {
                    self._onError( resp );
                }

                if ( !err && resp.statusCode === 200 ) {
                    self._parseOutput( resp );
                }
            } ),
        self = this;

    if ( this._credsReq ) {
        req.auth( this._credUsername, this._credPassword );
    }

    if ( !!Object.keys( this._postData )
        .length && this._command === 'fork' ) {
        req.form()
            .append( 'name', this._customForkName );
    }
};
// Parse the output recieved
Bucket.prototype._parseOutput = function ( data ) {
    'use strict';
    var forkedRepoName = this._customForkName;

    if ( this._command === 'fork' ) {
        console.log( 'Repo was forked into "%s"', forkedRepoName );

    } else if ( this._command === 'create' ) {
        console.log( 'Repo was create at "%s"', this._repoName );
        this.addRemote();
    }
};
// Display the appropriate error message
Bucket.prototype._onError = function ( data ) {
    'use strict';
    if ( data.body ) {
        try {
            console.log( JSON.parse( data.body )
                .error.message );
        } catch ( e ) {
            this._predefinedErrors( data.statusCode );
        }
    } else {
        this._predefinedErrors( data.statusCode );
    }
};
// Predefined set of errors based on http status code
Bucket.prototype._predefinedErrors = function ( statusCode ) {
    'use strict';
    console.log( this._config.errorCodes[ statusCode ] );
};
// Git methods
// Get git config info on the current repo
Bucket.prototype._getCurrentRepoInfo = function () {
    var git = new Git();
    // Write code to read the current folder details from the .git/config file
    // git.repo('.git', function(error, repository) {
    //     if (error) throw error;

    //     console.log(repository);
    // });
};
// Add a git remote
Bucket.prototype._addRemote = function () {
    var git = new Git();
};
Bucket.prototype._credPassword;
Bucket.prototype._credUsername;
Bucket.prototype._credsReq = false;
Bucket.prototype._postData = {};
Bucket.prototype._type = 'GET';

module.exports = Bucket;
