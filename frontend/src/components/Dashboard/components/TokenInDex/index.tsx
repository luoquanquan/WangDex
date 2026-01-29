import { Button, Col, Space, Statistic } from "antd";
import useTokenBalanceInDex from "../../../../hooks/useTokenBalanceInDex";
import { useConnection, useReadContract, useWriteContract } from "wagmi";
import {
  WANGDEX_ABI,
  WANGDEX_ADDRESS,
  WANGTOKEN_ABI,
  WANGTOKEN_ADDRESS,
} from "../../../../contracts";
import { formatUnits } from "viem";
import formatNumber from "../../../../utils/formatNumber";

const TokenInDex = () => {
  const { address } = useConnection();

  const ethInDexBalance = useTokenBalanceInDex({
    address: address as `0x${string}`,
    tokenAddress: WANGTOKEN_ADDRESS,
  });

  const { data: allowance }: { data: bigint | undefined } = useReadContract({
    address: WANGTOKEN_ADDRESS,
    abi: WANGTOKEN_ABI,
    functionName: "allowance",
    args: [address, WANGDEX_ADDRESS],
  });

  const writeContract = useWriteContract();
  const handleApprove = () => {
    writeContract.mutate({
      address: WANGTOKEN_ADDRESS,
      abi: WANGTOKEN_ABI,
      functionName: "approve",
      args: [WANGDEX_ADDRESS, BigInt(1000000000000000000)],
    });
  };

  const handleDepositToken = () => {
    writeContract.mutate({
      address: WANGDEX_ADDRESS,
      abi: WANGDEX_ABI,
      functionName: "depositToken",
      args: [WANGTOKEN_ADDRESS, BigInt(1000000000000000000)],
    });
  };

  const handleWithdrawToken = () => {
    writeContract.mutate({
      address: WANGDEX_ADDRESS,
      abi: WANGDEX_ABI,
      functionName: "withdrawToken",
      args: [WANGTOKEN_ADDRESS, BigInt(1000000000000000000)],
    });
  };

  return (
    <Col span={6}>
      <Statistic
        title="WangToken in Dex Balance"
        loading={ethInDexBalance === undefined}
        value={formatNumber(formatUnits(ethInDexBalance ?? BigInt(0), 18))}
      />
      <Space>
        {BigInt(allowance ?? 0) < BigInt(1000000000000000000) ? (
          <Button
            style={{ marginTop: 16 }}
            type="primary"
            onClick={handleApprove}
          >
            Approve
          </Button>
        ) : (
          <Button
            style={{ marginTop: 16 }}
            type="primary"
            onClick={handleDepositToken}
          >
            Deposit
          </Button>
        )}

        <Button
          style={{ marginTop: 16 }}
          type="primary"
          onClick={handleWithdrawToken}
        >
          Withdraw
        </Button>
      </Space>
    </Col>
  );
};

export default TokenInDex;
