<template>
  <div>
    <h1>Layer Process Audit Observes</h1>
    <div class="main" v-for="item in observe" :key="item.index">
      <van-cell-group>
        <van-cell title="Id" :value="item.id"></van-cell>
        <van-cell title="Plan date" :value="item.plan_date"></van-cell>
        <van-cell title="Finish date" :value="item.finish_date"></van-cell>
        <van-cell title="Spend days" :value="item.spend_days"></van-cell>
        <van-cell title="Area" :value="item.area.area"></van-cell>
        <van-cell title="Checklist" :value="item.checklist.name"></van-cell>
        <van-cell title="Observer">
          <div v-for="oitem in item.question" :key="oitem.index">{{oitem.question}}</div>
        </van-cell>
        <van-cell title="Picture">
          <div v-for="oitem in item.picture" :key="oitem.index"><img class="imgObserve" :src="oitem.path" /></div>
        </van-cell>
      </van-cell-group>
    </div>
    <van-button type="primary" v-if="load" bottom-action @click="addMore">Loading more...</van-button>
    {{item}}
  </div>
</template>

<script>
import LayerPlanItem from "../tpl/layer-plan-item";
export default {
  name: "hello",
  data() {
    return {
      observe: [],
      page: 1,
      total: 0,
      load: true
    };
  },
  components: {
    LayerPlanItem
  },
  created() {
    this.getUserObserve();
  },
  methods: {
    addMore() {
      this.page++;
      this.getUserObserve();
    },
    getUserObserve() {
      let that = this;
      this.$base.http({
        url: "getLPA/getUserObserve",
        params: {
          page: that.page
        },
        sCallback(res) {
          that.observe = that.observe.concat(res.data);
          if (res.total < that.page * 15) {
            that.load = false;
          }
        }
      });
    }
  }
};
</script>

<style scoped>
.main {
  margin: 5px;
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
.imgObserve {
  width: 80%;
}
</style>
