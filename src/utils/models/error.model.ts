
import { message } from 'antd';
interface Errorinfos {
  code: number;
  message: string;
  cause?: string;
  detail?: string;
}

export class AxiosErrorModel implements Errorinfos {
 public code!: number;
 public message!: string;
 public cause?: string;
 public detail?: string;
  constructor(error: Partial<AxiosErrorModel>) {
    Object.assign(this, error);
  }

  public showMessage(tips?: string) {
    const error = tips ?? this.message;
    message.error(error);
  }

  public showModel(tips?: string) {}

}



