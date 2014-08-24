var create = function () {
    'use strict';
    var repoUrl = this._config.repoDetails;
    this._credsReq = true;
    this._type = 'POST';
    this._url = repoUrl.join( '/' );

    this._beginRequest();
};

module.exports = create;