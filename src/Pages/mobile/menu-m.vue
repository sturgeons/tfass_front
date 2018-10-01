<template>
  <div>
    <van-row>
      <van-col span="8">
        <div class="menu" @click="to('main/layerMenu')">
          <van-icon name="exchange" />
          <span>LPA</span>
        </div>
      </van-col>
    </van-row>
        <div class="footer">
      <h2>
        YAOXIN 2016-2017
      </h2>
      <h2>天合富奥汽车安全系统（长春）有限公司成都分公司</h2>
      <h2>Version:2.0.106</h2>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    to(url) {
      this.$router.push({ path: url });
    }
  }
};
</script>

<style scoped>
.context {
  padding: 30px 5px 5px 5px;
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
  border-radius: 20px;
  background-color: rgba(69, 90, 100, 0.05);
  box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.3);
}

.van-icon {
  width: 95%;
  font-size: 32px;
  margin: 15px 0;
  color: rgba(69, 90, 100, 0.8);
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
  font-size:0.5em;
  line-height: 10px;
}

</style>
