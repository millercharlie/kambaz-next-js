import TOC from './TOC';
import store from '@/app/Labs/store';
import { ReactNode } from 'react';
import { Provider } from 'react-redux';

export default function LabsLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <Provider store={store}>
      <table>
        <tbody>
          <tr>
            <td valign='top' width='100px'>
              <TOC />
            </td>
            <td valign='top'>{children}</td>
          </tr>
        </tbody>
      </table>
    </Provider>
  );
}
