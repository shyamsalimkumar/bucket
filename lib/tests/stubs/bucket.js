var proxyquire =  require('proxyquire'),
    promptStub   =  { },
    requestStub   =  { },
    Bucket = proxyquire('../../src', {
        'prompt': promptStub,
        'request' : requestStub
    });

// prompt stubbed methods
promptStub.start = function () { };
promptStub.get = function (schema, callback) {
    var result = {
            username: undefined,
            password: undefined
        },
        err;
    callback(err, result);
};

// request stubbed methods
requestStub.get = function (url, callback) {
    callback(err, resp, body);
};
requestStub.post = function (url, callback) {
    callback(err, resp, body);
};
requestStub.auth = function (username, password) { };
requestStub.form = function () { return this; };
requestStub.append = function (text, text) { };

module.exports = Bucket;