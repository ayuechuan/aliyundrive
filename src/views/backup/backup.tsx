import { Fragment, useEffect, useState } from "react"
import { List } from "./components/list/list"
import { Header } from "../components/header/header"
import { Tools } from "./components/tools/tools"
import './backup.less'
import ReactDOM from 'react-dom/client';
import { createPortal } from 'react-dom';
import { OutWrapper } from "./components/outerWrapper"
import { useMount } from "ahooks"
import { observer } from "mobx-react-lite"
import { useBackupStore } from "./backup.store"
import { Notifcation } from "../notification"
import { useParams } from "react-router-dom"

export const Backup = observer(() => {
  const store = useBackupStore();
  const { pathid } = useParams<{ pathid: string }>();

  useMount(() => {
    store.refresh(pathid);
  })

  return (
    <div className="backup-main">
      <Header />
      <Tools />
      <List />
      <OutWrapper />
      <Notifcation />
    </div>
  )
});
