
<template>
  <div id="app" v-loading="!loading">
    <router-view></router-view>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "app",
  computed: {
    ...mapGetters({
      loading: "loading"
    })
  }
};
</script>

<style lang="less">
@import "~vux/src/styles/reset.less";

body {
  background-color: #fbf9fe;
}
.el-button,
.el-select,
.el-autocomplete {
  width: 100%;
}
.el-main {
  padding: 5px;
}
.undone {
  background-color: #f00 !important;
}
.el-table .warning-row {
  background: #ffefef;
}
.el-button{
  padding: 7px
}
</style>
