import { makeAutoObservable, runInAction } from "mobx";
import { Key, createContext, useContext } from "react";
import { RowSelectMethod, TableRowSelection } from "antd/lib/table/interface";
import { Sort } from "./components/tools/components/sort";
import { BackupService } from "./backup.service";
import { Files, Items } from "./backup.model";
import { BreadcrumbsFeature } from "./components/breadcrumds/breadcrumb.store";

type CustomTableRowSelection = { onChange: TableRowSelection<Record<string, any>>['onChange']; };

export class BackupStore implements CustomTableRowSelection {
  //  选中文件集合
  public selectedRowKeys: string[] = [];
  //  文件列表
  public dataSource: Files['items'] = [];
  public loading = true;

  //  features
  public sort: Sort = new Sort(this);
  public breadcrumb = new BreadcrumbsFeature(this);

  public viewType: 'grid' | 'table';

  constructor() {
    makeAutoObservable(this);
    this.viewType = localStorage.getItem('viewType') as 'grid' | 'table' || 'table';
  }

  // init
  public async refresh(pathid?: string): Promise<void> {
    /**
     *  这个里需要跟后端约定好接口 （ 请求哪个文件夹下的子文件 ） 一般携带上一个文件夹的 id
     */
    const { breadcrumbs: { length, [length - 1]: last } } = this.breadcrumb;
    this.loading = true;

    try {
      const { error, data } = await BackupService.getBackupListSource({ rootid: last.key || pathid || '000000' });
      if (error) {
        error?.showMessage();
        return;
      }

      runInAction(() => {
        this.dataSource = data?.items || [];
      })
    } finally {
      runInAction(() => {
        //  故意增加点延时
        setTimeout(() => {
          this.loading = false;
        }, 500)
      })
    }
  }


  //  tools
  public get checked(): boolean {
    const { selectedRowKeys, dataSource } = this;
    return this.selectedRowKeys.length > 0 && selectedRowKeys.length === dataSource.length;
  }

  public get indeterminate(): boolean {
    const { selectedRowKeys, dataSource } = this;
    return this.selectedRowKeys.length > 0 && selectedRowKeys.length !== dataSource.length;
  }

  get total(): number {
    return this.selectedRowKeys.length;
  }

  get getSortSource(): Files['items'] {
    const { } = this.sort;
    return this.dataSource;
  }

  public checkboxChange() {
    if (this.indeterminate) {
      this.selectedRowKeys = this.dataSource.map(item => item.file_id);
      return;
    }

    if (this.checked) {
      this.selectedRowKeys = [];
      return;
    }

    this.selectedRowKeys = this.dataSource.map(item => item.file_id);
  }

  public onChange(selectedRowKeys: Key[], selectedRows: Record<string, any>[], info: { type: RowSelectMethod; }): void {
    this.selectedRowKeys = selectedRowKeys as string[];
  }

  public checkView(): void {
    this.viewType = this.viewType === 'table' ? 'grid' : 'table';
    localStorage.setItem('viewType', this.viewType);
  }

  public clearSelectKeys(): void {
    this.selectedRowKeys = [];
  }

  public createSource(soure: Items): void {
    this.dataSource = [...[soure], ...this.dataSource];
  }

}

const backupStoreContext = createContext(new BackupStore());
//  hook
export function useBackupStore(): BackupStore {
  return useContext(backupStoreContext);
}