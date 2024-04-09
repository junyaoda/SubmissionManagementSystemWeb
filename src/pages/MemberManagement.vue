<template>
    <v-container>
        <v-row>
            <v-col cols="4">
                <h2>
                    メンバー管理
                </h2>
            </v-col>
            <v-col cols="3">
                <Transition name="fade">
                    <div v-if="result">
                        <div v-if="message === this.error" class="alert alert-danger d-flex align-center justify-center"
                            style="height: 39px">
                            {{ message }}
                        </div>
                        <div v-else class="alert alert-success d-flex align-center justify-center" style="height: 1px">
                            {{ message }}
                        </div>
                    </div>
                </Transition>
            </v-col>
            <v-col cols="4">
            </v-col>
            <v-col cols="1">
                <v-btn small fab dark color="indigo" @click="insert()">
                    <v-icon dark> mdi-plus </v-icon>
                </v-btn>
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <v-data-table :headers="headers" :items="users">
                    <template v-slot:[`item.operation`]="{ index }">
                        <v-btn small @click="update(users[index].id, users[index].userName, users[index].slackId)">
                            <v-icon> mdi-pencil</v-icon>
                        </v-btn>
                        <v-btn small @click="del(users[index].id)">
                            <v-icon> mdi-delete </v-icon>
                        </v-btn>
                    </template>
                </v-data-table>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import axios from 'axios'
import constant from '@/consts/const';
export default {
    data() {
        return {
            error: constant.ERROR_MESSAGE,
            message: this.$route.params.message,
            result: false,
            users: [],
            headers: [
                {
                    text: 'ユーザ名',
                    value: 'userName',
                },
                {
                    text: 'SlackID',
                    value: 'slackId',
                },
                {
                    text: '操作',
                    value: 'operation',
                    align: 'center',
                    sortable: false,
                },
            ],
        }
    },
    created() {
        this.selectAll()
        if (this.message != null) {
            this.result = true;
            setTimeout(() => { 
                this.result = false; 
            }, constant.MESSAGE_DISPLAY_TIME);
        }
    },
    methods: {
        selectAll() {
            const path = constant.SELECT_USER_ALL_PATH;
            axios.get(path)
                .then(response => {
                    this.users = response.data
                })
                .catch(error => {
                    console.log(error)
                })
        },
        insert() {
            this.$router.push(
                "MemberInsert"
            );
        },
        del(id) {
            var res = confirm(constant.DELETE_CONFIRM_MESSAGE);
            if (res == true) {
                const path = constant.DELETE_USER_PATH + id
                axios.delete(path)
                    .then(response => {
                        this.$router.push({
                            name: "PageLoading",
                            params: {
                                message: constant.DELETE_COMPLETE_MESSAGE,
                                pageCode: constant.MEMBER_MANAGEMENT_PAGE
                            }
                        });
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
        update(id, userName, slackId) {
            this.$router.push({
                name: "MemberUpdate",
                params: {
                    id: id,
                    userName: userName,
                    slackId: slackId,
                }
            });
        },
    }
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
    transition: opacity .5s;
}

.fade-enter,
.fade-leave-to {
    opacity: 0;
}
</style>