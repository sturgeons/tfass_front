<template>
  <div class="vux-demo">
    <h1>方向盘存放区域看板</h1>
    <el-row>
      <el-col :span="4" v-for="i in info" :key="i.id">
        <el-card class="box-card" v-bind:style="{ 'background-color' : i.color }">
          <div class="text item">
            {{'位置 ' + i.container }}
          </div>
          <div class="text item">
            {{'包装号 ' + i.packid }}
          </div>
          <div class="text item">
            <el-button type="info" round>{{i.resttime}}</el-button>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <div class="footer11">
    </div>
  </div>
</template>

<script>
import http from "../Utils/http";
import { mapActions, mapGetters } from "vuex";
import { setInterval } from 'timers';
export default {
  components: {},
  data() {
    return {
      list:[]
    };
  },
  computed: {
    ...mapGetters({
      info: "pkg_get_voc_info"
    })
  },
  methods: {
    ...mapActions(["pkg_get_voc","pkg_update_resttime"]),
    updateM(){
      this.pkg_get_voc();
    }
  },
  mounted () {
     this.pkg_get_voc();
    setInterval((that)=>{
      this.updateM();
    },1000)
  }
};
</script>

<style>
.vux-demo {
  text-align: center;
}
.text {
  font-size: 17px;
}
.item {
  padding: 2px 0;
}
.box-card {
  width: 95%;
  margin-bottom: 10px;
}
</style>
