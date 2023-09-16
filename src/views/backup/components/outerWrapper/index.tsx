import { observer, useLocalStore, useObserver } from "mobx-react-lite";
import { useEffect, useRef } from "react";
import ReactDOM from 'react-dom';
import { useBackupStore } from "../../backup.store";
import { reaction, toJS } from "mobx";
import { CloudDownloadOutlined, CloseOutlined } from '@ant-design/icons';

export const OutWrapper = observer(() => {

  const store = useBackupStore();
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const subScription = reaction(() => [store.selectedRowKeys], (_, prev) => {

      const arg = store.selectedRowKeys;

      const element = elementRef.current!;
      const show = element.classList.contains('show');
      const staticClass = element.classList.contains('static');

      if (!arg.length) {
        element.className = element.className.replace('show', staticClass ? '' : 'static');
        element.style.bottom = '-52px';
        return;
      };

      if (arg.length && element && show) {
        return;
      };

      if (arg.length && element && !show) {
        let className = element.className + ' show';
        if (!staticClass) {
          className = className + ' static';
        }
        element.className = className;
        element.style.bottom = '52px';
        return;
      };

    });
    return () => subScription?.();
  }, []);

  return (
    <div
      className="outer-wrapper"
      ref={elementRef}
      style={{
        height: 48,
        width: 248,
        opacity: 1,
        background: 'rgb(49,49,54)',
        bottom: -52,
        color: '#fff'
      }}>
      <CloudDownloadOutlined />
      <div>省略...</div>
      <CloseOutlined onClick={() => store.clearSelectKeys()} />
    </div>
  )
});

