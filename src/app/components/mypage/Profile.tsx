import Pet from "./Pet";
import styles from "./Profile.module.scss";

// Redux関連のライブラリ・ファイル
import { useSelector } from "react-redux";
import { RootState } from "../../redux/rootReducer";

const Profile: React.FC = () => {
  const user = useSelector((state: RootState) => state.user);
  const usersTasks = useSelector((state: RootState) => state.usersTasks);

  if (user.name !== "") {
    return (
      <div className={styles.wrap}>
        <div className={styles.petarea}>
          <Pet />
        </div>
        <div className={styles.profilearea}>
          <div className={styles.area1}>
            {user.name}
            <div className={styles.buttonarea}>
              <button>プロフィールを編集</button>
            </div>
          </div>
          <div className={styles.area2}>
            学び: {usersTasks.length}　コイン: {user.coin}
          </div>
          <div className={styles.area3}>ここに紹介文が入ります。</div>
        </div>
      </div>
    );
  } else {
    return <div>ログインしていません</div>;
  }
};

export default Profile;
