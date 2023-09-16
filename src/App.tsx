import React, { Fragment, Suspense } from 'react';
import { ConfigProvider } from 'antd';
import { BrowserRouter } from 'react-router-dom';
import { Router } from './views/router/router';
import { Advertisement } from './views/advertisement';
import { AuthProvider, EventBusProvider } from './contexts';

export function App() {
  return (
    <ConfigProvider
      theme={{
        token: {
          // controlItemBgActive : 'rgba( 132, 133, 141 , 0.16)',
          colorPrimary: 'rgba(99, 125, 255 , 0.12)',
          controlItemBgActive: 'rgba( 99, 125, 255 , 0.12)',
          colorTextHeading: '#000',
          colorTextTertiary: '#000',
          colorTextLabel: '#000',
          controlItemBgActiveHover: 'rgba( 99, 125, 255 , 0.12)',
          boxShadow: '0 0 1px 1px rgba(28,28,32,.05), 0 8px 24px rgba(28,28,32,.12)',
          boxShadowSecondary: '0 0 1px 1px rgba(28,28,32,.05), 0 8px 24px rgba(28,28,32,.12)',
        },
        components: {
          Dropdown: {
            boxShadow: '0 0 1px 1px rgba(28,28,32,.05), 0 8px 24px rgba(28,28,32,.12)',
            boxShadowSecondary: '0 0 1px 1px rgba(28,28,32,.05), 0 8px 24px rgba(28,28,32,.12)',
          },
          Menu: {
            itemSelectedBg: 'rgba(132,133,141,0.16)',
            itemSelectedColor: 'rgb(37,38,43)',
            itemHoverBg: 'rgba(132,133,141,0.08)',
          },
        }
      }}
    >
      <EventBusProvider>
        <AuthProvider>
          <Suspense fallback={<></>}>
            <BrowserRouter>
              <Router />
            </BrowserRouter>
          </Suspense>
        </AuthProvider>
      </EventBusProvider>
    </ConfigProvider>
  )
}
