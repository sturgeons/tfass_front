import http from "../../Utils/http";
import { setCookie8hour, getCookie, clearCookie,setCookie } from "../../Utils/store";

const state = {
  loading: 0,
  location:{
    current:"Chengdu",
    locationList:[
      {value:"http://www.yaoxin.top:82",lable:"Chengdu"},
      {value:"HTTP://www.yaoxin.top:83",lable:"Changchun"}
    ]
  }    
};

const getters = {
  loading: state => {
    return state.loading == 0;
  },
  view_get_loaction:state=>{
    return state.location
  }
};

const actions = {

};

const mutations = {
  view_change_location(state,{data}){
    setCookie("rootUrl",data,10)
  },
  change_loading_start(state) {
    state.loading = state.loading + 1;
  },
  change_loading_end(state) {
    state.loading = state.loading <= 0 ? 0 : state.loading - 1;
  }
};
export default {
  state,
  getters,
  actions,
  mutations
};
