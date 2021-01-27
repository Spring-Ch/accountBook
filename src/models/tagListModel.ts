type Tag = {
  id: string;
  name: string;
};
const tagListModel = {
  // 获取localStorage中存取数据
  fetch() {
    return JSON.parse(window.localStorage.getItem("tagList") || "[]");
  },
  // 将数据保存到localStorage中
  save(data: Tag[]) {
    window.localStorage.setItem("tagList", JSON.stringify(data));
  },
};
export default tagListModel;
