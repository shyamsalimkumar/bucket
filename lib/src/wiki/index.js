var open = require( 'open' ),
    wiki = function () {
        'use strict';
        var wikiUrl = 'https://www.bitbucket.org/{username}/{repoName}/wiki'
            .replace( '{username}', this._owner || '' )
            .replace( '{repoName}', this._repoName || '' );

        open( wikiUrl );
    };

module.exports = wiki;