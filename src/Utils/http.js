import axios from "axios";
import { get_main_obj, getCookie } from "./store";

export const http = para => {
  para.type = para.type ? para.type : "GET"; //发送方式
  para.params = para.params ? para.params : {}; //发送参数
  para.data = para.data ? para.data : {}; //post数据
  para.try = para.try ? para.try : 0; //重试次数
  if (get_main_obj().$store != undefined) {
    get_main_obj().$store.commit("change_loading_start");
  } //开始蒙版
  console.log(para); //测试用参数
  let a = axios({
    url: para.url, //请求的接口，在请求的时候，如axios.get(url,config);这里的url会覆盖掉config中的url
    method: para.type, // 请求方法同上
    baseURL: getCookie("rootUrl"), // 基础url前缀
    headers: {
      // 请求头信息
      "Content-Type": "application/json",
      token: getCookie("token")
    },
    params: para.params, //parameter参数
    data: para.data, //post参数，使用axios.post(url,{},config);如果没有额外的也必须要用一个空对象，否则会报错
    timeout: 5000, //设置超时时间
    responseType: "json" //返回数据类型
  })
    .then(res => {
      comFunction(para);
      successFunction(para, res);
    })
    .catch(err => {
      comFunction(para);
      errFunction(para, err);
    });
};

//成功回调
function successFunction(para, res) {
  if (para.sCallback) {
    para.sCallback(res.data);
  }
}
//失败回调
function errFunction(para, err) {
  console.log(err);
  if (para.eCallback) {
    para.eCallback(err.response);
  } else {
    var info = "";
    for (let a in err.response) {
      info = info + a;
    }
    alert(info);
  }

  if (para.try > 0) {
    //重新发送axios
    para.try = para.try - 1;
    http(para);
  }
}
//通用调用
function comFunction(para) {
  if (get_main_obj().$store != undefined) {
    get_main_obj().$store.commit("change_loading_end");
  }
}
