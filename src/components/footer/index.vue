<template>
  <footer>
    <router-link v-if="path==='exam'" :to="{path:'/explain/'+num}" class="links">
      <div class="btn_red">解析</div>
    </router-link>
    <router-link v-if="path==='exam'&&num>1" v-show="num>1" :to="{path:'/exam/'+(num-1)}" class="links">
      <div class="btn_gray">上一题</div>
    </router-link>
    <router-link v-if="path!=='result'" :to="{path:'/'+path+'/'+(num+1)}" class="link_next">
      <div class="btn_blue">下一题</div>
    </router-link>
    <div v-if="path==='result'" class="link_next">
      <div class="btn_gray">重新练习</div>
    </div>
    <div v-if="path==='result'" to="/user" class="link_next">
      <div class="btn_blue">返回</div>
    </div>
  </footer>
</template>

<script>
export default {
  data() {
    return {};
  },
  name: "Footer",
  props: {
    num: { type: Number, default: 1 },
    total: Number,
    path: String
  },
  methods: {
    router_c: function(active) {
      alert(active);
    },
    resetAnswer() {
      fetch("api/paper/resetAnswer", {
        paperId: ""
      }).then(res => {
        if (res.code == "0" && res.success) {
          this.$router.push();
        } else {
          alert("Sth error, pls try it again!");
        }
      });
    }
  },
  created() {
  }
};
</script>

