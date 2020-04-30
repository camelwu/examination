<template>
  <div class="answer">
    <ul class="answer-list">
      <li :class="good.isdisable ? 'active' : ''" v-for="good in goods" :key="good.id+'col'" @click="seleted(good)">
        <span class="pd-goods-name">{{good.title}}</span>
      </li>
    </ul>
    <textarea class="inputs" placeholder="请输入答案"></textarea>
    <div class="uploads">
      <img class="camera" :src="imgUrl">
      <p>上传答案</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    goods: Array,
    typeTitle: String
  },
  data() {
    return {
      sel: [],
      active: 2,
      activeSingle: 0,
      doubleList:[],
      imgUrl: require("@/assets/camera.png")
    };
  },
  name: "answerlist",
  methods: {
    seleted(good) {
      if(this.typeTitle && this.typeTitle === 'single'){
        this.$emit('parentAnswer', [good])
      }
      if(this.typeTitle && this.typeTitle === 'double') {
        const doubleList = this.doubleChange(good)
        this.$emit('parentAnswer', doubleList)
      }
    },
    doubleChange(good) {
      this.doubleList.push(good)
    }
  },
  created() {
    console.log('props',this.typeTitle)
  }
};
</script>
<style>
.isActive {
  color: red;
}
.noActive {
  color:#ccc;
}
</style>
