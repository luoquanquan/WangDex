import { useBalance, useConnection } from "wagmi";
import { formatUnits } from "viem";
import formatNumber from "../../utils/formatNumber";
import { WANGTOKEN_ADDRESS } from "../../contracts";
import { Col, Row, Statistic } from "antd";
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
    </Row>
  );
};

export default Dashboard;
