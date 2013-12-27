#!/usr/bin/env node

var open = require('open'),
    http = require('http'),
    querystring = require('querystring'),
    bucket = require('commander'),
    Bucket = require('./bin');

bucket
    .version('0.0.1');

bucket
    .command('create <username> <repoName>')
    .description('Create a repo at https://bitbucket.org/<username>/<repo>.git')
    .action(function (username, repoName) {
        console.log("Creating repo at 'https://bitbucket.org/%s/%s.git' ...",
            username, repoName);
        var commandName = this.rawArgs[2],
            bckt = new Bucket(commandName, {username: username, repoName: repoName});
    });

bucket
    .command('fork [customForkName]')
    .description('Fork the currently cloned repo')
    .action(function (customForkName) {
        var currentUser = currentUser(),
            repoName = customForkName || '',
            commandName = this.rawArgs[2];
        console.log("Forking into 'https://bitbucket.org/%s/%s.git' ...",
            currentUser, repoName);
        var bckt = new Bucket(commandName, {username: currentUser, repoName: repoName});
        console.log("Adding %s as remote for 'https://bitbucket.org/%s/%s.git' ...",
            currentUser, currentUser, repoName);
    });

bucket
    .command('pullreq')
    .description('Send a pull request to the current repo')
    .action(function () {
        var commandName = this.rawArgs[2];
        console.log("Sending a pull request to 'https://bitbucket.org/%s/%s.git' ...",
            repoOwner, repoName);
    });

bucket
    .command('browse [wiki]')
    .option('-o, --owner <repoOwner>', 'The owner of the repo')
    .option('-r, --repo-name <repoName>', 'The name of the repo')
    .description('Browse the repo or its wiki')
    .action(function (wiki, options) {
        var owner = options.owner || '',
            repoName = options.repoName || '',
            commandName = this.rawArgs[2];
        if (wiki) {
            console.log("Opening the repo wiki at 'https://www.bitbucket.org/%s/%s/wiki' ...",
                owner, repoName);
            var bckt = new Bucket('wiki', {owner: owner, repoName: repoName});
            return false;
        }

        console.log("Opening the repo at 'https://bitbucket.org/%s/%s.git' ...",
            owner, repoName);
        var bckt = new Bucket(commandName, {owner: owner, repoName: repoName});
    });

bucket
    .command('help [command]')
    .description('Help for the commands')
    .action(function (command) {
        var commandName = this.rawArgs[2],
            bckt = new Bucket(commandName, this.rawArgs.slice(3));
    });

bucket.parse(process.argv);

module.exports = bucket;

/*
Create a repo
Fork a repo
Pull request
Browse wiki
 */
