<template>
  <div class="explain">
    <div v-show="type==='select'" class="seletor">
      <ul>
        <li>正确答案</li>
        <li>我的答案</li>
        <li class="s">{{answer}}</li>
        <li>{{reply}}</li>
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
  methods: {}
};
</script>
