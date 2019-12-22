#!/usr/bin/env node

var currentNodeVersion = process.versions.node;
var semver = currentNodeVersion.split('.');
var major = semver[0];

if (major < 8) {
    console.error('For using this CLI you need Node 8 or higher');
    process.exit(1);
}

require('./reactCli');