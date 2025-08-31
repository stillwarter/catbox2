// 导入 package.json
const packageInfo = require("./package.json");

// 使用 package.json 中的信息
console.log("项目名称:", packageInfo.name);
console.log("版本号:", packageInfo.version);
console.log("作者:", packageInfo.author);
console.log("依赖项:", packageInfo.dependencies);
