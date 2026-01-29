import { useBalance, useConnection, useWriteContract } from "wagmi";
import { formatUnits } from "viem";
import formatNumber from "../../utils/formatNumber";
import {
  WANGDEX_ABI,
  WANGDEX_ADDRESS,
  WANGTOKEN_ADDRESS,
} from "../../contracts";
import { Button, Col, Row, Statistic } from "antd";
import useTokenBalance from "../../hooks/useTokenBalance";
import EthInDex from "./components/EthInDex";
import TokenInDex from "./components/TokenInDex";

const Dashboard = () => {
  const { address } = useConnection();

  console.log(`Current log: address: `, address);
  const { data: ethBalance } = useBalance({
    address: address,
  });

  const wangTokenBalance = useTokenBalance({
    address: address as `0x${string}`,
    tokenAddress: WANGTOKEN_ADDRESS as `0x${string}`,
  });

  const writeContract = useWriteContract();
  const handleCreateOrder = () => {
    writeContract.mutate({
      address: WANGDEX_ADDRESS,
      abi: WANGDEX_ABI,
      functionName: "createOrder",
      args: [
        WANGTOKEN_ADDRESS,
        WANGTOKEN_ADDRESS,
        BigInt(1000000000000000000),
        BigInt(1000000000000000000),
      ],
    });
  };

  return (
    <Row gutter={12}>
      <Col span={6}>
        <Statistic
          title="ETH Balance"
          loading={!ethBalance?.value}
          value={formatNumber(
            formatUnits(
              ethBalance?.value ?? BigInt(0),
              ethBalance?.decimals ?? 0,
            ),
          )}
        />
      </Col>
      <Col span={6}>
        <Statistic
          title="WangToken Balance"
          loading={wangTokenBalance === undefined}
          value={formatNumber(formatUnits(wangTokenBalance ?? BigInt(0), 18))}
        />
      </Col>

      <EthInDex />

      <TokenInDex />

      <Button type="primary" onClick={handleCreateOrder}>
        Create Order
      </Button>
    </Row>
  );
};

export default Dashboard;
