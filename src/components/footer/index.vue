<template>
    <footer>
      <ul>
        <li></li>
        <li></li>
        <li></li>
      </ul>
      <router-link to="/home">解析</router-link>
      <router-link to="/recommend">上一题</router-link>
      <router-link to="/search">下一题</router-link>
      <router-link to="/chat">重新练习</router-link>
      <router-link to="/user">返回</router-link>
    </footer>
</template>

<script>
const tars = ["/exam", "/explain", "/result"];
export default {
  data() {
    return {
      active: 0,
      fixed: true,
      icon: {
        normal: "//img.yzcdn.cn/icon-normal.png",
        active: "//img.yzcdn.cn/icon-active.png"
      }
    };
  },
  name: "Footer",
  methods: {
    router_c: function(active) {
      alert(active);
    }
  },
  created() {
    let a = tars.indexOf(this.$route.path);
    this.active = a < 0 ? 0 : a;
  },
  mounted() {}
};
</script>

