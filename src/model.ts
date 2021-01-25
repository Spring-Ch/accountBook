const model = {
  // 获取localStorage中存取数据
  fetch() {
    return JSON.parse(
      window.localStorage.getItem("recordList") || "[]"
    ) as recordItem[];
  },
  // 将数据保存到localStorage中
  save(data: recordItem[]) {
    window.localStorage.setItem("recordList", JSON.stringify(data));
  },
  // 简单的深拷贝
  clone(data: recordItem) {
    return JSON.parse(JSON.stringify(data));
  },
};
export default model;
