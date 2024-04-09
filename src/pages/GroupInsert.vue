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
                <v-text-field hide-details="auto" v-model="groupName" label="グループ名" clearable></v-text-field>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="3">
                <v-select item-text="userName" :items="users" item-value="id" label="ユーザ名" class="ma-2"
                    v-model="selectedUserId1"></v-select>
            </v-col>
            <v-col cols="3">
                <v-select item-text="userName" :items="users" item-value="id" label="ユーザ名" class="ma-2"
                    v-model="selectedUserId2"></v-select>
            </v-col>
            <v-col cols="3">
                <v-select item-text="userName" :items="users" item-value="id" label="ユーザ名" class="ma-2"
                    v-model="selectedUserId3"></v-select>
            </v-col>
            <v-col cols="3">
                <v-select item-text="userName" :items="users" item-value="id" label="ユーザ名" class="ma-2"
                    v-model="selectedUserId4"></v-select>
            </v-col>
        </v-row>
        <!-- <v-row>
            <v-col cols="3">
                <v-select item-text="userName" :items="users" item-value="id" label="ユーザ名" class="ma-2" v-model="selected5"></v-select>
            </v-col>
            <v-col cols="3">
                <v-select item-text="userName" :items="users" item-value="id" label="ユーザ名" class="ma-2" v-model="selected6"></v-select>
            </v-col>
            <v-col cols="3">
                <v-select item-text="userName" :items="users" item-value="id" label="ユーザ名" class="ma-2" v-model="selected7"></v-select>
            </v-col>
            <v-col cols="3">
                <v-select item-text="userName" :items="users" item-value="id" label="ユーザ名" class="ma-2" v-model="selected8"></v-select>
            </v-col>
        </v-row> -->
        <v-layout>
            <v-btn class="mx-auto"
                @click="insert(groupName, selectedUserId1, selectedUserId2, selectedUserId3, selectedUserId4)">
                insert
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
            selectedUserId1: "",
            selectedUserId2: "",
            selectedUserId3: "",
            selectedUserId4: "",
            // selected5: "",
            // selected6: "",
            // selected7: "",
            // selected8: "",
        };
    },
    created() {
        this.selectAll()
    },
    methods: {
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
        insert(groupName, selectedUserId1, selectedUserId2, selectedUserId3, selectedUserId4) {
            var res = confirm(constant.INSERT_CONFIRM_MESSAGE);

            var userIdList = [];
            for (let i = 1; i < 5; i++) {
                if (!(eval("selectedUserId" + i) == 0)) {
                    userIdList.push({ "id": Number(eval("selectedUserId" + i)) });
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