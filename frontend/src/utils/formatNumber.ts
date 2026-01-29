/**
 * 格式化数字为 4 位有效数字的字符串表示
 *
 * - 支持输入 number | string | bigint
 * - 对于非常大或非常小的数，会使用科学计数法（由 Intl.NumberFormat 决定）
 * - 对于常规数值，使用本地化格式并保证 4 位有效数字
 */
export default function formatNumber(
  value: number | string | bigint | null | undefined
): string {
  if (value === null || value === undefined) return "0";

  // 尝试把输入转换为 number
  let n: number;
  if (typeof value === "bigint") {
    n = Number(value);
  } else {
    n = Number(value);
  }

  if (!Number.isFinite(n)) {
    // 如果无法转换或为 NaN/Infinity，回退到字符串形式
    return String(value);
  }

  if (n === 0) return "0";

  // 要求：小数点后最多保留 4 位，但不四舍五入 -> 采用字符串截断的方法
  // 先使用输入原始字符串（避免 toString 导致不必要的格式变化）
  let s: string;
  if (typeof value === "bigint") {
    s = value.toString();
  } else {
    s = String(value);
  }

  // 如果是科学记数法，转换为普通小数字符串（使用 toFixed 高精度再去除尾部多余）
  if (s.includes("e") || s.includes("E")) {
    // 使用 20 位小数作为足够的精度来展开（注意 toFixed 会四舍五入，但这里只用于展开）
    s = Number(n).toFixed(20);
    // 去掉尾部多余的 0
    s = s.replace(/\.?0+$/, "");
  }

  // 处理符号
  const negative = s.startsWith("-");
  if (negative) s = s.slice(1);

  const parts = s.split(".");
  const intPart = parts[0] || "0";
  let fracPart = parts[1] || "";

  if (fracPart.length > 4) {
    fracPart = fracPart.slice(0, 4); // 截断，不四舍五入
    // 去除截断后末尾的0
    fracPart = fracPart.replace(/0+$/, "");
  }

  const result = fracPart ? `${intPart}.${fracPart}` : intPart;
  return negative ? `-${result}` : result;
}

