<template>
  <div class="login-window" id="login-window">
    <div class="center">
      <div class="login-box">
        <div class="box-header">
        </div>
        <div>
          <el-form ref="form" label-width="80px">
            <el-form-item label="Location">
              <el-select v-model="location" placeholder="location" @change="change_location">
                <el-option v-for="item in locationData.locationList" :key="item.index" :label="item.lable" :value="item.value"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="Username">
              <el-input v-model="name"></el-input>
            </el-form-item>
            <el-form-item label="Password">
              <el-input type="password" @keyup.enter.native="user_login({user:name,password:password})" v-model="password"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button @click.native="user_login({user:name,password:password})" type="primary">Login</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
    <div class="bottom-center">
      <div class="footer">
        <p>天合富奥汽车安全系统（长春）有限公司成都分工公司</p>
        <p>2016-2017 YAO XIN Version:3.0.106</p>
        <p>No.268 South No.2 Road,Lonquanyi District, Economy Development Zone, Chengdu, Sichuan, China</p>
      </div>
    </div>
  </div>
</template>

<script>
import { http } from "../../Utils/http";
import { getCookie } from "../../Utils/store";

import { mapActions, mapGetters, mapMutations } from "vuex";

export default {
  data() {
    return {
      name: "",
      password: "",
      location: "Chengdu"
    };
  },
  computed: {
    ...mapGetters({
      isLogin: "user_check",
      locationData: "view_get_loaction"
    })
  },
  mounted() {
    document.getElementById("login-window").style.height =
      window.innerHeight + "px";
    if (getCookie("token") != "") {
      this.$router.push("/main");
    }
  },
  methods: {
    ...mapActions(["user_login"]),
    ...mapMutations(["view_change_location"]),
    change_location(val) {
      this.view_change_location({ data: val });
    }
  },
  created() {
    this.location = this.locationData.locationList[0].lable;
    this.view_change_location({
      data: this.locationData.locationList[0].value
    });
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.box-header {
  margin: 20px 0px;
}
.login-window {
  background: #50a3a2;
  background: -webkit-linear-gradient(top left, #50a3a2 0%, #53e3a6 100%);
  background: linear-gradient(to bottom right, #50a3a2 0%, #53e3a6 100%);
  opacity: 0.8;
}
.center {
  position: absolute;
  top: 50%;
  left: 50%;
  margin-left: -175px;
  margin-top: -260px;
}
.login-box {
  margin: 0 auto;
  padding: 80px 0;
  text-align: center;
  height: 350px;
  width: 350px;
}
.bottom-center {
  position: fixed;
  bottom: 20px;
  left: 50%;
}
.footer {
  width: 800px;
  margin-left: -400px;
  text-align: center;
  font-size: 0.5em;
}
</style>
