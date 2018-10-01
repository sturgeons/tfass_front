<template>
  <div>
    <van-row>
      <van-col span="8">
        <div class="menu" @click="to('layerPlan')">
          <div class="bage">20</div>
          <van-icon name="exchange" />
          <span>LPA Plan</span>
        </div>
      </van-col>
      <van-col span="8">
        <div class="menu" @click="to('layerHistory')">
          <van-icon name="exchange" />
          <span>Observes</span>
        </div>
      </van-col>
    </van-row>

  </div>
</template>

<script>
export default {
  name: "hello",
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
.bage {
  background: #f00;
  padding: 2px;
  border-radius: 10px;
  position: absolute;
  top: 8px;
  right: 8px;
  color: #fff;
  box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.5);
}

.context {
  padding: 30px 5px 5px 5px;
}

.menu {
  position: relative;
  margin: 10px auto;
  height: 100px;
  text-align: center;
  width: 90%;
  border-radius: 20px;
  background-color: rgba(69, 90, 100, 0.05);
  box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.5);
}

.van-icon {
  width: 95%;
  font-size: 32px;
  margin: 15px 0;
  color: rgba(69, 90, 100, 0.8);
}
</style>
