<template>
  <div class="h1">
    <span slot="num" class="span__blue">{{ num }}</span>
    <span slot="num" class="h1_title_total">/{{ total }}</span>
    <span slot="title">{{title}}</span>
  </div>
</template>

<script>
export default {
  data() {
    return {
    };
  },
  name: "Title",
  props: {
    num: Number,
    total: Number,
    title: String
  },
};
</script>
