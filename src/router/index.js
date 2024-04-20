import Login from "../pages/MainLogin";
import SubmissionManagement from "../pages/SubmissionManagement";
import MemberManagement from "../pages/MemberManagement";
import MemberUpdate from "../pages/MemberUpdate";
import MemberInsert from "../pages/MemberInsert";
import GroupManagement from "../pages/GroupManagement";
import GroupUpdate from "../pages/GroupUpdate";
import GroupInsert from "../pages/GroupInsert";
import PageLoading from "../pages/PageLoading";
import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: "/",
      name: "Login",
      component: Login
    },
    {
      path: "/submissionManagement",
      name: "SubmissionManagement",
      component: SubmissionManagement
    },
    {
      path: "/memberManagement",
      name: "MemberManagement",
      component: MemberManagement,
      props: true
    },
    {
      path: "/memberUpdate",
      name: "MemberUpdate",
      component: MemberUpdate,
      props: true
    },
    {
      path: "/memberInsert",
      name: "MemberInsert",
      component: MemberInsert,
      props: true
    },
    {
      path: "/groupManagement",
      name: "GroupManagement",
      component: GroupManagement
    },
    {
      path: "/groupUpdate",
      name: "GroupUpdate",
      component: GroupUpdate,
      props: true
    },
    {
      path: "/groupInsert",
      name: "GroupInsert",
      component: GroupInsert,
      props: true
    },
    {
      path: "/pageLoading",
      name: "PageLoading",
      component: PageLoading
    },
  ]
});