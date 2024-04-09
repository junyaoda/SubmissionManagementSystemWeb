<template>
    <main>
        <div class="container">
            <vue-loading type="spiningDubbles" color="#aaa" :size="{ width: '50px', height: '50px' }"></vue-loading>
        </div>
    </main>
</template>

<script>
// インポート
import { VueLoading } from 'vue-loading-template'
import constant from '@/consts/const';

export default {
    components: {
        VueLoading
    },
    data() {
        return {
            message: this.$route.params.message,
            pageCode: this.$route.params.pageCode,
        };
    },
    created() {
        setTimeout(() => {
            if (this.pageCode == constant.MEMBER_MANAGEMENT_PAGE) {
                this.$router.push({
                    name: "MemberManagement",
                    params: {
                        message: this.$route.params.message,
                    }
                });
            }
            else if (this.pageCode == constant.GROUP_MANAGEMENT_PAGE) {
                this.$router.push({
                    name: "GroupManagement",
                    params: {
                        message: this.$route.params.message,
                    }
                });
            }
        }, constant.LOADING_DISPLAY_TIME);
    }
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