<template>
  <div>
    <h3>Layer Process Audit Observes</h3>
    <div>
      <div class="main" v-for="i in observeds.observes" :key="i.id">
        <van-cell-group>
          <van-cell title="Id"> {{i.id}} </van-cell>
          <van-cell title="Plan date">{{i.plan_date}}</van-cell>
          <van-cell title="Finish date">{{i.finish_date}}</van-cell>
          <van-cell title="Spend days">{{i.spend_days}}</van-cell>
          <van-cell title="Area">{{i.area.area}}</van-cell>
          <van-cell title="Checklist">{{i.checklist.name}}</van-cell>
          <van-cell title="Observer">
            <div v-for="oitem in i.question" :key="oitem.index">{{oitem.question}}</div>
          </van-cell>
          <van-cell title="Picture">
            <div v-for="oitem in i.picture" :key="oitem.index"><img class="imgObserve" :src="oitem.path" /></div>
          </van-cell>
        </van-cell-group>
      </div>
    </div>
    <van-button type="primary" v-if="observeds.load" bottom-action @click="layer_get_all_observed_by_plan">Loading more...</van-button>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex";
export default {
  data() {
    return {};
  },
  components: {},
  created() {
    this.layer_init_page();
    this.layer_get_all_observed_by_plan();
  },
  computed: {
    ...mapGetters({
      observeds: "layer_get_observeds_by_paln"
    })
  },
  methods: {
    ...mapActions(["layer_get_all_observed_by_plan"]),
    ...mapMutations(["layer_init_page"])
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
