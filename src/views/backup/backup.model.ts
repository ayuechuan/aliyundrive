export interface Files {
  next_marker: string;
  items: Items[];
}

//  使用 class 定义列表类型  适用于 默认初始化
export class Items {
  created_at!: string;
  drive_id = '303637970';
  file_id = '';
  name = '';
  parent_file_id = 'root';
  starred = false;
  type = 'folder';
  updated_at!: string;
  size = 846903;

  constructor(item?: Partial<Items>) {
    const time = new Date().toISOString();
    Object.assign(
      this, {
      created_at: time,
      updated_at: time,
      file_id: Math.random().toString().substr(2, 16)
    }, item);
  }
}