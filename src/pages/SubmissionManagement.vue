<template>
    <v-app>
        <v-main>
            <v-container>
             <h2>
                <space></space>提出物管理
            </h2>                
                <v-row>
                    <v-col cols="10">
                        <v-data-table :headers="headers" :items="submission"></v-data-table>
                    </v-col>
                </v-row>
            </v-container>
            <router-view />
        </v-main>
    </v-app>
</template>

<script>
import axios from 'axios'
export default {
    components: {
    },
    data() {
        return {
            submission: [],
            headers: [
                {
                    text: 'No',
                    value: 'id',
                },
                {
                    text: '提出物内容',
                    value: 'content',
                },
                {
                    text: '提出対象者',
                    value: 'userName'
                },
                {
                    text: '提出期限',
                    value: 'deadline'
                },
                {
                    text: 'リマインド日時',
                    value: 'remindDateTime',
                },
                {
                    text: '完了',
                    value: 'completeFlag'
                },
            ],
        }
    },
    methods: {
        getSubmission() {
            const path = 'http://localhost:8080/submission'
            axios.get(path)
                .then(response => {
                    this.submission = response.data
                })
                .catch(error => {
                    console.log(error)
                })
        }
    },
    created() {
        this.getSubmission()
    }
}
</script>

<style scoped>


</style>