import { Menu } from "antd";
import { FC, PropsWithChildren } from "react";
import { PieChartOutlined, } from '@ant-design/icons';
import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import { ItemType, MenuItemType } from "antd/lib/menu/hooks/useItems";
import { useMount } from "ahooks";
import { NavSubTab } from "../components/navSubTab";

const fileMenus: ItemType<MenuItemType>[] = [
  { key: '/file/backup', label: '备份盘' },
  { key: '/file/resource', label: '资源库', }
];

export const WithBackupslider: FC<PropsWithChildren> = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useMount(() => {
    const { pathname } = location;
    if (pathname === '/file') {
      navigate('/file/backup', { replace: true });
    }
  });

  return (
    <div style={{ display: 'flex', height: '100%' }}>
      <div style={{
        borderRight: '1px solid rgba(132,133,141,.2)',
        borderLeft: '1px solid rgba(132,133,141,.2)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'
      }}>
        <Menu
          style={{
            width: 170,
            paddingTop: 14,
            borderInlineEnd: 'none'
          }}
          selectedKeys={[location.pathname]}
          mode="inline"
          onClick={(event) => void navigate(event.key)}
          items={fileMenus}
        />
        <div><NavSubTab /></div>
      </div>
      <Outlet />
    </div>
  )
}