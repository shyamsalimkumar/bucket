var git = require('nodegit'),
    exec = require('child_process').exec,
    path = require('path'),
    git_path = path.resolve(process.cwd(), '.git'),
    Git;

Git = function (path) {
    var self = this;

    git.Repo.open(path || git_path, function (error, repo) {
        if (error) throw error;
        self.repo = repo;

        repo.getMaster(function (error, branch) {
            self.masterBranch = branch;
        });

        repo.getRemotes(function (error, remotes) {
            self.remoteNames = remotes;
        });
    });
};

Git.prototype.repo = undefined;
Git.prototype.masterBranch = undefined;
Git.prototype.author = undefined;
Git.prototype.remoteNames = undefined;
Git.prototype.lastCommit = undefined;

module.exports = Git;