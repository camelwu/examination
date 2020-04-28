<template>
  <span>
    <footer v-if="path==='exam'">
      <router-link to=`${num}` class="links">
        <div class="btn_red">{{num}}解析</div>
      </router-link>
      <router-link to="/exam/" class="links">
        <div class="btn_gray">上一题</div>
      </router-link>
      <router-link to="/exam" class="link_next">
        <div class="btn_blue">下一题</div>
      </router-link>
    </footer>
    <footer v-if="path==='explain'">
      <router-link to="/explain" class="link_next">
        <div class="btn_blue">下一题</div>
      </router-link>
    </footer>
    <footer v-if="path==='result'">
      <router-link to="/chat" class="link_next">
        <div class="btn_gray">重新练习</div>
      </router-link>
      <router-link to="/user" class="link_next">
        <div class="btn_blue">返回</div>
      </router-link>
    </footer>
  </span>
</template>

<script>
export default {
  data() {
    return {
      active: 0,
      fixed: true
    };
  },
  name: "Footer",
  props: {
    num: Number,
    total: Number,
    path: String
  },
  methods: {
    router_c: function(active) {
      alert(active);
    }
  },
  created() {
    console.log(this.$router.params);
  },
  mounted() {
    console.log(this.$router);
  }
};
</script>

