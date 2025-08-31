const { FusesPlugin } = require("@electron-forge/plugin-fuses");
const { FuseV1Options, FuseVersion } = require("@electron/fuses");
const path = require("node:path");
const packageInfo = require("./package.json");

module.exports = {
  packagerConfig: {
    overwrite: true,
    // name: packageInfo.name,
    asar: true,
    extraResource: path.join(__dirname, "public"),
    icon: path.join(__dirname, "penicon.ico"),
    extraFiles: [
      {
        from: path.join(__dirname, "LICENSE"), // 源文件路径（项目根目录的LICENSE）
        to: "LICENSE", // 目标路径（产物根目录，保持文件名不变）
      },
    ],
  },
  rebuildConfig: {},
  makers: [
    {
      name: "@electron-forge/maker-squirrel",
    },
    {
      name: "@electron-forge/maker-zip",
      platforms: ["darwin"],
      // config: {
      //   iconUrl: path.join(__dirname, "public/icon1"),
      //   setupIcon: path.join(__dirname, "public/icon1"),
      //   icon: path.join(__dirname, "public/icon1"),
      // },
    },
    {
      name: "@electron-forge/maker-deb",
      config: {},
    },
    {
      name: "@electron-forge/maker-rpm",
      // config: {
      //   iconUrl: path.join(__dirname, "public/icon1"),
      //   setupIcon: path.join(__dirname, "public/icon1"),
      //   icon: path.join(__dirname, "public/icon1"),
      // },
    },
  ],
  plugins: [
    {
      name: "@electron-forge/plugin-vite",
      config: {
        // `build` can specify multiple entry builds, which can be Main process, Preload scripts, Worker process, etc.
        // If you are familiar with Vite configuration, it will look really familiar.
        build: [
          {
            // `entry` is just an alias for `build.lib.entry` in the corresponding file of `config`.
            entry: "src/main.js",
            config: "vite.main.config.mjs",
            target: "main",
          },
          {
            entry: "src/preload.js",
            config: "vite.preload.config.mjs",
            target: "preload",
          },
        ],
        renderer: [
          {
            name: "main_window",
            config: "vite.renderer.config.mjs",
          },
        ],
      },
    },
    // Fuses are used to enable/disable various Electron functionality
    // at package time, before code signing the application
    new FusesPlugin({
      version: FuseVersion.V1,
      [FuseV1Options.RunAsNode]: false,
      [FuseV1Options.EnableCookieEncryption]: true,
      [FuseV1Options.EnableNodeOptionsEnvironmentVariable]: false,
      [FuseV1Options.EnableNodeCliInspectArguments]: false,
      [FuseV1Options.EnableEmbeddedAsarIntegrityValidation]: true,
      [FuseV1Options.OnlyLoadAppFromAsar]: true,
    }),
  ],
};
