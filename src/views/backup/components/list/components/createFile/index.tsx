import { useMount } from "ahooks";
import { Input, InputRef } from "antd";
import { FC, useEffect, useRef } from "react"

interface Props {
  title: string;
  onChange: (value: string) => void
}

export const CreateFile: FC<Props> = ({ title, onChange }) => {
  const element = useRef<InputRef>(null);

  useMount(() => {
    setTimeout(() => {
      element.current?.focus?.({ cursor: 'all' });
    } ,100)
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <img
        style={{ width: 115, height: 90, marginBottom: 36, marginTop: 32 }}
        src="https://img.alicdn.com/imgextra/i1/O1CN01rGJZac1Zn37NL70IT_!!6000000003238-2-tps-230-180.png"
        alt=""
      />
      <Input
        ref={element}
        autoFocus
        defaultValue={title}
        size="large"
        onChange={({ target: { value } }) => onChange?.(value)}
      />
    </div>
  )
}