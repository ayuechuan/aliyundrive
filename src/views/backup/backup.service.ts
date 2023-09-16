import { axios } from "../../utils/axios";
import { CallbackModel } from "../../utils/models/server.model";
import { Files } from "./backup.model";

export class BackupService {

  static getBackupListSource(query : {}): Promise<CallbackModel<void> | CallbackModel<Files>> {
    return CallbackModel.callback(
      axios.get<void, Files>(`${window.location.origin}/mock/file.json`)
    )
  }

}