var exec = require( 'child_process' )
    .exec,
    async = require( 'async' ),
    Git;

Git = function () {
    'use strict';
    var git = {};
    git.clone = function ( url, folderName ) {
        if ( !url ) {
            console.error( 'Please provide a clone url' );
            return {
                error: 'Missing clone url'
            };
        }
        var command = 'git clone {url} {folderName}'.replace( '{url}', url )
            .replace( '{folderName}', folderName || '' ).trim();
        return this._runGitProcess( command, function ( err, stdout, stderr ) {
            if ( err ) {
                console.error( stderr );
            } else {
                console.log( stdout );
            }
        } );
    };
    git.getRemotes = function () {
        var command = 'git remote';
        return this._runGitProcess( command, function ( err, stdout, stderr ) {
            if ( err ) {
                return {
                    error: stderr
                };
            } else {
                return stdout.split( '\n' );
            }
        } );
    };
    git.setRemote = function ( name, url ) {
        if ( !name || !url ) {
            console.error( 'A remote name and url are required for setting a remote' );
            return {
                error: 'Remote name/url missing'
            };
        } else {
            var command = 'git remote add {name} {url}'.replace( '{name}', name )
                .replace( '{url}', url );
            return this._runGitProcess( command, function ( err, stdout, stderr ) {
                if ( err ) {
                    return {
                        error: stderr
                    };
                } else {
                    return stdout;
                }
            } );
        }
    };
    git._runGitProcess = function ( cmd, cb ) {
        exec( cmd, cb );
    };
    return git;
};

module.exports = Git;