var proxyquire = require( 'proxyquire' ),
    promptStub = {},
    requestStub = {},
    Bucket = proxyquire( '../../src', {
        'prompt': promptStub,
        'request': requestStub
    } );

// prompt stubbed methods
promptStub.start = function () {};
promptStub.get = function ( schema, callback ) {
    'use strict';
    var result = {
            username: undefined,
            password: undefined
        },
        err;
    callback( err, result );
};

// request stubbed methods
requestStub.get = function ( url, callback ) {
    'use strict';
    callback( null, resp, body );
};
requestStub.post = function ( url, callback ) {
    'use strict';
    callback( null, resp, body );
};
requestStub.auth = function ( username, password ) {};
requestStub.form = function () {
    'use strict';
    return this;
};
requestStub.append = function ( text, text ) {};

module.exports = Bucket;