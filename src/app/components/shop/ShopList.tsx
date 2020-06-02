import styles from "./ShopList.module.scss";
import useBuyIcon from "../../hooks/useBuyIcon";
import useWindowDimensions from "../../hooks/useWindowDimensions";

// Redux関連のライブラリ・ファイル
import { useSelector } from "react-redux";
import { RootState } from "../../redux/rootReducer";

const ShopList: React.FC = () => {
  const user = useSelector((state: RootState) => state.user);
  const { width } = useWindowDimensions();
  let imageStyle = { width: "130px", height: "130px" };
  if (width <= 480) {
    imageStyle = {
      width: "100px",
      height: "100px",
    };
  }
  const buyIcon = useBuyIcon();

  return (
    <div>
      <p>所有コイン {user.coin}</p>
      <div className={styles.container}>
        <div className={styles.box}>
          <img style={imageStyle} src={`/icons/cat00.png`} />
          <div className={styles.price}>300コイン</div>
          {user.owned_icons.includes("cat00") == true ? (
            <div>購入済み</div>
          ) : (
            <button
              onClick={() => {
                if (user.coin < 300) {
                  alert("コインが足りません");
                } else {
                  const result = confirm("購入しますか？");
                  if (result) {
                    buyIcon(user, user.coin, 300, "cat00");
                  }
                }
              }}
            >
              コインで購入
            </button>
          )}
        </div>

        <div className={styles.box}>
          <img style={imageStyle} src={`/icons/cat01.png`} />
          <div className={styles.price}>300コイン</div>
          {user.owned_icons.includes("cat01") == true ? (
            <div>購入済み</div>
          ) : (
            <button
              onClick={() => {
                if (user.coin < 300) {
                  alert("コインが足りません");
                } else {
                  const result = confirm("購入しますか？");
                  if (result) {
                    buyIcon(user, user.coin, 300, "cat01");
                  }
                }
              }}
            >
              コインで購入
            </button>
          )}
        </div>

        <div className={styles.box}>
          <img style={imageStyle} src={`/icons/face00.png`} />
          <div className={styles.price}>100コイン</div>
          {user.owned_icons.includes("face00") == true ? (
            <div>購入済み</div>
          ) : (
            <button
              onClick={() => {
                if (user.coin < 100) {
                  alert("コインが足りません");
                } else {
                  const result = confirm("購入しますか？");
                  if (result) {
                    buyIcon(user, user.coin, 100, "face00");
                  }
                }
              }}
            >
              コインで購入
            </button>
          )}
        </div>

        <div className={styles.box}>
          <img style={imageStyle} src={`/icons/face01.png`} />
          <div className={styles.price}>100コイン</div>
          {user.owned_icons.includes("face01") == true ? (
            <div>購入済み</div>
          ) : (
            <button
              onClick={() => {
                if (user.coin < 100) {
                  alert("コインが足りません");
                } else {
                  const result = confirm("購入しますか？");
                  if (result) {
                    buyIcon(user, user.coin, 100, "face01");
                  }
                }
              }}
            >
              コインで購入
            </button>
          )}
        </div>

        <div className={styles.box}>
          <img style={imageStyle} src={`/icons/face02.png`} />
          <div className={styles.price}>100000コイン</div>
          {user.owned_icons.includes("face02") == true ? (
            <div>購入済み</div>
          ) : (
            <button
              onClick={() => {
                if (user.coin < 100000) {
                  alert("コインが足りません");
                } else {
                  const result = confirm("購入しますか？");
                  if (result) {
                    buyIcon(user, user.coin, 100, "face02");
                  }
                }
              }}
            >
              コインで購入
            </button>
          )}
        </div>

        <div className={styles.box}>
          <img style={imageStyle} src={`/icons/face03.png`} />
          <div className={styles.price}>100コイン</div>
          {user.owned_icons.includes("face03") == true ? (
            <div>購入済み</div>
          ) : (
            <button
              onClick={() => {
                if (user.coin < 100) {
                  alert("コインが足りません");
                } else {
                  const result = confirm("購入しますか？");
                  if (result) {
                    buyIcon(user, user.coin, 100, "face03");
                  }
                }
              }}
            >
              コインで購入
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShopList;
