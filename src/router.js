import Vue from 'vue';
import Router from 'vue-router';
import Exam from './views/exam';
import Result from './views/result';
import Explain from './views/explain';

Vue.use(Router);
export default new Router({
  mode: 'history',
  routes: [
    /*Home,            //题型 1～n
    Explain,         //解析 1～n
    Result,          //结果*/
    {
      path: '/',
      name: 'exam',
      component: Exam
    },
    {
      path: '/exam/:num',
      name: 'exam',
      component: Exam
    },
    {
      path: '/explain',
      name: 'Explain',
      component: Explain
    },
    {
      path: '/result',
      name: 'Result',
      component: Result
    }
  ]
});
