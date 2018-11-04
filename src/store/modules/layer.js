import { http } from "../../Utils/http";
// import { rootUrl } from "../../Utils/config";
import router from "../../router/index";
import { Toast, Dialog } from "vant";
import { get_main_obj, getCookie } from "../../Utils/store";

const state = {
  userPlan: [], //用户的审核计划
  planData: {
    checklist_item: [],
    area: "",
    checklist: {
      name: ""
    }
  }, //用户的审核用的数据
  imgList: [], //分层审核的照片数据
  currentQuestionNum: 0, //当前分层审核的计数器
  submitDropzoneConfig: {
    url: "",
    thumbnailWidth: 120,
    maxFilesize: 3
  },
  currentObserved: "", //当前审核项
  observedList: [], //当前审核的发现项数组
  observedsByPlan: {
    observes: [],
    page: 1,
    total: 0,
    load: true
  }, //根据审核计划获取当前审核计划的发现项
  userList: [], //全部用户清单
  page: 1, //当前页码
  count: 15, //每页数据数量,
  tableData: {}, //table的源数据
  allChecklists: [], //所有的审核清单
  checklistByArea: {
    check_l_ist: []
  }, //当前审核区域下适用的审核单
  addNewChecklistData: {
    //新的审核单数据
    pid: 0,
    data: []
  },
  viewFinishAudit: {
    checklist_item: []
  }, //查看已经完成的审核单
  schedule: {
    currentMonth: "",
    data: []
  },
  addplan: {
    auditor: "",
    date: "",
    area: "",
    checklist: "",
    auditorOption: [],
    areaOption: [],
    checklistOption: []
  }, //添加新的审核计划用到的数据
  searchData: "" //搜索审核参数
};

const getters = {
  //获取去用户审核审核计划
  layer_get_user_plan: state => {
    return state.userPlan;
  },
  //获取审核计划单的详细内容
  layer_get_plan_data: state => {
    return state.planData;
  },
  //获取此审核下的所有上传照片
  layer_get_img_list: state => {
    var temp = [];
    state.imgList.find(n => {
      if (n.point == state.currentQuestionNum) {
        temp.push(n);
      }
    });
    return temp;
  },
  //获取用户审核进度 -1 未进入 0 首页 1 不在首页的审核问题 2 结束尾页
  layer_get_process: state => {
    if (state.currentQuestionNum == 0) return -1;
    if (state.currentQuestionNum == 1) return 0;
    if (state.currentQuestionNum <= state.planData.checklist_item.length)
      return 1;
    return 2;
  },
  //获取用户审核进度显示字符串
  layer_get_process_str: state => {
    return (
      state.currentQuestionNum + "/" + state.planData.checklist_item.length
    );
  },
  //获取照片上空间dropzone的配置参数
  layer_get_submit_config: state => {
    return state.submitDropzoneConfig;
  },
  //获取当前审核问题项信息
  layer_get_current_question_info: state => {
    return state.planData.checklist_item[state.currentQuestionNum - 1];
  },
  //获取所有发现项
  layer_get_observeds_list: state => {
    return state.observedList;
  },
  //获取根据计划查询到所有发现项
  layer_get_observeds_by_paln: state => {
    return state.observedsByPlan;
  },
  //获取用户列表
  layer_get_all_user_list: state => {
    let temp = [];
    temp = state.userList.filter(res => {
      return (res.value = res.name + "(" + res.code + ")");
    });
    return temp;
  },
  //获取tablsData信息
  layer_get_all_table_data: state => {
    return state.tableData;
  },
  //获取审核单列表
  layer_get_all_checklist_list: state => {
    let tempData = state.allChecklists;
    if (tempData.check_l_ist == undefined || tempData.check_l_ist.length == 0)
      return tempData;
    return tempData.filter(data => {
      let temp = state.checklistByArea.check_l_ist.find(cData => {
        return cData.id == data.id;
      });
      data.showActive = temp ? true : false;
      return data;
    });
  },
  //获取当前编辑的审核区域信息
  layer_get_current_checklist_by_area: state => {
    return state.checklistByArea;
  },
  //获取当前增加的审核单 信息
  layer_get_new_checklist_info: state => {
    return state.addNewChecklistData;
  },
  //获取查看的完成审核单
  layer_get_view_finish_audit: state => {
    let tempData = state.viewFinishAudit;
    let tableData = state.viewFinishAudit.checklist_item.filter(data => {
      data.question = "";
      for (let question of state.viewFinishAudit.question) {
        if (question.audit_id == data.id) {
          data.question = question.question;
        }
      }
      return data;
    });
    tempData.tableData = tableData;
    return tempData;
  },
  //获取审核计划列表
  layer_get_schedule_data: state => {
    return state.schedule.data;
  },
  //获取新增审核计划所用到的数据
  layer_get_schedule_add_new_need_data: state => {
    return state.addplan;
  }
};

