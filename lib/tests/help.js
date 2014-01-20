// Tests for the create function
var assert = require('assert'),
    Bucket = require('../src');

describe('Bucket', function () {
    var bucket;

    describe('"help" without any parameters', function () {
        var bucket = new Bucket('help');

        it('should have "help" as _command', function () {
            assert.equal(bucket._command, 'help');
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
    });

    describe('"help" with parameter "asdf"', function () {
        var bucket = new Bucket('help', ['asdf']);

        it('should have "help" as _command', function () {
            assert.equal(bucket._command, 'help');
        });
        it('should not have options as undefined', function () {
            assert.notEqual(bucket._options, undefined);
        });
        it('should have at least 1 length', function () {
            assert.equal(bucket._options.length > 0, true);;
        });
        it('should have "asdf" as the first element', function () {
            assert.equal(bucket._options[0], 'asdf');;
        });
        it('should have _config as defined', function () {
            assert.notEqual(bucket._config, undefined);
        });
        it('should have _credsReq as false', function () {
            assert.equal(bucket._credsReq, false);
        });
    });

    describe('"help" with parameter "create"', function () {
        var bucket = new Bucket('help', ['create']);

        it('should have "help" as _command', function () {
            assert.equal(bucket._command, 'help');
        });
        it('should not have options as undefined', function () {
            assert.notEqual(bucket._options, undefined);
        });
        it('should have at least 1 length', function () {
            assert.equal(bucket._options.length > 0, true);;
        });
        it('should have "create" as the first element', function () {
            assert.equal(bucket._options[0], 'create');;
        });
        it('should have _config as defined', function () {
            assert.notEqual(bucket._config, undefined);
        });
        it('should have _credsReq as false', function () {
            assert.equal(bucket._credsReq, false);
        });
    });

    describe('"help" with parameter "fork"', function () {
        var bucket = new Bucket('help', ['fork']);

        it('should have "help" as _command', function () {
            assert.equal(bucket._command, 'help');
        });
        it('should not have options as undefined', function () {
            assert.notEqual(bucket._options, undefined);
        });
        it('should have at least 1 length', function () {
            assert.equal(bucket._options.length > 0, true);;
        });
        it('should have "fork" as the first element', function () {
            assert.equal(bucket._options[0], 'fork');;
        });
        it('should have _config as defined', function () {
            assert.notEqual(bucket._config, undefined);
        });
        it('should have _credsReq as false', function () {
            assert.equal(bucket._credsReq, false);
        });
    });

    describe('"help" with parameter "pullreq"', function () {
        var bucket = new Bucket('help', ['pullreq']);

        it('should have "help" as _command', function () {
            assert.equal(bucket._command, 'help');
        });
        it('should not have options as undefined', function () {
            assert.notEqual(bucket._options, undefined);
        });
        it('should have at least 1 length', function () {
            assert.equal(bucket._options.length > 0, true);;
        });
        it('should have "pullreq" as the first element', function () {
            assert.equal(bucket._options[0], 'pullreq');;
        });
        it('should have _config as defined', function () {
            assert.notEqual(bucket._config, undefined);
        });
        it('should have _credsReq as false', function () {
            assert.equal(bucket._credsReq, false);
        });
    });

    describe('"help" with parameter "browse"', function () {
        var bucket = new Bucket('help', ['browse']);

        it('should have "help" as _command', function () {
            assert.equal(bucket._command, 'help');
        });
        it('should not have options as undefined', function () {
            assert.notEqual(bucket._options, undefined);
        });
        it('should have at least 1 length', function () {
            assert.equal(bucket._options.length > 0, true);;
        });
        it('should have "browse" as the first element', function () {
            assert.equal(bucket._options[0], 'browse');;
        });
        it('should have _config as defined', function () {
            assert.notEqual(bucket._config, undefined);
        });
        it('should have _credsReq as false', function () {
            assert.equal(bucket._credsReq, false);
        });
    });
});
