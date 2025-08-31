import fs from "fs-extra";
import path from "path";
import matter from "gray-matter";
import { Stconfig } from "../config/stconfig";
import { getImgPath } from "./path/pathStaticimg";
import { readdir, readFile, stat } from "fs/promises";
/**
 * 获取某文件夹下的文件目录
 * @param {string} dirPath - 文件夹路径
 * @param {boolean} [includeDirs=false] - 是否包含子目录
 * @param {boolean} [includeFiles=true] - 是否包含文件
 * @returns {Promise<string[]>} 文件/目录路径数组
 */
async function getDirectoryFiles(dirPath) {
  try {
    // 检查路径是否存在
    await fs.access(dirPath);

    // 获取路径信息
    const stat = await fs.stat(dirPath);
    if (!stat.isDirectory()) {
      throw new Error(`${dirPath} 不是一个有效的目录`);
    }

    // 获取当前目录下的所有项目
    const items = await fs.readdir(dirPath);

    // 创建当前目录的节点
    const dirNode = {
      name: path.basename(dirPath),
      path: path.resolve(dirPath),
      isDirectory: true,
      children: [],
    };

    // 处理每个项目
    for (const item of items) {
      const itemPath = path.join(dirPath, item);
      const itemStat = await fs.stat(itemPath);

      if (itemStat.isDirectory()) {
        // 如果是目录，递归处理
        const subDirNode = await getDirectoryFiles(itemPath);
        dirNode.children.push(subDirNode);
      } else {
        // 如果是文件，直接创建文件节点
        dirNode.children.push({
          name: item,
          path: path.resolve(itemPath),
          isDirectory: false,
          size: itemStat.size, // 文件大小（字节）
          mtime: itemStat.mtime, // 最后修改时间
        });
      }
    }

    return dirNode;
  } catch (err) {
    console.error(`获取目录结构失败 ${dirPath}:`, err.message);
    throw err;
  }
}

/**
 * 获取某文件的文本内容
 * @param {string} filePath - 文件路径
 * @param {string} [encoding='utf8'] - 编码格式
 * @returns {Promise<string>} 文件内容
 */
async function getFileContent(filePath, encoding = "utf8") {
  try {
    // 检查路径是否存在
    await fs.access(filePath);

    // 检查是否为文件
    const stat = await fs.stat(filePath);
    if (!stat.isFile()) {
      throw new Error(`${filePath} 不是一个有效的文件`);
    }

    const filesourcedata = await fs.readFile(filePath, encoding);
    const parsed = matter(filesourcedata);
    return {
      mdHead: parsed.data,
      mdContent: parsed.content,
    };
  } catch (err) {
    console.error(`获取文件内容失败 ${filePath}:`, err.message);
    return 0;
    // throw err;
  }
}

/**
 * 创建文件夹
 * @param {string} dirPath - 文件夹路径
 * @param {boolean} [recursive=true] - 是否递归创建父目录
 * @returns {Promise<void>}
 */
async function createDirectory(dirPath, recursive = true) {
  try {
    // 记录操作前的路径是否存在
    const existedBefore = await fs.pathExists(dirPath);

    // 确保目录存在
    await fs.ensureDir(dirPath, { recursive });

    console.log(`文件夹创建成功: ${dirPath}`);

    // 返回成功信息对象
    return {
      success: true,
      dirPath: dirPath,
      recursive: recursive,
      existedBefore: existedBefore, // 操作前目录是否已存在
      message: existedBefore
        ? `文件夹已存在: ${dirPath}`
        : `文件夹已创建: ${dirPath}`,
      timestamp: new Date(),
    };
  } catch (err) {
    console.error(`创建文件夹失败 ${dirPath}:`, err.message);
    throw err;
  }
}

/**
 * 创建文件
 * @param {string} filePath - 文件路径
 * @param {string} [content=''] - 文件内容
 * @param {boolean} [overwrite=false] - 是否覆盖已存在的文件
 * @returns {Promise<void>}
 */
