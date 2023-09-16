import { Dropdown } from "antd";
import { makeAutoObservable } from "mobx";
import { BackupStore, useBackupStore } from "../../../backup.store";
import { SortEnum, SortItemProp } from "./sort.model";
import { CheckOutlined, AppstoreOutlined, MenuOutlined } from '@ant-design/icons';
import { observer } from "mobx-react-lite";
import { useRef } from "react";


export class Sort {
  constructor(private readonly core: BackupStore) {
    makeAutoObservable(this);
  }

  public currentSort = SortEnum.name;
  private sorts: SortItemProp[] = [
    { name: '名称', key: SortEnum.name, ascending_order: true },
    { name: '创建时间', key: SortEnum.create_time, ascending_order: true },
    { name: '修改时间', key: SortEnum.modfiy_time, ascending_order: true },
    { name: '文件大小', key: SortEnum.font_size, ascending_order: true },
    { type: 'divider' },
    { name: '升序', key: SortEnum.ascending_order },
    { name: '降序', key: SortEnum.descending_order },
  ];

  public sortChange(key: SortEnum) {
    //  升序
    if (key === SortEnum.ascending_order) {
      const item = this.getCurrentSort;
      if (item?.ascending_order === true) {
        return;
      } else {
        this.sorts.map((item: any) => {
          if (item.key === this.currentSort) {
            item.ascending_order = false;
            return item;
          }
          return item;
        })
      }
    }

    this.currentSort = key;
  }

  get getCurrentSort() {
    return this.sorts.find((item) => item.key === this.currentSort);
  }

  get text() {
    return `按${this.getCurrentSort?.name || ''}排序`;
  }

  get renderSorts() {
    const selectItem = this.sorts.find((item) => item.key === this.currentSort);
    return this.sorts.map((item: any) => {
      const is = item.key === this.currentSort;
      const order = [SortEnum.ascending_order, SortEnum.descending_order].includes(item.key);
      const isDes = selectItem?.ascending_order === true && item.key === SortEnum.ascending_order;

      if (item.key) {
        item.label = (
          <div>
            <CheckOutlined className={`${(is || (order && isDes)) ? '' : 'sort-unselected'}`} />
            <span>{item.name}</span>
          </div>
        );
      }

      return item;
    })
  }

}


export const SortComponent = observer(() => {
  const store = useBackupStore();
  const elementREf = useRef<HTMLDivElement>(null);

  return (
    <div ref={elementREf}>
      <Dropdown
        getPopupContainer={() => elementREf.current!}
        overlayStyle={{
          width: 152
        }}
        menu={{
          items: store.sort.renderSorts,
          onClick: (event) => { store.sort.sortChange(event.key as any) }
        }}
        trigger={['click']}
      >
        <div className="hove-dropdown">
          {store.sort.text}
        </div>
      </Dropdown>
    </div>
  )
});
