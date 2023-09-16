
import { Card, Dropdown, List, ListProps } from "antd";
import { FC } from "react";
import { menus as rightContextMenu } from "./explorerDetailSourceList";
import { useLocalStore, useObserver } from "mobx-react-lite";
import { toJS } from "mobx";
import './explorerDataSourceGrid.less';
import { Files } from "../../backup/backup.model";
import { ListGridType } from "antd/lib/list";
import { ItemType } from "antd/lib/menu/hooks/useItems";
import dayjs from "dayjs";

interface ExplorerGridProps<T = Files['items'][0]> extends Omit<ListProps<T>, 'dataSource'> {
  dataSource: Files['items'];
  onContextMenu?: (event: string, item: T) => void;
  onClick?: (item: T) => void;
}

interface ExplorerGridEvent<T = any> extends React.MouseEvent<HTMLDivElement, MouseEvent> {
  cardItem: null | T,
}

enum ExplorerGridEnum {
  empty = 'empty',
  item = 'item',
}

const grid: ListGridType | undefined = { gutter: 16, xs: 1, sm: 2, md: 4, lg: 4, xl: 6, xxl: 9 };

export const ExplorerDataSourceGrid: FC<ExplorerGridProps> = ({
  dataSource,
  onContextMenu,
  onClick
}) => {
  const store = useLocalStore(() => {
    return {
      rightContextMenu: rightContextMenu,
      filterRightContextMenu(taget: ExplorerGridEnum): void {
        switch (taget) {
          case ExplorerGridEnum.empty:
            this.rightContextMenu = rightContextMenu.filter((item) => !item.emptyShow && !item.needSelected)
            break;
          case ExplorerGridEnum.item:
            this.rightContextMenu = rightContextMenu.filter((item) => item.needSelected);
            break;
          default:
            break;
        }
      },
      get getUnObservableConentMenus(): ItemType[] | undefined {
        return toJS(this.rightContextMenu).map((item) => {
          const { emptyShow, needSelected, ...reset } = item;
          return reset;
        })
      },
      cardItem: null as null | Files['items'][0],
    }
  });


  return useObserver(() => (
    <Dropdown
      menu={{
        items: store.getUnObservableConentMenus,
        onClick: (event) => onContextMenu?.(event.key, store.cardItem!)
      }}
      overlayStyle={{ minWidth: 200 }}
      className="list-right-menu"
      trigger={['contextMenu']}>
      <div
        onContextMenu={(event: ExplorerGridEvent) => {
          event.preventDefault();
          event.stopPropagation();
          if (event.cardItem) {
            event.cardItem = null;
            store.filterRightContextMenu(ExplorerGridEnum.item);
            return;
          }
          //  右键空白处
          store.filterRightContextMenu(ExplorerGridEnum.empty);
          store.cardItem = null;
        }}>
        <List
          className="list-grid"
          grid={grid}
          loading={false}
          dataSource={dataSource}
          loadMore={<div style={{ textAlign: 'center' }}></div>}
          rowKey='file_id'
          renderItem={(card) => (
            <List.Item
              className="card-item"
              data-id={card.file_id}
              onClick={(event) => void onClick?.(card)}
              onContextMenu={(event: ExplorerGridEvent) => {
                const id = event.currentTarget.getAttribute('data-id');
                event.cardItem = card;
                store.cardItem = card;
              }}>
              <Card
                style={{ textAlign: 'center', border: 'none', cursor: 'pointer' }}
                bodyStyle={{ padding: 0 }}
              >
                <div className="position-root">
                  <div style={{ height: 90, position: 'relative' }}>
                    <img
                      style={{ width: 115, height: 90 }}
                      src="https://img.alicdn.com/imgextra/i1/O1CN01rGJZac1Zn37NL70IT_!!6000000003238-2-tps-230-180.png"
                      alt=""
                    />
                  </div>
                  <p className="card-title">{card.name}</p>
                  <p className="card-des">{dayjs(card.updated_at).format('YYYY-MM-DD HH:mm')}</p>
                </div>
              </Card>
            </List.Item>
          )}
        />
      </div>
    </Dropdown>
  ))
}
