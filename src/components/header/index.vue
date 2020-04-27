<template>
  <div class="header">
    <div
      class="icon"
      :click="onClickLeft"
    >
      <img :src="imgUrl" alt="<" />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      imgUrl: require("@/assets/arrow.png")
    };
  },
  name: "Header",
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    }
  }
};
</script>
