import { makeAutoObservable } from "mobx";
import { BackupStore } from "../../backup.store";

export class BreadcrumbsFeature {
  public breadcrumbs = [
    { name: '备份盘', key: 1 },
    { name: '文件夹', key: 2 },
  ];

  constructor(private readonly core: BackupStore) {
    makeAutoObservable(this);
  }

  public sliceBreadcrumbs(params?: {}): void {
    const { breadcrumbs, breadcrumbs: { length, [length - 1]: last } } = this;
    //  跟路径
    if (!params) {
      this.breadcrumbs = [...breadcrumbs.slice(0, length - 1)];
    }else{
      //  其他路径
    };

    //  更新列表
    this.core.refresh();
  }

  get length(): number {
    return this.breadcrumbs.length;
  }
}