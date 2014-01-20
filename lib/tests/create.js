// Tests for the create function
var assert = require('assert'),
    Bucket = require('../src');

describe('Bucket', function () {
    var bucket;

    describe('"create" without any parameters', function () {
        var bucket = new Bucket('create');

        it('should have "create" as _command', function () {
            assert.equal(bucket._command, 'create');
        });
        it('should have options as undefined', function () {
            assert.equal(bucket._options, undefined);
        });
        it('should have _config as defined', function () {
            assert.notEqual(bucket._config, undefined);
        });
        it('should have _credsReq as true', function () {
            assert.equal(bucket._credsReq, true);
        });
        it('should have _type as POST', function () {
            assert.equal(bucket._type, 'POST');
        });
        it('should have _url as "api/2.0/repositories"', function () {
            assert.equal(bucket._url, 'api/2.0/repositories');
        });
    });
});