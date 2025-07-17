import type { PropsWithChildren } from 'react';
import './main.scss';

export const Main = ({ children }: PropsWithChildren) => <main className="main">{children}</main>;
