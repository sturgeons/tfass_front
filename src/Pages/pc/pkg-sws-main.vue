<template>
  <div class="vux-demo">
    <h1>选择你要打包的型号</h1>
    <el-row>
      <el-col :span="6" v-for="prodict in prodicts" :key="prodict.id">
        <el-card class="box-card">
          <div class="text item">
            {{'型号 ' + prodict.desc }}
          </div>
          <div class="text item">
            {{ prodict.type }}
          </div>
          <div class="text item">
            <el-button type="info" @click="toPkgMain(prodict.type)" round>开始打包</el-button>
          </div>
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
    mapGetters
  } from "vuex";
  export default {
    components: {},
    data() {
      return {};
    },
    watch: {},
    computed: {
      ...mapGetters({
        prodicts: "pkg_get_product_list"
      })
    },
    methods: {
      ...mapActions(["pkg_get_product_list"]),
      toPkgMain(path) {
        this.$router.push("pkg-sws-main/" + path);
        this.$store.commit("set_current_type", {
          data: path
        });
      }
    },
    created: function() {
      this.pkg_get_product_list();

    }
  };
</script>

<style scoped>
  .vux-demo {
    text-align: center;
  }
  .text {
    font-size: 0.6em;
  }
  .item {
    padding: 4px 0;
  }
  .box-card {
    width: 95%;
    margin-bottom: 10px;
  }
</style>
