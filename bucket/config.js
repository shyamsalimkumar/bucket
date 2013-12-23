var config = {};

config.baseUrl = ['https:/', 'bitbucket.org'];
config.repoDetails = ['api', '2.0', 'repositories', '{owner}', '{repoName}'];
config.pullRequests = ['pullrequests', '{id}'];
config.pullRequestsCommnds = {
    activity: 'activity',
    commits: 'commits',
    patches: 'patch',
    diff: 'diff',
    merge: 'merge',
    comments: 'comments',
    decline: 'decline',
    approve: 'approve'
};
config.wiki = function () {
    var repoDetails = this.repoDetails;
    repoDetails[1] = '1.0';
    
    return repoDetails;
};
config.wikiCommnds = ['wiki', '{page}'];
config.fork = function () {
    var repoDetails = this.repoDetails;
    repoDetails[1] = '1.0';

    return repoDetails;
};
config.forkCommnds = {
    fork: 'fork'
};
config.help = {
    create: 'It is used to create a repo. It has two required parameters namely username and repository name.' + 
            '\n\teg. `bucket create clawsofbanana bucket` would create a repo at https://www.bitbucket.org/clawsofbanana/bucket',
    fork: 'It is used to fork a repo. This can be a private or a public fork depending on the parameters passed' +
            '\n\teg. `bucket fork` would fork the origin repo of the current folder.' +
            '\n\teg. `bucket fork anotherRepo` would fork the origin repo of the current folder as anotherRepo.',
    browse: 'It is used to browse the code of a repo on a browser. If the optional argument wiki is passed, the wiki is opened instead.' +
            '\n\teg. `bucket browse clawsofbanana bucket` would open https://www.bitbucket.org/clawsofbanana/bucket in the browser.' +
            '\n\teg. `bucket browse wiki clawsofbanana bucket` would open https://www.bitbucket.org/clawsofbanana/bucket/wiki in the browser.',
    pullreq: 'It is used to generate a pull request to the origin remote of the current cloned repo.' +
            '\n\teg. `bucket pullreq` would create a pull request to the current cloned repo.',
    help: 'It is used to display the help commands.' +
            '\n\teg. `bucket help create` would display the help on the create command.'
}
config.errorCodes = {
    '400': 'Something went wrong.',
    '401': 'Account credentials required.',
    '403': 'Sorry access to the repo is denied.',
    '404': 'The repo was not found.',
    '405': "You can't do that"
};

module.exports = config;