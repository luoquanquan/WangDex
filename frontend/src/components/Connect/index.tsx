import { Button, Card, Space, Typography } from "antd";
import { useConnect, useConnectors } from "wagmi";

const { Title, Text } = Typography;

const Connect = () => {
  const connectors = useConnectors();
  const { mutate: connect } = useConnect();

  return (
    <Card
      style={{ width: 520, maxWidth: "100%", margin: "0 auto" }}
      title="钱包"
    >
      <Space
        size="middle"
        style={{ width: "100%", display: "flex", flexDirection: "column" }}
      >
        <Title level={4} style={{ margin: 0 }}>
          连接你的钱包
        </Title>
        <Text type="secondary">
          请选择一个钱包连接到 WangDex，开始体验链上资产存取与撮合交易。
        </Text>
        <Space
          style={{ width: "100%", display: "flex", flexDirection: "column" }}
        >
          {connectors.map((connector) => (
            <Button
              key={connector.uid}
              type="primary"
              block
              onClick={() => connect({ connector })}
            >
              使用 {connector.name} 连接
            </Button>
          ))}
        </Space>
      </Space>
    </Card>
  );
};

export default Connect;
