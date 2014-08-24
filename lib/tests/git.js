// Tests for the git function
var chai = require( 'chai' ),
    sinon = require( 'sinon' ),
    sinonChai = require( 'sinon-chai' ),
    should = require( 'chai' )
    .should(),
    Git = require( './stubs/git' ); // stubbed version of the original file

chai.use( sinonChai );

describe( 'Git', function () {
    'use strict';
    var sandbox;

    beforeEach( function () {
        // create a sandbox
        sandbox = sinon.sandbox.create();

        // stub some console methods
        sandbox.stub( console, 'log' );
        sandbox.stub( console, 'error' );
    } );

    afterEach( function () {
        // restore the environment as it was before
        sandbox.restore();
    } );

    describe( '"clone"', function () {

        var git = Git;
        describe( 'without any parameters', function () {

            it( 'should return an error', function () {
                should.equal( JSON.stringify( git.clone() ), '{"error":"Missing clone url"}' );
            } );
        } );

        describe( 'with "url"', function () {

            it( 'should have command as "git clone url"', function () {
                should.equal( git.clone( 'url' ), 'git clone url' );
            } );
        } );

        describe( 'with "url" and folderName as "folder"', function () {

            it( 'should have command as "git clone url folder"', function () {
                should.equal( git.clone( 'url', 'folder' ), 'git clone url folder' );
            } );
        } );
    } );

    describe( '"setRemote"', function () {

        var git = Git;
        describe( 'without any parameters', function () {

            it( 'should return an error', function () {
                should.equal( JSON.stringify( git.setRemote() ), '{"error":"Remote name/url missing"}' );
            } );
        } );

        describe( 'with "url" and remoteName as "jimbo"', function () {

            it( 'should have command as "git remote add jimbo url"', function () {
                should.equal( git.setRemote( 'jimbo', 'url' ), 'git remote add jimbo url' );
            } );
        } );
    } );
} );