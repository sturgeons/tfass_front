<template>
  <el-container style="min-height: 768px; border: 1px solid #eee">
    <el-aside width="185px" style="background-color: rgb(238, 241, 246)">
      <h3 style="margin:5px 0px;text-align:center">Y-ADMIN</h3>
      <el-menu :router="true">
        <el-submenu index="1">
          <template slot="title">
              PKG Management
          </template>
        <el-menu-item index="/p/admin/pkg-sws-main">方向盘</el-menu-item>
      </el-submenu>
        <el-submenu index="2">
          <template slot="title">
              LPA Management
          </template> 
          <el-menu-item index="/p/admin/auditor">Auditor</el-menu-item>
          <el-menu-item index="/p/admin/area">Audit Area</el-menu-item>
          <el-menu-item index="/p/admin/checklist">Checklist</el-menu-item>
          <el-menu-item index="/p/admin/observeds">Observeds</el-menu-item>
          <el-menu-item index="/p/admin/schedule">Schedule</el-menu-item>
          <el-menu-item index="/p/admin/scheduleCalendar">ScheduleCalendar</el-menu-item>
          <!-- <el-menu-item index="/p/admin/dashboard">Dashboard</el-menu-item> -->
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
          <el-dropdown-item @click.native="$router.push('/main')">回到客户端</el-dropdown-item>
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
  font-size: 1.3em;
}
.el-aside {
  color: #333;
}
</style>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {};
  },
  mounted() {
    this.user_check_power_user();
  },
  methods: {
    ...mapActions(["user_logout", "user_check_power_user"])
  },
  computed: {
    ...mapGetters({
      name: "user_get_name",
      adminScope: "user_get_scope"
    })
  }
};
</script>