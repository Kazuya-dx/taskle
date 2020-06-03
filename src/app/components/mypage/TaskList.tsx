import { useState } from "react";
import TaskDetail from "./TaskDetail";
import useCheckTags from "../../hooks/useCheckTags";
import useWindowDimensions from "../../hooks/useWindowDimensions";

// Redux関連のライブラリ・ファイル
import { useSelector } from "react-redux";
import { RootState } from "../../redux/rootReducer";
import styles from "./TaskList.module.scss";

const TaskList: React.FC = () => {
  const [selectedTags, setSelectedTags] = useState("");
  const [toggle, setToggle] = useState(false);
  const { width } = useWindowDimensions();
  const usersTasks = useSelector((state: RootState) => state.usersTasks);
  const checkTags = useCheckTags();
  const tagsList = checkTags(usersTasks);
  const selectedStyle = {
    color: "green",
  };
  return (
    <div className={styles.container}>
      <div
        className={styles.mobileTagArea}
        onClick={() => {
          setToggle(true);
          console.log(toggle);
        }}
      >
        {selectedTags === "" ? "すべての学び" : selectedTags}
      </div>
      {toggle || width > 480 ? (
        <div>
          <div
            className={styles.editwrap}
            onClick={() => {
              setToggle(false);
            }}
          ></div>
          <div className={styles.side}>
            {selectedTags === "" ? (
              <div className={styles.box} style={selectedStyle}>
                <span>すべての学び ({usersTasks.length})</span>
              </div>
            ) : (
              <div className={styles.box}>
                <span
                  onClick={() => {
                    setSelectedTags("");
                    setToggle(false);
                  }}
                >
                  すべての学び ({usersTasks.length})
                </span>
              </div>
            )}

            {tagsList.map((tag) => {
              if (selectedTags === tag.name) {
                return (
                  <div
                    className={styles.box}
                    style={selectedStyle}
                    key={tag.name}
                  >
                    <span>
                      {tag.name} ({tag.counts})
                    </span>
                  </div>
                );
              } else {
                return (
                  <div className={styles.box} key={tag.name}>
                    <span
                      onClick={() => {
                        setSelectedTags(tag.name);
                        setToggle(false);
                      }}
                    >
                      {tag.name} ({tag.counts})
                    </span>
                  </div>
                );
              }
            })}
          </div>
        </div>
      ) : (
        <div></div>
      )}
      <div className={styles.main}>
        <div className={styles.title}>
          {usersTasks.length > 0 ? (
            usersTasks.map((task) => {
              if (
                selectedTags === "" ||
                task.tags.some((tag) => tag.name === selectedTags)
              ) {
                return (
                  <div key={task.id} className={styles.task}>
                    <div className={styles.title}>
                      <span>{task.title}</span>
                      <TaskDetail>{task}</TaskDetail>
                    </div>
                    <div className={styles.text}>
                      <div className={styles.tagarea}>
                        {task.tags.length !== 0 ? (
                          task.tags.map((tag) => {
                            return (
                              <span
                                className={styles.tag}
                                key={tag.id}
                                onClick={() => {
                                  setSelectedTags(tag.name);
                                }}
                              >
                                {tag.name}
                              </span>
                            );
                          })
                        ) : (
                          <span className={styles.notag}> タグなし </span>
                        )}
                      </div>
                      {task.text}
                    </div>
                  </div>
                );
              }
            })
          ) : (
            <div className={styles.notasks}>まだ積み上げがありません</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskList;
