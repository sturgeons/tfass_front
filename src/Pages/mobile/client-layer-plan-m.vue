<template>
  <div class="main">
    <h3>Layer Process Audit</h3>
    <div class="item-main" v-for="item in layer_user_plan" :key="item.index">
      <van-cell-group>
        <van-cell title="Plan date" :value="item.plan_date"></van-cell>
        <van-cell title="Area" :value="item.area.area"></van-cell>
        <van-cell title="Checklist" :value="item.checklist.name"></van-cell>
        <van-cell title="Id" :value="item.id"></van-cell>
      </van-cell-group>
      <van-button type="primary" bottom-action @click="$router.push({ path: 'layerDo/' + item.id })">Start</van-button>
    </div>
  </div>
</template>

<script>
import { mapActions, apGetters, mapGetters } from "vuex";
export default {
  name: "hello",
  data() {
    return {
      userPlan: []
    };
  },
  components: {},
  created() {
    this.layer_get_user_plan();
  },
  computed: {
    ...mapGetters({
      layer_user_plan: "layer_get_user_plan"
    })
  },
  methods: {
    ...mapActions(["layer_get_user_plan"]),
  }
};
</script>

<style scoped>
.main {
  padding: 5px;
}
.item-main {
  margin: 6px 0px;
}
</style>
