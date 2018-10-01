var saveObj = {}
//设置vue的主体
export const set_main_obj = (obj) => {
  saveObj = obj
}
//获取vue的主体
export const get_main_obj = (obj) => {
  return saveObj
}
//设置cookie
export const setCookie = (cname, cvalue, exdays) => {
  var d = new Date();
  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
  var expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + "; " + expires;
}
//设置cookie 1天
export const setCookie8hour = (cname, cvalue) => {
  setCookie(cname, cvalue, 1/3);
}
//获取cookie
export const getCookie = (cname) => {
  var name = cname + "=";
  var ca = document.cookie.split(';');
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') c = c.substring(1);
    if (c.indexOf(name) != -1) return c.substring(name.length, c.length);
  }
  return "";
}
//清除cookie 
export const clearCookie = (name) => {
  setCookie(name, "", -1);
}
