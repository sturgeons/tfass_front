<template>
  <div>
    <van-nav-bar id="nav" title="TFASS BPM" left-text="Back" @click-left="to('/main')" @click-right="user_logout" right-text="Sign out" left-arrow fixed>
    </van-nav-bar>
    <div class="context">
      <router-view></router-view>
    </div>

  </div>
</template>

<script>
import {mapActions} from 'vuex'
export default {
  name: "hello",
  data() {
    return {};
  },
  mounted() {
    document.getElementById("nav").style.width = window.innerWidth + "px";
    document.getElementById("nav").style.zIndex = "99";
  },
  methods: {
    ...mapActions(['user_logout']),
    to(url) {
      this.$router.push({ path: url });
    }
  }
};
</script>

<style scoped>
.context {
  padding: 40px 5px 5px 5px;
}

.footer {
  position: absolute;
  bottom: 20px;
  text-align: center;
  width: 100%;
}

.footer h2 {
  margin: 0px auto;
  padding: 3px;
}

.menu {
  margin: 10px auto;
  height: 100px;
  text-align: center;
  width: 90%;
  border-style: solid;
  border-radius: 20px;
  background-color: rgba(69, 90, 100, 0.05);
}

.van-icon {
  width: 95%;
  font-size: 32px;
  margin: 15px 0;
  color: rgba(69, 90, 100, 0.8);
}
</style>
