
import { useLocalStorageState } from 'ahooks';
import { message } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import './index.less';

export function Advertisement(): JSX.Element | null {
  const [status, update] = useLocalStorageState('aliyun_advertisement');

  function onFlashSale(): void {
    message.success('抢购成功！');
  }

  if (status) {
    return null;
  }

  return (
    <div className="advertisement-main">
      <p>
        <span>🎉 99划算节倒计时·8TB SVIP低至119元/年。</span>
        <span className='link' onClick={onFlashSale}>立即抢购</span>
      </p>
      <CloseOutlined onClick={() => update(true)} />
    </div>
  )
}