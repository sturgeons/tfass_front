<template>
  <el-container style="min-height: 768px; border: 1px solid #eee">
    <el-aside width="160px" style="background-color: rgb(238, 241, 246)">
      <h3 style="margin:5px 0px;text-align:center">Y-SYSTEM</h3>
      <el-menu :router="true">
        <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-message"></i>打包
          </template>
        <el-menu-item index="/p/main/pkg-sws-main">方向盘</el-menu-item>
      </el-submenu>
        <el-submenu index="2">
          <template slot="title">
           <i class="el-icon-setting"></i>
              分层审核
          </template>
          <el-menu-item index="/p/main/layerPlan">处理审核</el-menu-item>
          <el-menu-item index="/p/main/layerHistory">查看历史</el-menu-item>
      </el-submenu>
    </el-menu>
  </el-aside>
  <el-container>
    <el-header style="height:40px; text-align: right">
      <el-dropdown>
        <span>
          <i class="el-icon-setting" style="margin-right: 15px"></i>{{name}}
        </span>    
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>用户信息</el-dropdown-item>
          <el-dropdown-item>修改密码</el-dropdown-item>
          <el-dropdown-item @click.native="user_check_token">刷新页面</el-dropdown-item>
          <el-dropdown-item @click.native="user_logout">注销用户</el-dropdown-item>
          <el-dropdown-item divided v-if="adminScope.length>0" @click.native="$router.push('/admin')">Admin</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </el-header>
    <el-main>
        <router-view> </router-view>
    </el-main>
  </el-container>
</el-container>
</template>

<style>
  .el-header {
    background-color: #b3c0d1;
    color: #333;
    line-height: 30px;
    font-size: 1.5em;
  }
  .el-aside {
    color: #333;
  }
</style>

<script>
  import {
    mapActions,
    mapGetters
  } from "vuex";
  export default {
    data() {
      return {
      };
    },
    methods: {
      ...mapActions(["user_logout"])
    },
    computed: {
      ...mapGetters({
        name: "user_get_name",
        adminScope:"user_get_scope"
      })
    }
  };
</script>