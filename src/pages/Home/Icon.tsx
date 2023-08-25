import classes from './Home.module.scss';

interface Props {
  onClick?: () => void;
  children: React.ReactNode;
}

const Icon = ({ children, onClick }: Props) => {
  return (
    <span onClick={onClick} className={classes.icon}>
      {children}
    </span>
  );
};

export default Icon;
