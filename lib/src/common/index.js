var api = require( './api' ),
    config = require( '../../config' ),
    common = {
        api: new api( config.schema )
    };

module.exports = common;