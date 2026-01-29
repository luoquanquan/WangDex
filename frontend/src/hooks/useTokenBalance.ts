import { useReadContract } from "wagmi";
import { WANGTOKEN_ABI } from "../contracts/index";

const useTokenBalance = ({
  address,
  tokenAddress,
}: {
  address: `0x${string}`;
  tokenAddress: `0x${string}`;
}): bigint | undefined => {
  const result = useReadContract({
    address: tokenAddress,
    abi: WANGTOKEN_ABI,
    functionName: 'balanceOf',
    args: [address],
  });

  return result.data as bigint | undefined;
};

export default useTokenBalance;