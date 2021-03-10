// 全局定义recordItem类型
type RecordItem = {
  id?: string;
  selectedTag: Tag;
  note: string;
  type: string;
  amount: string;
  createAt?: string;
};
// 全局定义Tag类型
type Tag = {
  id: string;
  name: string;
  iconName: string;
  type: string;
};
type ResultItem = { title: string; items: RecordItem[]; total: number };
