import Link from "next/link";
import styles from "./Navigator.module.scss";

const Navigator = () => (
  <nav className={styles.nav}>
    <ul>
      <li>
        <Link href="/">
          <a>マイページ</a>
        </Link>
      </li>
      <li>
        <Link href="/timeline">
          <a>タイムライン</a>
        </Link>
      </li>
      <li>
        <Link href="/shop">
          <a>ショップ</a>
        </Link>
      </li>
      <li>
        <Link href="/search">
          <a>検索</a>
        </Link>
      </li>
    </ul>
  </nav>
);

export default Navigator;
