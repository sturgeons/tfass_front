<template>
<!--根据客户端硬件定向页面-->
  <div class="vux-demo">
    <h2>正在检测你的登录设备...</h2>
    <h2>正在跳转合适的页面...</h2>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {};
  },
  computed: {},
  methods: {},
  mounted: function() {
     if(/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)){
       this.$router.push('/m/admin')
     } else{
       this.$router.push('/p/admin')
     }
  }
};
</script>

<style>

</style>
