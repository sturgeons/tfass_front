<template>
  <div class="login-window">
    <el-row class="edit-header" :gutter="3">
      <el-col :span="24" style="margin-bottom:10px">
        <el-row :gutter="5">
          <el-col :span="8">
            <el-select v-model="searchType" placeholder="">
              <el-option v-for="item in ['auditor_id=','checklist_id=','area_id=','id=','plan_date=','status=']" :key="item.index" :value="item"></el-option>
            </el-select>
          </el-col>
          <el-col :span="8">
            <el-input v-model="searchData"></el-input>
          </el-col>
          <el-col :span="8">
            <el-button type="info" @click="search">Search</el-button>
          </el-col>
        </el-row>
      </el-col>
      <el-col :span="24">
        <el-card>
          <el-table :data="tableData.data" border :row-class-name="showinfo">
            <el-table-column label="#" prop="id" width="60"></el-table-column>
            <el-table-column label="checklist" prop="checklist.name"></el-table-column>
            <el-table-column label="area" prop="area.area" width="130"></el-table-column>
            <el-table-column label="days" prop="spend_days" width="60"></el-table-column>
            <el-table-column label="plan_date" prop="plan_date" width="100"></el-table-column>
            <el-table-column label="finish_date" prop="finish_date" width="100"></el-table-column>
            <el-table-column label="auditor" prop="user.name" width="70"></el-table-column>
            <el-table-column label="操作" width="90">
              <template slot-scope="scope">
                <el-row :gutter="2">
                  <el-col :span="12">
                    <el-tooltip placement="top">
                      <div slot="content">checklist_id: {{scope.row.checklist_id}}<br/>auditor_id: {{scope.row.auditor_id}}<br/>area_id: {{scope.row.area_id}}<br/>status: {{scope.row.status}}</div>
                      <el-button><i class="el-icon-view"></i></el-button>
                    </el-tooltip>
                  </el-col>
                  <el-col :span="12">
                    <el-button :disabled="scope.row.status==0" type="danger" size="mini" @click="layer_del_plan(scope.row.id)">
                      <i class="el-icon-delete"></i>
                    </el-button>
                  </el-col>
                </el-row>
              </template>
            </el-table-column>
          </el-table>
          <div class="block">
            <el-pagination :total="tableData.total" :current-page="tableData.current_page" :page-size="15" :page-sizes="[15,30,60]" @size-change="handleSizeChange" @current-change="handleCurrentChange" layout="total,sizes,prev,pager,next, jumper"></el-pagination>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex";
import fullCalendar from "vue-fullcalendar";
export default {
  data() {
    return {
      searchType: "",
      searchData: ""
    };
  },
  components: {
    fullCalendar
  },
  created() {
    this.layer_init_tableData();
    this.layer_set_search_data({ data: 0 });
    this.layer_get_all_plan_table();
  },
  computed: {
    ...mapGetters({
      tableData: "layer_get_all_table_data"
    })
  },
  methods: {
    ...mapActions(["layer_get_all_plan_table", "layer_del_plan"]),
    ...mapMutations([
      "layer_init_tableData",
      "layer_set_page",
      "layer_set_count",
      "layer_set_search_data"
    ]),
    //修改显示数量
    handleSizeChange(val) {
      this.layer_set_count({
        value: val
      });
      this.layer_get_all_plan_table();
    },
    //跳转页面
    handleCurrentChange(val) {
      this.layer_set_page({
        value: val
      });
      this.layer_get_all_plan_table();
    },
    showinfo({ row, rowIndex }) {
      if (row.status === 0) {
        return "warning-row";
      }
    },
    //根据条件查找
    search() {
      let VsearchData =
        this.searchData == "" ? 0 : this.searchType + this.searchData;
      this.layer_set_search_data({ data: VsearchData });
      this.layer_get_all_plan_table();
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
