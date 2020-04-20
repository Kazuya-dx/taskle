import styles from "./Profile.module.scss";

// Redux関連のライブラリ・ファイル
import { useSelector } from "react-redux";
import { RootState } from "../../redux/rootReducer";

const Profile = () => {
  const user = useSelector((state: RootState) => state.user);

  if (user.name !== "") {
    return (
      <div>
        <h3>{user.name}</h3>
        <div className={styles.contents}>
          努力値: {user.point} コイン: {user.coin}
        </div>
      </div>
    );
  } else {
    return <div>ログインしていません</div>;
  }
};

export default Profile;
