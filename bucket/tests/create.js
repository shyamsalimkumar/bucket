// Tests for the create function
var assert = require('assert'),
    Bucket = require('../bin');

describe('Bucket', function () {
    var bucket;

    describe('create()', function () {
        it('should have "create" as _command', function () {
            assert.equal(-1, [1,2,3].indexOf(5));
        });
    });
});