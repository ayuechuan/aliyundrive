
import { Button, Divider, Dropdown , Space, theme } from 'antd';
import './index.less';
import { useRef } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import React from 'react';

export function Notifcation() {
  const element = useRef<HTMLDivElement>(null);
  const { token } = theme.useToken();

  const contentStyle: React.CSSProperties = {
    backgroundColor: token.colorBgElevated,
    borderRadius: token.borderRadiusLG,
    boxShadow: token.boxShadowSecondary,
    padding : 4,
    minWidth : 156
  };

  const menuStyle: React.CSSProperties = {
    boxShadow: 'none',
  };

  return (
    <Dropdown
      getPopupContainer={() => element.current || document.body}
      trigger={['click']}
      placement='topLeft'
      overlayStyle={{
        minWidth: 52
      }}
      menu={{
        items: [
          { label: '上传文件', key: 1 },
          { label: '上传文件夹', key: 2 },
          { label: '新建文件夹', key: 3 },
        ]
      }}
      dropdownRender={(menu) => {
        return (
          <div style={contentStyle}>
            <div className='group-title'>添加到备份盘</div>
            {React.cloneElement(menu as React.ReactElement, { style: menuStyle })}
          </div>
        )
      }}
    >
      <div className='notifcation-container'>
        <Button>
          <PlusOutlined />
        </Button>
      </div>
    </Dropdown>
  )
}