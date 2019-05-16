# Introduction

[![MIT license](http://img.shields.io/badge/license-MIT-brightgreen.svg)](http://opensource.org/licenses/MIT)
[![CircleCI](https://circleci.com/gh/vyakymenko/angular-express.svg?style=svg)](https://circleci.com/gh/vyakymenko/angular-express)
[![Build Status](https://travis-ci.org/vyakymenko/angular-express.svg?branch=master)](https://travis-ci.org/vyakymenko/angular-express)
[![dependencies Status](https://david-dm.org/vyakymenko/angular-express/status.svg)](https://david-dm.org/vyakymenko/angular-express)
[![devDependencies Status](https://david-dm.org/vyakymenko/angular-express/dev-status.svg)](https://david-dm.org/vyakymenko/angular-express?type=dev)

Modular starter project for Angular 2 (and beyond) with Angular CLI and Express

**Want to have comfortable full-stack Angular development with Express? If _YES_ then, welcome to Angular Express!**

`angular-express` provides the following features:
- Allows you to painlessly update of already existing project.
- Official Angular CLI features support.
- Ready to go, statically typed build system for working with TypeScript.
- Production and development builds.
- (TODO) End-to-end tests with Cypress.
- Express Server
- (TODO) Provides full Docker support for both development and production environment
- Following the [best practices](https://angular.io/guide/styleguide).
- [Express](https://expressjs.com/) Express Node.js server for production/development build API.
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

# run Redis
$ src/redis-server
# stop Redis
$ src/redis-cli
$ shutdown SAVE

# run server in daemon mode
$ npm run run.prod
```

For Angular development information and wiki, look here:

- Official [Angular Docs](https://angular.io/docs)

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

# Redis Download/Install

 - About [Redis](http://redis.io/).
 - [Download](http://redis.io/download#download) and [install](http://redis.io/download#installation) latest stable version of Redis.
 - [Documentation](http://redis.io/documentation) about Redis.

# Redis Start

After installation we need to start our server:
```sh
# start server
$ src/redis-server
```

# Redis More Settings + Daemonize

 - Redis [Persistence](http://redis.io/topics/quickstart#redis-persistence)
 - Redis [More Properties](http://redis.io/topics/quickstart#installing-redis-more-properly)

# MongoDB

 - In progress

# MySQL

 - In progress

# Change Log

You can follow the [Angular change log here](https://github.com/angular/angular/blob/master/CHANGELOG.md).

# License

MIT
