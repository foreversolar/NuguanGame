// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        backgound: cc.Node,
        tishi: cc.Node,
        dati: cc.Node,
        answer1: cc.Node,
        answer2: cc.Node,
        answer3: cc.Node,
        answer4: cc.Node,
        tishi_text: cc.Label,
        question: cc.Label,
        text1: cc.Label,
        text2: cc.Label,
        text3: cc.Label,
        text4: cc.Label,
        text: null,
        start_button: cc.Button,
        back: cc.Button
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
    },

    start() {
        
    },

    onAnimCompleted: function () {
        var QuestionAsset;
        var self = this;

        self.backgound.opacity = 100;

        self.dati.active = false;
        self.tishi.active = true;

        var index = Math.floor(Math.random()*10);
        //console.log(self.dati.active);
        //console.log(self.tishi.active);

        cc.loader.loadRes('Poetry', function (err, jsonAsset) {
            if (err) {
                console.log("Load json failed!");
            }
            QuestionAsset = jsonAsset.json;
            
            self.text = QuestionAsset.Poetry[index];
            self.LoadQuestion();
        });

        //开始答题
        self.start_button.node.on('click', function () {
            self.tishi.active = false;
            self.dati.active = true;

            self.answer1.active = true;
            self.answer2.active = true;
            self.answer3.active = true;
            self.answer4.active = true;
            self.answer1.getComponent(cc.Button).interactable = true;
            self.answer2.getComponent(cc.Button).interactable = true;
            self.answer3.getComponent(cc.Button).interactable = true;
            self.answer4.getComponent(cc.Button).interactable = true;
        });
        self.back.node.on('click', function () {
            cc.director.loadScene("Game");
        })
    },

    //update (dt) {},
    LoadQuestion: function () {
        //设置题目信息
        var correct_button;
        var choose_button;
        var sentence;
        var self = this;

        console.log(self.text);
        //sentence = text.Question + '\n' + '\n' + text.Answer[0] + '\n' + text.Answer[1] + '\n' + text.Answer[2];
        sentence = self.text.Question;
        self.question.string = "题目："+ sentence + "，请接下一句";

        var Answer1 = self.answer1;
        var Answer2 = self.answer2;
        var Answer3 = self.answer3;
        var Answer4 = self.answer4;

        self.text1.string = self.text.Answer[0];
        self.text2.string = self.text.Answer[1];
        self.text3.string = self.text.Answer[2];
        self.text4.string = self.text.Answer[3];
        console.log(self.text.Answer[0]);
        console.log(self.text.Answer[1]);
        console.log(self.text.Answer[2]);
        console.log(self.text.Answer[3]);

        //设置正确答案
        switch (self.text.correct) {
            case 1:
                correct_button = Answer1;
                break;
            case 2:
                correct_button = Answer2;
                break;
            case 3:
                correct_button = Answer3;
            case 4:
                correct_button = Answer4;
                break;
        }


        Answer1.on('click', function () {
            cc.loader.loadRes("/picture/AllUI/AllUI", cc.SpriteAtlas, function (err, atlas) {
                if (err) {
                    console.log("Load xuanzhong failed!");
                }
                var sprite = atlas.getSpriteFrame('btn_red_long');
                Answer1.getChildByName("Background").getComponent(cc.Sprite).spriteFrame = sprite;
                Answer1.getChildByName("Background").getChildByName("Label").color = cc.color("#8A3333");
            });
            if (Answer1 != correct_button) {
                Answer1.getChildByName("false").opacity = 255;
                self.scheduleOnce(function () {
                    self.dati.active = false;
                    self.tishi.active = true;
                    var s_button = self.tishi.getChildByName("Start");
                    s_button.active = false;
                    console.log(s_button.active);
                    self.tishi.getChildByName("tishi").setPosition(-355.715, 12);
                    self.tishi_text.string = "很遗憾，你在众人面前失了颜面，魅力值扣除10。";
                }, 0.5);
            }
            else {
                correct_button.getChildByName("right").opacity = 255;
                self.scheduleOnce(function () {
                    self.dati.active = false;
                    self.tishi.active = true;
                    var s_button = self.tishi.getChildByName("Start");
                    s_button.active = false;
                    console.log(s_button.active);
                    self.tishi.getChildByName("tishi").setPosition(-355.715,12);
                    self.tishi_text.string = "恭喜你，你果然是才貌双全，魅力值增加20，学识增加15。";
                }, 0.5);
                //self.AddScore(1);
            }
            Answer1.getComponent(cc.Button).interactable = false;
            Answer2.getComponent(cc.Button).interactable = false;
            Answer3.getComponent(cc.Button).interactable = false;
            Answer4.getComponent(cc.Button).interactable = false;
            choose_button = Answer1;
            self.back.node.opacity=0;
            self.tishi.on(cc.Node.EventType.TOUCH_END,function(){
                cc.director.loadScene("Game");  
            });
        });

        Answer2.on('click', function () {
            cc.loader.loadRes("/picture/AllUI/AllUI", cc.SpriteAtlas, function (err, atlas) {
                if (err) {
                    console.log("Load xuanzhong failed!");
                }
                var sprite = atlas.getSpriteFrame('btn_red_long');
                Answer2.getChildByName("Background").getComponent(cc.Sprite).spriteFrame = sprite;
                Answer2.getChildByName("Background").getChildByName("Label").color = cc.color("#8A3333");
            });
            if (Answer2 != correct_button) {
                Answer2.getChildByName("false").opacity = 255;
                self.scheduleOnce(function () {
                    self.dati.active = false;
                    self.tishi.active = true;
                    var s_button = self.tishi.getChildByName("Start");
                    s_button.active = false;
                    console.log(s_button.active);
                    self.tishi.getChildByName("tishi").setPosition(-355.715, 12);
                    self.tishi_text.string = "很遗憾，你在众人面前失了颜面，魅力值扣除10。";
                }, 0.5);
            }
            else {
                correct_button.getChildByName("right").opacity = 255;
                self.scheduleOnce(function () {
                    self.dati.active = false;
                    self.tishi.active = true;
                    var s_button = self.tishi.getChildByName("Start");
                    s_button.active = false;
                    console.log(s_button.active);
                    self.tishi.getChildByName("tishi").setPosition(-355.715, 12);
                    self.tishi_text.string = "恭喜你，你果然是才貌双全，魅力值增加20，学识增加15。";
                }, 0.5);
                self.AddScore(1);
            }
            Answer1.getComponent(cc.Button).interactable = false;
            Answer2.getComponent(cc.Button).interactable = false;
            Answer3.getComponent(cc.Button).interactable = false;
            Answer4.getComponent(cc.Button).interactable = false;
            console.log("2");
            choose_button = Answer2;
            self.back.node.opacity=0;
            self.tishi.on(cc.Node.EventType.TOUCH_END,function(){
                cc.director.loadScene("Game");  
            });
        });

        Answer3.on('click', function () {
            
            cc.loader.loadRes("/picture/AllUI/AllUI", cc.SpriteAtlas, function (err, atlas) {
                if (err) {
                    console.log("Load xuanzhong failed!");
                }
                var sprite = atlas.getSpriteFrame('btn_red_long');
                Answer3.getChildByName("Background").getComponent(cc.Sprite).spriteFrame = sprite;
                Answer3.getChildByName("Background").getChildByName("Label").color = cc.color("#8A3333");
            });
            if (Answer3 != correct_button) {
                Answer3.getChildByName("false").opacity = 255;
                self.scheduleOnce(function () {
                    self.dati.active = false;
                    self.tishi.active = true;
                    var s_button = self.tishi.getChildByName("Start");
                    s_button.active = false;
                    console.log(s_button.active);
                    self.tishi.getChildByName("tishi").setPosition(-355.715, 12);
                    self.tishi_text.string = "很遗憾，你在众人面前失了颜面，魅力值扣除10。";
                }, 0.5);
            }
            else {
                correct_button.getChildByName("right").opacity = 255;
                self.scheduleOnce(function () {
                    self.dati.active = false;
                    self.tishi.active = true;
                    var s_button = self.tishi.getChildByName("Start");
                    s_button.active = false;
                    console.log(s_button.active);
                    self.tishi.getChildByName("tishi").setPosition(-355.715, 12);
                    self.tishi_text.string = "恭喜你，你果然是才貌双全，魅力值增加20，学识增加15。";
                }, 0.5);
                self.AddScore(1);
            }
            Answer1.getComponent(cc.Button).interactable = false;
            Answer2.getComponent(cc.Button).interactable = false;
            Answer3.getComponent(cc.Button).interactable = false;
            Answer4.getComponent(cc.Button).interactable = false;
            choose_button = Answer3;
            self.back.node.opacity=0;
            self.tishi.on(cc.Node.EventType.TOUCH_END,function(){
                cc.director.loadScene("Game");  
            });
        });

        Answer4.on('click', function () {

            cc.loader.loadRes("/picture/AllUI/AllUI", cc.SpriteAtlas, function (err, atlas) {
                if (err) {
                    console.log("Load xuanzhong failed!");
                }
                var sprite = atlas.getSpriteFrame('btn_red_long');
                Answer4.getChildByName("Background").getComponent(cc.Sprite).spriteFrame = sprite;
                Answer4.getChildByName("Background").getChildByName("Label").color = cc.color("#8A3333");
            });
            if (Answer4 != correct_button) {
                Answer4.getChildByName("false").opacity = 255;
                self.scheduleOnce(function () {
                    self.dati.active = false;
                    self.tishi.active = true;
                    var s_button = self.tishi.getChildByName("Start");
                    s_button.active = false;
                    console.log(s_button.active);
                    self.tishi.getChildByName("tishi").setPosition(-355.715, 12);
                    self.tishi_text.string = "很遗憾，你在众人面前失了颜面，魅力值扣除10。";
                }, 0.5);
            }
            else {
                correct_button.getChildByName("right").opacity = 255;
                self.scheduleOnce(function () {
                    self.dati.active = false;
                    self.tishi.active = true;
                    var s_button = self.tishi.getChildByName("Start");
                    s_button.active = false;
                    console.log(s_button.active);
                    self.tishi.getChildByName("tishi").setPosition(-355.715, 12);
                    self.tishi_text.string = "恭喜你，你果然是才貌双全，魅力值增加20，学识增加15。";
                }, 0.5);
                self.AddScore(1);
            }
            Answer1.getComponent(cc.Button).interactable = false;
            Answer2.getComponent(cc.Button).interactable = false;
            Answer3.getComponent(cc.Button).interactable = false;
            Answer4.getComponent(cc.Button).interactable = false;
            choose_button = Answer3;
            self.back.node.opacity=0;
            self.tishi.on(cc.Node.EventType.TOUCH_END,function(){
                cc.director.loadScene("Game");  
            });
        });
    },
    AddScore: function (right) {
        console.log("1");
        const DB = wx.cloud.database();
        DB.collection('UserData').where({
            _openid: cc.sys.localStorage.getItem('openid'),
        })
        .get({
            success(res) {
                DB.collection('UserData').doc(res.data[0]._id).update({
                    data:{
                        charm:res.data[0].charm+right*20,
                        knowledge:res.data[0].knowledge+right*15,
                        playing_times:res.data[0].playing_times+1,
                    }
                })
            }
        });
    }
});