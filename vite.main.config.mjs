import { defineConfig } from "vite";

// https://vitejs.dev/config
export default defineConfig({
  publicDir: {
    src: "public",
    // 排除 .git 文件夹及 Git 相关文件
    // exclude: [".git", ".gitignore", ".gitattributes", ".github"],
    exclude: [
      // 排除所有层级的 .git 文件夹（及其内容）
      "**/.git/**/*",
      // 排除所有层级的 .gitignore 文件
      "**/.gitignore",
      // 排除所有层级的 .gitattributes 文件
      "**/.gitattributes",
      // 排除所有层级的 .github 文件夹（及其内容）
      "**/.github/**/*",
    ],
  },
  build: {
    sourcemap: process.env.NODE_ENV === "production", // 仅生产环境生成完整 Source Map
  },
});
