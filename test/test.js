// import { webdriver } from "selenium-webdriver";
const webdriver = require("selenium-webdriver");
const driver = new webdriver.Builder()
  // 端口号 "" 是被 ChromeDriver 开启的.
  .usingServer("http://localhost:60889")
  .withCapabilities({
    "goog:chromeOptions": {
      // 这里填您的Electron二进制文件路径。
      binary:
        "F:\\github\\Mygithub\\gitLib\\stLabClude\\electron\\eleForge\\electronCommon\\node_modules\\electron\\dist\\electron.exe",
    },
  })
  .forBrowser("chrome") // note: use .forBrowser('electron') for selenium-webdriver <= 3.6.0
  .build();

driver.get("http://localhost:5173").then(() => {
  driver.getTitle().then((res) => {
    console.log(res);
  });
});
