#!/usr/bin/env node

const packager = require('electron-packager');
const path = require('path');
const rimraf = require('rimraf');

deleteOutputFolder()
    .then(getInstallerConfig)
    .then(packager)
    .catch((error) => {
        console.error(error.message || error);
        process.exit(1)
    });

function getInstallerConfig() {
    const rootPath = path.join(__dirname, '..');
    const outPath = path.join(rootPath, 'out');

    return Promise.resolve({
        dir: rootPath,
        overwrite: true,
        asar: true,
        platform: 'win32',
        out: outPath,
        icon: path.join(rootPath, 'build', 'favicon.ico'),
    })
}

function deleteOutputFolder() {
    return new Promise((resolve, reject) => {
        rimraf(path.join(__dirname, '..', 'out'), (error) => {
            error ? reject(error) : resolve()
        })
    })
}
