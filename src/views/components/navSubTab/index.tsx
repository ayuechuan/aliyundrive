import { Button, Progress } from 'antd';
import './index.less';

export const NavSubTab = () => {
  return (
    <div className='nav-sub-bottom-main'>
      <div className='sign'>
        <div className='download'>极速下载特权</div>
        <div className='sign-btn'>待签到</div>
      </div>
      <div className='storage-wrapper'>
        <div className='proportion'>
          <p>8.77 GB / 1000 Gb</p>
          <div>管理</div>
        </div>
        <Progress percent={22} size={'small'}  showInfo={false}/>
      </div>
      <div className='membership'>
        <Button>开通超级会员</Button>
      </div>
    </div>
  )
}