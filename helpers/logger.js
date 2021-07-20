const chalk = require('chalk');
const moment = require('moment');

exports.write = (content, type = 'log') => {
    let timestamp = '[' + moment().format('DD-MM-YY H:m:s') + ']:';
    let typeColor = chalk.blue(type);
    switch(type) {
        case 'load': typeColor = chalk.magenta(type); break;
        case 'event': typeColor = chalk.cyan(type); break;
        case 'cmd': typeColor = chalk.gray(type); break;
        case 'ready': typeColor = chalk.green(type); break;
        case 'warn': typeColor = chalk.yellow(type); break;
        case 'error': typeColor = chalk.red(type); break;
        case 'debug': typeColor = chalk.green(type); break;
        case 'log': typeColor = chalk.blue(type); break;
    }

    return console.log(timestamp + ' ' + typeColor + ' ' + content);
}

exports.load = (...args) => this.write(...args, 'load');
exports.event = (...args) => this.write(...args, 'event');
exports.cmd = (...args) => this.write(...args, 'cmd');
exports.ready = (...args) => this.write(...args, 'ready');
exports.error = (...args) => this.write(...args, 'error');
exports.warn = (...args) => this.write(...args, 'warn');
exports.debug = (...args) => this.write(...args, 'debug');
exports.log = (...args) => this.write(...args, 'log');
