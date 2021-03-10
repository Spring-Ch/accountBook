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
    record: {
      selectedTag: {
        id: "0",
        name: "餐饮",
        type: "-",
        iconName: "catering",
      },
      note: "",
      type: "-",
      amount: 0,
    },
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
      router.push("/item");
    },
    //获取指定id的record
    getRecordByID(state, ID) {
      return state.recordList.filter((i) => i.id === ID);
    },
    // 获取标签数组
    getTagList(state) {
      state.tagList = JSON.parse(
        window.localStorage.getItem("tagList") || "[]"
      );
      if (state.tagList.length === 0) {
        (state.tagList = [
          { id: "0", name: "餐饮", type: "-", iconName: "catering" },
          { id: "1", name: "交通", type: "-", iconName: "traffic" },
          { id: "2", name: "医疗", type: "-", iconName: "medical" },
          { id: "3", name: "日用品", type: "-", iconName: "commodity" },
          { id: "4", name: "娱乐", type: "-", iconName: "amusement" },
          { id: "5", name: "数码", type: "-", iconName: "digital" },
          { id: "6", name: "家居", type: "-", iconName: "home" },
          { id: "7", name: "工资", type: "+", iconName: "salary" },
          { id: "8", name: "奖金", type: "+", iconName: "bonus" },
          { id: "9", name: "补贴", type: "+", iconName: "subsidy" },
          { id: "10", name: "理财", type: "+", iconName: "invest" },
          { id: "11", name: "兼职", type: "+", iconName: "part-time" },
        ]),
          store.commit("saveTagList");
      }
    },
    // 将标签数据保存到localStorage中
    saveTagList(state) {
      window.localStorage.setItem("tagList", JSON.stringify(state.tagList));
    },
    // 删除记账信息
    deleteRecord(state, ID) {
      const index = state.recordList.findIndex((i) => i.id === ID);
      if (index >= 0) {
        state.recordList.splice(index, 1);
        window.localStorage.setItem(
          "recordList",
          JSON.stringify(state.recordList)
        );
        router.push("/item");
      } else {
        window.alert("信息删除失败");
      }
    },
    // 新建标签
    createTag(state) {
      const newTagName = window.prompt("请输入新的标签名") as string;
      const names: string[] = state.tagList.map((item: Tag) => item.name);
      if (newTagName === null) {
        return;
      }
      if (newTagName.trim() === "" || newTagName === "") {
        window.alert("标签名不能为空");
      } else if (names.indexOf(newTagName) >= 0) {
        window.alert("标签名已存在，请输入新的标签名");
      } else {
        const tagID = createID();
        const iconN = state.record.type === "-" ? "output" : "income";
        state.tagList.push({
          id: tagID,
          name: newTagName,
          type: state.record.type,
          iconName: iconN,
        });
        store.commit("saveTagList");
      }
    },
    // 修改标签名---待删除
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
    // 删除标签名--待删除
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
    // 点击Tabs后，切换record
    toggleRecord(state) {
      if (state.record.type === "-") {
        state.record = {
          selectedTag: {
            id: "0",
            name: "餐饮",
            type: "-",
            iconName: "catering",
          },
          note: "",
          type: "-",
          amount: 0,
        };
      } else if (state.record.type === "+") {
        state.record = {
          selectedTag: {
            id: "7",
            name: "工资",
            type: "+",
            iconName: "salary",
          },
          note: "",
          type: "+",
          amount: 0,
        };
      } else {
        window.alert("出错了！");
      }
    },
    // 初始化record
    initialRecord(state) {
      state.record = {
        selectedTag: {
          id: "0",
          name: "餐饮",
          type: "-",
          iconName: "catering",
        },
        note: "",
        type: "-",
        amount: 0,
      };
    },
  },
});

export default store;
