import Vue from "vue";
import Vuex, { Store } from "vuex";
import createID from "@/lib/createID.ts";
import router from "@/router";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    // 标签数组变量
    tagList: [] as Tag[],
    // 记录收入支出数组
    recordList: [] as RecordItem[],
  },
  mutations: {
    // 获取记录收入支出数组
    getRecordList(state) {
      state.recordList = JSON.parse(
        window.localStorage.getItem("recordList") || "[]"
      );
    },
    // 保存记录收入支出数组
    editRecordList(state, newRecord) {
      state.recordList.push(newRecord);
      window.localStorage.setItem(
        "recordList",
        JSON.stringify(state.recordList)
      );
    },
    // 获取标签数组
    getTagList(state) {
      state.tagList = JSON.parse(
        window.localStorage.getItem("tagList") || "[]"
      );
    },
    // 将数据保存到localStorage中
    saveTagList(state) {
      window.localStorage.setItem("tagList", JSON.stringify(state.tagList));
    },
    // 新建标签
    createTag(state) {
      const newTagName = window.prompt("请输入新的标签名") as string;
      const names: string[] = state.tagList.map((item: Tag) => item.name);
      if (newTagName === "" || newTagName.trim() === "") {
        window.alert("标签名不能为空");
      } else if (names.indexOf(newTagName) >= 0) {
        window.alert("标签名已存在，请输入新的标签名");
      } else {
        const tagID = createID();
        state.tagList.push({ id: tagID, name: newTagName });
        store.commit("saveTagList");
      }
    },
    // 修改标签名
    editTag(state, newTag) {
      const names = state.tagList.map((item) => item.name);
      if (newTag.name === "" || newTag.name.trim() === "") {
        window.alert("标签名不能为空");
      } else if (names.indexOf(newTag.name) >= 0) {
        window.alert("标签名已存在，请重新输入");
      } else {
        const index = state.tagList.findIndex((item) => item.id === newTag.id);
        state.tagList.splice(index, 1, newTag);
        store.commit("saveTagList");
        window.alert("标签修改成功");
      }
    },
    // 删除标签名
    deleteTag(state, newTag) {
      const index = state.tagList.findIndex((item) => item.id === newTag.id);
      if (index >= 0) {
        state.tagList.splice(index, 1);
        store.commit("saveTagList");
        router.push("/labels");
      } else {
        window.alert("标签删除失败");
      }
    },
  },

  getters: {},
});

export default store;
