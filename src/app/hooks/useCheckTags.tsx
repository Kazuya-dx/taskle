import { Task } from "../types/task";

const useCheckTags = () => {
  const tmpTags: { name: string; counts: number }[] = [];
  const checkTags = (tasks: Task[]) => {
    tasks.forEach((task) => {
      task.tags.forEach((tag) => {
        let isEmpty = true;
        for (let i = 0; i < tmpTags.length; i++) {
          if (tmpTags[i].name === tag.name) {
            tmpTags[i].counts++;
            isEmpty = false;
            break;
          }
        }
        if (isEmpty) {
          tmpTags.push({ name: tag.name, counts: 1 });
        }
      });
    });
    return tmpTags;
  };
  return checkTags;
};

export default useCheckTags;
