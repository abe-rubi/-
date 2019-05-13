(function(){
  'use strict';
// class要素を取得する場合はdocument.getElementsByClassName('')となる
  const userNameInput=document.getElementById('user-name');
  const assessmentButton=document.getElementById('assessment');
  const netaButton=document.getElementById('neta');
  // const netanetaButton=document.getElementById('netantta');
  const resultDivided=document.getElementById('result-area');
  const tweetDivided=document.getElementById('tweet-area');


  function removeAllChildren(element){
// removeAllChildren関数の引数resultDividedがelementに渡され
// element要素（ノード）がある限り削除し続ける
    while(element.firstChild){
      element.removeChild(element.firstChild);
    }
  }

//HMTL上のuserName入力欄でエンターキーで診断開始させる
  userNameInput.onkeydown=(event)=>{
    if(event.keyCode===13){
      assessmentButton.onclick();
    }
  }

// 診断ボタンを押すと開始する関数
  assessmentButton.onclick=()=>{
    const userName=userNameInput.value;

// userNameテキストが空の場合は診断ボタンを反応させない（ガード句）
    if(userName.length===0){
      return;
    }

//**診断結果表示エリアの作成**
// 診断ボタンを連続で押されることで結果が何個も出てしまうので
// それを防止するために、診断二回目以降は古い子ノードがある限り削除し続ける
  // while(resultDivided.firstChild){
  //   resultDivided.removeChild(resultDivided.firstChild);
  // }
// 30行目のremoveAllChildren関数を定義することで上のwhile分を下のように省略できる
    removeAllChildren(resultDivided);

// h3タグを作り「診断結果」という文字を入れて見出しを作る
//textContent,innerHTML,innerTextは微妙な違いしかない
// おすすめはinnerHTMLらしい。どのブラウザーにも対応しやすいとのこと
    const header=document.createElement('h3');
    header.textContent='診断結果';
// appendChildとは項目内（ノード）の一番下に新しい項目（子ノード）を追加するもの
// 今回はdiv要素に追加(=表示させる)
    resultDivided.appendChild(header);

// 段落要素として'p'を作成
    const paragraph=document.createElement('p');


// assessement関数の結果として出る文字列をresult定数にする
// その後、上で作った段落要素pにappendChildで表示する
// ※ここで定義するresultはassessment関数内のresultとは別物(スコープが異なる)
    const result=assessment(userName);
    paragraph.innerHTML=result;
    resultDivided.appendChild(paragraph);

// TODOツイートエリアの作成
  removeAllChildren(tweetDivided);
  const anchor=document.createElement('a');
  const hrefValue="https://twitter.com/intent/tweet?button_hashtag=性格診断&ref_src=twsrc%5Etfw&text="
  +encodeURIComponent(result);
  anchor.setAttribute('href',hrefValue);
  anchor.className='twitter-hashtag-button';
  anchor.innerHTML='診断結果をつぶやく #性格診断';
  tweetDivided.appendChild(anchor);

  twttr.widgets.load();
  }

// 名前の文字列を渡すと診断結果を返す関数
// @param{string}userName　ユーザーの名前
// @return{string}　診断結果
  function assessment(userName){
    var answers=[
      '{userName}さんは非常に真面目で、誰にでもわけ隔てなく優しい素敵な人です。',
      '{userName}さんは博愛主義で、この世の全てを愛しています。そんな{userName}さんが、みんな大好きです。',
      '{userName}さんはいざというときに頼りになります。アベンジャーズの次回作に{userName}さんが出演する勢いです。',
      '{userName}の良いところは静かなところです。授業の邪魔になりません！',
      '{userName}様は非常に優れた頭脳を持ち合わせているので、将来は大金持ちになるでしょう。今のうちに仲良くしておくといいと思います。',
      '{userName}は優しいところもありながら、心の内に熱いものを持っています。',
      '{userName}は実はオタクです。アニメ、ゲームの知識で{userName}の右に出るものはいません。試しに、今期おススメのアニメを聞いてみるのも良いかもしれませんね！',
      '{userName}の良いところは普通なところです。普通にするって、実はとても大変なことなんです。凄いことですよこれは！',
      '{userName}は○○戦隊系でいうところのブルーです。ガツガツと前に出るわけではありませんが、クールで仲間思いの良い人です。',
      '{userName}さんは縁の下の力持ち。{userName}さんがいるだけでチーム全体がまとまりやすくなります。',
      '{userName}はヨガに、書道、ボクシング、そして水墨画と多趣味な人です。最近はいよいよ盆栽に手を出したとか…?',
      '{userName}さんは人に飲み物を勧めるのが大得意。『バラクーダの「日本全国酒飲み音頭」を歌って？』とお願いしたら意外な結果に！？',
      '{userName}さんは愛する人のためならなんだってやります。とことん愛が深い人です。',
      '木登り大好きな{userName}さん。今日も朝から近くの公園でひと登りしてきたとかしてないとか。',
      '良い人{userName}さん。',
      '{userName}さんはモノマネが大の得意。中でもおススメなのが「釣り人スターシリーズ！」'
    ];

    var answersNeta=[
      '{userName}は普通の人より足の毛が伸びるスピードが早いことに日々悩んでいます。',
      '{userName}は最近抜け毛、薄毛が気になっています。{userName}が頭を洗うとすぐに排水溝が詰まります。',
      '{userName}は足の臭いに定評があります。ゴキブリすら2秒でノックアウトです。',
      '{userName}はエッチです。注意しないと周りの人を全員食べてしまいます。',
      '{userName}は常に異性のことを考えています。{userName}の目は、常に誰かをターゲットに捉えています。',
      '{userName}は下ネタ大好き！うんち！おしっこ！うぇーい！',
      '{userName}はシャイ。みんな、積極的に話しかけてあげてね。',
      '{userName}の趣味は変装です。変装して街中を歩いて快感を得る変人さんです。',
      '{userName}は自分の体重が気になって仕方ありません。かれこれ3年間ほどダイエットするかしないかで悩んでいます。',
      '{userName}の将来の夢はギャラドスになることです。きっとなれるよ！',
      'うんち{userName}さん。やーい、うんち！。',
      '最近、{userName}さんの挙動がおかしいのは、宝くじで何億円か当てた可能性が非常に高い気がしませんか?',
      '{userName}は実はとある世界最強のオンラインゲームプレイヤーです。必殺技はオッパイビーム！',
      '{userName}は実は闇の暗殺チームの一人。コードネームは[マックス{userName}]',
      '{userName}さんは非常に真面目で、誰にでもわけ隔てなく優しい素敵な人です。',
      '{userName}さんは博愛主義で、この世の全てを愛しています。そんな{userName}さんが、みんな大好きです。',
      '{userName}さんはいざというときに頼りになります。アベンジャーズの次回作に{userName}さんが出演する勢いです。',
      '{userName}の良いところは静かなところです。授業の邪魔になりません！',
      '{userName}様は非常に優れた頭脳を持ち合わせているので、将来は大金持ちになるでしょう。今のうちに仲良くしておくといいと思います。',
      '{userName}は優しいところもありながら、心の内に熱いものを持っています。',
      '{userName}は実はオタクです。アニメ、ゲームの知識で{userName}の右に出るものはいません。試しに、今期おススメのアニメを聞いてみるのも良いかもしれませんね！',
      '{userName}の良いところは普通なところです。普通にするって、実はとても大変なことなんです。凄いことですよこれは！',
      '{userName}は○○戦隊系でいうところのブルーです。ガツガツと前に出るわけではありませんが、クールで仲間思いの良い人です。',
      '{userName}さんは縁の下の力持ち。{userName}さんがいるだけでチーム全体がまとまりやすくなります。',
      '{userName}はヨガに、書道、ボクシング、そして水墨画と多趣味な人です。最近はいよいよ盆栽に手を出したとか…?',
      '{userName}さんは人に飲み物を勧めるのが大得意。『バラクーダの「日本全国酒飲み音頭」を歌って？』とお願いしたら意外な結果に！？',
      '{userName}さんは愛する人のためならなんだってやります。とことん愛が深い人です。',
      '木登り大好きな{userName}さん。今日も朝から近くの公園でひと登りしてきたとかしてないとか。',
      '良い人{userName}さん。',
      '{userName}さんはモノマネが大の得意。中でもおススメなのが「釣り人スターシリーズ！」'
    ];

    if (netaButton.checked===true) {
       answers=answersNeta;
    }
//全文字コードを取得し足し合わせる
//空のsumOfcharCodeを用意
    let sumOfcharCode=0;
//入力された日本語名前の"文字数"だけ次の行の計算を行う
    for(let i=0; i<userName.length;i++){
//元々上で定義した空(=0)のsumOfcharCodeへn(文字数分)回、
// 　                    sumOf~に名前文字のn番目の文字コード値を足す
      sumOfcharCode=sumOfcharCode+userName.charCodeAt(i);
    }

//文字コード番号の合計を回答のパターン数(今回は16通り)で割った余りから、
//              該当(指定)するオブジェクトの数値を求める
      const index=sumOfcharCode%answers.length;

//最初に定義した定数answersオブジェクトのindexで計算されたn番目をresultに代入
      let result=answers[index];

//上で定義した変数resultに入っているanswersオブジェクト内の{userName}を…
//           assessment関数の引数userNameに置換する。
// var sourceStr = "ううううう" ;     //「う」を「く」に置換する例です。
// var a = sourceStr.replace( /う/g , "く" ) ;
//------------------もう一例↓---------------
// サンプルコード　var sourceStr = "あいうえおあいうえお" ;
// サンプルコード　var a = sourceStr.replace( /う/g , "く" ) ;
//結果    a = あいくえおあいくえお
      result=result.replace(/{userName}/g,userName);


    // TODO　{userName}をユーザーの名前に置き換える
    return result;

  }

  // console.log(assessment('太郎'));
  // console.log(assessment('次郎'));
  // console.log(assessment('太郎'));
  // console.assert(
  //   assessment('太郎')===assessment('太郎'),
  //   '診断結果の文言の特定の部分を名前に書き換える処理が正しくありません。'
  // );

  })();
