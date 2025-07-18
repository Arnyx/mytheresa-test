import type { PropsWithChildren } from 'react';
import './main.scss';

const Main = ({ children }: PropsWithChildren) => <main className="main">{children}</main>;

export default Main;
