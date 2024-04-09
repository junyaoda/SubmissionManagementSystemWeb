<template>
    <main>
        <button v-on:click="login">ログイン</button>
    </main>
</template>

<script>
export default {
    data() {
        return {
            is_login: true,
        }
    },
    methods: {
        login(){
            this.$router.push({
                name: "SubmissionManagement",
                params: {
                    is_login: true,
                }
            });
        },
    },
}
</script>

<style scoped>
main {
    height: calc(100vh - 152px);
    padding: 3% 0;
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>