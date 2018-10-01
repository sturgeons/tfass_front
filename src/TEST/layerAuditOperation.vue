<template>
  <div>
    <h1>Layer Process Audit</h1>
    <div v-for="item in userPlan" :key="item.index">
      <layer-plan-item :item="item"></layer-plan-item>
    </div>
  </div>
</template>

<script>
import LayerPlanItem from '../tpl/layer-plan-item'
export default {
  name: 'hello',
  data() {
    return {
      userPlan: []
    }
  },
  components: { LayerPlanItem },
  created() {
    this.getPlan();
  },
  methods: {
    getPlan() {
      let that = this;
      let para = {
        url: 'getLPA/userPlan',
        sCallback(res) {
          that.userPlan = res.data;
        }
      }
      this.$base.http(para);
    }
  }
}
</script>

<style scoped>
.footer {
  position: absolute;
  bottom: 20px;
  text-align: center;
  width: 100%;
}

.footer h2 {
  margin: 0px auto;
  padding: 3px
}

.menu {
  margin: 10px auto;
  height: 100px;
  text-align: center;
  width: 90%;
  border-style: solid;
  border-radius: 20px;
  background-color: rgba(69, 90, 100, .05);
}

.van-icon {
  width: 95%;
  font-size: 32px;
  margin: 15px 0;
  color: rgba(69, 90, 100, .8);
}
</style>
