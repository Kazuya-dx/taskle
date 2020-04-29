import Header from "./Header";
import styles from "./App.module.scss";

interface AppProps {
  children: React.ReactNode;
}

const App: React.FC<AppProps> = ({ children }) => (
  <main>
    <Header />
    <div className={styles.container}>{children}</div>
  </main>
);

export default App;
