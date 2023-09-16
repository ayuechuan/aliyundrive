import { AxiosErrorModel } from "./error.model";

export class CallbackModel<T = void>{
  data?: T;
  error?: AxiosErrorModel;

  static callback<CT>(promise: Promise<CT>):Promise<CallbackModel<CT> | CallbackModel<void>>{
    return promise
      .then<CallbackModel<CT>>((data) => ({ data }))
      .catch<CallbackModel>((error) => ({ error }))
  }
};

