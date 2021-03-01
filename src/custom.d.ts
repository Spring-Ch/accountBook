// 全局定义recordItem类型
type RecordItem = {
  selectedTag: Tag;
  note: string;
  type: string;
  amount: number;
  createAt?: string;
};
// 全局定义Tag类型
type Tag = {
  id: string;
  name: string;
  iconName: string;
  type: string;
};
