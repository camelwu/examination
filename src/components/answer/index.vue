<template>
  <div class="answer">
    <ul class="answer-list">
      <li
        v-for="(item, index) in items"
        :key="'col' + index"
        @click="reply(item.itemLabel)"
        :class="{act:isAnswer(item.itemLabel, index), active:isActive(item.itemLabel, index)}"
      >
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
    answer: String,//API正确答案
    answered: String,//API学员回答
    mode: String,
    items: Array,
    userAnswer: Array,//作答
    baseType: String
  },
  data() {
    return {
      data: [],
      correct: [],
      imgUrl: require("@/assets/camera.png")
    };
  },
  name: "answerlist",
  created() {
    this.data = JSON.parse(this.answered);
    this.correct = JSON.parse(this.answer);
  },
  methods: {
    reply(item) {
      if (this.mode == "exam") {
        this.$emit("parentFill", item);
      }
    },
    isActive(sel, index) {
      if (this.baseType === "1" || this.baseType === "2" || this.baseType === "3" ) {
        if (this.mode == "exam") {
          let bo = this.userAnswer.indexOf(sel);
          return bo > -1;
        } else {
          let bo = this.correct.indexOf(sel);
          return bo > -1;
        }
      }
    },
    isAnswer(sel, index) {
      if (this.baseType === "1" || this.baseType === "2" || this.baseType === "3" ) {      
        if (this.mode !== "exam") {
          let bo = this.data.indexOf(sel);
          let b1 = this.correct.indexOf(sel);
          return (bo > -1 && b1<0);
        }
        return false;
      }
    },
    upload() {
      this.$emit("clickUploadImg");
    }
  }
};
</script>
