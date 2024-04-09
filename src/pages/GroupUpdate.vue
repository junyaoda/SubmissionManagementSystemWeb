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
                <v-text-field hide-details="auto" v-model="groupName" label="グループ名" clearable></v-text-field>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="3">
                <v-select item-text="userName" item-value="id" :items="users" label="ユーザ名" class="ma-2"
                    v-model="selectedUserId0" return-object></v-select>
            </v-col>
            <v-col cols="3">
                <v-select item-text="userName" :items="users" item-value="id" label="ユーザ名" class="ma-2"
                    v-model="selectedUserId1" return-object></v-select>
            </v-col>
            <v-col cols="3">
                <v-select item-text="userName" :items="users" item-value="id" label="ユーザ名" class="ma-2"
                    v-model="selectedUserId2" return-object></v-select>
            </v-col>
            <v-col cols="3">
                <v-select item-text="userName" :items="users" item-value="id" label="ユーザ名" class="ma-2"
                    v-model="selectedUserId3" return-object></v-select>
            </v-col>
        </v-row>
        <!-- <v-row>
            <v-col cols="3">
                <v-select item-text="userName" :items="users" item-value="id" label="ユーザ名" class="ma-2" v-model="selected4"></v-select>
            </v-col>
            <v-col cols="3">
                <v-select item-text="userName" :items="users" item-value="id" label="ユーザ名" class="ma-2" v-model="selected5"></v-select>
            </v-col>
            <v-col cols="3">
                <v-select item-text="userName" :items="users" item-value="id" label="ユーザ名" class="ma-2" v-model="selected6"></v-select>
            </v-col>
            <v-col cols="3">
                <v-select item-text="userName" :items="users" item-value="id" label="ユーザ名" class="ma-2" v-model="selected7"></v-select>
            </v-col>
        </v-row> -->
        <v-layout>
            <v-btn class="mx-auto"
                @click="update(groupId,groupName, selectedUserId0, selectedUserId1, selectedUserId2, selectedUserId3)">
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
            selectedUserId0: {},
            selectedUserId1: {},
            selectedUserId2: {},
            selectedUserId3: {},
            // selected4: "",
            // selected5: "",
            // selected6: "",
            // selected7: "",
        };
    },
    created() {
        this.selectAll()
        for (let i = 0; i < this.$route.params.groupMember.length; i++) {
            eval("this.selectedUserId" + i + ".id = this.$route.params.groupMember[" + i + "].id");
            eval("this.selectedUserId" + i + ".userName = this.$route.params.groupMember[" + i + "].userName");
        }
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
        update(groupId, groupName, selectedUserId0, selectedUserId1, selectedUserId2, selectedUserId3) {
            var res = confirm(constant.UPDATE_CONFIRM_MESSAGE);
            
            var userIdList = [];
            for (let i = 0; i < 4; i++) {
                if (!(isNaN(eval("selectedUserId" + i + ".id")))) {
                    userIdList.push({ "id": Number(eval("selectedUserId" + i + ".id")) });
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