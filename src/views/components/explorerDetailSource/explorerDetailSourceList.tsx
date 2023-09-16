import { Dropdown, Table, TableProps, theme } from "antd";
import { ItemType } from "antd/es/menu/hooks/useItems";
import { toJS } from "mobx";
import { Observer, useLocalStore } from "mobx-react-lite";
import { forwardRef, useImperativeHandle } from "react";

export const menus: TableContextMenu[] = [
  {
    name: '快传',
    label: '快传',
    key: 'fastUpload',
    icon: <></>,
    needSelected: true,
    multiple: true
  },
  {
    name: '下载',
    label: '下载',
    key: 'download',
    icon: <></>,
    needSelected: true,
    multiple: true
  },
  {
    name: '收藏',
    label: '收藏',
    key: 'collect',
    icon: <></>,
    needSelected: true,
    multiple: true
  },
  {
    key: Math.random() * 100,
    type: 'divider',
    needSelected: true,
    multiple: true
  },
  {
    name: "重命名",
    label: "重命名",
    key: "rename",
    icon: <></>,
    needSelected: true,
  },
  {
    name: "移动",
    label: "移动",
    key: "move",
    icon: <></>,
    needSelected: true,
    emptyShow: true,
    multiple: true
  },
  {
    name: "移到密码箱",
    label: "移到密码箱",
    key: "password",
    icon: <></>,
    needSelected: true,
    multiple: true
  },
  {
    name: "移至资料库",
    label: (
      <div style={{ display: 'flex' }}>
        <span>移至资料库</span>
        <div className="tags-luck">限时</div>
      </div>
    ),
    key: "ziliao",
    icon: <></>,
    needSelected: true,
    multiple: true
  },
  {
    name: "查看详细信息",
    label: "查看详细信息",
    key: "info",
    icon: <></>,
    needSelected: true,
  },
  {
    key: Math.random() * 100,
    type: 'divider',
    needSelected: true,
    multiple: true
  },
  {
    name: "放入回收站",
    label: "放入回收站",
    key: "fileCount",
    danger: true,
    icon: <></>,
    needSelected: true,
    multiple: true
  },
  {
    name: '新建文件夹',
    label: '新建文件夹',
    key: 'createFile',
    icon: <></>,
  },
  {
    name: '刷新',
    label: '刷新',
    key: 'refresh',
    icon: <></>,
  }
]

interface RightTableProps extends TableProps<Record<string, any>> {
  /**
   * 右键菜单点击事件
   */
  onRightMenuClick?: (key: any, item: any, i: number) => void;
  /**
   * 行点击事件
   */
  onClickRow?: (record: any, index: number) => void;
  /**
   * 点击空白区域
   */
  onClickBlank?: () => void;
  /**
   * 右键菜单
   */
  rightContextMenu: PartialTableContextMenu[];
}

interface TableEvent extends React.MouseEvent<HTMLDivElement, MouseEvent> {
  empty?: boolean;
  targetByRow?: boolean;
  record?: any
}

type TableContextMenu = ItemType & {
  key?: string | number;
  name?: string;
  icon?: JSX.Element;
  /**
   * 右键是否需要选中目标 显示此项
   */
  needSelected?: boolean;
  /**
   * 列表为空时 显示此项
   */
  emptyShow?: boolean;
  /**
   * 是否禁用点击
   */
  disabled?: boolean;
  /**
   * 是否在选中多个目标时 显示此项
   */
  multiple?: boolean;
  /**
   * 自定义 item Element
   */
  render?: (index: number) => JSX.Element;
};
type PartialTableContextMenu = Partial<TableContextMenu>;

