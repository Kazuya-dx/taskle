import Icon from "../Icon";
import styles from "./Profile.module.scss";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import useWindowDimensions from "../../hooks/useWindowDimensions";
import useEditProfile from "../../hooks/useEditProfile";

// Redux関連のライブラリ・ファイル
import { useSelector } from "react-redux";
import { RootState } from "../../redux/rootReducer";

const Profile: React.FC = () => {
  const user = useSelector((state: RootState) => state.user);
  const usersTasks = useSelector((state: RootState) => state.usersTasks);
  const { width } = useWindowDimensions();
  const router = useRouter();
  const [edit, setEdit] = useState(false);
  const [editName, setEditName] = useState(user.name);
  const [editBio, setEditBio] = useState(user.bio);
  const [editBackground, setEditBackground] = useState(user.background);
  const [editIcon, setEditIcon] = useState(user.icon);
  const [subscribe, setSubscribe] = useState(false);
  const editProfile = useEditProfile();

  useEffect(() => {
    setEditName(user.name);
    setEditBio(user.bio);
    setEditBackground(user.background);
    setEditIcon(user.icon);
  }, [user]);

  return (
    <div>
      <div className={styles.wrap}>
        <div className={styles.petarea}>
          {width > 480 ? (
            <Icon
              icon={user.icon}
              background={user.background}
              decoration="0"
              size="200px"
            />
          ) : (
            <Icon
              icon={user.icon}
              background={user.background}
              decoration="0"
              size="100px"
            />
          )}
        </div>
        <div className={styles.profilearea}>
          <div className={styles.area1}>
            {user.name}
            <div className={styles.buttonarea}>
              <button
                onClick={() => {
                  if (user.is_guest) {
                    setSubscribe(true);
                  } else {
                    setEdit(true);
                  }
                }}
              >
                プロフィールを編集
              </button>
            </div>
          </div>
          <div className={styles.area2}>
            学び: {usersTasks.length}　コイン: {user.coin}
          </div>
          <div className={styles.area3}>{user.bio}</div>
        </div>
      </div>
      <div className={styles.area4}>
        <button
          onClick={() => {
            if (user.is_guest) {
              setSubscribe(true);
            } else {
              setEdit(true);
            }
          }}
        >
          プロフィールを編集
        </button>
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
            <span className={styles.iconarea}>
              <div>
                <input
                  type="radio"
                  name="icon"
                  value="0"
                  onChange={(e) => {
                    setEditIcon(e.target.value);
                  }}
                />
                <img className={styles.img} src={`/icons/nothing.png`} />
              </div>

              {user.owned_icons.map((icon) => {
                return (
                  <div key={icon}>
                    <input
                      type="radio"
                      name="icon"
                      value={icon}
                      onChange={(e) => {
                        setEditIcon(e.target.value);
                      }}
                    />
                    <img className={styles.img} src={`/icons/${icon}.png`} />
                  </div>
                );
              })}
            </span>
            <div>背景</div>
            <input
              type="color"
              className={styles.color}
              value={editBackground}
              onChange={(e) => {
                setEditBackground(e.target.value);
              }}
            ></input>
            <div className={styles.buttonarea}>
              <button
                onClick={() => {
                  setEdit(false);
                  editProfile(
                    user,
                    editName,
                    editBio,
                    editIcon,
                    editBackground
                  );
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

      {subscribe ? (
        <div>
          <div
            className={styles.subscribewrap}
            onClick={() => setSubscribe(false)}
          ></div>
          <div className={styles.subscribearea}>
            <div className={styles.title}>
              アカウント登録して、更に便利に使ってみませんか?
            </div>
            <div className={styles.explanation}>
              アカウント登録すると以下のような機能が使えます。
            </div>
            <div className={styles.image}></div>
            <div className={styles.buttonarea}>
              <button
                onClick={() => {
                  router.push("/signup");
                }}
              >
                アカウント作成
              </button>
              <button
                onClick={() => {
                  router.push("/login");
                }}
              >
                ログイン
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
