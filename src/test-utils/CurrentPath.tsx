import { useLocation } from 'react-router-dom';

export const CurrentPath = () => {
  const location = useLocation();
  return <div data-testid="current-path">{location.pathname}</div>;
};
