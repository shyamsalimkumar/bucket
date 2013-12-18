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
config.errorCodes = {
    '400': 'Something went wrong.',
    '401': 'Account credentials required.',
    '403': 'Sorry acess to the repo is denied.',
    '404': 'The repo was not found.'
};

module.exports = config;