async function createFile(filePath, content = "", overwrite = false) {
  try {
    // 检查文件是否已存在
    const exists = await fs.pathExists(filePath);
    if (exists && !overwrite) {
      throw new Error(`文件已存在: ${filePath}`);
    }

    // 确保目录存在
    await fs.ensureDir(path.dirname(filePath));

    // 写入文件
    await fs.writeFile(filePath, content);
    console.log(`文件创建成功: ${filePath}`);

    return {
      success: true,
      timestamp: new Date(),
    };
  } catch (err) {
    console.error(`创建文件失败 ${filePath}:`, err.message);
    throw err;
  }
}

/**
 * 文件夹重命名
 * @param {string} oldPath - 原文件夹路径
 * @param {string} newPath - 新文件夹路径
 * @returns {Promise<void>}
 */
async function renameDirectory(oldPath, newPath) {
  try {
    // 检查原路径是否存在且是目录
    await fs.access(oldPath);
    const oldStat = await fs.stat(oldPath);
    if (!oldStat.isDirectory()) {
      throw new Error(`${oldPath} 不是一个有效的目录`);
    }

    // 检查新路径是否已存在
    const newPathExists = await fs.pathExists(newPath);
    if (newPathExists) {
      throw new Error(`新路径已存在: ${newPath}`);
    }

    // 确保新路径的父目录存在
    await fs.ensureDir(path.dirname(newPath));

    await fs.rename(oldPath, newPath);
    console.log(`文件夹重命名成功: ${oldPath} -> ${newPath}`);

    return {
      success: true,
      timestamp: new Date(),
    };
  } catch (err) {
    console.error(`文件夹重命名失败 ${oldPath} -> ${newPath}:`, err.message);
    throw err;
  }
}

/**
 * 文件重命名
 * @param {string} oldPath - 原文件路径
 * @param {string} newPath - 新文件路径
 * @returns {Promise<void>}
 */
async function renameFile(oldPath, newPath) {
  try {
    // 检查原路径是否存在且是文件
    await fs.access(oldPath);
    const oldStat = await fs.stat(oldPath);
    if (!oldStat.isFile()) {
      throw new Error(`${oldPath} 不是一个有效的文件`);
    }

    // 检查新路径是否已存在
    const newPathExists = await fs.pathExists(newPath);
    if (newPathExists) {
      throw new Error(`新路径已存在: ${newPath}`);
    }

    // 确保新路径的父目录存在
    await fs.ensureDir(path.dirname(newPath));

    await fs.rename(oldPath, newPath);
    console.log(`文件重命名成功: ${oldPath} -> ${newPath}`);

    return {
      success: true,
      timestamp: new Date(),
    };
  } catch (err) {
    console.error(`文件重命名失败 ${oldPath} -> ${newPath}:`, err.message);
    throw err;
  }
}

/**
 * 删除文件夹及其下所有文件
 * @param {string} dirPath - 文件夹路径
 * @returns {Promise<void>}
 */
async function deleteDirectory(dirPath) {
  try {
    // 检查路径是否存在
    await fs.access(dirPath);

    // 检查是否为目录
    const stat = await fs.stat(dirPath);
    if (!stat.isDirectory()) {
      throw new Error(`${dirPath} 不是一个有效的目录`);
    }

    await fs.remove(dirPath);
    console.log(`文件夹及其内容删除成功: ${dirPath}`);

    return {
      success: true,
      timestamp: new Date(),
    };
  } catch (err) {
    console.error(`删除文件夹失败 ${dirPath}:`, err.message);
    throw err;
  }
}

/**
 * 删除文件
 * @param {string} filePath - 文件路径
 * @returns {Promise<void>}
 */
