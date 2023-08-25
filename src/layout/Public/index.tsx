import React from 'react';
import classes from './Public.module.scss';

interface Props {
  children: React.ReactNode;
}

const PublicLayout: React.FC<Props> = ({ children }) => {
  return <div className={classes.publicLayoutWrapper}>{children}</div>;
};

export default PublicLayout;
