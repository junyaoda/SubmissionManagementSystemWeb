<template>
  <v-app>
    <v-main>
      <MainHeader />
      <router-view />
      <MainFooter />
    </v-main>
  </v-app>
</template>

<script>
import MainHeader from './components/MainHeader.vue'
import MainFooter from './components/MainFooter.vue'
export default {
  components: {
    MainHeader,
    MainFooter
  },
}
</script>
