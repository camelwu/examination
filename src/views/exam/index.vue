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
    <Footer :num="this.num" :total="total" :path="mode" />
  </div>
</template>

<script>
// @ is an alias to /src
import Footer from "@/components/footer";
import Header from "@/components/header";
import Title from "@/components/title";
import Answer from "@/components/answer";
import fetch from "@/plugins/fetch";

export default {
  data() {
    return {
      // path: 'exam',
      num: 0,
      total: 0,
      sectionId: 0,
      loading: false,
      error: null,
      data: null,
      dataTitle: [
        { id: 1, title: "A.所有的直线都有斜率", isdisable: false },
        {
          id: 2,
          title: "B.倾斜角α的范围与三角形的内角范围一致",
          isdisable: false
        },
        { id: 3, title: "C.所有的直线都有倾斜角", isdisable: false },
        {
          id: 4,
          title: "D.直线的斜率k与倾斜角α满足关系式k·Cotα＝1",
          isdisable: false
        }
      ],
      userAnswer: {
        answer: [],
        courseId: "",
        imgUrl: "",
        paperId: "",
        questionId: "",
        sectionId: ""
      },
      mode: 'exam'
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
    // $route: "fetchData"
    $route(to,from){
      this.mode = to.name;
      if(to.params.num !== from.params.num){
        this.num = to.params.num;
        this.fetchData();
      }
      // console.log(to.path, from);
    }
  },
  methods: {
    parentAnswer(title) {
      const list = title || [];
      if (list.length === 1) {
        //单选
        this.singlt(list);
      } else {
        //多选
        this.double(list);
      }
    },
    singlt(list) {
      this.dataTitle.map((item, index) => {
        if (item.id === list[0].id) {
          this.dataTitle[index].isdisable = true;
        } else {
          this.dataTitle[index].isdisable = false;
        }
      });
    },
    double(list) {
      const doubleId = [];
      list.map(item => {
        if (doubleId.id !== item.id) {
          doubleId.push(item.id);
        }
      });
      console.log("doubleId", doubleId);
    },
    fetchData() {
      this.error = this.data = null;
      this.loading = true;
      fetch("api/paper/getPaperInfo", {
        num: this.num || 1,
        sectionId: ""
      }).then(res => {
        if (res.code == "0" && res.success) {
          let result = res.result;
          this.data = result.questionVo;
          console.log(this.data);
        } else {
          alert(res.message);
        }
      });
    }
  }
};
/*res = {
        code: 0,
        message: "",
        result: {
          answer: "",
          count: 0,
          curNum: 0,
          imgUrl: "",
          paperId: "",
          questionVo: {
            actType: "",
            actTypeName: "",
            answer: "",
            answerKey: "",
            baseType: "",
            context: "",
            id: "",
            question: "",
            questionItem: ""
          }
        },
        success: true,
        timestamp: 0
      };*/
</script>
