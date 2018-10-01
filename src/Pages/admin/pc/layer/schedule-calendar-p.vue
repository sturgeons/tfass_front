<template>
  <div class="login-window">
    <el-row class="edit-header" :gutter="3">
      <el-col :span="24">
        <el-card>
          <div style="font-size:0.8em">
            <full-calendar :events="scheduleData" @changeMonth="handleChangeMonth" @dayClick="addplanByDay"></full-calendar>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-dialog title="Add auditor" v-if="addplan.show" :visible.sync="addplan.show" width="50%">
      <el-form label-width="70px">
        <el-form-item label="Date">
          <el-input v-model="addplan.date" placeholder="" disabled></el-input>
        </el-form-item>
        <el-form-item label="Auditor">
          <el-select v-model="addplan.auditor" placeholder="选择审核">
            <el-option v-for="item in addNewScheduleNeedData.auditorOption" :key="item.index" :value="item.code_id" :label="item.info.name+item.info.code+' (L'+item.layer+')'"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="Area">
          <el-select v-model="addplan.area" placeholder="选择审核区域" @change="get_checklist_data">
            <el-option v-for="item in addNewScheduleNeedData.areaOption" :key="item.index" :value="item.id" :label="item.area"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="Checklist">
          <el-select v-model="addplan.checklist" placeholder="选择审核单">
            <el-option v-for="item in checklist.check_l_ist" :key="item.index" :value="item.id" :label="item.name"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer">
        <el-form>
          <el-form-item label="">
            <el-button type="primary" @click="handleSubmitSchedule">Add</el-button>
          </el-form-item>
        </el-form>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex";
import fullCalendar from "vue-fullcalendar";
export default {
  data() {
    return {
      showPic: false,
      addplan: {
        show: false,
        auditor: "",
        date: "",
        area: "",
        checklist: "",
        auditorOption: [],
        areaOption: [],
        checklistOption: []
      }
    };
  },
  components: {
    fullCalendar
  },
  created() {
    this.layer_init_tableData();
    this.layer_schedule_get_auditor_area();
    this.layer_store_checklist_by_area({ data: {} });
  },
  computed: {
    ...mapGetters({
      tableData: "layer_get_all_table_data",
      scheduleData: "layer_get_schedule_data",
      checklist: "layer_get_current_checklist_by_area",
      addNewScheduleNeedData: "layer_get_schedule_add_new_need_data"
    })
  },
  methods: {
    ...mapActions([
      "layer_get_current_month_schedule",
      "layer_schedule_get_auditor_area",
      "layer_get_checklist_by_area",
      "layer_submit_new_schedule"
    ]),
    ...mapMutations([
      "layer_init_tableData",
      "layer_set_page",
      "layer_set_count",
      "layer_store_checklist_by_area"
    ]),
    //修改显示数量
    handleSizeChange(val) {
      this.layer_set_count({
        value: val
      });
      this.layer_get_all_observeds();
    },
    //跳转页面
    handleCurrentChange(val) {
      this.layer_set_page({
        value: val
      });
      this.layer_get_all_observeds();
    },
    //跳转月份
    handleChangeMonth(s, e, c) {
      this.layer_get_current_month_schedule({ date: c });
    },
    //添加新的审核计划
    addplanByDay(d, events) {
      this.addplan.date =
        d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
      this.addplan.show = true;
    },
    //获取审核单
    get_checklist_data() {
      this.layer_get_checklist_by_area({ id: this.addplan.area });
      this.addplan.checklist = "";
    },
    //提交审核计划
    handleSubmitSchedule() {
      this.layer_submit_new_schedule({
        auditor: this.addplan.auditor,
        area: this.addplan.area,
        checklist: this.addplan.checklist,
        date: this.addplan.date
      });
      this.addplan = {
        show: false,
        auditor: "",
        date: "",
        area: "",
        checklist: ""
      };
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.undone {
  background-color: #f00 !important;
}
</style>
