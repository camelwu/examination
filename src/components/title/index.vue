<template>
  <div>
    <h1>
    <span slot="num" class="span_num_blue">{{ $route.params.num }}</span>
    <span slot="title">{{title}}</span>
    </h1>
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
    title: String
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    onClickRight() {
      Toast("按钮");
    }
  }
};
</script>

<style scoped>
.span_num_blue {
  color: #1E9DF5;
}
</style>