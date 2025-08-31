export function checkAimPath() {
  const filename = localStorage.getItem("gitFile");
  return filename;
}

export async function updataGitFile() {
  const filename = localStorage.getItem("gitFile");
  const basePath = await window.electronAPI.getsystemInfo();
  const data = JSON.parse(basePath.more.value);

  const aimpath = data.baseFilePath + "/" + filename;
  const hasaimpath = await window.electronAPI.checkSynPath(aimpath);
  if (!hasaimpath) {
    const shpath = data.baseFilePath + "\\" + "init.sh";
    const result = await window.electronAPI.initSynFile({
      baseFilePath: data.baseFilePath,
      shpath,
    });
    return result;
  } else {
    const shpath = data.baseFilePath + "\\" + filename + "\\" + "deploy.sh";
    const result = await window.electronAPI.initSynFile({
      baseFilePath: data.baseFilePath + "\\" + filename,
      shpath,
    });
    return result;
  }
}

/**
 * 从字符串中提取指定key的值（格式为key=value）
 * @param {string} str - 原始字符串
 * @param {string} key - 要提取的键名
 * @returns {string|null} - 提取到的值，若未找到则返回null
 */
export function getValueByKey(str, key) {
  // 构建正则表达式，匹配 "key=值" 格式（值可以包含除空格和&之外的字符）
  const regex = new RegExp(`${key}=([^&\\s]+)`);
  const match = str.match(regex);

  // 如果匹配成功，返回捕获组中的值（索引1），否则返回null
  return match ? match[1] : null;
}
