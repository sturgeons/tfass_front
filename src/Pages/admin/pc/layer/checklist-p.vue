<template>
  <div class="login-window">
    <el-row class="edit-header" :gutter="5">
      <el-col :span="18">
        <el-card>
          <el-table :data="tableData.data">
            <el-table-column label="#" prop="id" width="60"></el-table-column>
            <el-table-column label="Type-code" prop="aditcode" width="85"></el-table-column>
            <el-table-column label="Name" prop="name"></el-table-column>
            <el-table-column label="Create_date" prop="create_date"></el-table-column>
            <el-table-column label="操作" width="120" v-if="addNewChecklist">
              <template slot-scope="scope">
                    <el-row :gutter="3">
                      <el-col :span="24"><el-button type="primary" size="mini" @click="layer_get_checklist_and_item_by_id({id:scope.row.id})">COPY</el-button></el-col>
                    </el-row>
              </template>
            </el-table-column>
          </el-table>
          <div class="block">
            <el-pagination :total="tableData.total" :current-page="tableData.current_page" :page-size="5" @current-change="handleCurrentChange" layout="total,pager"></el-pagination>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card>
          <div slot="header">
            <span>Handle</span>
          </div>
          <div>
              <el-form>
              <el-form-item label="">
                <div style="font-size:0.8em;line-height:18px;margin-bottom:7.5px">You can update new version checklist when you click the item "UPDATE" button. If you want close checklist be used in the future.</div>
              </el-form-item>
              <el-form-item label="" v-if="!addNewChecklist">
                <el-button type="info" @click="addNewChecklistHandle">Add New Checklist</el-button>
              </el-form-item>
              <el-form-item label="" v-if="addNewChecklist">
              <el-button type="primary" @click="addNewChecklistSubmit=true">Submit</el-button>
                </el-form-item>
              <el-form-item label="" v-if="addNewChecklist">
                <el-button type="danger" @click="addNewChecklist=false">Cancle</el-button>
              </el-form-item>
            </el-form> 
            <el-dialog title="确定提交新的审核单" :visible.sync="addNewChecklistSubmit" width="80%">
              <el-row>
                <el-col :span="24" style="margin-bottom:10px"><el-input v-model="addNewChecklistName" placeholder="Enter new checklist name"></el-input></el-col>
                <el-col :span="24" style="margin-bottom:10px">
                  <el-table :data="newChecklist.data" max-height="500" border >
                    <el-table-column type="index" width="40"></el-table-column>
                    <el-table-column label="checklist" prop="checklist" width="300"></el-table-column>
                    <el-table-column label="class" prop="class" width="100"></el-table-column>
                    <el-table-column label="methods" prop="methods" width="300"></el-table-column>
                    <el-table-column label="point" prop="point" width="200"></el-table-column>
                    <el-table-column label="checklist_en" prop="checklist_en" width="300"></el-table-column>
                    <el-table-column label="class_en" prop="class_en" width="200"></el-table-column>
                    <el-table-column label="methods_en" prop="methods_en" width="300"></el-table-column>
                    <el-table-column label="point_en" prop="point_en" width="200"></el-table-column>
                  </el-table>
                </el-col>
                <el-col :span="24"><el-button type="primary" @click.native="postNewChecklist">Submit</el-button></el-col>
              </el-row>
            </el-dialog>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-row v-if="addNewChecklist">
      <el-col :span="24">
        <el-card>
          <el-row>
            <el-col :span="24">
              <el-table :data="newChecklist.data" max-height="500" border >
                <el-table-column type="index" width="40"></el-table-column>
                <el-table-column label="checklist" prop="checklist" width="300"></el-table-column>
                <el-table-column label="class" prop="class" width="100"></el-table-column>
                <el-table-column label="methods" prop="methods" width="300"></el-table-column>
                <el-table-column label="point" prop="point" width="200"></el-table-column>
                <el-table-column label="checklist_en" prop="checklist_en" width="300"></el-table-column>
                <el-table-column label="class_en" prop="class_en" width="200"></el-table-column>
                <el-table-column label="methods_en" prop="methods_en" width="300"></el-table-column>
                <el-table-column label="point_en" prop="point_en" width="200"></el-table-column>
                <el-table-column label="操作" fixed="right" width="80">
                  <template slot-scope="scope">
                    <el-row> 
                      <el-col :span="12"><el-button type="text" @click.native.prevent="editChecklistItem(scope.$index)"><i class="el-icon-edit"></i></el-button></el-col>
                      <el-col :span="12"><el-button type="text" @click.native.prevent="layer_set_new_checklist_item({data:{index:scope.$index,del:true}})"><i class="el-icon-delete"></i></el-button></el-col>
                    </el-row> 
                  </template>
                </el-table-column>
              </el-table>
            </el-col>
            <el-dialog title="Eidt Checklist Item" :visible.sync="addNewChecklistItem" width="80%">
              <el-form label-width="80px">
                <el-form-item label="检测项">
                  <el-input v-model="addOrEditNewChecklistData.checklist" type="textarea" placeholder=""></el-input>
                </el-form-item>                
                <el-form-item label="类别">
                  <el-input v-model="addOrEditNewChecklistData.class" placeholder=""></el-input>
                </el-form-item>                
                <el-form-item label="方式">
                  <el-input v-model="addOrEditNewChecklistData.methods"  placeholder=""></el-input>
                </el-form-item>                
                <el-form-item label="检查点">
                  <el-input v-model="addOrEditNewChecklistData.point"  placeholder=""></el-input>
                </el-form-item>                
                <el-form-item label="检测项-EN">
                  <el-input v-model="addOrEditNewChecklistData.checklist_en" type="textarea" placeholder=""></el-input>
                </el-form-item>                
                <el-form-item label="类别-EN">
                  <el-input v-model="addOrEditNewChecklistData.class_en"  placeholder=""></el-input>
                </el-form-item>                
                <el-form-item label="方式-EN">
                  <el-input v-model="addOrEditNewChecklistData.methods_en" placeholder=""></el-input>
                </el-form-item>                
                <el-form-item label="检查点-EN">
                  <el-input v-model="addOrEditNewChecklistData.point_en"  placeholder=""></el-input>
                </el-form-item>                
                <el-form-item >
                  <el-button type="primary" @click="confirmChecklistItem">确定</el-button>
                </el-form-item>
              </el-form>
            </el-dialog>
            <el-col :span="24">
              <el-button type="primary" @click="addNewChecklistEmpty"><i class="el-icon-plus"></i>Add</el-button>
            </el-col>
          </el-row>
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
      addNewChecklist: false,
      addNewChecklistItem: false,
      addOrEditNewChecklistData: {
        checklist: "",
        checklist_en: "",
        class: "",
        class_en: "",
        methods: "",
        methods_en: "",
        point: "",
        point_en: ""
      },
      addNewChecklistName: "",
      addNewChecklistSubmit: false
    };
  },
  created() {
    this.layer_init_tableData();
    this.layer_set_count({
      value: 5
    });
    this.layer_get_all_checklist_table();
  },
  computed: {
    ...mapGetters({
      tableData: "layer_get_all_table_data",
      newChecklist: "layer_get_new_checklist_info"
    })
  },
  updated() {},
  methods: {
    ...mapActions([
      "layer_get_all_checklist_table",
      "layer_get_checklist_and_item_by_id",
      "layer_post_new_checklist"
    ]),
    ...mapMutations([
      "layer_init_tableData",
      "layer_set_page",
      "layer_set_count",
      "layer_store_new_checklist_update_data",
      "layer_set_new_checklist_item"
    ]),
    //跳转页面
    handleCurrentChange(val) {
      this.layer_set_page({
        value: val
      });
      this.layer_get_all_checklist_table();
    },
    //添加新的审核单
    addNewChecklistHandle() {
      this.addNewChecklist = true;
      this.layer_store_new_checklist_update_data({ data: [], pid: 0 });
    },
    //修改单元
    editChecklistItem(index) {
      for (var ss in this.newChecklist.data[index]) {
        this.addOrEditNewChecklistData[ss] = this.newChecklist.data[index][ss];
      }
      this.addOrEditNewChecklistData.index = index;
      this.addNewChecklistItem = true;
    },
    //确定修改的新的元素
    confirmChecklistItem() {
      this.layer_set_new_checklist_item({
        data: this.addOrEditNewChecklistData
      });
      this.addNewChecklistItem = false;
    },
    //添加一个新的审核条目
    addNewChecklistEmpty() {
      this.addOrEditNewChecklistData = {
        checklist: "",
        checklist_en: "",
        class: "",
        class_en: "",
        methods: "",
        methods_en: "",
        point: "",
        point_en: "",
        index: -1
      };
      this.addNewChecklistItem = true;
    },
    //提交新的审核单内容到服务器
    postNewChecklist() {
      this.addNewChecklist = false;
      this.layer_post_new_checklist({name:this.addNewChecklistName})
      this.addNewChecklistSubmit=false
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
.open {
  background-color: #ffa0a0;
}
</style>
