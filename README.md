# Introduction

![GitHub package.json version](https://img.shields.io/github/package-json/v/vyakymenko/angular-express.svg)
[![MIT license](http://img.shields.io/badge/license-MIT-brightgreen.svg)](http://opensource.org/licenses/MIT)
[![CircleCI](https://circleci.com/gh/vyakymenko/angular-express.svg?style=svg)](https://circleci.com/gh/vyakymenko/angular-express)
[![Build Status](https://travis-ci.org/vyakymenko/angular-express.svg?branch=master)](https://travis-ci.org/vyakymenko/angular-express)
[![Gitter](https://badges.gitter.im/express-angular/community.svg)](https://gitter.im/express-angular/community?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge)
[![Greenkeeper badge](https://badges.greenkeeper.io/vyakymenko/angular-express.svg)](https://greenkeeper.io/)
[![All Contributors](https://img.shields.io/badge/all_contributors-1-orange.svg?style=flat-square)](#contributors)

Extensible, reliable and modular starter project for Angular 2 (and beyond) with Angular CLI, Express and PM2 Daemon. Production Ready Full-stack.

**Want to have comfortable full-stack Angular development with Express? If _YES_ then, welcome to Angular Express!**

![Angular Express](https://raw.githubusercontent.com/vyakymenko/angular-express/master/.github/angular-express.jpg)

`angular-express` provides the following features:
- Allows you to painlessly update of already existing project.
- Official Angular CLI features support.
- Ready to go, statically typed build system for working with TypeScript.
- Production and Development builds.
- Server Side testing with [Mocha](https://mochajs.org/) and [Chai](https://www.chaijs.com/)
- End-to-end tests with Cypress.
- Provides full Docker support for both development and production environment
- Following the [best practices](https://angular.io/guide/styleguide).
- Share interfaces between UI and Server
- Support for Angular Mobile Toolkit
- Contain examples with MySQL, PostgreSQL, Redis, Mongo (TODO)
- (TODO) Allows you to analyze the space usage of created bundles by using source-map-explorer
- [Express](https://expressjs.com/) Node.js server for production/development build API.
- [PM2](http://pm2.keymetrics.io/) daemon for a server running.
- [Nginx](https://github.com/vyakymenko/angular-nginx-config-example/blob/master/ng2-application.conf) configuration file for your server.

# Fast start

```bash
git clone --depth 1 https://github.com/vyakymenko/angular-express
cd angular-express
# install the project dependencies
$ npm install
# watches your files and uses livereload by default
$ npm start

# dev build
$ npm run build.dev
# prod build
$ npm run build.prod

# run server in daemon mode
$ npm run run.prod
```

For Angular development information and wiki, look here:

- Official [Angular Docs](https://angular.io/docs)

# Table of Contents

- [Introduction](#introduction)
- [Fast start](#fast-start)
- [Table of Content](#table-of-content)
- [Express Server](#express-server)
- [Daemonize Server](#daemonize-server)
- [How to update](#how-to-update)
- [Running tests](#running-tests)
- [Dockerization](#dockerization)
  + [Development build and deployment](#development-build-and-deployment)
  + [Production build and deployment](#production-build-and-deployment)
  + [Updating dependencies and sources](#updating-dependencies-and-sources)
- [How to configure my NginX](#how-to-configure-my-nginx)
- [Reverse Proxy NginX Config Example](#reverse-proxy-nginx-config-example)
- [Databases Examples](#databases-examples)
- [Contributing](#contributing)

# Express Server

Express server run for prod build.

```sh
# run Express server in watch mode
$ npm run server.run
```

# Daemonize Server

For daemonize your server I propose to uze `PM2`.
```sh
# before daemonize production server `npm run build.prod`
$ npm run.prod

# restart only your project
$ pm2 restart <id>
# restart all project on daemon
$ pm2 restart all

# in cluster mode ( example 4 workers )
$ pm2 start dist/server/app.js -i 4
```

More details about [PM2](http://pm2.keymetrics.io/)

# How to update
```
git remote add upstream https://github.com/vyakymenko/angular-express
git pull upstream master
```

# Running tests

```bash
# Server Unit Testing
$ npm run test.server


# UI Unit Testing
$ test.ui

# Development. Your app will be watched by karma
# on each change all your specs will be executed.
$ npm run test.ui.watch
# NB: The command above might fail with a "EMFILE: too many open files" error.
# Some OS have a small limit of opened file descriptors (256) by default
# and will result in the EMFILE error.
# You can raise the maximum of file descriptors by running the command below:
$ ulimit -n 10480

# e2e (aka. end-to-end, integration)  - In two different shell windows
$ npm run e2e

# e2e live mode - Using Cypress app - In two different shell windows
$ npm run e2e.live
```

# Dockerization

The application provides full Docker support. You can use it for both development and production builds and deployments.

Please note that prod and dev are built into their own separate image, which can lead to unexpected differences in the
npm dependencies and the state of the sources in the container, if you are not familiar with Docker. See below.

Please also note that karma tests (`npm test`) are independent from the docker environment.
Even if an angular-express container is up and running, karma will run in the context of your **local** npm install,
which may differ from that of the container. In fact, the docker containers don't have karma installed at all.

Cypress tests are however fully supported and recommended to test the app served by either the dev or prod docker containers.  

## Development build and deployment

The dev image only contains the npm libraries installed, but not the sources. The sources are mounted at runtime,
via a docker shared volume, which allows for the live-reload feature to work.
 
To start the container, use:

```bash
$ docker-compose -f docker-compose.dev.yml up -d   # optional: --build, see below
```

Now open your browser at http://localhost:4200

## Production build and deployment

TODO

## Updating dependencies and sources
If you are not already familiar with Docker, please note that for both Dev and Prod docker environments, updates to
npm dependencies will be visible only after re-building the image and restarting a new container from it.

In Dev environment, this only applies to npm dependencies, since the sources are mounted as a shared directory.
In Prod environment, this applies to any change in the project.

To force docker-compose to rebuild the image before starting the container, use the --build flag:

```bash
$ docker-compose -f docker-compose.dev.yml up -d --build
```

# How to configure my NginX

```
##
# Your Angular.io NginX .conf
##

http {
  log_format gzip '[$time_local] ' '"$request" $status $bytes_sent';
  access_log /dev/stdout;
  charset utf-8;

  default_type application/octet-stream;

  types {
    text/html               html;
    text/javascript         js;
    text/css                css;
    image/png               png;
    image/jpg               jpg;
    image/svg+xml           svg svgz;
    application/octet-steam eot;
    application/octet-steam ttf;
    application/octet-steam woff;
  }


  server {
    listen            3353;
    server_name       local.example.com;

    root app/;
    add_header "X-UA-Compatible" "IE=Edge,chrome=1";

    location ~ ^/(scripts|styles)/(.*)$ {
      root .tmp/;
      error_page 404 =200 @asset_pass;
      try_files $uri =404;
      break;
    }

    location @asset_pass {
      root app/;
      try_files $uri =404;
    }

    location / {
      expires -1;
      add_header Pragma "no-cache";
      add_header Cache-Control "no-store, no-cache, must-revalicate, post-check=0 pre-check=0";
      root app/;
      try_files $uri $uri/ /index.html =404;
      break;
    }
  }

  server {
    listen 3354;

    sendfile on;

    ##
    # Gzip Settings
    ##
    gzip on;
    gzip_http_version 1.1;
    gzip_disable      "MSIE [1-6]\.";
    gzip_min_length   1100;
    gzip_vary         on;
    gzip_proxied      expired no-cache no-store private auth;
    gzip_types        text/plain text/css application/json application/javascript application/x-javascript text/xml application/xml application/xml+rss text/javascript;
    gzip_comp_level   9;


    root dist/;

    location ~ ^/(assets|bower_components|scripts|styles|views) {
      expires     31d;
      add_header  Cache-Control public;
    }

    ##
    # Main file index.html
    ##
    location / {
      try_files $uri $uri/ /index.html =404;
    }
  }
}
```

You can look in source file [here](https://github.com/vyakymenko/angular-nginx-config-example/blob/master/ng2-application.conf).

# Reverse Proxy NginX Config Example
```
server {
    listen 80;

    # App Web Adress Listener
    server_name www.example.com example.com;

    location / {
        # Port where we have our daemon `pm2 start app.server.js`
        proxy_pass http://example.com:9000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

# Databases Examples

Example of databases usage in `server`.

# Contributing

Please see the [CONTRIBUTING](https://github.com/vyakymenko/angular-express/blob/master/.github/CONTRIBUTING.md) file for guidelines.

# Changelog

You can follow the [Angular changelog here](https://github.com/angular/angular/blob/master/CHANGELOG.md).

## Contributors

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore -->
<table><tr><td align="center"><a href="https://vyakymenko.com"><img src="https://avatars1.githubusercontent.com/u/7300673?v=4" width="100px;" alt="Valentyn Yakymenko"/><br /><sub><b>Valentyn Yakymenko</b></sub></a><br /><a href="https://github.com/vyakymenko/angular-express/commits?author=vyakymenko" title="Code">💻</a> <a href="https://github.com/vyakymenko/angular-express/commits?author=vyakymenko" title="Documentation">📖</a> <a href="#infra-vyakymenko" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a></td></tr></table>

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!
