#BUCKET
[![Build Status](https://travis-ci.org/shyamsalimkumar/bucket.svg?branch=master)](https://travis-ci.org/shyamsalimkumar/bucket)

###Intro

You might've heard of [Hub](http://hub.github.com/), a commandline helper to ease [Github](https://github.com/) development.
It is very simple and has many easy to use features like

* Creating a new repo
* Cloning a repo.
* Forking a repo.
* Browsing the repo code and its wiki.
* Sending a pull request to the cloned repo.

All this without having to open a browser. I was truly astonished by the level of complexity that it could do.
It is written in [Ruby](https://www.ruby-lang.org/). I initially thought of recreating the same by forking the code and just replacing the github specific code, but that would be too boring to do and I wouldn't feel a sense of satisfaction that one gets when he builds something afresh. So I decided to start afresh.


Bucket is just a commandline helper similar to Hub but for [Bitbucket](https://bitbucket.org/) instead of Github. Its made in NodeJS.

###Commands

I recreated some of the functionality of Hub. Mainly creating a new repo, forking a clone, sending pull requests to a cloned repo, and then browsing the repo and its wiki.

1. Create a new repo
    `git init` to initialize the git repository locally, then
    `bucket create username/repo-name` to create a repo at https://bitbucket.org/username/repo-name and add the remote 'origin' as the same.
2. Forking a repo
    `git clone https://bitbucket.org/username/repo-name.git && cd repo-name` to clone a repo into your local machine and change into its directory. Then do a `bucket fork` to fork the repo into your own. You could pass in a custom name for the forked repo using `bucket fork custom-name`
3. Submitting a pull request
    `bucket pullreq` would submit a pull request to the parent repo (the remote origin).
4. Browsing through the repo
    `bucket browse` would open up the current repo url in the default browser. If you prefer to read the wiki you could by using `bucket browse wiki` instead.
    If you want to read the code of another repo then you could pass in the repo owner and its name instead. Then the above commands would change to `bucket browse -o owner -r repo-name` and `bucket browse wiki -o owner -r repo-name` respectively.