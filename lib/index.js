var bucket = require( 'commander' ),
    Bucket = require( './src' );

bucket
    .version( '0.0.1' );

bucket
    .command( 'create <username>/<repoName>' )
    .description( 'Create a repo at https://bitbucket.org/<username>/<repo>.git' )
    .action( function ( usernameRepoName ) {
        'use strict';
        var commandName = this.rawArgs[ 2 ];
        var usernameRepoNameSplit = usernameRepoName.split( '/' );
        if ( usernameRepoNameSplit.length !== 2 || !usernameRepoNameSplit[ 0 ].trim() || !usernameRepoNameSplit[ 1 ]
            .trim() ) {
            console.log( 'Please provide both username & repoName in "username/repoName" format' );
        } else {
            console.log( "Creating repo at 'https://bitbucket.org/%s.git' ...",
                usernameRepoName );
            var bckt = new Bucket( commandName, {
                username: usernameRepoNameSplit[ 0 ],
                repoName: usernameRepoNameSplit[ 1 ]
            } );
        }
    } );

bucket
    .command( 'clone <username>/<repoName> [folderName]' )
    .description( 'Clone a repo at https://bitbucket.org/<username>/<repo>.git' )
    .action( function ( usernameRepoName, folderName ) {
        'use strict';
        var commandName = this.rawArgs[ 2 ];
        var usernameRepoNameSplit = usernameRepoName.split( '/' );
        if ( usernameRepoNameSplit.length !== 2 || !usernameRepoNameSplit[ 0 ].trim() || !usernameRepoNameSplit[ 1 ]
            .trim() ) {
            console.log( 'Please provide both username & repoName in "username/repoName" format' );
        } else {
            console.log( "Cloning repo from 'https://bitbucket.org/%s.git into %s' ...",
                usernameRepoName, folderName || usernameRepoNameSplit[ 1 ] );
            var bckt = new Bucket( commandName, {
                username: usernameRepoNameSplit[ 0 ],
                repoName: usernameRepoNameSplit[ 1 ],
                folderName: folderName
            } );
        }
    } )

bucket
    .command( 'fork [customForkName]' )
    .description( 'Fork the currently cloned repo' )
    .action( function ( customForkName ) {
        'use strict';
        var currentUser = currentUser(),
            repoName = customForkName || '',
            commandName = this.rawArgs[ 2 ];
        console.log( "Forking into 'https://bitbucket.org/%s/%s.git' ...",
            currentUser, repoName );
        var bckt = new Bucket( commandName, {
            username: currentUser,
            repoName: repoName
        } );
        console.log( "Adding %s as remote for 'https://bitbucket.org/%s/%s.git' ...",
            currentUser, currentUser, repoName );
    } );

bucket
    .command( 'pullreq' )
    .description( 'Send a pull request to the current repo' )
    .action( function () {
        'use strict';
        var commandName = this.rawArgs[ 2 ];
        console.log( "Sending a pull request to 'https://bitbucket.org/%s/%s.git' ...",
            repoOwner, repoName );
    } );

bucket
    .command( 'browse [wiki]' )
    .option( '-o, --owner <repoOwner>', 'The owner of the repo' )
    .option( '-r, --repo-name <repoName>', 'The name of the repo' )
    .description( 'Browse the repo or its wiki' )
    .action( function ( wiki, options ) {
        'use strict';
        var owner = options.owner || '',
            repoName = options.repoName || '',
            commandName = this.rawArgs[ 2 ];
        if ( wiki ) {
            console.log( "Opening the repo wiki at 'https://www.bitbucket.org/%s/%s/wiki' ...",
                owner, repoName );
            var bckt = new Bucket( 'wiki', {
                owner: owner,
                repoName: repoName
            } );
            return false;
        }

        console.log( "Opening the repo at 'https://bitbucket.org/%s/%s.git' ...",
            owner, repoName );
        var bckt = new Bucket( commandName, {
            owner: owner,
            repoName: repoName
        } );
    } );

bucket
    .command( 'help [command]' )
    .description( 'Help for the commands' )
    .action( function ( command ) {
        'use strict';
        var commandName = this.rawArgs[ 2 ],
            bckt = new Bucket( commandName, this.rawArgs.slice( 3 ) );
    } );

bucket.parse( process.argv );

module.exports = bucket;

/*
Create a repo
Fork a repo
Pull request
Browse wiki
 */