<template>
    <v-container>
        <v-row>
            <v-col cols="11">
                <h2>
                    グループ追加
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
                        @keyup="inputCheck" v-model="selectedUserIdList[4 * (n - 1)]" clearable></v-combobox>
                </v-col>
                <v-col cols="3">
                    <v-combobox item-text="userName" :items="users" item-value="id" label="ユーザ名" class="ma-2"
                        @keyup="inputCheck" v-model="selectedUserIdList[4 * n - 3]" clearable></v-combobox>
                </v-col>
                <v-col cols="3">
                    <v-combobox item-text="userName" :items="users" item-value="id" label="ユーザ名" class="ma-2"
                        @keyup="inputCheck" v-model="selectedUserIdList[4 * n - 2]"></v-combobox>
                </v-col>
                <v-col cols="3">
                    <v-combobox item-text="userName" :items="users" item-value="id" label="ユーザ名" class="ma-2"
                        @keyup="inputCheck" v-model="selectedUserIdList[4 * n - 1]"></v-combobox>
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
            <v-btn class="mx-auto" :disabled="!inputCheck" @click="insert(groupName, selectedUserIdList)">
                Insert
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
            groupName: "",
            selectedUserIdList: [],
            loop: 1,
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
        insert(groupName, selectedUserIdList) {
            var res = confirm(constant.INSERT_CONFIRM_MESSAGE);

            var userIdList = [];
            for (let user of selectedUserIdList) {
                if (user !== null && typeof user === 'object') {
                    userIdList.push({ "id": Number(user.id) });
                }
            }

            if (res == true) {
                const path = constant.INSERT_GROUP_PATH
                axios.put(path, {
                    groupName: groupName,
                    user: userIdList,
                }
                )
                    .then(response => {
                        this.$router.push({
                            name: "PageLoading",
                            params: {
                                message: constant.INSERT_COMPLETE_MESSAGE,
                                pageCode: constant.GROUP_MANAGEMENT_PAGE
                            }
                        });
                        console.log(response.data);
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