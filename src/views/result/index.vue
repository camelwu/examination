<template>
  <div class="container">
    <Title title="答题卡" />
    <div class="result-types">
      <li class="result-item" v-for="(type, index) in types" :key="'type'+index">
        <div class="types-circle" :style="'background-color:'+type.color" />
        <span class="types-text">{{type.title}}</span>
      </li>
    </div>
    <div v-if="loading" class="loading">Loading...</div>
    <div v-if="error" class="error">{{ error }}</div>
    <div v-if="data" class="result-list">
      <!-- class="result-item" -->
      <div v-for="(res, index) in data" :key="'result'+index" class="result-circle" :style="'background-color:'+getColor(res.result)">{{index+1}}</div>
    </div>
    <!-- </div> -->
    <Footer :num="num" :total="total" path="result" />
  </div>
</template>

<script>
// @ is an alias to /src
import Footer from "@/components/footer";
// import Header from "@/components/header";
import Title from "@/components/title";
import fetch from "@/plugins/fetch";
export default {
  data() {
    return {
      total: 0,
      types: [
        {
          result: 1,
          color: "#1E9DF5",
          title: "答对"
        },
        {
          result: 3,
          color: "#DCDCDC",
          title: "未答题"
        },
        {
          result: 0,
          color: "#FC7766",
          title: "答错"
        },
        {
          result: 2,
          color: "#FFC581",
          title: "无法判题"
        }
      ],
      loading: true,
      data: null
    };
  },
  name: "result",
  components: {
    // Header,
    Footer,
    Title
  },
  created() {
    // 组件创建完后获取数据，
    this.num = this.$route.params.num || 1;
    console.log(this.num);
    console.log(this.$route);
    this.fetchData();
  },
  methods: {
    getColor(result) {
      if (result < 0 || result > 3) {
        return "#fff";
      }
      return this.types.filter(item => {
        return item.result == result;
      })[0].color;
    },
    onClickCart() {
      this.$router.push("cart");
    },
    fetchData() {
      this.error = this.data = null;
      this.loading = true;
      fetch("api/paper/getPaperAllResult", {
        courseId: "get",
        paperId: ""
      }).then(res => {
        this.loading = false;
        if (res.code == "0" && res.success) {
          let result = res.result;
          this.data = result.lstQuestionResult;
          // console.log(this.data);
        } else {
          // alert(res.message);
          let result = {
            lstQuestionResult: [
              {
                paperId: "",
                questionId: "",
                result: 1
              },
              {
                paperId: "",
                questionId: "",
                result: 2
              },
              {
                paperId: "",
                questionId: "",
                result: 1
              },
              {
                paperId: "",
                questionId: "",
                result: 0
              },
              {
                paperId: "",
                questionId: "",
                result: 3
              },
              {
                paperId: "",
                questionId: "",
                result: 0
              },
              {
                paperId: "",
                questionId: "",
                result: 0
              },
              {
                paperId: "",
                questionId: "",
                result: 1
              },
              {
                paperId: "",
                questionId: "",
                result: 2
              },
              {
                paperId: "",
                questionId: "",
                result: 1
              },
              {
                paperId: "",
                questionId: "",
                result: 0
              },
              {
                paperId: "",
                questionId: "",
                result: 3
              },
              {
                paperId: "",
                questionId: "",
                result: 0
              },
              {
                paperId: "",
                questionId: "",
                result: 0
              }
            ],
            totalNum: 0
          };
          this.data = result.lstQuestionResult;
        }
      });
    },
    resetAnswer() {
      fetch("api/paper/resetAnswer", {
        paperId: ""
      }).then(res => {
        if (res.code == "0" && res.success) {
          this.$router.push('/exam/1');
        } else {
          alert("Sth error, pls try it again!");
        }
      });
    }
  }
};
</script>
