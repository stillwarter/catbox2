const electron = require('electron');
const path = require('path');

console.log('Electron 版本:', electron);
console.log('Electron 安装路径:', path.dirname(require.resolve('electron')));