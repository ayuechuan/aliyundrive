import { Checkbox, Tabs } from "antd";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react"
import { useBackupStore } from "../../backup.store";
import { Sort, SortComponent } from "./components/sort";
import './tools.less';
import { AppstoreOutlined, MenuOutlined } from '@ant-design/icons';

export const Tools = observer(() => {
  const store = useBackupStore();
  return (
    <div className="tools-main">
      <div className="left">
        <Checkbox
          onChange={() => store.checkboxChange()}
          checked={store.checked}
          indeterminate={store.indeterminate}
        />
        <span>{store.total > 0 ? `已选${store.total}项` : `共${store.dataSource.length}项`}</span>
      </div>
      <div className="right">
        <SortComponent />
        <div
          className="view-format"
          onClick={() => store.checkView()}
        >
          {store.viewType === 'table' ? <AppstoreOutlined /> : <MenuOutlined />}
        </div>
      </div>
    </div>
  )
});