const actions = {
  //获取当前用户下的审核计划
  layer_get_user_plan({ commit }) {
    http({
      url: "getLPA/userPlan",
      sCallback(res) {
        commit("layer_set_userPlan", {
          data: res.data
        });
      }
    });
  },
  //获取当前id的审核计划单
  layer_get_plan_list({ commit }, { id }) {
    http({
      url: "getLPA/fullChecklist/" + id,
      sCallback(res) {
        commit("layer_set_plan_list", {
          data: res
        });
      }
    });
  },
  //翻页
  layer_turn_page({ commit, getters, state }, { event }) {
    //从observeds中调取原有的observed
    var temp = "";
    state.observedList.find(n => {
      if (n.id == state.currentQuestionNum) {
        temp = n.question;
      }
    });
    if (temp == "" && state.currentObserved != "") {
      commit("layer_add_observed_from_list");
    }
    if (temp != "" && temp != state.currentObserved) {
      //删除原有数据-》添加
      commit("layer_delete_observed_from_list");
      if (state.currentObserved != "") {
        commit("layer_add_observed_from_list");
      }
    }
    commit("layer_set_currentPage", { event });
    commit("layer_set_current_obsered_from_list");
  },
  //提交完成的审核单
  layer_submit({ state }) {
    if (state.observedList.length <= 0) {
      Toast("必须有一个审核条目");
      return;
    }
    Dialog.confirm({
      title: "确定提交",
      message: "感谢您的贡献。"
    })
      .then(() => {
        http({
          type: "POST",
          url: "getLPA/submit",
          data: {
            data: state.observedList,
            plan_id: state.planData.id,
            checklist_id: state.planData.checklist_id
          },
          sCallback(res) {
            router.push("/main");
          }
        });
      })
      .catch(() => {});
  },
  //获取完成的历史计划详情
  layer_get_all_observed_by_plan({ commit, state }) {
    http({
      url: "getLPA/getUserObserve",
      params: {
        page: state.observedsByPlan.page
      },
      sCallback(res) {
        commit("layer_store_observeds_by_plan", { data: res });
      }
    });
  },
  //获取用户列表
  layer_get_all_user_list({ commit }) {
    http({
      url: "getUserList",
      sCallback(res) {
        commit("layer_set_all_user_list", { data: res });
      }
    });
  },
  //获取分层审核的用户列表
  layer_get_all_auditor({ commit, state }) {
    http({
      url: "getLPA/user/0",
      params: {
        page: state.page,
        count: state.count
      },
      sCallback(res) {
        commit("layer_store_tableData", { data: res });
      }
    });
  },
  //添加新用户
  layer_add_new_auditor({ dispatch }, { code_id, layer, pid }) {
    http({
      url: "getLPA/addAuditor",
      type: "POST",
      data: {
        code_id,
        layer,
        pid
      },
      sCallback(res) {
        dispatch("layer_get_all_auditor");
        Toast(res.msg);
      }
    });
  },
  //删除审核员
  layer_del_auditor({ dispatch }, { id }) {
    http({
      url: "getLPA/delAuditor/" + id,
      sCallback(res) {
        dispatch("layer_get_all_auditor");
        Toast(res.msg);
      }
    });
  },
  //获取分层审核的审核区域
  layer_get_all_area({ commit, state }) {
    http({
      url: "getLPA/area/0",
      params: {
        page: state.page,
        count: state.count
      },
      sCallback(res) {
        commit("layer_store_tableData", { data: res });
      }
    });
  },
  //添加新的审核区域
  layer_add_new_area({ dispatch }, { area }) {
    if (area == "") {
      Toast("添加区域不能为空");
      return;
    }
    http({
      url: "getLPA/addArea",
      type: "POST",
      data: {
        area: area
      },
      sCallback: function(res) {
        Toast("区域添加成功");
        dispatch("layer_get_all_area");
      }
    });
  },
  //更新获取所有的审核单列表-sample
  layer_get_all_checklist_list({ commit }) {
    http({
      url: "getLPA/getFullChecklistByArea",
      sCallback: function(res) {
        commit("layer_store_checklist_list", { data: res });
      }
    });
  },
  //获取当区域试用的的审核单列表
  layer_get_checklist_by_area({ commit }, { id }) {
    http({
      url: "getLPA/getChecklistByArea/" + id,
      sCallback: function(res) {
        commit("layer_store_checklist_by_area", { data: res });
      }
    });
  },
  //更新审核区域匹配的审核单
  layer_update_checklist_by_area({ dispatch, state }, { item, active }) {
    http({
      url: "getLPA/getChangeChecklistByArea",
      type: "POST",
      data: {
        id: state.checklistByArea.id,
        item,
        active
      },
      sCallback: function(res) {
        dispatch("layer_get_checklist_by_area", {
          id: state.checklistByArea.id
        });
        Toast(res.msg);
      }
    });
  },
  //获取审核单-目录
  layer_get_all_checklist_table({ commit }) {
    http({
      url: "getLPA/checklist/0",
      params: {
        page: state.page,
        count: state.count
      },
      sCallback(res) {
        commit("layer_store_tableData", { data: res });
      }
    });
  },
  //根据审核单的id获取 包含子条目的审核单
  layer_get_checklist_and_item_by_id({ commit }, { id }) {
    http({
      url: "getLPA/checklistById/" + id,
      sCallback(res) {
        commit("layer_store_new_checklist_update_data", { data: res, pid: id });
      }
    });
  },
  //添加新的分层审核单
  layer_post_new_checklist({ dispatch, state }, { name }) {
    if (name == "") {
      Toast("审核单名称不能为空");
      return;
    }
    http({
      type: "POST",
      url: "getLPA/addChecklist",
      data: {
        name: name,
        pid: state.addNewChecklistData.pid,
        data: state.addNewChecklistData.data
      },
      sCallback: function(res) {
        dispatch("layer_get_all_checklist_table");
        Toast("审核单添加成功");
      }
    });
  },
  //管理员获取所有的问题审核发现项
  layer_get_all_observeds({ commit }) {
    http({
      url: "getLPA/question/0",
      params: {
        page: state.page,
        count: state.count
      },
      sCallback: function(res) {
        commit("layer_store_tableData", { data: res });
      }
    });
  },
  //根据plan_id 获取已经完成的审核单
  layer_get_finish_audit({ commit }, { id }) {
    http({
      url: "getLPA/finishAudit/" + id,
      params: {
        page: state.page,
        count: state.count
      },
      sCallback: function(res) {
        commit("layer_store_view_finish_audit", { data: res });
      }
    });
  },
  //审核作废重新审核
  layer_action_reaudit({ dispatch, state }) {
    http({
      url: "getLPA/reaudit/" + state.viewFinishAudit.id,
      sCallback: function(res) {
        dispatch("layer_get_all_observeds");
        Toast("重新初始化此次审核。。。");
      }
    });
  },
  //获取当月的审核计划
  layer_get_current_month_schedule({ commit }, { date }) {
    date = date == "" ? state.schedule.currentMonth : date;
    http({
      url: "getLPA/PlanByMonth",
      params: {
        month: date
      },
      sCallback: function(res) {
        var tempData = [];
        for (let i = 0; i < res.length; i++) {
          let css = "undone";
          if (res[i].status == "1") {
            css = "done";
          }
          tempData.push({
            title: res[i].user.name + "--" + res[i].area.area,
            start: res[i].plan_date,
            cssClass: css
          });
        }
        let data = {};
        data.arr = tempData;
        data.date = date;
        commit("layer_schedule_current_month_data", { data: data });
      }
    });
  },
  //shcedule 获取审核员清单和审核区域清单
  layer_schedule_get_auditor_area({ commit }) {
    http({
      url: "getLPA/user/0",
      params: {
        count: 100
      },
      sCallback(res) {
        var data = {};
        data.auditor = res;
        commit("layer_store_schedule_audtor_area", { data: data });
      }
    });
    http({
      url: "getLPA/area/0",
      params: {
        count: 100
      },
      sCallback(res) {
        var data = {};
        data.area = res;
        commit("layer_store_schedule_audtor_area", { data: data });
      }
    });
  },
  //提交新的审核计划
  layer_submit_new_schedule({ dispatch }, { auditor, area, checklist, date }) {
    http({
      url: "getLPA/addPlan",
      type: "POST",
      data: {
        auditor_id: auditor,
        area_id: area,
        checklist_id: checklist,
        plan_date: date
      },
      sCallback: function(res) {
        Toast("新计划添加成功,刷新列表");
        dispatch("layer_get_current_month_schedule", { date: "" });
      }
    });
  },
  //获取审核单-目录
  layer_get_all_checklist_table({ commit }) {
    http({
      url: "getLPA/checklist/0",
      params: {
        page: state.page,
        count: state.count
      },
      sCallback(res) {
        commit("layer_store_tableData", { data: res });
      }
    });
  },
  //获取分层审核计划-目录
  layer_get_all_plan_table({ commit, state }) {
    http({
      url: "getLPA/Plan/" + state.searchData,
      params: {
        page: state.page,
        count: state.count
      },
      sCallback(res) {
        commit("layer_store_tableData", { data: res });
      }
    });
  },
  //删除审核计划
  layer_del_plan({ dispatch }, { id }) {
    http({
      url: "getLPA/delPlan",
      type: "POST",
      data: {
        id: id
      },
      sCallback: function(res) {
        dispatch("layer_get_all_plan_table");
        Toast("计划删除成功。。。");
      }
    });
  }
};

