<template>
  <div class="explain">
    <div v-show="parseInt(type)<4" class="seletor">
      <ul>
        <li>正确答案</li>
        <li>我的答案</li>
        <li class="s">{{formatAnswer(answer)}}</li>
        <li>{{formatAnswer(reply)}}</li>
      </ul>
    </div>
    <article v-html="answerKey">{{answerKey}}</article>
  </div>
</template>

<script>
export default {
  props: {
    type: String,
    answer: String,
    answerKey: String,
    reply: Array
  },
  data() {
    return {};
  },
  name: "paper",
  methods: {
    formatAnswer(s) {
      if ("string" == typeof s) {
        console.log(JSON.parse(this.answer).join(", "));
        return JSON.parse(this.answer).join(", ");
      } else {
        return s.join(", ");
      }
    }
  }
};
</script>
