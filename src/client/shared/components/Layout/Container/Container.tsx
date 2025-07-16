import type { PropsWithChildren } from 'react';
import './Container.scss';

export const Container = ({ children }: PropsWithChildren) => <div className="container">{children}</div>;
