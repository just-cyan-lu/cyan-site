#!/bin/bash
# deploy.sh — 部署 cyan-site 到服务器
# 用法: bash deploy.sh
#
# 依赖:
#   - node (用于运行上传脚本)
#   - npm (用于构建)
#
# 无需 sshpass / rsync，纯 SFTP 上传

set -e

cd ~/github/cyan-site

echo "==> 构建..."
npm run build

echo "==> 上传到服务器..."
node /tmp/ssh2/upload.js

echo ""
echo "✅ 部署完成！访问: http://82.156.156.118/"
