var async = require( 'async' ),
    request = require( 'request' ),
    prompt = require( 'prompt' ),
    config = require( './config' ),
    api = function ( promptSchema ) {
        'use strict';

        this._promise = null;
        this.checkForActionType = function ( callback ) {
            callback();
        };
        this.setConfig = function ( config, callback ) {
            var reqOptions = {
                uri: config.url,
                method: config.method || 'GET',
                qs: config.queryString || '',
                json: true
            };

            callback( null, reqOptions );
        };
        this.getCredentials = function ( needsCreds, callback ) {
            var config = {};
            if ( needsCreds ) {
                prompt.start();
                prompt.get( promptSchema, function ( err, result ) {
                    if ( result.username && result.password ) {
                        callback( null, {
                            username: result.username,
                            password: result.password
                        }, needsCreds );
                    } else {
                        callback( {
                            error: 'Username and password are required'
                        }, config, needsCreds );
                    }
                } );
            }
            callback( null, config, needsCreds );
        };
        this.setCredentials = function ( authConfig, hasCreds, callback ) {
            if ( hasCreds ) {
                config.auth = {
                    username: authConfig.username,
                    password: authConfig.password
                };
            }
            callback( null, config );
        };
        this.sendRequest = function ( config, callback ) {
            var cb = function ( err, res, body ) {
                if ( err || ( !err && res.statusCode >= 400 ) ) {
                    callback( {
                        statusCode: res.statusCode
                    }, null );
                } else {
                    callback( null, {
                        response: res,
                        body: body
                    } );
                }
            };
            request( config, cb );
        };
        this.parseOutput = function ( err, result ) {
            console.log( err );
            console.log( result );
        };
        this.beginRequest = function () {
            async.waterfall( [ this.checkForActionType,
                this.getCredentials,
                this.setCredentials,
                this.setConfig,
                this.sendRequest
            ], this.parseOutput );
        };
    };

module.exports = api;