var Git = require( '../git' ),
    clone = function () {
        'use strict';
        if ( !this._owner || !this._repoName ) {
            console.error( 'Owner/RepoName is required for cloning' );
            return;
        }
        var git = new Git();
        git.clone( 'https://www.bitbucket.org/{username}/{repoName}'
            .replace( '{username}', this._owner )
            .replace( '{repoName}', this._repoName ), this._folderName );
    };

module.exports = clone;