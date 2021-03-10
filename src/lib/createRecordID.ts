let id = parseInt(window.localStorage.getItem("recordID") || "0") || 0;
function createRecordID() {
  id++;
  window.localStorage.setItem("recordID", id.toString());
  return id.toString();
}
export default createRecordID;
