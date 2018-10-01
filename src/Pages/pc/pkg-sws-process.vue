<template>
  <div class="vux-demo">
    <h1>当前打包型零件号 {{currentType}}</h1>
    <el-row>
      <el-col :span="21">
        <el-input v-model="code" placeholder="扫描标签" @keyup.enter.native="print" :autofocus="true"></el-input>
      </el-col>
      <el-col :span="3" style="padding-left:5px">
        <el-button type="danger" @click="code=''" >删除</el-button>
      </el-col>
    </el-row>
    <br>
    <el-row>
      <el-col :span="14">
        <el-row>
          <el-col :span="24">
            <el-card class="box-card">
              <h4>信息</h4>
              <el-row>
                <el-col class="item" :span="12">零件号</el-col>
                <el-col class="item" :span="12">{{info.desc}}</el-col>
                <el-col class="item" :span="12">当前包装标签号</el-col>
                <el-col class="item" :span="12">{{info.lastlable}}</el-col>
                <el-col class="item" :span="12">校验规则</el-col>
                <el-col class="item" :span="12">{{info.snappattern}}</el-col>
                <el-col class="item" :span="24">
                  <el-button type="success" @click.native="pkg_pre_assembly">提前打包</el-button>
                </el-col>
              </el-row>
            </el-card>
          </el-col>
          <el-col :span="24">
            <el-card  v-bind:style="{ 'background-color' : bak_color }" class="info-center-bac box-card" id="info-center-win">
              <div class="info-center">
                <h2>{{info_center?info_center:"这是信息中心"}}</h2>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </el-col>
      <el-col :span="10">
        <el-card class="box-card">
          <h4>已打包标签--{{info.counter}}/{{info.packsize}}</h4>
          <el-table :data="info.get_allsn" stripe style="width: 100%">
            <el-table-column prop="id" label="#" >
            </el-table-column>
            <el-table-column prop="sn" label="标签" >
            </el-table-column>
          </el-table>
        </el-card>
      </el-col>
    </el-row>
    <div class="footer11">
    </div>
  </div>
</template>

<script>

  import {
    mapActions,
    mapGetters,
    mapMutations
  } from "vuex";
  export default {
    components: {},
    data() {
      return {
        code: ""
      };
    },
    watch: {},
    computed: {
      ...mapGetters({
        prodicts: "pkg_get_product_list",
        info: "pkg_get_type_Info",
        info_center:"get_callback",
        bak_color:"pkg_get_record_color"
      }),
      currentType() {
        return this.$route.params.type;
      }
    },
    methods: {
      ...mapActions(["pkg_get_product_list", "pkg_get_type_Info","pkg_post_record","pkg_pre_assembly"]),
      print(){
         this.pkg_post_record({type:this.currentType,code:this.code})
         this.code="";
      },
      ...mapMutations(["update_info_color"])
    },
    created: function() {
      this.pkg_get_type_Info({
        type: this.currentType
      });
      this.update_info_color({res:{}})
    }
  };
</script>

<style scoped>
  .vux-demo {
    text-align: left;
  }
  .text {
    font-size: 10px;
  }
  .item {
    padding: 4px 0;
  }
  .box-card {
    width: 99%;
    margin-bottom: 10px;
  }
  .el-button {
    width: 100%;
  }
  .info-center {
    height: 200px;
    width: 100%;
    text-align: center;
    margin-top: 50px;
  }
  #info-center-win{
    background-color: aquamarine;
  }
</style>
