import ReactDOM from 'react-dom/client';
import { App } from './App';
import './index.less';
import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/relativeTime';
import Cookies from 'js-cookie';
import { configure } from 'mobx';
import NProgress from 'nprogress';

class Applocation {
  private root: ReactDOM.Root | null;

  private async startInitialize(): Promise<void> {
    await import('./utils/day.language/zh-cn');
    dayjs.extend(advancedFormat);
    dayjs.locale(Cookies.get('language') ?? 'zh-cn');
  }

  constructor() {
    this.root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
  }

  async start(): Promise<void> {
    await this.startInitialize();
    this.configurations();
    this.render();
  }

  private configurations(): void {
    //  mobx
    configure({
      // computedRequiresReaction: false,
      // isolateGlobalState: false
    });
    //  进度条
    NProgress.configure({ minimum: 0.1 });
  }

  render(): void {
    this.root!.render(<App />);
  }

  public destory(): void {
    this.root!.unmount();
    this.root = null;
  }
}

const app = new Applocation();
app.start();
