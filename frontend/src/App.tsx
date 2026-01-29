import { Layout, Typography, Button } from "antd";
import { useDisconnect, useConnection } from "wagmi";
import Connect from "./components/Connect";
import Dashboard from "./components/Dashboard";

const { Header, Content, Footer } = Layout;
const { Title, Text } = Typography;

function App() {
  const { isConnected } = useConnection();
  const { mutate: disconnect } = useDisconnect();

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header
        style={{
          background: "#0f172a",
          paddingInline: 24,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Title level={3} style={{ color: "#fff", margin: 0 }}>
          WangDex · 加密资产交易所
        </Title>

        {isConnected ? (
          <Button size="small" onClick={() => disconnect()}>
            断开连接
          </Button>
        ) : null}
      </Header>
      <Content style={{ padding: 24 }}>
        {!isConnected ? <Connect /> : <Dashboard />}
      </Content>
      <Footer style={{ textAlign: "center", fontSize: 12 }}>
        <Text type="secondary">
          连接钱包后, 你可以在 WangDex 上存取款、挂单、撮合交易,
          开始你的交易之旅吧 ~
        </Text>
      </Footer>
    </Layout>
  );
}

export default App;
