export default Object.freeze({
    // ポップアップメッセージ
    UPDATE_CONFIRM_MESSAGE: "更新してもよろしいですか？",
    DELETE_CONFIRM_MESSAGE: "削除してもよろしいですか？",
    INSERT_CONFIRM_MESSAGE: "追加してもよろしいですか？",

    // 操作完了メッセージ
    UPDATE_COMPLETE_MESSAGE: "UpdateComplete!!",
    DELETE_COMPLETE_MESSAGE: "DeleteComplete!!",
    INSERT_COMPLETE_MESSAGE: "InsertComplete!!",
    ERROR_MESSAGE: "SystemError",

    // Userパス
    SELECT_USER_ALL_PATH: "http://localhost:8080/user/selectUserAll",
    SELECT_USER_PULLDOWN_PATH: "http://localhost:8080/user/selectUserPulldown",
    DELETE_USER_PATH: "http://localhost:8080/user/deleteUser?id=",
    UPDATE_USER_PATH: "http://localhost:8080/user/updateUser",
    INSERT_USER_PATH: "http://localhost:8080/user/insertUser",

    // Groupパス
    SELECT_GROUP_ALL_PATH: "http://localhost:8080/group/selectGroupAll",
    DELETE_GROUP_PATH: "http://localhost:8080/group/deleteGroup?id=",
    UPDATE_GROUP_PATH: "http://localhost:8080/group/updateGroup",
    INSERT_GROUP_PATH: "http://localhost:8080/group/insertGroup",

    // ページ区分コード
    MEMBER_MANAGEMENT_PAGE: "2",
    GROUP_MANAGEMENT_PAGE: "3",

    // 操作完了メッセージ 表示時間
    MESSAGE_DISPLAY_TIME: 3000,
    // ローディング時間
    LOADING_DISPLAY_TIME: 1000,

})