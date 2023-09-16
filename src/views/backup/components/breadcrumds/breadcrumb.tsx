
import { Breadcrumb, Divider, Tooltip } from 'antd';
import { observer } from 'mobx-react-lite';
import { useBackupStore } from '../../backup.store';
import { ArrowUpOutlined } from '@ant-design/icons';


export const Breadcrumbs = observer(() => {
  const { breadcrumb, breadcrumb: { breadcrumbs, length } } = useBackupStore();

  return (
    <Breadcrumb separator=">">
      {length === 1 ? null : (
        <Breadcrumb.Separator>
          <Tooltip placement='bottom' title="至跟路径">
            <ArrowUpOutlined
              onClick={() => void breadcrumb.sliceBreadcrumbs()}
            />
          </Tooltip>
          <Divider type="vertical" />
        </Breadcrumb.Separator>
      )}
      {breadcrumbs.map((breadcrumbItem: any, i: number) => (
        <Breadcrumb.Item key={i}>
          {breadcrumbItem.name}
        </Breadcrumb.Item>
      ))}
    </Breadcrumb>
  )
});