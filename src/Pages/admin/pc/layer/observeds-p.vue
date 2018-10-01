<template>
  <div class="login-window">
    <el-row class="edit-header" :gutter="3">
      <el-col :span="24">
        <el-card>
          <div style="font-size:0.8em">
            This is all observeds
          </div>
        </el-card>
      </el-col>
      <el-col :span="24">
        <el-card>
          <el-table :data="tableData.data" border>
            <el-table-column label="#" prop="plan_id" width="60"></el-table-column>
            <el-table-column label="plan" prop="get_plan.plan_date" width="60"></el-table-column>
            <el-table-column label="finish" prop="get_plan.finish_date" width="60"></el-table-column>
            <el-table-column label="checklist" prop="checklist"></el-table-column>
            <el-table-column label="question" prop="question"></el-table-column>
            <el-table-column label="操作" width="50">
              <template slot-scope="scope">
                <el-row :gutter="2">
                  <el-col :span="24">
                    <el-button type="primary" size="mini" @click="viewFinishAudit(scope.row.plan_id)"><i class="el-icon-view"></i></el-button>
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
    <el-dialog title="Finish Audit" :visible.sync="viewFinishAuditDiag" width="90%" v-if="viewFinishAuditData.id">
      <el-row>
        <el-col :span="4">ID{{viewFinishAuditData.id}}</el-col>
        <el-col :span="4">User{{viewFinishAuditData.user.name}}</el-col>
        <el-col :span="6">Plan date{{viewFinishAuditData.plan_date}}</el-col>
        <el-col :span="6">Finish date{{viewFinishAuditData.finish_date}}</el-col>
        <el-col :span="4">Spend days{{viewFinishAuditData.spend_days}}</el-col>
        <el-col :span="4"><el-button type="info" style="width:80%" size="mini" @click.native="showPic=true">Show picture</el-button></el-col>
        <el-col :span="4"><el-button type="warning" style="width:80%" size="mini" @click.native="reaudit">Reaudit</el-button></el-col>
        <el-col :span="24" style="margin-top:10px">
          <el-table :data="viewFinishAuditData.tableData" max-height="500" border style="font-size:0.6em">
            <el-table-column type="index" width="30"></el-table-column>
            <el-table-column label="checklist" prop="checklist" width="100"></el-table-column>
            <el-table-column label="class" prop="class" width="60"></el-table-column>
            <el-table-column label="methods" prop="methods"></el-table-column>
            <el-table-column label="point" prop="point" width="100"></el-table-column>
            <el-table-column label="checklist_en" prop="checklist_en" width="100"></el-table-column>
            <el-table-column label="class_en" prop="class_en" width="80"></el-table-column>
            <el-table-column label="methods_en" prop="methods_en" width="100"></el-table-column>
            <el-table-column label="point_en" prop="point_en" width="100"></el-table-column>
            <el-table-column label="question" prop="question" width="100"></el-table-column>
          </el-table>
        </el-col>
      </el-row>
      <el-dialog title="Picture" :visible.sync="showPic" append-to-body>
        <el-carousel height="300px" trigger="click" type="card">
          <el-carousel-item v-for="item in viewFinishAuditData.picture" :key="item.index">
            <img style="width:300px" :src="item.path"/>
          </el-carousel-item>
        </el-carousel>
      </el-dialog>
    </el-dialog>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex";
export default {
  data() {
    return {
      viewFinishAuditDiag: false,
      showPic:false
    };
  },
  created() {
    this.layer_init_tableData();
    this.layer_get_all_observeds();
  },
  computed: {
    ...mapGetters({
      tableData: "layer_get_all_table_data",
      viewFinishAuditData: "layer_get_view_finish_audit"
    })
  },
  methods: {
    ...mapActions(["layer_get_all_observeds", "layer_get_finish_audit","layer_action_reaudit"]),
    ...mapMutations([
      "layer_init_tableData",
      "layer_set_page",
      "layer_set_count",
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
    viewFinishAudit(id) {
      this.layer_get_finish_audit({ id: id });
      this.viewFinishAuditDiag = true;
    },
    //重新进行审核
    reaudit(){
      this.layer_action_reaudit()
      this.showPic=false
      this.viewFinishAuditDiag=false
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.form-list {
  margin: 5px;
}

.edit-header {
  padding: 5px 0px 5px 0px;
}

.ivu-form-item {
  margin-bottom: 5px;
}
</style>
