// Tests for the fork function
var assert = require('assert'),
    Bucket = require('../src');

describe('Bucket', function () {
    var bucket;

    describe('"fork" without any parameters', function () {
        var bucket = new Bucket('fork');

        it('should have "fork" as _command', function () {
            assert.equal(bucket._command, 'fork');
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
        it('should have _url as "api/1.0/repositories/fork"', function () {
            assert.equal(bucket._url, 'api/1.0/repositories/fork');
        });
    });
});