// Tests for the clone function
var chai = require( 'chai' ),
    sinon = require( 'sinon' ),
    sinonChai = require( "sinon-chai" ),
    should = require( 'chai' )
    .should(),
    Bucket = require( './stubs/bucket.js' ); // stubbed version of the original file

chai.use( sinonChai );

describe( 'Bucket', function () {
    'use strict';
    var bucket,
        sandbox;

    beforeEach( function () {
        // create a sandbox
        sandbox = sinon.sandbox.create();

        // stub some console methods
        sandbox.stub( console, "log" );
        sandbox.stub( console, "error" );
    } );

    afterEach( function () {
        // restore the environment as it was before
        sandbox.restore();
    } );

    describe( '"clone" without any parameters', function () {
        var bucket = new Bucket( 'clone' );

        it( 'should have "clone" as _command', function () {
            should.equal( bucket._command, 'clone' );
        } );
        it( 'should have options as undefined', function () {
            should.equal( bucket._options, undefined );
        } );
        it( 'should have _config as defined', function () {
            should.not.equal( bucket._config, undefined );
        } );
        it( 'should have _credsReq as "false"', function () {
            should.equal( bucket._credsReq, false );
        } );
        it( 'should have _type as "GET"', function () {
            should.equal( bucket._type, 'GET' );
        } );
        it( 'should have _url as "undefined"', function () {
            should.equal( bucket._url, undefined );
        } );
    } );

    describe( '"clone" with parameters', function () {
        var bucket = new Bucket( 'clone', {
            username: 'clawsofbanana',
            repoName: 'bucket'
        } );

        it( 'should have "clone" as _command', function () {
            should.equal( bucket._command, 'clone' );
        } );
        it( 'should not have options as "undefined"', function () {
            should.not.equal( bucket._options, undefined );
        } );
        it( 'should have _username as "clawsofbanana"', function () {
            should.equal( bucket._username, 'clawsofbanana' );
        } );
        it( 'should have _repoName as "bucket"', function () {
            should.equal( bucket._repoName, 'bucket' );
        } );
        it( 'should have _credsReq as "false"', function () {
            should.equal( bucket._credsReq, false );
        } );
        it( 'should have _type as "GET"', function () {
            should.equal( bucket._type, 'GET' );
        } );
        it( 'should have _url as "undefined"', function () {
            should.equal( bucket._url, undefined );
        } );
    } );
} );