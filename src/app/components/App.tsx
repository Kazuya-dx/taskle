import Header from "./Header";
import styles from "./App.module.scss";

const App = ({ children }: { children?: any }) => (
  <main>
    <Header />
    <div className={styles.container}>{children}</div>
  </main>
);

export default App;
