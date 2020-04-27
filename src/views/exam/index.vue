<template>
  <div>
    <Header/>
    <Title title="首页"/>
    <div v-if="loading" class="loading">
      Loading...
    </div>

    <div v-if="error" class="error">
      {{ error }}
    </div>

    <div v-if="post" class="content">
      <h2>{{ post.title }}</h2>
      <p>{{ post.body }}</p>
    </div>
    <Footer/>
  </div>
</template>

<script>
// @ is an alias to /src
import Footer from "@/components/footer";
import Header from "@/components/header";
// import fetch from "@/plugins/fetch";

export default {
  data() {
    return {
      num: 1,
      sectionId: 0,
      loading: false,
      data: null,
      error: null
    };
  },
  name: "home",
  components: {
    Header,
    Footer,
    // HelloWorld
  },
  created () {
    // 组件创建完后获取数据，
    // 此时 data 已经被 observed 了
    this.fetchData()
  },
  watch: {
    // 如果路由有变化，会再次执行该方法
    '$route': 'fetchData'
  },
  methods: {
    fetchData () {
      this.error = this.post = null
      this.loading = true
      // fetch('http://localhost:3000/category/searchcategory?menuName='+this.menuName, {
      //   method: 'get'
      // }).then(response => response.json()).then(data => {
      //     this.data = data.data;
      //     // console.log(this.category)
      // })

      // fetch(this.$route.params.num, (err, post) => {
      //   this.loading = false
      //   if (err) {
      //     this.error = err.toString()
      //   } else {
      //     this.post = post
      //   }
      // })
    }
  }
};
</script>
