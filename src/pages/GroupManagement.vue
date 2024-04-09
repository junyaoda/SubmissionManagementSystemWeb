<template>
    <v-container>
        <v-row>
            <v-col cols="4">
                <h2>
                    グループ管理
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
                <v-data-table :headers="headers" :items="groups">
                    <template v-slot:[`item.user`]="{ item }">
                        <div v-for="i in item.user" :key="i.id">{{ i.userName }}</div>
                    </template>
                    <template v-slot:[`item.operation`]="{ index }">
                        <v-btn small
                            @click="update(groups[index].groupId, groups[index].groupName, groups[index].user)">
                            <v-icon> mdi-pencil</v-icon>
                        </v-btn>
                        <v-btn small @click="del(groups[index].groupId)">
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
            groups: [],
            headers: [
                {
                    text: 'グループ名',
                    value: 'groupName',
                },
                {
                    text: 'ユーザ',
                    value: 'user',
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
            const path = constant.SELECT_GROUP_ALL_PATH;
            axios.get(path)
                .then(response => {
                    this.groups = response.data
                })
                .catch(error => {
                    console.log(error)
                })
        },
        insert() {
            this.$router.push(
                "GroupInsert"
            );
        },
        del(id) {
            var res = confirm(constant.DELETE_CONFIRM_MESSAGE);
            if (res == true) {
                const path = constant.DELETE_GROUP_PATH + id
                axios.delete(path)
                    .then(response => {
                        this.$router.push({
                            name: "PageLoading",
                            params: {
                                message: constant.DELETE_COMPLETE_MESSAGE,
                                pageCode: constant.GROUP_MANAGEMENT_PAGE
                            }
                        });
                    }
                    )
                    .catch(err => {
                        this.$router.push({
                            name: "GroupManagement",
                            params: {
                                message: constant.ERROR_MESSAGE
                            }
                        });
                        console.log("err:", err);
                    });
            }
        },
        update(groupId, groupName, groupMember) {
            this.$router.push({
                name: "GroupUpdate",
                params: {
                    groupId: groupId,
                    groupName: groupName,
                    groupMember: groupMember,
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