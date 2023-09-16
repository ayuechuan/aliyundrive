import { Outlet, useLocation, useNavigate } from "react-router-dom";
import {
  FolderOutlined,
  AppstoreOutlined,
  FileImageOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Breadcrumb, Layout as AntdLayout, Menu, theme } from 'antd';
import { useMemo, useState } from "react";
import './layout.less';
import { useMount } from "ahooks";
import { Advertisement } from "../advertisement";

const { Header, Content, Footer, Sider } = AntdLayout;

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem('', '/file', <FolderOutlined />),
  getItem('', '/album', <FileImageOutlined />),
  getItem('', '/application', <AppstoreOutlined />),
];

export function Layout() {
  const [collapsed, setCollapsed] = useState(true);
  const { token: { colorBgContainer }, } = theme.useToken();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const selectedKeys = useMemo(() => pathname.match(/^(\/[^/]+)/)![1], [pathname]);

  return (
    <div className="layout-container">
      <Advertisement />
      <AntdLayout className="main-root">
        <Sider
          style={{ background: colorBgContainer }}
          collapsible={false}
          collapsed
          onCollapse={(value) => setCollapsed(value)}
        >
          <div className="demo-logo-vertical" />
          <div className="logo-main">
            <img
              className="logo"
              src="https://img.alicdn.com/imgextra/i2/O1CN011vHpiQ251TseXpbH7_!!6000000007466-2-tps-120-120.png"
            />
          </div>
          <Menu
            selectedKeys={[selectedKeys]}
            onClick={(event) => navigate(event.key)}
            className="nav-tab"
            mode="inline"
            items={items} />
        </Sider>
        <AntdLayout style={{ background: colorBgContainer, overflow: 'hidden' }}>
          <Content style={{ margin: '0 16px', background: colorBgContainer }}>
            <Outlet />
          </Content>
        </AntdLayout>
      </AntdLayout>
    </div>
  );
}





