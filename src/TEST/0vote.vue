<template>
  <div class="vux-demo">
    <h1>2017-2018年度优秀节目</h1>
    <group>
      <div class="box">
        <checker v-model="demo1CheckboxMax" :max="3" type="checkbox" default-item-class="demo1-item" selected-item-class="demo1-item-selected">
          <checker-item value="1">《C哩C哩》</checker-item>
          <checker-item value="2">《国学大师》</checker-item>
          <checker-item value="3">《回声嘹亮》</checker-item>
          <checker-item value="4">《梦里水乡》</checker-item>
          <checker-item value="5">《青春时代》</checker-item>
          <checker-item value="6">《同学会》</checker-item>
          <checker-item value="7">《创意杯子舞》</checker-item>
          <checker-item value="8">《活着》</checker-item>
          <checker-item value="9">蒙古舞</checker-item>
          <checker-item value="10">《众人划桨开大船》</checker-item>
          <checker-item value="11">《腾飞的天合转向》</checker-item>
          <checker-item value="12">《不忘初心》</checker-item>
        </checker>
        <br>
        <span> 每人三个选票 {{demo1CheckboxMax.length}}</span>
        <br>
      </div>
      <group v-show="cans">
        <x-input title="姓名" placeholder="输入姓名(例 姚鑫)" v-model="userId" novalidate :icon-type="iconType" placeholder-align="right"></x-input>
        <x-button type="primary" @click.native="submit">提交</x-button>
      </group>
    </group>
    <br>
    <br>
    <div class="footer1">
      <divider>Powered By YaoXin</divider>
    </div>
  </div>
</template>

<script>
  import {
    Group,
    XInput,
    Divider,
    CheckIcon,
    XButton,
    Checker,
    CheckerItem
  } from "vux";
  import http from '../Utils/http'
  export default {
    components: {
      Group,
      XInput,
      Divider,
      CheckIcon,
      XButton,
      Checker,
      CheckerItem
    },
    data() {
      return {
        cans: false,
        hasid: false,
        demo1CheckboxMax: [],
        userId: '',
        iconType: '',
        datass:{}
      };
    },
    watch: {
      demo1CheckboxMax: function() {
        if (this.demo1CheckboxMax.length == 3) {
          this.cans = true;
        } else {
          this.cans = false;
        }
      }
    },
    methods: {
      submit: function() {
        console.log('sdfsdf');
        if (this.userId == '') {
          this.iconType = 'error'
        }
        var  that=this;
        http.http({
          type:"POST",
          data:{
            userId:this.userId,
            poll:this.demo1CheckboxMax
          },
          url: "/vote/submit",
          sCallback(res) {
            if (res.code==200) {
              that.$router.push('resultOk')
            }else{
               that.$router.push('resultNok')
            }
            that.datass = res;
          }
        })
      }
    }
  };
</script>

<style>
  .vux-demo {
    text-align: center;
  }
  .logo {
    width: 100px;
    height: 100px;
  }
  .box {
    padding: 0 15px;
  }
  .demo1-item {
    border: 1px solid #ececec;
    padding: 5px 15px;
    width: 60%;
    margin: 5px;
  }
  .demo1-item-selected {
    border: 1px solid green;
  }
</style>
