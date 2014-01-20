// Tests for the pullreq function
var assert = require('assert'),
    Bucket = require('../bin');

describe('Bucket', function () {
    var bucket;

    describe('"pullreq" with no parameters', function () {
        var bucket = new Bucket('pullreq');

        it('should have "pullreq" as _command', function () {
            assert.equal(bucket._command, 'pullreq');
        });
        it('should have options as undefined', function () {
            assert.equal(bucket._options, undefined);
        });
        it('should have _config as defined', function () {
            assert.notEqual(bucket._config, undefined);
        });
        it('should have _credsReq as false', function () {
            assert.equal(bucket._credsReq, false);
        });
        it('should have _type as POST', function () {
            assert.equal(bucket._type, 'POST');
        });
        it('should have _url as "api/1.0/repositories/pullrequests/"', function () {
            assert.equal(bucket._url, 'api/1.0/repositories/pullrequests/');
        });
    });
    
    describe('"pullreq" with issue id as 1', function () {
        var bucket = new Bucket('pullreq', {issueId: 1});

        it('should have "pullreq" as _command', function () {
            assert.equal(bucket._command, 'pullreq');
        });
        it('should not have options as undefined', function () {
            assert.notEqual(bucket._options, undefined);
        });
        it('should have _config as defined', function () {
            assert.notEqual(bucket._config, undefined);
        });
        it('should have _credsReq as false', function () {
            assert.equal(bucket._credsReq, false);
        });
        it('should have _type as GET', function () {
            assert.equal(bucket._type, 'GET');
        });
        it('should have _url as "api/1.0/repositories/pullrequests/1"', function () {
            assert.equal(bucket._url, 'api/1.0/repositories/pullrequests/1');
        });
    });

    describe('"pullreq" with issue id as 1 and activity type as ""', function () {
        var bucket = new Bucket('pullreq', {issueId: 1, pullReqActivity: 'comments'});

        it('should have "pullreq" as _command', function () {
            assert.equal(bucket._command, 'pullreq');
        });
        it('should not have options as undefined', function () {
            assert.notEqual(bucket._options, undefined);
        });
        it('should have _config as defined', function () {
            assert.notEqual(bucket._config, undefined);
        });
        it('should have _credsReq as false', function () {
            assert.equal(bucket._credsReq, false);
        });
        it('should have _type as GET', function () {
            assert.equal(bucket._type, 'GET');
        });
        it('should have _url as "api/1.0/repositories/pullrequests/1/comments"', function () {
            assert.equal(bucket._url, 'api/1.0/repositories/pullrequests/1/comments');
        });
    });
});