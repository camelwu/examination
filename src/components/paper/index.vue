<template>
  <div class="explain">
    <div v-show="parseInt(type)<4">
      <ul class="selector">
        <li class="th">正确答案</li>
        <li class="th">我的答案</li>
        <li class="s">{{formatAnswer(answer)}}</li>
        <li class="r">{{formatAnswer(reply)}} </li>
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
    reply: String
  },
  data() {
    return {};
  },
  name: "paper",
  methods: {
    formatAnswer(s) {
      if ("string" == typeof s) {
        return JSON.parse(s).join(", ");
      } else {
        return s.join(", ");
      }
    }
  }
};
</script>
