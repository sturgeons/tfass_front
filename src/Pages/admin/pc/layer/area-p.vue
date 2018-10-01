<template>
  <div class="login-window">
    <el-row class="edit-header" :gutter="5">
      <el-col :span="14">
        <el-card>
          <el-table :data="tableData.data">
            <el-table-column label="#" prop="id" width="70"></el-table-column>
            <el-table-column label="area" prop="area"></el-table-column>
            <el-table-column label="操作" width="80">
              <template slot-scope="scope">
                  <el-row :gutter="3">
                    <el-col :span="24"><el-button type="primary" size="mini" @click="layer_get_checklist_by_area({id:scope.row.id})">VIEW</el-button></el-col>
                  </el-row>
              </template>
            </el-table-column>
          </el-table>
          <div class="block">
            <el-pagination :total="tableData.total" :current-page="tableData.current_page" :page-size="15" :page-sizes="[15,30,60]" @size-change="handleSizeChange" @current-change="handleCurrentChange" layout="total,sizes,pager"></el-pagination>
          </div>
        </el-card>
      </el-col>
      <el-col :span="10">
        <el-card>
          <div slot="header">
            <span>Handle</span>
          </div>
          <div>
            <el-button type="info" @click="addAreaDialog=true">Add Area</el-button>
          </div>
        </el-card>
        <el-dialog title="Add auditor" :visible.sync="addAreaDialog" width="28%">
          <el-form label-width="70px">
            <el-form-item label="Area">
             <el-input v-model="addArea" placeholder="Enter new area"></el-input>           
           </el-form-item>
          </el-form>
          <span slot="footer">
                <el-form >
                  <el-form-item label=""><el-button type="primary" @click="submitAddArea">Add</el-button></el-form-item>
                </el-form> 
              </span>
        </el-dialog>
        <el-card v-if="currentEditArea.id">
          <div slot="header">
            <span>Match CheckList-{{currentEditArea.area}}</span>
          </div>
          <div>
            <el-table :data="checkLists">
              <el-table-column label="name" prop="name"></el-table-column>
              <el-table-column label="flag" prop="aditcode" width="60"></el-table-column>
              <el-table-column label="active" width="60">
                <template slot-scope="scope" >
                  <el-button size="mini" @click="layer_update_checklist_by_area({item:scope.row.id,active:scope.row.showActive})" v-bind:class="{open:!scope.row.showActive}">{{scope.row.showActive?"开":"关"}}</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex";
export default {
  data() {
    return {
      addAreaDialog: false,
      addArea:"",
      addAduitorData: {
        user: "",
        leader: "",
        layer: 1,
        userCode: "",
        leaderCode: ""
      }
    };
  },
  created() {
    this.layer_store_checklist_by_area({data:{check_l_ist:[]}})
    this.layer_init_tableData();
    this.layer_get_all_area();
    this.layer_get_all_checklist_list()
  },
  computed: {
    ...mapGetters({
     tableData: "layer_get_all_table_data",
     checkLists:"layer_get_all_checklist_list",
     currentEditArea:"layer_get_current_checklist_by_area"
    })
  },
  updated() {},
  methods: {
    ...mapActions([
      "layer_get_all_area",
      "layer_add_new_area",
      "layer_get_all_checklist_list",
      "layer_get_checklist_by_area",
      "layer_update_checklist_by_area"
    ]),
    ...mapMutations([
      "layer_init_tableData",
      "layer_set_page",
      "layer_set_count",
       "layer_store_checklist_by_area"
    ]),
    //提交添加新的审核区域
    submitAddArea() {
      this.layer_add_new_area({
        area: this.addArea
      });
      this.addAreaDialog = false;
      this.addArea = "";
    },
    //修改显示数量
    handleSizeChange(val) {
      this.layer_set_count({
        value: val
      });
      this.layer_get_all_area();
    },
    //跳转页面
    handleCurrentChange(val) {
      this.layer_set_page({
        value: val
      });
      this.layer_get_all_area();
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
.open{
  background-color: #ffa0a0
}
</style>
