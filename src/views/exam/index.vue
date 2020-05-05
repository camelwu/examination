<template>
  <div class="container">
    <div v-if="loading" class="loading">Loading...</div>
    <div v-if="error" class="error">{{ error }}</div>
    <div v-if="data" class="question">
      <article v-show="data.questionVo.context" v-html="data.questionVo.context">{{ data.questionVo.context }}</article>
      <Title 
      :num="num" 
      :total="total" 
      :title="data.questionVo.actTypeName" />
      <section v-html="data.questionVo.question">{{ data.questionVo.question }}</section>
    </div>
    <Answer
      v-if="data"
      :mode="mode"
      :baseType="data.questionVo.baseType"
      :items="JSON.parse(data.questionVo.questionItem)"
      :answered="data.answer"
      :userAnswer="userAnswer"
      :answer="data.questionVo.answer"
      @parentFill="fillAnswer"
      @clickUploadImg="clickUploadImg" />
    <div
      v-if="data"
      v-show="mode=='explain'">
      <Title title="试题解析" />
      <Paper
        :type="data.questionVo.baseType"
        :answer="data.questionVo.answer"
        :reply="userAnswer"
        :answerKey="data.questionVo.answerKey" />
    </div>
    <Footer 
      :num="num"
      :total="total"
      :mode="mode"
      @parentAnswer="submitAnswer"
      @parentReset="resetAnswer" />
  </div>
</template>

<script>
// @ is an alias to /src
import Footer from "@/components/footer";
// import Header from "@/components/header";
import Title from "@/components/title";
import Answer from "@/components/answer";
import Paper from "@/components/paper";
import fetch from "@/plugins/fetch";

export default {
  data() {
    return {
      num: 0,
      total: 0,
      courseId: "",
      sectionId: "",
      imgUrl: "",
      loading: false,
      error: null,
      data: null,
      userAnswer: [],
      mode: "exam"
    };
  },
  name: "exam",
  components: {
    // Header,
    Footer,
    Title,
    // Question,
    Paper,
    Answer
  },
  created() {
    // 组件创建完后获取数据，先获取token等
    this.num = parseInt(this.$route.params.num.toString()) || 1;
    this.getMsg();
    this.getAppData();

    // let res = {"token":"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJwaG9uZSI6IjEzNTAyMTQ1OTQzIiwiZXhwIjoxNTg5Mjk3MzExfQ.ou2kwcf9hdARATIJn75jfX-rtJFih02FV3QKAvHIC0M","id":1251131102261739521,"courseId":1240774211639824386};
    // this.data2Storage(res);
  },
  mounted() {},
  watch: {
    // 如果路由有变化，会再次执行该方法
    // $route: "fetchData"
    $route(to, from) {
      this.userAnswer = [];
      this.mode = to.name;
      if (to.params.num != from.params.num) {
        let goNum = parseInt(to.params.num.toString());
        if (goNum < this.total || this.total == 0) {
          this.num = goNum;
          this.fetchData();
        } else {
          window.location.href =
            "/result?courseId=" +
            this.courseId +
            "&paperId=" +
            this.data.paperId;
          return false;
        }
      }
      console.log(to.path, from);
    }
  },
  // beforeRouteEnter(to, from, next) {
  //   // 在渲染该组件的对应路由被 confirm 前调用
  //   // 不！能！获取组件实例 `this`
  //   // 因为当钩子执行前，组件实例还没被创建
  // },
  // beforeRouteUpdate(to, from, next) {
  //   // 在当前路由改变，但是该组件被复用时调用
  //   // 举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，
  //   // 由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
  //   // 可以访问组件实例 `this`
  // },
  // beforeRouteLeave(to, from, next) {
  //   // 导航离开该组件的对应路由时调用
  //   // 可以访问组件实例 `this`
  // },
  methods: {
    // js调app
    getMsg() {
      let msg = { action: "getMsg" };
      this.$bridge.callHandler("dataFromApp", msg, res => {
        console.log("dataFromApp, 传入数据:" + res);
        this.data2Storage(res);
      });
    },
    // app调js
    getAppData() {
      this.$bridge.registerHandler("dataToJs", (data, responseCallback) => {
        console.log("app主动调用js方法, 传入数据:" + data);
        try {
          this.data2Storage(data);
        } catch (e) {
          console.log(e);
        }
        responseCallback(data);
      });
    },
    data2Storage(data) {
      console.log("处理传入数据:"+data);
      const { token, id, courseId } = data;
      localStorage.setItem("token", token);
      this.sectionId = id;
      this.courseId = courseId;
      this.fetchData();
    },
    clickUploadImg() {
      let that = this;
      // WebViewJavascriptBridge
      this.$bridge.callHandler(
        "uploadImgAlbumSelect",
        { action: "photo" },
        function(data) {
          that.getAppUpImage(data);
        }
      );
    },
    getAppUpImage(url) {
      let data = JSON.parse(url);
      console.log({data});
      this.imgUrl = data.path;
      this.imgName = data.name;
    },
    fillAnswer(sel) {
      const baseType = this.data.questionVo.baseType;
      if (baseType) {
        if (baseType === "2") {
          //复选
          let index = this.doubleList.indexOf(sel);
          if (index > -1) {
            this.userAnswer.splice(index, 1);
          } else {
            this.userAnswer.push(item);
          }
        } else {
          //单选，判断，填空，主观
          this.userAnswer = [sel];
        }
      }
    },
    fetchData() {
      console.log("Begin fetch data from api.");
      this.error = this.data = null;
      this.loading = true;
      fetch("api/paper/getPaperInfo", {
        num: this.num || 1,
        sectionId: this.sectionId
      }).then(res => {
        this.loading = false;
        if (res.code == "200" && res.success) {
          let result = res.result;
          this.data = result;
          this.total = result.count;
        } else {
          console.log("fetchData error: " + data);
          this.error = res.message;
        }
      });
    },
    submitAnswer() {
      let curNum = this.num + 1;
      if (curNum <= this.total) {
        // 都需要先提交问题才能，下一题。最后一题相同
        fetch(
          "api/paper/answer",
          {
            answer: this.userAnswer || [],
            courseId: this.courseId || "",
            sectionId: this.sectionId || "",
            paperId: this.data.paperId || "",
            questionId: this.data.questionVo.id || "",
            imgUrl: ""
          },
          "POST"
        ).then(res => {
          this.userAnswer = [];
          // 答案复位
          if (res.code == "200" && res.success) {
            this.$router.push("/exam/" + curNum);
          } else {
            this.error = "提交答案失败，" + res.message;
          }
        });
      } else {
        this.$router.push(
          "/result?courseId=" + this.courseId + "&paperId=" + this.data.paperId
        );
      }
    },
    resetAnswer() {
      fetch(
        "api/paper/resetAnswer",
        {
          paperId: this.data.paperId || ""
        },
        "POST"
      ).then(res => {
        if (res.code == "200" && res.success) {
          this.$router.push("/exam/1");
        } else {
          alert("Sth error, pls try it again!");
        }
      });
    }
  }
};
</script>
