const fs = require('fs');
const path = require('path');

const [, , contractName, contractAddress] = process.argv;

if (!contractName || !contractAddress) {
  console.error('Usage: node scripts/update-addresses.cjs <ContractName> <Address>');
  process.exit(1);
}

const rootDir = path.join(__dirname, '..'); // 项目根目录
const frontendContractsDir = path.join(rootDir, 'frontend', 'src', 'contracts');
const addressesJsonPath = path.join(frontendContractsDir, 'addresses.json');

// 确保目录存在
fs.mkdirSync(frontendContractsDir, { recursive: true });

// 读取已有映射
let data = {};
if (fs.existsSync(addressesJsonPath)) {
  try {
    data = JSON.parse(fs.readFileSync(addressesJsonPath, 'utf8'));
  } catch (e) {
    console.warn('Failed to parse existing addresses.json, overwriting.');
  }
}

data[contractName] = contractAddress;

fs.writeFileSync(addressesJsonPath, JSON.stringify(data, null, 2), 'utf8');

console.log(`Updated frontend contract address: ${contractName} -> ${contractAddress}`);
// 尝试同步 ABI（来自 Foundry 的 out/ 构建输出）
try {
  const artifactPath = path.join(rootDir, 'out', `${contractName}.sol`, `${contractName}.json`);
  if (fs.existsSync(artifactPath)) {
    const artifact = JSON.parse(fs.readFileSync(artifactPath, 'utf8'));
    const abiDir = path.join(frontendContractsDir, 'abis');
    fs.mkdirSync(abiDir, { recursive: true });
    const abiPath = path.join(abiDir, `${contractName}.json`);
    fs.writeFileSync(abiPath, JSON.stringify(artifact.abi, null, 2), 'utf8');
    console.log(`Wrote ABI to ${abiPath}`);
  } else {
    console.warn(`Artifact not found at ${artifactPath}, skipping ABI sync.`);
  }
} catch (e) {
  console.warn('Failed to sync ABI:', e.message || e);
}
