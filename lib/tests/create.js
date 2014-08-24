// Tests for the create function
var chai = require( 'chai' ),
    sinon = require( 'sinon' ),
    sinonChai = require( "sinon-chai" ),
    should = require( 'chai' )
    .should(),
    Bucket = require( './stubs/bucket.js' ); // stubbed version of the original file

chai.use( sinonChai );

describe( 'Bucket', function () {
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

    describe( '"create" without any parameters', function () {
        var bucket = new Bucket( 'create' );

        it( 'should have "create" as _command', function () {
            should.equal( bucket._command, 'create' );
        } );
        it( 'should have options as undefined', function () {
            should.equal( bucket._options, undefined );
        } );
        it( 'should have _config as defined', function () {
            should.not.equal( bucket._config, undefined );
        } );
        it( 'should have _credsReq as true', function () {
            should.equal( bucket._credsReq, true );
        } );
        it( 'should have _type as POST', function () {
            should.equal( bucket._type, 'POST' );
        } );
        it( 'should have _url as "api/2.0/repositories"', function () {
            should.equal( bucket._url, 'api/2.0/repositories' );
        } );
    } );
} );