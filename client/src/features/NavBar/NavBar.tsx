import { NavLink } from 'react-router-dom';
import styles from './NavBar.module.css';

const NavBar = () => {
  return (
    <nav className={styles.nav}>
        <NavLink
        to="/tasks"
        className={({ isActive }) => (isActive ? styles.active : '')}
      >
        Все задачи
      </NavLink>
      <NavLink
        to="/boards"
        className={({ isActive }) => (isActive ? styles.active : '')}
      >
        Доски
      </NavLink>

    </nav>
  );
};

export default NavBar;