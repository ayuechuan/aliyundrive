import { observer } from "mobx-react-lite";
import { ExplorerDetailSourceList, menus } from "../../../components/explorerDetailSource/explorerDetailSourceList";
import './list.less';
import { useBackupStore } from "../../backup.store";
import { ColumnsType } from "antd/es/table";
import dayjs from 'dayjs';
import { FileFeature } from "../../../../utils/file";
import { Items } from "../../backup.model";
import { Modal } from "antd";
import { CloseOutlined } from '@ant-design/icons';
import { CreateFile } from "./components/createFile";
import { ExplorerDataSourceGrid } from "../../../components/explorerDetailSource/explorerDataSourceGrid";
import { TimeSerivce } from "../../../../utils/time.service";

export const List = observer(() => {
  const store = useBackupStore();

  //  右键列表的点击回调
  function onRightMenuClick(key: string | number, item: Items, i: number): void {
    switch (key) {
      case 'createFile':
        //  创建文件
        createFile(
          item.name || `新建文件夹( ${store.dataSource.length + 1} )`,
          (newFileName: string) => {
            store.createSource(new Items({ name: newFileName }));
            return Promise.resolve(true);
          });
        break;
      case 'refresh':
        store.refresh();
        break;
      default:
        break;
    }
  }
  return (
    <div className="backup-list">
      {store.viewType === 'table' ? (
        <ExplorerDetailSourceList
          id="backup-table-main"
          loading={store.loading}
          rowKey={(recode) => recode.file_id}
          onRightMenuClick={(key, item, i) => onRightMenuClick(key, item, i)}
          onClickBlank={() => void store.clearSelectKeys()}
          columns={columns}
          dataSource={store.dataSource}
          rightContextMenu={menus}
          rowSelection={{
            onChange: store.onChange.bind(store),
            selectedRowKeys: store.selectedRowKeys,
          }}
          pagination={false}
          onClickRow={(record: Items, i) => {
            console.log('点击行', record, i);
            //  exexample
            if(record.type === 'folder'){
              /**
               * 文件夹 ( 进入文件夹 )
               * 1.更新面包屑
               * 2.刷新列表
               */
              store.breadcrumb.sliceBreadcrumbs(record);
            }

          }}
        />
      ) : store.viewType === 'grid' ? (
        <ExplorerDataSourceGrid
          dataSource={store.dataSource}
          loading={store.loading}
          onContextMenu={onRightMenuClick as any}
          onClick={() => { }}
        />
      ) : null
      }
    </div>)
});

function createFile(name: string, callback?: (v: string) => Promise<boolean>): void {
  let tempName = name;

  function onChange(value: string): void {
    modal.update({
      okButtonProps: { disabled: name === value }
    });
    tempName = value;
  }

  const modal = Modal.confirm({
    icon: null,
    closable: true,
    closeIcon: <CloseOutlined />,
    className: 'create-file',
    content: <CreateFile title={name} onChange={onChange} />,
    okText: '确定',
    title: '新建文件夹',
    width: 340,
    cancelText: null,
    onOk: () => callback?.(tempName),
    cancelButtonProps: {
      style: {
        display: 'none'
      }
    },
    okButtonProps: {
      style: {
        background: 'rgb(99,125,255)'
      }
    }
  })

}

const columns: ColumnsType<Record<string, any>> = [
  {
    title: '名称',
    dataIndex: 'name',
    key: 'name',
    // width: '40%',
    render: (text, record, index) => {
      return (
        <div className="name" style={{ display: 'flex', alignItems: 'center' }}>
          <img
            style={{ width: 28, height: 28, marginRight: 20 }}
            src="https://img.alicdn.com/imgextra/i1/O1CN01rGJZac1Zn37NL70IT_!!6000000003238-2-tps-230-180.png"
            alt=""
          />
          <div className="text">{text}</div>
        </div>
      )
    }
  },
  {
    title: '修改时间',
    dataIndex: 'updated_at',
    key: 'updated_at',
    width: '20%',
    render: (text, record, index) => {
      return (
        <span style={{ color: 'rgba(37,38,43,0.72)', fontSize: 12 }}>
          {TimeSerivce.transform(record.updated_at) || dayjs().to(dayjs(record.updated_at))}
        </span>
      )
    }
  },
  {
    title: '大小',
    dataIndex: 'size',
    key: 'size',
    width: '20%',
    render: (text, record, index) => {
      return (
        <span style={{ color: 'rgba(37,38,43,0.72)', fontSize: 12 }}>
          {record?.size ? FileFeature.sizeToString(record.size) : ''}
        </span>
      )
    }
  }
]
