import { Layout } from "antd";
import { NavLink } from "react-router-dom";
import "./MainLayout.css";

const { Header, Content, Footer } = Layout;

type Props = {
  children: JSX.Element;
};

const MainLayout = ({ children }: Props) => {
  return (
    <Layout
      style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
    >
      <Header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 1,
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div style={{display:'flex',alignItems:'center'}}>
          <img
            width={"100px"}
            height={"80px"}
            src="https://www.ordermygear.com/wp-content/uploads/2021/09/logo2.svg"
          />
        </div>
        <div style={{ display: "flex", gap: "10px" }}>
          <NavLink
            to="/"
            className={({ isActive }) =>
               isActive ? "active" : "pending"
            }
          >
            Product
          </NavLink>
          <NavLink
            to="/bulk-actions"
            className={({ isActive }) =>
              isActive ? "active" : "pending"
            }
          >
            Bulk Actions
          </NavLink>
        </div>
      </Header>
      <Content
        className="site-layout"
        style={{
          padding: "0 50px",
          marginTop: "20px",
          flexGrow: 1,
          display: "flex",
        }}
      >
        {children}
      </Content>
      <Footer style={{ textAlign: "center" }}>Images Color Detector</Footer>
    </Layout>
  );
};

export default MainLayout;
