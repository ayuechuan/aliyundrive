import { makeAutoObservable } from "mobx";
import { BackupStore } from "../../../backup.store";
import { MenuProps } from "antd";
import { ItemType } from "antd/lib/menu/hooks/useItems";

export enum SortEnum {
  name = '1',
  create_time = '2',
  modfiy_time = '3',
  font_size = '4',
  ascending_order = '5',
  descending_order = '6'
}

export  type SortItemProp = ItemType & {
  name?: string;
  ascending_order?: boolean;
}

