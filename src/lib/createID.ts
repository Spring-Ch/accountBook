let id = parseInt(window.localStorage.getItem("tagID") || "11") || 11;
function createID() {
  id++;
  window.localStorage.setItem("tagID", id.toString());
  return id.toString();
}
export default createID;
