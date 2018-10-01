<template>
  <div>
    <div class="center">
      <!-- 审核单首页 -->
      <van-panel title="确定审核信息" v-if="processPage==-1">
        <div class="main">
          <van-cell-group>
            <van-cell title="计划审核时间：" :value="planData.plan_date" />
            <van-cell title="审核区域：" :value="planData.area.area" />
            <van-cell title="审核表：" :value="planData.checklist.name" />
          </van-cell-group>
        </div>
        <div slot="footer">
          <van-button type="primary" bottom-action v-on:click="layer_turn_page({event:+1})">开始审核</van-button>
        </div>
      </van-panel>
      <!-- 审核单 -->
      <van-panel :title="currentProcess" v-if="processPage==0||processPage==1">
        <div class="main">
          <div class="checkpoint">检查点：{{currentQuestionInfo.point}}</div>
          <div class="checkpoint">问题：{{currentQuestionInfo.checklist}}</div>
          <div class="checkclass">分类：{{currentQuestionInfo.class}} 方法：{{currentQuestionInfo.methods}}</div>
          <van-cell-group>
            <van-field v-model="currentObserved" type="textarea" rows="3" placeholder="点击输入发现问题" error></van-field>
          </van-cell-group>
          <!-- 上传照片 -->
          <vue-dropzone :key="currentProcess" ref="myVueDropzone" id="dropzone" @vdropzone-success="storePic" :options="dropzoneConfig" />
          <div class="observerPic" v-for="item in currentImg" :key="item.index">
            <img :src="item" />
          </div>
        </div>
        <div slot="footer">
          <van-button v-if="processPage==1" bottom-action @click="layer_turn_page({event:-1})">上一项</van-button>
          <van-button type="primary" bottom-action @click="layer_turn_page({event:+1})">下一项</van-button>
        </div>
      </van-panel>
      <!-- 审核单尾页 -->
      <van-panel title="确定审核问题项" v-if="processPage==2">
        <div class="main">
          <div v-for="item in questionList" :key="item.key">
            ({{item.id}}) {{item.question}}
          </div>
        </div>
        <div slot="footer">
          <van-button bottom-action @click="layer_turn_page({event:-1})">上一项</van-button>
          <van-button type="primary" bottom-action @click="layer_submit">提交</van-button>
        </div>
      </van-panel>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex";
import vueDropzone from "vue2-dropzone";
import "vue2-dropzone/dist/vue2Dropzone.css";
export default {
  data() {
    return {
    };
  },
  components: {
    vueDropzone
  },
  computed: {
    ...mapGetters({
      planData: "layer_get_plan_data",
      imgList: "layer_get_img_list",
      processPage: "layer_get_process",
      dropzoneConfig: "layer_get_submit_config",
      currentProcess: "layer_get_process_str",
      currentQuestionInfo: "layer_get_current_question_info",
      currentImg: "layer_get_img_list",
      questionList:"layer_get_observeds_list"
    }),
    currentObserved: {
      get() {
        return this.$store.state.layer.currentObserved;
      },
      set(value) {
        this.$store.commit("layer_store_current_observed", {
          value
        });
      }
    }
  },
  created() {
    this.layer_get_plan_list({
      id: this.$route.params.id
    });
  },
  methods: {
    storePic(r, s) {
      this.layer_store_pic({ r, s });
    },
    ...mapActions(["layer_get_plan_list","layer_turn_page","layer_submit"]),
    ...mapMutations(["layer_set_currentPage", "layer_store_pic"])
  }
};
</script>

<style scoped>
.observerPic img {
  width: 90%;
  padding: 10px;
}
.uploader-container {
  height: 100px;
  width: 300px;
  line-height: 100px;
  margin: 30px;
  border: solid 1px rgba(0, 0, 0, 0.2);
  box-shadow: 1px 1px;
}
.main div {
  text-align: left;
  padding: 3px;
  font-size: 0.8em;
}
.center {
  margin-top: 10px;
}
.main {
  text-align: center;
  min-height: 380px;
  padding: 10px;
}
.checkclass {
  font-size: 0.8em;
  color: rgba(0, 0, 0, 0.4);
}
</style>
