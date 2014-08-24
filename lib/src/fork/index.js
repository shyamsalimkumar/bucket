var fork = function () {
    'use strict';
    var repoUrl = [ this._config.fork()
        .join( '/' ),
        this._config.forkCommnds.fork
    ];
    this._credsReq = true;
    this._type = 'POST';
    this._url = repoUrl.join( '/' );
    this._postData.name = this._customForkName;

    this._beginRequest();
};

module.exports = fork;