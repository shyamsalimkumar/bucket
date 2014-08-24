var proxyquire = require( 'proxyquire' ),
    promptStub = {},
    requestStub = {},
    gitStub = {},
    Bucket = proxyquire( '../../src', {
        'prompt': promptStub,
        'request': requestStub,
        'git': gitStub
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

gitStub.clone = function ( url, folderName ) {
    'use strict';
    if ( !url ) {
        console.error( 'Please provide a clone url' );
    }
    var command = 'git clone {url} {folderName}'.replace( '{url}', url )
        .replace( '{folderName}', folderName );
    return command;
};

module.exports = Bucket;