export const ExplorerDetailSourceList = forwardRef((props: RightTableProps, ref) => {

  const {
    rightContextMenu,
    rowSelection,
    onClickRow,
    onClickBlank,
    onRightMenuClick,
    ...tableProps
  } = props;

  const tableStore = useLocalStore(() => ({
    rightClickSelectRowInfo: {},
    currentIndex: -1,
    contextMenus: rightContextMenu || [],

    update(rowInfo: any, currentIndex: number, contextMenus?: any): void {
      this.contextMenus = contextMenus ?? this.contextMenus;
      this.currentIndex = currentIndex;
      this.rightClickSelectRowInfo = rowInfo;
    }
  }));

  const { token: { colorBgLayout, colorTextTertiary } } = theme.useToken();
  //  扩展...
  useImperativeHandle(ref, () => ({}));

  return (
    <Observer>
      {() => (
        <Dropdown
          menu={{
            items: toJS(tableStore.contextMenus).map((item: any) => {
              const { emptyShow, needSelected, ...reset } = item;
              return reset;
            }),
            onClick: (event) => onRightMenuClick?.(event.key, tableStore.rightClickSelectRowInfo, tableStore.currentIndex)
          }}
          overlayClassName="table-dropdown"
          trigger={['contextMenu']}
          overlayStyle={{ minWidth: 200, }}
        >
          <div className="table-main" style={{
            color: colorTextTertiary,
            background: colorBgLayout,
            textAlign: 'center',
            backgroundColor: '#fff',
          }}
            onContextMenu={(event: TableEvent) => {
              let tempSource = [] as any;
              if (event.empty) {
                event.empty = false;
                tempSource = rightContextMenu.filter((item) => item.emptyShow || !item.needSelected)
              } else if (event.targetByRow) {
                //  右键目标对象 是否在已选列表中 & 选中数量 >= 2
                const selects = rowSelection?.selectedRowKeys!;
                const { file_id } = event.record;

                if (selects?.length >= 2 && selects?.includes(file_id)) {
                  tempSource = rightContextMenu.filter((item) => item.multiple && item.needSelected)
                  event.record = null;
                } else {
                  tempSource = rightContextMenu.filter((item) => !item.emptyShow && item.needSelected)
                }
              } else {
                tempSource = rightContextMenu.filter((item) => !item.emptyShow && !item.needSelected)
              }
              //  过滤右键菜单 供 Dropdown 显示列表
              tableStore.update(tableStore.rightClickSelectRowInfo, tableStore.currentIndex, tempSource);
            }}
            onClick={() => {
              //  右键菜单处于显示的情况下 点击空白区域 选中的列表不清空
              const dropDown = document.getElementsByClassName('table-dropdown')[0] as HTMLDivElement;
              if (!dropDown) {
                onClickBlank?.();
                return;
              }
              const style = window.getComputedStyle(dropDown);
              if (style.display !== 'none') {
                return;
              }
              onClickBlank?.();
            }}
          >
            <Table
              pagination={false}
              size="middle"
              className="wolf-table"
              onHeaderRow={() => ({
                onClick: (event) => event.stopPropagation(),
                onContextMenu: (event: TableEvent) => event.targetByRow = false
              })}
              onRow={(record, i) => ({
                onClick: () => void onClickRow?.(record, i!),
                onContextMenu: (event: TableEvent) => {
                  const target = event.currentTarget;
                  event.targetByRow = true;
                  event.record = record;

                  //  临时存储当前右键的行信息
                  tableStore.update(record, i!);
                }
              })}
              locale={{
                emptyText: () => {
                  return (
                    <div
                      style={{
                        color: colorTextTertiary,
                        background: colorBgLayout,
                        height: '100%',
                        textAlign: 'center',
                        lineHeight: '200px',
                      }}
                      onContextMenu={(event: TableEvent) => { event.empty = true; }}>
                      无数据
                    </div>
                  )
                }
              }}
              rowSelection={{
                onChange: (selectedRowKeys, selectedRows, info) => {
                  rowSelection?.onChange?.(selectedRowKeys, selectedRows, info);
                },
                hideSelectAll: true,
                checkStrictly: false,
                selectedRowKeys: rowSelection?.selectedRowKeys || [],

              }}
              {...tableProps}
            />
          </div>
        </Dropdown>
      )}
    </Observer>
  )
})
