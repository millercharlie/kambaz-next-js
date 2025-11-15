'use client';

import KambazNavigation from './Navigation';
import store from './store';
import './styles.css';
import Session from '@/app/(Kambaz)/Account/Session';
import { ReactNode } from 'react';
import { Provider } from 'react-redux';

export default function KambazLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <Provider store={store}>
      <Session>
        <div id='wd-kambaz'>
          <div className='d-flex'>
            <div>
              <KambazNavigation />
            </div>
            <div className='wd-main-content-offset p-3 flex-fill'>
              {children}
            </div>
          </div>
        </div>
      </Session>
    </Provider>
  );
}