const mutations = {
  //存储获取到的分层审核区域和审核员清单
  layer_store_schedule_audtor_area(state, { data }) {
    if (data.area) {
      state.addplan.areaOption = data.area.data;
    }
    if (data.auditor) {
      state.addplan.auditorOption = data.auditor.data;
    }
    if (data.checklist) {
      state.addplan.checklistOption = data.checklist;
    }
  },
  //初始化页面 页码定位首页
  layer_init_page(state) {
    //初始化observedsByPlan
    state.observedsByPlan.page = 1;
    state.observedsByPlan.observes = [];
    state.observedsByPlan.load = true;
  },
  //翻页 +1后翻  -1 前翻
  layer_set_currentPage(state, { event }) {
    state.currentQuestionNum = state.currentQuestionNum + event;
    state.submitDropzoneConfig.url =
      getCookie("rootUrl") +
      "/getLPA/submitPic/" +
      state.planData.id +
      "/" +
      state.currentQuestionNum;
  },
  //设置用户的审核计划
  layer_set_userPlan(state, { data }) {
    state.userPlan = data;
  },
  //设置审核单
  layer_set_plan_list(state, { data }) {
    state.planData = data;
    state.imgList = data.picture;
    state.currentQuestionNum = 0;
  },
  //存储照片回调函数
  layer_store_pic(state, { r, s }) {
    var obj = {};
    obj["point"] = s.point;
    obj["path"] = s.path;
    state.imgList.push(obj);
  },
  //存储当前问题发现项
  layer_store_current_observed(state, { value }) {
    state.currentObserved = value;
  },
  //删除当前id下的发现项
  layer_delete_observed_from_list(state) {
    var tempIndex = state.observedList.findIndex((value, index, arr) => {
      return (value.id = state.currentQuestionNum);
    });
    state.observedList.splice(tempIndex, 1);
  },
  //将当前发现项添加到list中
  layer_add_observed_from_list(state) {
    var obj = {};
    obj["id"] = state.currentQuestionNum;
    obj["question"] = state.currentObserved;
    state.observedList.push(obj);
    state.currentObserved = "";
  },
  //从observeds中调取原有的observed
  layer_set_current_obsered_from_list(state) {
    var temp = "";
    state.observedList.find(n => {
      if (n.id == state.currentQuestionNum) {
        temp = n.question;
      }
    });
    state.currentObserved = temp;
  },
  //存储 根据审核计划获取到的历史审核问题项
  layer_store_observeds_by_plan(state, { data }) {
    state.observedsByPlan.observes = state.observedsByPlan.observes.concat(
      data.data
    );
    state.observedsByPlan.page = state.observedsByPlan.page + 1;
    if (data.total < state.observedsByPlan.page * 3) {
      state.observedsByPlan.load = false;
    }
  },
  //设置用户列表数据
  layer_set_all_user_list(state, { data }) {
    state.userList = data;
  },
  //存储获取到table数据
  layer_store_tableData(state, { data }) {
    state.tableData = data;
  },
  //初始化tableData数据
  layer_init_tableData(state) {
    state.tableData = {};
    state.page = 1;
    state.count = 15;
  },
  //设置页码数
  layer_set_page(state, { value }) {
    state.page = value;
  },
  //设置每页数量
  layer_set_count(state, { value }) {
    state.count = value;
  },
  //存储审核所有审核列表清单
  layer_store_checklist_list(state, { data }) {
    state.allChecklists = data;
  },
  //存储根据审核区域请求到的审核单列表
  layer_store_checklist_by_area(state, { data }) {
    state.checklistByArea = data;
  },
  //存储获取到的审核表 用于更新保存
  layer_store_new_checklist_update_data(state, { data, pid }) {
    state.addNewChecklistData.data = data;
    state.addNewChecklistData.pid = pid;
  },
  //修改需要更新的审核表 元素
  layer_set_new_checklist_item(state, { data }) {
    if (data.index == -1) {
      var arr = {};
      for (var ss in data) {
        arr[ss] = data[ss];
      }
      state.addNewChecklistData.data.push(arr);
    } else {
      for (var ss in data) {
        state.addNewChecklistData.data[data.index][ss] = data[ss];
      }
    }
    if (data.del == true) {
      state.addNewChecklistData.data.splice(data.index, 1);
    }
  },
  //存储当前查看的审核单包含审核问题项目
  layer_store_view_finish_audit(state, { data }) {
    state.viewFinishAudit = data;
  },
  //存储计划页面
  layer_schedule_current_month_data(state, { data }) {
    state.schedule.data = data.arr;
    state.schedule.currentMonth = data.date;
  },
  //设置审核计划的搜索参数
  layer_set_search_data(state, { data }) {
    state.searchData = data;
  }
};
export default {
  state,
  getters,
  actions,
  mutations
};
