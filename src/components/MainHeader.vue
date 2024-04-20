<template>
  <v-app-bar dark app variant="dark" fixed="top">
    <v-toolbar-title>テシュカン</v-toolbar-title>
    <v-spacer></v-spacer>
    <!-- <div v-if="is_login === false"> -->
    <!-- </div>
    <div v-else-if="is_login === true"> -->
    <v-btn @click="submissionManagement()">
      <svg-icon type="mdi" :path="fileDocumentCheckOutline"></svg-icon>提出物管理
    </v-btn>
    <v-btn @click="memberManagement()">
      <svg-icon type="mdi" :path="accountGroup"></svg-icon>メンバー管理
    </v-btn>
    <v-btn @click="groupManagement()">
      <svg-icon type="mdi" :path="accountSupervisorCircle"></svg-icon>グループ管理
    </v-btn>
    <v-btn @click="logout()">
      <svg-icon type="mdi" :path="applicationExport"></svg-icon>
    </v-btn>
    <!-- </div> -->
  </v-app-bar>
</template>

<script>
import SvgIcon from '@jamescoyle/vue-icon';
import { mdiAccountGroup } from '@mdi/js';
import { mdiAccountSupervisorCircle } from '@mdi/js';
import { mdiApplicationExport } from '@mdi/js';
import { mdiFileDocumentCheckOutline } from '@mdi/js';

export default {
  name: "my-component",
  components: {
    SvgIcon
  },
  data() {
    return {
      accountGroup: mdiAccountGroup,
      accountSupervisorCircle: mdiAccountSupervisorCircle,
      applicationExport: mdiApplicationExport,
      fileDocumentCheckOutline: mdiFileDocumentCheckOutline,
      is_login: this.$route.params.is_login,
    }
  },
  methods: {
    submissionManagement() {
      this.$router.push({
        name: "SubmissionManagement"
      });
    },
    memberManagement() {
      this.$router.push({
        name: "MemberManagement"
      });
    },
    groupManagement() {
      this.$router.push({
        name: "GroupManagement"
      });
    },
    logout() {
      this.$router.push(
        "/"
      );
    },
  }
}
</script>

<style scoped></style>