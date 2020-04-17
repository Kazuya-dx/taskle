import styles from "./Header.module.scss";
import Navigator from "./Navigator";

const Header = () => (
  <header className={styles.header}>
    <div className={styles.title}>
      <span>Taskle</span>
      <Navigator />
    </div>
  </header>
);

export default Header;
