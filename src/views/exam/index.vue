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
      :img="imgUrl"
      @parentFill="fillAnswer"
      @clickUploadImg="clickUploadImg" />
    <div
      v-if="data"
      v-show="mode=='explain'">
      <Title title="试题解析" />
      <Paper
        :type="data.questionVo.baseType"
        :answer="data.questionVo.answer"
        :reply="data.answer"
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
      imgUrl: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1588875893817&di=ca214c036d1775e6c13c4ffac7bf2816&imgtype=0&src=http%3A%2F%2Fimg1.mukewang.com%2F5b178f140001c67d17201030.jpg",
      loading: false,
      error: null,
      data: null,
      userAnswer: [],
      mode: "exam"
    };
  },
  name: "exam",
  components: {
    Footer,
    Title,
    Paper,
    Answer
  },
  created() {
    // 组件创建完后获取数据，先从App获取token等
    this.mode = this.$route.params.mode || this.mode;
    this.num = parseInt(this.$route.params.num.toString()) || 1;
    this.getMsg();
    this.getAppUpImage();
    // 如果本地mock数据，把下面的两行代码开启，上面的进行注释即可。
    /*let res = {
      token:
        "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJwaG9uZSI6IjEzNTAyMTQ1OTQzIiwiZXhwIjoxNTg5Mjk3MzExfQ.ou2kwcf9hdARATIJn75jfX-rtJFih02FV3QKAvHIC0M",
      id: "1251131102261739521",
      courseId: "1240774211639824386"
    };
    if (typeof res === "string") {
      this.data2Storage(JSON.parse(res));
    } else {
      this.data2Storage(res);
    }*/
  },
  mounted() {},
  watch: {
    // 如果路由有变化，会再次执行该方法
    // $route: "fetchData"
    $route(to, from) {
      this.userAnswer = [];
      this.mode = to.params.mode;
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
  methods: {
    // js调app
    getMsg() {
      this.$bridge.callHandler("dataFromApp", { action: "getMsg" }, res => {
        // console.log("dataFromApp, 传入数据:" + res);
        if (typeof res === "string") {
          this.data2Storage(JSON.parse(res));
        } else {
          this.data2Storage(res);
        }
      });
    },
    clickUploadImg() {
      console.log('WebViewJavascriptBridge');
      this.$bridge.callHandler("dataFromApp", { action: "photo" }, res => {
        console.log(res);
      });
    },
    // app调js
    getAppUpImage() {
      this.$bridge.registerHandler("dataToJs", (res, responseCallback) => {
        try {
          if (typeof res === "string") {
            this.imgUrl = res;
          } else {
            console.log("格式错误", res);
          }
        } catch (e) {
          console.log(e);
        }
        responseCallback(res);
      });
    },
    data2Storage(data) {
      console.table(data);
      const { token, id, courseId } = data;
      localStorage.setItem("token", token);
      this.sectionId = id.toString();
      this.courseId = courseId.toString();
      this.fetchData();
    },
    fillAnswer(sel) {
      const baseType = this.data.questionVo.baseType;
      if (baseType) {
        if (baseType === "2") {
          //复选
          let index = this.userAnswer.indexOf(sel);
          if (index > -1) {
            this.userAnswer.splice(index, 1);
          } else {
            this.userAnswer.push(sel);
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
      })
        .then(res => {
          this.loading = false;
          if (res.code == "200" && res.success) {
            let result = res.result;
            this.data = result;
            this.total = result.count;
          } else {
            console.log("fetchData error: " + data);
            this.error = res.message;
          }
        })
        .catch(error => {
          console.log("request failed", error);
        });
    },
    submitAnswer() {
      let curNum = this.num + 1;
      if (curNum <= this.total) {
        // 都需要先提交问题才能，下一题。最后一题相同
        if (this.mode == "exam" && this.userAnswer) {
          fetch(
            "api/paper/answer",
            {
              answer: this.userAnswer,
              courseId: this.courseId || "",
              sectionId: this.sectionId || "",
              paperId: this.data.paperId || "",
              questionId: this.data.questionVo.id || "",
              imgUrl: this.imgUrl || ""
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
          this.$router.push("/" + this.mode + "/" + (this.num + 1));
        }
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
