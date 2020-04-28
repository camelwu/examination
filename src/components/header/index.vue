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
      imgUrl: require("@/assets/left.png")
    };
  },
  name: "Header",
  methods: {
    onClickLeft() {
      console.log('back to app!');
    }
  }
};
</script>
