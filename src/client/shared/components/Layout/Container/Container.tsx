import type { PropsWithChildren } from 'react';
import './Container.scss';

const Container = ({ children }: PropsWithChildren) => <div className="container">{children}</div>;

export default Container;
