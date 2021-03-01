let id = parseInt(window.localStorage.getItem("myID") || "11") || 11;
function createID() {
  id++;
  window.localStorage.setItem("myID", id.toString());
  return id.toString();
}
export default createID;
