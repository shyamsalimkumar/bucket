var git = require('nodegit'),
    exec = require('child_process').exec,
    path = require('path'),
    git_path = path.resolve(process.cwd(), '.git');

git.Repo.open(git_path, function(error, repo) {
    if (error) throw error;

    console.log("Opened repository.");

    repo.getMaster(function (err, branch) {
        console.log(branch);
        
        branch.repo.getRemotes(function (error, remoteNames) {
            if (error) throw error;

            remoteNames.forEach(function (remoteName) {
                console.log(remoteName);
                var remote = repo.getRemote(remoteName);
                console.log(remote.url());
            });
        });

        branch.repo.getReference('refs/heads/master', function (error, reference) {
            if (error) throw error;

            reference.oidForName(repo, 'refs/heads/master', function (error, oid) {
                console.log('oid');
                console.log(oid);
            });
        });
        // reference.oidForName(repo, 'refs/heads/master', callback(oid))
    });

    
    // repo.getReferences(git.Reference.Type.All, function (error, referenceNames) {
    //     if (error) throw error;

    //     var repoDetails = {};

    //     referenceNames.forEach(function (referenceName) {
    //       repo.getReference(referenceName, function (error, reference) {
    //         if (error) throw error;
    //         var refTarget;

    //         if (reference.isConcrete()) {
    //           console.log("Reference:", referenceName, reference.target());
    //           refTarget = reference.target();
    //         } else if (reference.isSymbolic()) {
    //           console.log("Reference:", referenceName, reference.symbolicTarget());
    //           refTarget = reference.symbolicTarget();
    //         }

    //         repoDetails[referenceName] = { target: refTarget };
    //       });
    //     });

    // });
});