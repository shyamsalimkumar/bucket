var git = require( 'nodegit' ),
    exec = require( 'child_process' )
    .exec,
    path = require( 'path' ),
    gitPath = path.resolve( process.cwd(), '.git' ),
    Git;

Git = function ( path ) {
    'use strict';
    var self = this;

    git.Repo.open( path || gitPath, function ( error, repo ) {
        if ( error ) {
            throw error;
        }
        self.repo = repo;

        repo.getMaster( function ( error, branch ) {
            self.masterBranch = branch;
        } );

        repo.getRemotes( function ( error, remotes ) {
            self.remoteNames = remotes;
        } );
    } );
};

Git.prototype.clone = function ( url, folderName ) {
    'use strict';
    folderName = folderName || '';
    var gitCloneCmd = 'git clone {url} {folderName}'.replace('{url}',url).replace('{folderName}',folderName);
    this._gitProcess = exec( gitCloneCmd, function ( error, stdout, stderr ) {
        if ( error ) {
            console.error( stderr );
        } else {
            console.log( stdout );
        }
    } );
};

Git.prototype.repo = undefined;
Git.prototype.masterBranch = undefined;
Git.prototype.author = undefined;
Git.prototype.remoteNames = undefined;
Git.prototype.lastCommit = undefined;

module.exports = Git;