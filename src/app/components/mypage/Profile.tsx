import styles from "./Profile.module.scss";

const Profile = ({ children }) => {
  // children の型は {name: string, point: number, coin: number}
  if (children !== "") {
    return (
      <div>
        <h3>{children.name}</h3>
        <div className={styles.contents}>
          努力値: {children.point} コイン: {children.coin}
        </div>
      </div>
    );
  } else {
    return <div>ログインしていません</div>;
  }
};

export default Profile;
