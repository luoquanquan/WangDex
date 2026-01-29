import { useBalance, useConnection } from "wagmi";
import { formatUnits } from "viem";
import formatNumber from "../../utils/formatNumber";
import { WANGTOKEN_ADDRESS } from "../../contracts";
import useTokenInfo from "../../hooks/useTokenInfo";
import { Col, Row, Statistic } from "antd";

const Dashboard = () => {
  const { address } = useConnection();

  console.log(`Current log: address: `, address);
  const { data: ethBalance } = useBalance({
    address: address,
  });

  const wangTokenBalance = useTokenInfo({
    address: address as `0x${string}`,
    tokenAddress: WANGTOKEN_ADDRESS as `0x${string}`,
  });

  return (
    <Row gutter={12}>
      <Col span={12}>
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
      <Col span={12}>
        <Statistic
          title="WangToken Balance"
          loading={!wangTokenBalance?.balance}
          value={formatNumber(
            formatUnits(
              wangTokenBalance?.balance ?? BigInt(0),
              wangTokenBalance?.decimals ?? 0,
            ),
          )}
        />
      </Col>
    </Row>
  );
};

export default Dashboard;