async function deleteFile(filePath) {
  try {
    // 检查路径是否存在
    await fs.access(filePath);

    // 检查是否为文件
    const stat = await fs.stat(filePath);
    if (!stat.isFile()) {
      throw new Error(`${filePath} 不是一个有效的文件`);
    }

    await fs.unlink(filePath);
    console.log(`文件删除成功: ${filePath}`);

    return {
      success: true,
      timestamp: new Date(),
    };
  } catch (err) {
    console.error(`删除文件失败 ${filePath}:`, err.message);
    throw err;
  }
}

/**
 * 覆盖文件内容（若文件不存在则创建）
 * @param {string} filePath - 文件路径
 * @param {string} content - 要写入的内容
 * @param {string} [encoding='utf8'] - 编码格式
 * @returns {Promise<{success: boolean, filePath: string, message: string}>} 操作结果
 */
async function overwriteFileContent(
  filePath,
  content,
  meta,
  encoding = "utf8"
) {
  try {
    // 确保目录存在
    const dirPath = require("path").dirname(filePath);
    await fs.ensureDir(dirPath);

    const md = matter.stringify(content, meta);

    // 写入文件（覆盖模式）
    await fs.writeFile(filePath, md, encoding);

    return {
      success: true,
      filePath: filePath,
      message: `文件内容已成功覆盖: ${filePath}`,
    };
  } catch (err) {
    console.error(`覆盖文件内容失败 ${filePath}:`, err.message);
    throw err;
  }
}

/**
 * md图片上传
 * @param {string} [content=''] - 文件内容
 * @param {string} [imgtype='image/png'] - 文件类型
 * @returns {Promise<void>}
 */
async function uploadImg(
  content = "",
  imgtype = "image/png",
  overwrite = false
) {
  try {
    const fileType = imgtype.split("/")[1];
    const baseImgPath = getImgPath();
    const imgName = Date.now() + "." + fileType;
    const filePath = path.join(baseImgPath, imgName);
    // 检查文件是否已存在
    const exists = await fs.pathExists(filePath);
    if (exists && !overwrite) {
      throw new Error(`文件已存在: ${filePath}`);
    }

    // 确保目录存在
    await fs.ensureDir(path.dirname(filePath));

    // 写入文件
    await fs.writeFile(filePath, content);
    console.log(`文件创建成功: ${filePath}`);

    return {
      success: true,
      url: "http://127.0.0.1:" + Stconfig.staticImgPort + "/" + imgName,
      timestamp: new Date(),
    };
  } catch (err) {
    console.error(`创建文件失败 ${filePath}:`, err.message);
    throw err;
  }
}

/**
 * 递归读取文件夹中所有文件的文本内容
 * @param {string} dirPath - 文件夹路径
 * @param {string} encoding - 文件编码（默认 'utf8'）
 * @returns {Promise<Array<{path: string, content: string}>>} 文件路径和内容的数组
 */
async function readAllFilesContent(dirPath, encoding = "utf8") {
  const result = [];
  try {
    // 读取文件夹中的所有条目
    const entries = await readdir(dirPath, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(dirPath, entry.name);

      // 检查是否为文件夹
      if (entry.isDirectory()) {
        // 递归处理子文件夹
        const subDirResults = await readAllFilesContent(fullPath, encoding);
        result.push(...subDirResults);
      } else if (entry.isFile()) {
        // 读取文件内容
        try {
          const content = await readFile(fullPath, encoding);
          result.push({
            path: fullPath, // 文件完整路径
            content: content, // 文件文本内容
          });
        } catch (err) {
          console.error(`读取文件失败: ${fullPath}`, err.message);
        }
      }
    }
  } catch (err) {
    console.error(`读取文件夹失败: ${dirPath}`, err.message);
  }

  return result;
}

export {
  getDirectoryFiles,
  getFileContent,
  createDirectory,
  createFile,
  deleteFile,
  renameDirectory,
  renameFile,
  deleteDirectory,
  overwriteFileContent,
  uploadImg,
  readAllFilesContent,
};
