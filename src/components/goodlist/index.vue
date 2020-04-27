<template>
  <div class="goodslist">
    <ul class="good-list" ref="goodlists">
      <li class="glist-item" v-for="good in goods" :key="good.id+'col'">
        <div class="pd-goods-img">
          <img alt="good-imgs" :src="good.thumb">
        </div>
        <div class="pd-goods-txt">
          <span class="pd-goods-name">{{good.title}}</span>
          <span class="pd-goods-price"></span>
          <span class="pd-goods-mprice">￥<span>99</span></span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    goods: Array
  },
  data() {
    return {
      fixed: true,
      scroll: { scrollTop: 0, isFixed: true },
      active: 2
    };
  },
  name: "goodlist",
  methods: {
    onClick(index, title) {
      this.$toast(title);
    }
  },
  created() {
  }
};
</script>

<style scoped>
.goodslist {
  width: 100%;
  height:100%;
  overflow-y: auto;
}
.good-list {
  position: relative;
  width: 100%;
  padding: 0.03rem 0.045rem 0.17rem;
  text-align: left;
  background-color: #f3f3f3;
}
.glist-item {
  display: inline-block;
  float: left;
  width: 1.74rem;
  height: 2.45rem;
  margin: 0.09rem 0.045rem 0;
  background-color: #fff;
}
.pd-goods-img {
  position: relative;
  width: 1.46rem;
  height: 1.46rem;
  margin: 0.14rem 0.14rem 0.11rem;
}
.pd-goods-img img {
  width: 100%;
  height: 100%;
}
.pd-goods-txt {
  position: relative;
  width: 90%;
  max-width: 248px;
  margin: 0 auto;
  text-align: center;
}
</style>
