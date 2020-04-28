<template>
  <div class="container">
    <Header />
    <div v-if="loading" class="loading">Loading...</div>

    <div v-if="error" class="error">{{ error }}</div>

    <div v-if="data" class="question">
      <article v-html="data.context">{{ data.context }}</article>
      <Title :num="num" :total="total" :title="total +'单选题'" />
      <section v-html="data.question">{{ data.question }}</section>
    </div>
    <Answer typeTitle='single' :goods="dataTitle" @parentAnswer='parentAnswer' />
    <Footer :num="num" :total="total" path="exam" />
  </div>
</template>

<script>
// @ is an alias to /src
import Footer from "@/components/footer";
import Header from "@/components/header";
import Title from "@/components/title";
import Answer from "@/components/answer";
// import fetch from "@/plugins/fetch";

export default {
  data() {
    return {
      // path: 'exam',
      num: 0,
      total: 18,
      sectionId: 0,
      loading: false,
      error: null,
      data: null,
      dataTitle: [
        { id: 1, title: "A.所有的直线都有斜率", isdisable: false },
        { id: 2, title: "B.倾斜角α的范围与三角形的内角范围一致",isdisable: false },
        { id: 3, title: "C.所有的直线都有倾斜角",isdisable: false },
        { id: 4, title: "D.直线的斜率k与倾斜角α满足关系式k·Cotα＝1",isdisable: false }
      ]
    };
  },
  name: "exam",
  components: {
    Header,
    Footer,
    Title,
    // Question,
    // Paper,
    Answer
  },
  created() {
    // 组件创建完后获取数据，
    this.num = this.$route.params.num || 1;
    console.log(this.num);
    console.log(this.$route);
    this.fetchData();
  },
  watch: {
    // 如果路由有变化，会再次执行该方法
    $route: "fetchData"
  },
  methods: {
    parentAnswer(title) {
     const list = title || []
     if(list.length === 1) { //单选
      this.singlt(list)
     } else { //多选
        this.double(list)
     }
    },
    singlt(list) {
       this.dataTitle.map((item,index)=>{
        if(item.id === list[0].id) {
          this.dataTitle[index].isdisable = true
        } else {
          this.dataTitle[index].isdisable = false
        }
      })
    },
    double(list) {
      const doubleId = []
       list.map((item) =>{
         if(doubleId.id !== item.id) {
           doubleId.push(item.id)
         }
       })
       console.log('doubleId', doubleId)
    },
    fetchData() {
      this.error = this.post = null;
      this.loading = true;
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
