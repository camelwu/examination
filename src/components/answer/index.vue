<template>
  <div class="answer">
    <ul class="answer-list">
      <li :class="item.isdisable ? 'active' : ''" v-for="item in items" :key="item.id+'col'" @click="seleted(item)">
        <span>{{item.title}}</span>
      </li>
    </ul>
    <textarea class="inputs" placeholder="请输入答案"></textarea>
    <div class="uploads" @click="upload">
      <img class="camera" :src="imgUrl">
      <p>上传答案</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    items: Array,
    typeTitle: String
  },
  data() {
    return {
      sel: [],
      active: 2,
      activeSingle: 0,
      doubleList:[],
      imgUrl: require("@/assets/camera.png")
    };
  },
  name: "answerlist",
  methods: {
    seleted(item) {
      if(this.typeTitle && this.typeTitle === 'single'){
        this.$emit('parentAnswer', [item])
      }
      if(this.typeTitle && this.typeTitle === 'double') {
        const doubleList = this.doubleChange(item)
        this.$emit('parentAnswer', doubleList)
      }
    },
    doubleChange(item) {
      this.doubleList.push(item)
    },
    upload(){
      this.$emit('clickUploadImg')
    }
  },
  created() {
    console.log('props',this.typeTitle)
  }
};
</script>
