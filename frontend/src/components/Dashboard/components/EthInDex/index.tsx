import { Button, Col, Space, Statistic } from "antd";
import useTokenBalanceInDex from "../../../../hooks/useTokenBalanceInDex";
import { useConnection, useWriteContract } from "wagmi";
import {
  NATIVE_TOKEN_ADDRESS,
  WANGDEX_ABI,
  WANGDEX_ADDRESS,
} from "../../../../contracts";
import { formatUnits } from "viem";
import formatNumber from "../../../../utils/formatNumber";

const EthInDex = () => {
  const { address } = useConnection();

  const ethInDexBalance = useTokenBalanceInDex({
    address: address as `0x${string}`,
    tokenAddress: NATIVE_TOKEN_ADDRESS,
  });

  const writeContract = useWriteContract();
  const handleDepositNative = () => {
    writeContract.mutate({
      address: WANGDEX_ADDRESS as `0x${string}`,
      abi: WANGDEX_ABI,
      functionName: "depositNative",
      value: BigInt(1000000000000000000),
    });
  };

  const handleWithdrawNative = () => {
    writeContract.mutate({
      address: WANGDEX_ADDRESS as `0x${string}`,
      abi: WANGDEX_ABI,
      functionName: "withdrawNative",
      args: [BigInt(1000000000000000000)],
    });
  };

  return (
    <Col span={6}>
      <Statistic
        title="ETH in Dex Balance"
        loading={ethInDexBalance === undefined}
        value={formatNumber(formatUnits(ethInDexBalance ?? BigInt(0), 18))}
      />
      <Space>
        <Button
          style={{ marginTop: 16 }}
          type="primary"
          onClick={handleDepositNative}
        >
          Deposit
        </Button>

        <Button
          style={{ marginTop: 16 }}
          type="primary"
          onClick={handleWithdrawNative}
        >
          Withdraw
        </Button>
      </Space>
    </Col>
  );
};

export default EthInDex;
