<template>
    <v-container>
        <v-row>
            <v-col cols="11">
                <h2>
                    メンバー更新
                </h2>
            </v-col>
            <v-col>
                <v-btn small fab dark color="indigo" @click="back()">
                    <v-icon dark> mdi-undo-variant </v-icon>
                </v-btn>
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <v-text-field hide-details="auto" @keyup="inputCheck" v-model="userName"
                    label="UserName"></v-text-field>
            </v-col>
            <v-col>
                <v-text-field label="SlackId" @keyup="inputCheck" v-model="slackId" variant="outlined"></v-text-field>
            </v-col>
        </v-row>
        <v-layout>
            <v-btn class="mx-auto" :disabled="!inputCheck" @click="update(id, userName, slackId)">
                Update
            </v-btn>
        </v-layout>
    </v-container>
</template>

<script>
import axios from 'axios';
import constant from '@/consts/const';
export default {
    data() {
        return {
            id: this.$route.params.id,
            userName: this.$route.params.userName,
            slackId: this.$route.params.slackId,
        };
    },
    //入力フォームに入力時、処理実施
    computed: {
        //入力チェック
        inputCheck() {
            //ユーザ名もしくはSlackIDが未入力もしくは空白行のみの場合
            if (!(this.userName.match(/\S/g)) || !(this.slackId.match(/\S/g))) {
                //非活性
                return false
            }
            //上記以外の場合
            else {
                //活性
                return true
            }
        }
    },
    methods: {
        update(id, userName, slackId) {
            var res = confirm(constant.UPDATE_CONFIRM_MESSAGE);
            
            if (res == true) {
                const path = constant.UPDATE_USER_PATH
                axios.post(path, {
                    id: id,
                    userName: userName,
                    slackId: slackId,
                }
                )
                    .then(response => {
                        this.$router.push({
                            name: "PageLoading",
                            params: {
                                message: constant.UPDATE_COMPLETE_MESSAGE,
                                pageCode: constant.MEMBER_MANAGEMENT_PAGE
                            }
                        });
                        console.log(response.data);
                    })
                    .catch(err => {
                        this.$router.push({
                            name: "MemberManagement",
                            params: {
                                message: constant.ERROR_MESSAGE
                            }
                        });
                        console.log("err:", err);
                    });
            }
        },
        back() {
            this.$router.push({
                name: "MemberManagement"
            })
        },
    }
}
</script>

<style scoped></style>