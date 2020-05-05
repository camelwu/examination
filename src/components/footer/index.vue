<template>
  <footer>
    <router-link v-show="mode==='exam'" :to="{path:'/explain/'+num}" class="links">
      <div class="btn_red">解析</div>
    </router-link>
    <router-link v-show="mode==='exam'&&num>1" :to="{path:'/exam/'+(num-1)}" class="links">
      <div class="btn_gray">上一题</div>
    </router-link>
    <div v-show="mode!=='result'" @click="nextStep" class="link_next">
      <div class="btn_blue"><span v-if="num<total">下一题</span><span v-else>查看结果</span></div>
    </div>
    <div v-if="mode==='result'" @click="practiceAgain" class="link_next">
      <div class="btn_gray">重新练习</div>
    </div>
    <div v-if="mode==='result'" @click="backToApp" class="link_next">
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
    mode: String
  },
  methods: {
    nextStep() {
      this.$emit("parentAnswer");
    },
    practiceAgain() {
      this.$emit("parentReset");
    },
    backToApp() {
      this.$emit("parentBack");
    }
  },
  created() {}
};
</script>

