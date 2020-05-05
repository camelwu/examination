<template>
  <div class="answer">
    <ul class="answer-list">
      <li v-for="(item, index) in items" :key="'col' + index" @click="reply(item.itemLabel)" :class="isActive(item.itemLabel, index) ? 'active' : ''">
        <span>{{item.itemLabel + '.' + item.itemContent}}</span>
      </li>
    </ul>
    <div v-show="baseType=='4'||baseType=='5'">
      <textarea class="inputs" placeholder="请输入答案"></textarea>
      <div class="uploads" @click="upload">
        <img class="camera" :src="imgUrl">
        <p>上传答案</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    answered: String,
    mode: String,
    items: Array,
    userAnswer: Array,
    baseType: String
  },
  data() {
    return {
      doubleList: [],
      imgUrl: require("@/assets/camera.png")
    };
  },
  name: "answerlist",
  created() {},
  methods: {
    reply(item) {
      this.$emit("parentFill", item);
    },
    isActive(sel, index) {
      if (this.baseType && (this.baseType === "1" || this.baseType === "2")) {
        let bo = this.userAnswer.indexOf(sel);
        return bo > -1;
      }
    },
    upload() {
      this.$emit("clickUploadImg");
    }
  }
};
</script>
