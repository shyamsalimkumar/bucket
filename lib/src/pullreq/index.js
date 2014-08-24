var pullreq = function () {
    'use strict';
    var repoUrl = [ this._config.pullreq()
        .join( '/' ), this._config.pullRequests.join( '/' )
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

module.exports = pullreq;