<template>
  <div class="container">
    <div v-if="loading" class="loading">Loading...</div>
    <div v-if="error" class="error">{{ error }}</div>
    <div v-if="data" class="question">
      <article v-html="data.questionVo.context">{{ data.questionVo.context }}</article>
      <Title 
      :num="num" 
      :total="total" 
      :title="data.questionVo.actTypeName" />
      <section v-html="data.questionVo.question">{{ data.questionVo.question }}</section>
    </div>
    <Answer
      v-if="data"
      :mode="mode"
      :typeTitle="data.questionVo.actType"
      :items="data.questionVo.questionItem"
      :answer="data.questionVo.answer"
      @parentAnswer="parentAnswer"
      @clickUploadImg="clickUploadImg" />
    <div
      v-if="data"
      v-show="mode=='explain'">
      <Title title="试题解析" />
      <Paper
        :type="data.questionVo.actType" 
        :answer="data.questionVo.answer" 
        :reply="userAnswer.answer" 
        :answerKey="data.questionVo.answerKey" />
    </div>
    <Footer :num="num" :total="total" :path="mode" />
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
        // 答题
        answer: [],
        courseId: "",
        imgUrl: "",
        paperId: "",
        questionId: "",
        sectionId: ""
      },
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
    console.log("bridge:", this.$bridge);
    // 组件创建完后获取数据，先获取token等
    this.getMsg();this.getAppData();

    this.num = parseInt(this.$route.params.num.toString()) || 1;
    this.fetchData();
  },
  watch: {
    // 如果路由有变化，会再次执行该方法
    // $route: "fetchData"
    $route(to, from) {
      this.mode = to.name;
      if (to.params.num !== from.params.num) {
        this.num = to.params.num;
        this.fetchData();
      }
      // console.log(to.path, from);
    }
  },
  methods: {
    // js调app
    getMsg() {
      let msg = { action: "getMsg" };
      this.$jsbridge.callNative("dataFromApp", msg, (res) => {
        alert("jsbridge获取app响应数据:" + res);
        // this.test = res;
      })
      this.$bridge.callHandler("dataFromApp", msg, (res) => {
        alert("bridge获取app响应数据:" + res);
        this.test = res;
      });
    },
    // app调js
    getAppData() {
      this.$bridge.registerHandler("dataToJs", (data, responseCallback) => {
        alert("app主动调用js方法，传入数据:" + data);
        responseCallback(data);
      });
    },
    clickUploadImg() {
      let that = this;
      WebViewJavascriptBridge.callHandler(
        "uploadImgAlbumSelect",
        { name: "选择图片" },
        function(data) {
          that.getAppUpImage(data);
        }
      );
    },
    getAppUpImage(url) {
      let data = JSON.parse(url);
      //this.$vux.alert.show({title:'提示',content:data});
      this.imageData.push(data.path);
      this.imageName.push(data.name);
    },
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
        this.loading = false;
        if (res.code == "0" && res.success) {
          let result = res.result;
          this.data = result;
          this.total = result.count;
          console.log(this.data);
        } else {
          alert(res.message);
          // let result = {
          //   answer: "",
          //   count: 0,
          //   curNum: 0,
          //   imgUrl: "",
          //   paperId: "",
          //   questionVo: {
          //     actType: "",
          //     actTypeName: "",
          //     answer: "",
          //     answerKey: "",
          //     baseType: "",
          //     context: `In winter the weather in England is often very cold. In spring and autumn there are sometimes cold days, but there are also days when the weather is warm. The weather is usually warm in summer. It is sometimes hot in summer, but it is not often very hot. There are often cool days in summer.When the temperature is over 27℃, English people say it is hot. When the temperature is about 21℃, they say it is warm.In the north of Europe it is very cold in winter. In the south of Europe the summer is often very hot. In the south of Spain(1) and in North Africa(2) the summer is always hot.Water freezes(3) at 0℃. When water freezes, it changes from a liquid(4) into ice. Water boils(5) at 100℃. When water boils, it changes from a liquid into steam(6).Notes: (1)Spain/speIn/n. 西班牙(2)Africa/'frIk/n.非洲 (3)freeze/fri：z/v.结冰(4)liquid/'lIkwId/n.液体 (5)boil/bIl/v.沸腾;(水)开 (6)steam/sti：m/ n.蒸汽 tionVo`,
          //     id: "",
          //     question: "1.What is the weather like in summer in England?",
          //     questionItem: ""
          //   }
          // };
          // this.data = result;
          // this.total = result.count;
        }
      });
    }
  }
};
</script>
