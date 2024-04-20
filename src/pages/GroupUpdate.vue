<template>
    <v-container>
        <v-row>
            <v-col cols="11">
                <h2>
                    グループ更新
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
                <v-text-field hide-details="auto" @keyup="inputCheck" v-model="groupName" label="グループ名"></v-text-field>
            </v-col>
        </v-row>
        <div v-for="n in loop" :key="n">
            <v-row>
                <v-col cols="3">
                    <v-combobox item-text="userName" :items="users" item-value="id" label="ユーザ名" class="ma-2"
                        @keyup="inputCheck" v-model="selectedUserIdList[4 * (n - 1)]" return-object
                        clearable></v-combobox>
                </v-col>
                <v-col cols="3">
                    <v-combobox item-text="userName" :items="users" item-value="id" label="ユーザ名" class="ma-2"
                        @keyup="inputCheck" v-model="selectedUserIdList[4 * n - 3]" return-object
                        clearable></v-combobox>
                </v-col>
                <v-col cols="3">
                    <v-combobox item-text="userName" :items="users" item-value="id" label="ユーザ名" class="ma-2"
                        @keyup="inputCheck" v-model="selectedUserIdList[4 * n - 2]" return-object
                        clearable></v-combobox>
                </v-col>
                <v-col cols="3">
                    <v-combobox item-text="userName" :items="users" item-value="id" label="ユーザ名" class="ma-2"
                        @keyup="inputCheck" v-model="selectedUserIdList[4 * n - 1]" return-object
                        clearable></v-combobox>
                </v-col>
            </v-row>
        </div>
        <v-row>
            <v-col cols="1">
                <v-btn small fab dark color="indigo" @click="addForm()">
                    <v-icon dark> mdi-plus </v-icon>
                </v-btn>
            </v-col>
        </v-row>
        <v-layout>
            <v-btn class="mx-auto" :disabled="!inputCheck" @click="update(groupId, groupName, selectedUserIdList)">
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
            users: [],
            groupId: this.$route.params.groupId,
            groupName: this.$route.params.groupName,
            selectedUserIdList: [],
            loop: Math.floor(Number(this.$route.params.groupMember.length) / 4) + 1,
        };
    },
    //入力フォームに入力時、処理実施
    computed: {
        //入力チェック
        inputCheck() {
            //グループ名が未入力もしくは空白行のみの場合
            if (!(this.groupName.match(/\S/g))) {
                //非活性
                return false
            }
            //ユーザ名のリストをループする
            for (let user of this.selectedUserIdList) {
                //ユーザ名が１つでも選択されている場合
                if (user !== null && typeof user === 'object') {
                    //活性
                    return true
                }
            }
            //ユーザ名が１つも選択されていない場合
            //非活性
            return false
        }
    },
    created() {
        this.selectAll()
        for (let i = 0; i < this.$route.params.groupMember.length; i++) {
            this.selectedUserIdList[i] = this.$route.params.groupMember[i]
        }
    },
    methods: {
        addForm() {
            this.loop = this.loop + 1
        },
        selectAll() {
            const path = constant.SELECT_USER_PULLDOWN_PATH;
            axios.get(path)
                .then(response => {
                    this.users = response.data
                })
                .catch(error => {
                    console.log(error)
                })
        },
        update(groupId, groupName, selectedUserIdList) {
            var res = confirm(constant.UPDATE_CONFIRM_MESSAGE);

            var userIdList = [];
            for (let userId of selectedUserIdList) {
                if (userId !== null && typeof userId === 'object') {
                    userIdList.push(userId);
                }
            }

            if (res == true) {
                const path = constant.UPDATE_GROUP_PATH
                axios.post(path, {
                    groupId: groupId,
                    groupName: groupName,
                    user: userIdList,
                }
                )
                    .then(response => {
                        console.log(response.data);
                        this.$router.push({
                            name: "PageLoading",
                            params: {
                                message: constant.UPDATE_COMPLETE_MESSAGE,
                                pageCode: constant.GROUP_MANAGEMENT_PAGE
                            }
                        });
                    })
                    .catch(err => {
                        console.log("err:", err);
                        this.$router.push({
                            name: "GroupManagement",
                            params: {
                                message: constant.ERROR_MESSAGE
                            }
                        });
                    });
            }
        },
        back() {
            this.$router.push({
                name: "GroupManagement"
            })
        },
    }
}
</script>

<style scoped></style>