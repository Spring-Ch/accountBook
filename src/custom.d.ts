// 全局定义recordItem类型
type recordItem = {
  selectedTag: string[];
  note: string;
  type: string;
  amount: number;
  createAt?: Date;
};
// 全局定义Tag类型
type Tag = {
  id: string;
  name: string;
};
