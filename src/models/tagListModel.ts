import createID from "@/lib/createID.ts";

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
  // 新建标签,返回值是含有新标签的标签数组
  create() {
    const newTagName = window.prompt("请输入新的标签名") as string;
    const tags = this.fetch();
    let newTags = tags;
    const names: string[] = tags.map((item: Tag) => item.name);
    if (newTagName === "" || newTagName.trim() === "") {
      window.alert("标签名不能为空");
    } else if (names.indexOf(newTagName) >= 0) {
      window.alert("标签名已存在，请输入新的标签名");
    } else {
      const tagID = createID();
      newTags = [...tags, { id: tagID, name: newTagName }];
    }
    return newTags;
  },
};
export default tagListModel;
