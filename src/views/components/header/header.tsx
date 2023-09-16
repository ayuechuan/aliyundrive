import { Input, Menu, Modal } from 'antd';
import './header.less';
import { SearchOutlined, PictureOutlined, VideoCameraAddOutlined } from '@ant-design/icons';
import { useRef } from 'react';
import { useBoolean } from 'ahooks';
import { Breadcrumbs } from '../../backup/components/breadcrumds/breadcrumb';

export function Header() {

  const element = useRef<HTMLDivElement>(null);
  const [open, { toggle }] = useBoolean();

  return (
    <div className="header">
      <div className="left">
        <div className="title"><Breadcrumbs /></div>
        <div className="container"></div>
      </div>
      <div className="right" ref={element} onClick={() => toggle()}>
        <Input
          placeholder='搜索云盘内文件'
          prefix={<SearchOutlined style={{ opacity: 0.4 }}
          />}
        />
      </div>
      <Modal
        className='search-container'
        title={
          <Input
            bordered={false}
            autoFocus
            size='large'
            style={{ fontSize: 18 }}
            placeholder='搜索文件'
          />}
        getContainer={() => element.current!}
        open={open}
        onCancel={() => toggle()}
        footer={false}
        width={620}
        destroyOnClose
        maskStyle={{ backgroundColor: 'transparent' }}
      >
        <div>
          <Menu
            mode="inline"
            style={{
              borderInlineEnd: 'none'
            }}
            items={[
              {
                key: 'copy',
                icon: <PictureOutlined />,
                label: '图片'
              },
              {
                key: 'share',
                label: '视频',
                icon: <VideoCameraAddOutlined />,
              }
            ]}
          />
        </div>
        <div className='search-hint'>
          输入冒号快速指定文件类型，例如
          <div className="filter-item">图片：</div>
          <div className="filter-item">文件夹：</div>
        </div>
      </Modal>
    </div>
  )
}