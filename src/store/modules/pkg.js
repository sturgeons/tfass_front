import {http} from '../../Utils/http'
import {getCookie} from '../../Utils/store'
const state={
    product_list:{},
    VocAllInfo:{},
    current_type:"",
    type_info:{},
    callback :null,
    vocinfo:{},
    bakColor:"green"
}

const getters={
    pkg_get_product_list:state=>{
        return state.product_list;
    },
    pkg_get_VocAllInfo:state=>{
        return state.VocAllInfo
    },
    pkg_get_type_Info:state=>{
        return state.type_info
    },
    //获取record的返回信息
    get_callback: state => {
        return state.callback
    },
    pkg_get_voc_info: state => {
        return state.vocinfo
    },
    //获取record结果的背景颜色
    pkg_get_record_color:state=>{
        return state.bakColor
    }
}

const actions={
    pkg_get_product_list({ commit }){
        http({
            url: '/swsPKG/getProductList',
            params: {
            },
            sCallback(res) {
                commit("pkg_get_product_list", { data: res })
            }
        });
    },
    pkg_get_VocAllInfo({commit}){
        http({
            url: '/swsPKG/getVocAllInfo',
            params: {
            },
            sCallback(res) {
                commit("pkg_get_VocAllInfo", { data: res })
            }
        });
        
    }, 
    pkg_get_type_Info({ commit },{type}) {
        http({
            url: '/swsPKG/getTypeInfo',
            type:"POST",
            data: {
                type:type
            },
            sCallback(res) {
                commit("pkg_get_type_Info", { data: res })
            }
        });
    },
    //发送打包标签
    pkg_post_record({ state, commit, dispatch }, { code,type }) {
        var that=this;
        http({
            url: '/swsPKG/record',
            type: "POST",
            data: {
                type: type,
                code: code,
                token: getCookie("token")
            },
            sCallback(res) {
                commit("pkg_post_record_callback", { data: res })
                dispatch("pkg_get_type_Info", { type: state.type_info.type });
                commit("update_info_color",{res})
        
            },
            eCallback(err){
                commit("pkg_post_record_callback", { data: err.data })
                dispatch("pkg_get_type_Info", { type: state.type_info.type });
                commit("update_info_color",{res:err.data})
            }
        });
       
    }, 
    pkg_get_voc({ commit }) {
        var that = this;
        http({
            url: '/swsPKG/getVocAllInfo',
            sCallback(res) {
                commit("pkg_get_voc", { data: res })
            }
        });
    },
    pkg_update_resttime({commit}){
        commit("pkg_update_voc");
    },
    pkg_pre_assembly({ state,commit,dispatch }) {
        http({
            url: 'swsPKG/print/' + state.type_info.id,
            sCallback(res) {
                dispatch("pkg_get_type_Info", { type:state.type_info.type });
            },
            eCallback(err) {
                dispatch("pkg_get_type_Info", { type: state.type_info.type });
            }
        });
    }
}

const mutations={
    pkg_get_product_list(state,{data}){
        state.product_list=data;
    },
    pkg_get_VocAllInfo(state, { data }) {
        state.product_list = data;
    },
    set_current_type(state, { data }) {
        state.current_type = data;
    },
    pkg_get_type_Info(state, { data }) {
        state.type_info = data;
    },
    pkg_post_record_callback(state,{data}){
        state.callback = data.msg;
    },
    //获取voc库存位置的信息
    pkg_get_voc(state,{data}) {
       data.forEach(ele => {
           var resttime = parseInt(8 * 3600 - (new Date().getTime() - new Date(ele.update_time).getTime()) / 1000)
           ele['resttime'] = ele.packid == "0" ? "可入库" : resttime <= 0 ? "可出库" : resttime
           ele['color'] = ele.packid == "0" ? "green" : resttime <= 0 ? "greenyellow":"yellow"
            
        });
        state.vocinfo = data;
    },
    //更新record的信息
    update_info_color(state,{res}) {
        state.bakColor=res.errorCode!=undefined?"red":"green"
    },

}
export default{
    state,
    getters,
    actions,
    mutations
}