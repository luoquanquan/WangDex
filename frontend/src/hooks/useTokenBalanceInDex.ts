import { useReadContracts } from "wagmi";
import { WANGDEX_ABI, WANGDEX_ADDRESS } from "../contracts";

const useTokenBalanceInDex = ({
  address,
  tokenAddress,
}: {
  address: `0x${string}`;
  tokenAddress: `0x${string}`;
}) => {
  const {data} = useReadContracts({
    contracts: [
      {
        address: WANGDEX_ADDRESS as `0x${string}`,
        abi: WANGDEX_ABI,
        functionName: 'balancesOf',
        args: [address, tokenAddress],
      },
    ],
  });
  const balance = (data?.[0]?.status === "success") ? data[0].result as bigint : undefined;

  return balance;
};

export default useTokenBalanceInDex;