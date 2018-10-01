<template>
  <div class="login-window">
    <el-row class="edit-header" :gutter="3">
      <el-col :span="18">
        <el-card>
          <el-table :data="tableData.data">
            <el-table-column label="#" prop="id"></el-table-column>
            <el-table-column label="code" prop="info.code"></el-table-column>
            <el-table-column label="name" prop="info.name"></el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-row :gutter="10">
                  <el-col :span="24">
                    <el-button type="danger" size="mini" @click="deleteAuditor(scope.row)">DELETE</el-button>
                  </el-col>
                </el-row>
              </template>
            </el-table-column>
          </el-table>
          <div class="block">
            <el-pagination :total="tableData.total" :current-page="tableData.current_page" :page-size="15" :page-sizes="[15,30,60]" @size-change="handleSizeChange"
              @current-change="handleCurrentChange" layout="total,sizes,prev,pager,next, jumper"></el-pagination>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-row>
          <el-col :span="24">
            <el-card>
              <div slot="header">
                <span>Handle</span>
              </div>
              <div>
                <el-button type="info" @click="addAduitorDialog=true">Add Auditor</el-button>
              </div>
            </el-card>
            <el-dialog title="Add auditor" :visible.sync="addAduitorDialog" width="28%">
              <el-form label-width="70px">
                <el-form-item label="Auditor">
                  <el-autocomplete class="inline-input" v-model="addAduitorData.user" :fetch-suggestions="queryUser" @select="confirmUser"
                    placeholder="Enter first name.."></el-autocomplete>
                </el-form-item>
                <el-form-item label="Layer">
                  <el-select v-model="addAduitorData.layer" placeholder="Selcet Layer">
                    <el-option v-for="item in [1,2,3]" :key="item" :value="item"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="Leader">
                  <el-autocomplete class="inline-input" v-model="addAduitorData.leader" :fetch-suggestions="queryUser" @select="confirmLeader"
                    placeholder="Enter first name.."></el-autocomplete>
                </el-form-item>
              </el-form>
              <span slot="footer">
                <el-form>
                  <el-form-item label="">
                    <el-button type="primary" @click="submitAddAuitor">Add</el-button>
                  </el-form-item>
                  <el-form-item label="">
                    <el-button type="primary" @click="addAduitorDialog=false">Cancel</el-button>
                  </el-form-item>
                </el-form>
              </span>
            </el-dialog>
          </el-col>
          <el-col :span="24">
            <el-card>
              <div slot="header">
                <span>Tip</span>
              </div>
              <div style="font-size:0.8em">
                If you want delete auditor you click the delete button, click the Add Auditor button to add new auditor
              </div>

            </el-card>

          </el-col>
        </el-row>

      </el-col>
    </el-row>
  </div>
</template>

<script>
  import {
    mapActions,
    mapGetters,
    mapMutations
  } from "vuex";
  export default {
    data() {
      return {
        addAduitorDialog: false,
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
      this.layer_get_all_user_list();
      this.layer_init_tableData();
      this.layer_get_all_auditor();
    },
    computed: {
      ...mapGetters({
        userList: "layer_get_all_user_list",
        tableData: "layer_get_all_table_data"
      })
    },
    updated() {},
    methods: {
      ...mapActions([
        "layer_get_all_user_list",
        "layer_get_all_auditor",
        "layer_add_new_auditor",
        "layer_del_auditor"
      ]),
      ...mapMutations([
        "layer_init_tableData",
        "layer_set_page",
        "layer_set_count"
      ]),
      //根据用户输入的名字 检索匹配项
      queryUser(queryStr, cd) {
        var tempData = this.userList;
        var res = queryStr ?
          tempData.filter(user => {
            return user.value.indexOf(queryStr) > -1;
          }) :
          tempData;
        cd(res);
      },
      //确认选择的审核员
      confirmUser(item) {
        this.addAduitorData.userCode = item.id;
      },
      //确认选择的leader
      confirmLeader(item) {
        this.addAduitorData.leaderCode = item.id;
      },
      //提交添加审核员的信息
      submitAddAuitor() {
        this.layer_add_new_auditor({
          code_id: this.addAduitorData.userCode,
          layer: this.addAduitorData.layer,
          pid: this.addAduitorData.leaderCode
        });
        this.addAduitorDialog = false;
        this.addAduitorData.user = "";
        this.addAduitorData.leader = "";
      },
      //删除审核员
      deleteAuditor(info) {
        this.layer_del_auditor({
          id: info.id
        });
      },
      //修改显示数量
      handleSizeChange(val) {
        this.layer_set_count({
          value: val
        });
        this.layer_get_all_auditor();
      },
      //跳转页面
      handleCurrentChange(val) {
        this.layer_set_page({
          value: val
        });
        this.layer_get_all_auditor();
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
