// ここから挿入処理
function db1() {
    var hantei;
    var idm = getIDm(); // ここにユーザのIDを入れる、本番はカードリーダから取得したIDが入る
    var database = firebase.database(); //firebaseのデータベースを使う事を変数で定めている
    var dataRef = database.ref('/' + idm); // 取得するデータの項目名を定めている。プログラムには「'/'+user」は「/ユーザーID」に見えている。
    var nameInput = document.getElementById("nameInput1").value
    dataRef.once("value").then(function (snapshot) {
        hantei = snapshot.child("name").val();
        console.log("hantei:" + hantei);
        console.log("input:" + nameInput);

        if (hantei != undefined || nameInput == "" || idm == null) {
            console.log("出来ねえ");
            alert('登録できません。理由としては以下が考えられます\n・名前が入力されていない\n・アカウントがすでに存在している\n・カードが読み込めない');
        } else {
            console.log("出来た");
            var commentsRef = firebase.database().ref(idm); // 挿入する際の項目名を指定
            commentsRef.set({ name: nameInput, money: 100 }); // nameにnameInputに入力した値が、moneyにmoneyInputに入力した値が挿入される
            alert("アカウントを新規登録しました。");
        }
    });
};
// ここまで挿入処理

// ここからデータ取得処理
function db2() {
    console.log("表示データの更新");
    var idm = getIDm(); // ここにユーザのIDを入れる、本番はカードリーダから取得したIDが入る
    var database = firebase.database(); //firebaseのデータベースを使う事を変数で定めている
    var dataRef = database.ref('/' + idm); // 取得するデータの項目名を定めている。プログラムには「'/'+user」は「/ユーザーID」に見えている。
    dataRef.once("value").then(function (snapshot) {
        namename = snapshot.child("name").val(); // 項目の「name」に入っている値を取得し、id「name_hyouzi」の要素に代入している
        monemone = snapshot.child("money").val(); // 項目の「money」に入っている値を取得し、id「name_hyouzi」の要素に代入している
        if (namename == null) {
            alert('アカウント情報がありません');
        } else {
            alert('アカウント情報\n' + 'ユーザー名:' + namename + '\n' + '所持ポイント:' + monemone);
        }
    });
}
// ここまでデータ取得処理

//データ削除
function db3() {
    var result = window.confirm('アカウントは一度削除すると復元はできません。\n削除してよろしいですか？');
    console.log(result);
    if (result) {
        var idm = getIDm(); // ここにユーザのIDを入れる
        var commentsRef = firebase.database().ref(idm); // 挿入する際の項目名を指定
        commentsRef.set({ name: null, money: null }); // nameにnameInputに入力した値が、moneyにmoneyInputに入力した値が挿入される
        alert("アカウントを削除しました。");
    } else {
        alert("アカウントの削除をキャンセルしました。");
    }
}
