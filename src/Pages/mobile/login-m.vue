<template>
  <div>
    <div class="login-window" id="hei">
      <div class="login-box">
        <div class="logo-box">
          <img class="logo" src="../../../static/logo.jpg">
        </div>
        <van-cell-group>
          <van-cell title="Location" :value="location" icon="location" @click="showLocation=true" is-link/>
          <van-actionsheet v-model="showLocation">
            <van-cell-group>
              <van-cell v-for="item in locationData.locationList" :key="item.index" :title="item.lable" @click="setLocation(item)" icon="location" />
            </van-cell-group>
          </van-actionsheet>

          <van-field type="text" label="User ID:" placeholder="Enter you employee Id" v-model="username" icon="clear" :on-icon-click="onIconClick" required></van-field>
          <van-field type="password" label="Password:" placeholder="Enter your password, init(110)" @keyup.enter="user_login({user:username,password:password})" v-model="password" required> </van-field>
        </van-cell-group>
        <div class="login-btn">
          <van-button size="large" type="danger" @click="user_login({user:username,password:password})">Login</van-button>
        </div>
      </div>
      <div class="bottom-center">
        <div class="footer">
          <p>天合富奥汽车安全系统（长春）有限公司成都分公司</p>
          <p>Version:2.0.0.106 2016-2017 copyYAO XIN</p>
          <p>No.268 South No.2 Road,Lonquanyi District, Economy Development Zone, Chengdu, Sichuan, China</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex";
export default {
  name: "hello",
  data() {
    return {
      username: "",
      password: "",
      location: "",
      showLocation: false
    };
  },
  computed: {
    ...mapGetters({
      isLogin: "user_check",
      locationData: "view_get_loaction"
    })
  },
  components: {},
  mounted() {
    document.getElementById("hei").style.minHeight = window.innerHeight + "px";
  },
  methods: {
    ...mapActions(["user_login"]),
    ...mapMutations(["view_change_location"]),
    onIconClick() {
      this.username = "";
    },
    setLocation(val){
      this.view_change_location({ data: val.value });
      this.location=val.lable
      this.showLocation=false
    }
  },
  created () {
    this.location=this.locationData.locationList[0].lable
    this.view_change_location({ data: this.locationData.locationList[0].value });
  }
};
</script>

<style scoped>
p {
  font-size: 0.5em;
}

.bottom-center {
  position: fixed;
  bottom: 20px;
  left: 50%;
}

.footer {
  width: 300px;
  margin-left: -150px;
  text-align: center;
}

.login-btn {
  margin: 10px auto;
}

.logo-box {
  padding: 120px 10px 10px 10px;
  text-align: center;
}

.logo {
  height: 60px;
  border-radius: 15px;
  margin: 0px auto;
}

.login-window {
  background: #50a3a2;
  background: -webkit-linear-gradient(top left, #50a3a2 0%, #53e3a6 100%);
  background: linear-gradient(to bottom right, #50a3a2 0%, #53e3a6 100%);
  opacity: 0.8;
  height: 667px;
}

.login-box {
  margin: 0px auto;
  width: 90%;
}
</style>
