#!/bin/bash 

# 启用错误追踪（遇到错误立即退出）

echo "初始化同步文件夹..."

# 执行git clone并检查结果
git clone git@github.com:stillwarter/catbox-note.git

echo "自动同步结束"
exit 0  # 全部成功
