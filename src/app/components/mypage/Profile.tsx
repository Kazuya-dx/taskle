import Pet from "./Pet";
import styles from "./Profile.module.scss";
import { useState } from "react";
import useEditProfile from "../../hooks/useEditProfile";

// Redux関連のライブラリ・ファイル
import { useSelector } from "react-redux";
import { RootState } from "../../redux/rootReducer";

const Profile: React.FC = () => {
  const user = useSelector((state: RootState) => state.user);
  const usersTasks = useSelector((state: RootState) => state.usersTasks);
  const [edit, setEdit] = useState(false);
  const [editName, setEditName] = useState(user.name);
  const [editBio, setEditBio] = useState(user.bio);
  const editProfile = useEditProfile();
  console.log(user);

  return (
    <div>
      <div className={styles.wrap}>
        <div className={styles.petarea}>
          <Pet />
        </div>
        <div className={styles.profilearea}>
          <div className={styles.area1}>
            {user.name}
            <div className={styles.buttonarea}>
              <button onClick={() => setEdit(true)}>プロフィールを編集</button>
            </div>
          </div>
          <div className={styles.area2}>
            学び: {usersTasks.length}　コイン: {user.coin}
          </div>
          <div className={styles.area3}>{user.bio}</div>
        </div>
      </div>
      <div className={styles.area4}>
        <button onClick={() => setEdit(true)}>プロフィールを編集</button>
      </div>
      {edit ? (
        <div>
          <div className={styles.editwrap} onClick={() => setEdit(false)}></div>
          <div className={styles.editarea}>
            <div>名前</div>
            <input
              className={styles.text}
              value={editName}
              onChange={(e) => {
                setEditName(e.target.value);
              }}
            ></input>
            <div>自己紹介</div>
            <textarea
              value={editBio}
              onChange={(e) => {
                setEditBio(e.target.value);
              }}
            ></textarea>
            <div>アイコン</div>
            <input type="color" className={styles.color}></input>
            <div className={styles.buttonarea}>
              <button
                onClick={() => {
                  setEdit(false);
                  editProfile(user, editName, editBio);
                }}
              >
                保存
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default Profile;
