var exec = require( 'child_process' )
    .exec,
    async = require( 'async' ),
    Git;

Git = function () {
    'use strict';
    this.clone = function ( url, folderName ) {
        if ( !url ) {
            console.error( 'Please provide a clone url' );
        }
        var command = 'git clone {url} {folderName}'.replace( '{url}', url )
            .replace( '{folderName}', folderName );
        this._gitProcess = exec( command, function ( err, stdout, stderr ) {
            if ( err ) {
                console.error( stderr );
            } else {
                console.log( stdout );
            }
        } );
    };
    this.getRemotes = function () {
        var command = 'git remote';
        this._gitProcess = exec( command, function ( err, stdout, stderr ) {
            if ( err ) {
                return {
                    error: stderr
                };
            } else {
                return stdout.split( '\n' );
            }
        } );
    };
    this.setRemote = function ( name, url ) {
        if ( !name || !url ) {
            console.error( 'A remote name and url are required for setting a remote' );
            return {
                error: 'Remote name/url missing'
            };
        } else {
            var command = 'git remote add {name} {url}'.replace( '{name}', name )
                .replace( '{url}', url );
            this._gitProcess = exec( command, function ( err, stdout, stderr ) {
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
};

module.exports = Git;