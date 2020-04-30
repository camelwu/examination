<template>
  <div class="h1">
    <span v-if="num" slot="num" class="txt__blue">{{ num }}</span>
    <span v-if="total" slot="total" class="h1_title_total">/{{ total }}</span>
    <span >{{title}}</span>
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
