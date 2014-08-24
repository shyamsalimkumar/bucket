var exec = require( 'child_process' )
    .exec,
    q = require( 'q' ),
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
        var command = 'git remote',
            deferred = q.defer();
        this._gitProcess = exec( command, function ( err, stdout, stderr ) {
            if ( err ) {
                deferred.reject( {
                    error: stderr
                } );
            } else {
                deferred.resolve( stdout.split( '\n' ) );
            }
        } );

        return deferred.promise;
    };

    this.setRemote = function ( name, url ) {
        var deferred = q.defer();
        if ( !name || !url ) {
            console.error( 'A remote name and url are required for setting a remote' );
            deferred.reject( {
                error: 'Remote name/url missing'
            } );
        } else {
            var command = 'git remote add {name} {url}'.replace( '{name}', name )
                .replace( '{url}', url );
            this._gitProcess = exec( command, function ( err, stdout, stderr ) {
                if ( err ) {
                    deferred.reject( {
                        error: stderr
                    } );
                } else {
                    deferred.resolve( stdout );
                }
            } );
        }

        return deferred.promise;
    };
};

module.exports = Git;