#!/usr/bin/env bash

set -euo pipefail

# 简化版部署脚本：
# - 从 .env 中读取 RPC_URL / PRIVATE_KEY（若存在）
# - 部署 WangToken 与 WangDex，并写入前端地址

# 从 .env 读取变量（仅当当前环境中未设置时）
if [[ -f ".env" ]]; then
  # 过滤掉注释和空行，只处理 RPC_URL / PRIVATE_KEY
  while IFS='=' read -r key value; do
    case "$key" in
      RPC_URL|PRIVATE_KEY)
        if [[ -z "${!key:-}" ]]; then
          export "$key"="$value"
        fi
        ;;
    esac
  done < <(grep -v '^#' .env | sed '/^[[:space:]]*$/d')
fi

if [[ -z "${RPC_URL:-}" || -z "${PRIVATE_KEY:-}" ]]; then
  echo "错误: 请在环境变量或 .env 中配置 RPC_URL 和 PRIVATE_KEY"
  exit 1
fi

echo "使用 RPC_URL=${RPC_URL}"
echo "开始部署 WangToken 与 WangDex..."

forge script script/WangToken.s.sol:WangTokenScript \
  --rpc-url "${RPC_URL}" \
  --private-key "${PRIVATE_KEY}" \
  --broadcast \
  -vv

forge script script/WangDex.s.sol:WangDexScript \
  --rpc-url "${RPC_URL}" \
  --private-key "${PRIVATE_KEY}" \
  --broadcast \
  -vv

echo "部署完成，前端地址文件已更新：frontend/src/contracts/addresses.json"

