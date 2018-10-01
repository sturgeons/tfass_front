import { http } from "../../Utils/http";
import router from "../../router/index";
import { setCookie8hour, getCookie, clearCookie } from "../../Utils/store";
import { Toast } from "vant";

const state = {
  user: "",
  password: "",
  name: "",
  scope:[]
};

const getters = {
  //获取用户名
  user_get_name: state => {
    return state.name;
  },
  //获取用户admin的管理清单
  user_get_scope:state=>{
    return state.scope
  }
};

const actions = {
  //登录事件
  user_login({ commit, dispatch }, { user, password }) {
    if (user == "" || password == "") {
      Toast("账号密码不能为空！");
      return;
    }
    http({
      url: "/login",
      type: "POST",
      data: {
        code: user,
        password: password
      },
      sCallback(res) {
        if (res.token == undefined) {
          //登录失败
          Toast(res.msg);
        } else {
          //登录成功
          setCookie8hour("token", res.token);
          commit("user_save_userdata", {
            user,
            password
          });
          router.replace("/main");
        }
      }
    });
  },
  //验证token有效
  user_check_token({ commit, dispatch, getters }) {
    http({
      try: 5,
      url: "/checklogin",
      type: "POST",
      data: {
        token: getCookie("token")
      },
      sCallback(res) {
        if (res.errorCode && res.errorCode == 200) {
          clearCookie("token");
          dispatch("token_extended");
        } else {
          commit("user_change_name", {
            name: res.name,
            scope: res.scope
          });
        }
      }
    });
  },
  //token 延长有效期
  token_extended({ state, dispatch }) {
    if (state.user != "" && state.password != "") {
      dispatch("user_login", {
        user: state.user,
        password: state.password
      });
    } else {
      dispatch("user_logout");
    }
  },
  //注销
  user_logout({ commit }) {
    commit("user_clear");
    console.log("注销");
    router.replace("/");
  },
  //检查超级用户权限->如果没有权限 跳转到/main页面
  user_check_power_user({state}){
    http({
      url: "/checklogin",
      type: "POST",
      data: {
        token: getCookie("token")
      },
      sCallback(res) {
        if(res.scope.length<1){
          router.push('/main')
        }
      },
      eCallback(err){
        router.push('/main')
      }
    });
  }
};

const mutations = {
  //存储账号密码
  user_save_userdata(state, { user, password }) {
    state.user = user;
    state.password = password;
  },
  //清除用户名和密码、token
  user_clear(state) {
    state.user = "";
    state.password = "";
    clearCookie("token");
  },
  //更改用户信息-姓名
  user_change_name(state, { name, scope }) {
    state.name = name;
    state.scope = scope;
  }
};
export default {
  state,
  getters,
  actions,
  mutations
};
