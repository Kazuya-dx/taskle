import styles from "./Profile.module.scss";

const Profile = () => (
  <div>
    <div className={styles.username}>ユーザー名</div>
    <div className={styles.contents}>努力値: XXX コイン: XXX</div>
  </div>
);

export default Profile;
