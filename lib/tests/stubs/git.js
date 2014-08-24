var Git = require( '../../src/git' ),
    gitStub = new Git();

gitStub._runGitProcess = function ( command ) {
    'use strict';
    return command;
};

module.exports = gitStub;