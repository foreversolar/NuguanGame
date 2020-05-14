// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        back: cc.Button,
        text: null,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
    },

    start() {
        
    },

    onAnimCompleted: function () {
        var QuestionAsset;
        var that = this;
        cc.loader.loadRes('Poetry', function (err, jsonAsset) {
            if (err) {
                console.log("Load json failed!");
            }
            QuestionAsset = jsonAsset.json;

            that.text = QuestionAsset.Poetry[1];
            that.LoadQuestion();
        });

        var questioncard = this.node.getParent().getParent().getChildByName("QuestionPage").getChildByName("Panel");
        questioncard.active = true;
        var bg = this.node.getParent();
        bg.opacity = 100;
        console.log('onAnimCompleted!');
        var ButtonComponent = questioncard.getChildByName("Start");
        var Button = ButtonComponent.getComponent(cc.Button);
        var Back_Button = questioncard.getChildByName("Back_Button");
        var B_Button = Back_Button.getComponent(cc.Button);
        var self = this;

        //答案选项
        var Answer1 = questioncard.getChildByName("Answer1");
        var Answer2 = questioncard.getChildByName("Answer2");
        var Answer3 = questioncard.getChildByName("Answer3");

        Answer1.active = false;
        Answer2.active = false;
        Answer3.active = false;

        //开始答题
        Button.node.on('click', function () {
            var question = questioncard.getChildByName("Question");
            var tishi = questioncard.getChildByName("tishi");
            question.opacity = 255;
            tishi.active = false;

            Button.active = false;

            Answer1.active = true;
            Answer2.active = true;
            Answer3.active = true;
            Answer1.getComponent(cc.Button).interactable = true;
            Answer2.getComponent(cc.Button).interactable = true;
            Answer3.getComponent(cc.Button).interactable = true;

            Button.interactable = false;
            ButtonComponent.opacity = 0;
        });
        this.back.node.on('click', function () {
            cc.director.loadScene("Game");
        })
    },

    //update (dt) {},
    LoadQuestion: function () {

        var questioncard = this.node.getParent().getParent().getChildByName("QuestionPage").getChildByName("Panel");

        //设置题目信息
        var Question_text = questioncard.getChildByName("Question").getComponent(cc.Label);
        var correct_button;
        var choose_button;
        var sentence;
        var self = this;

        var Answer1 = questioncard.getChildByName("Answer1");
        var Answer2 = questioncard.getChildByName("Answer2");
        var Answer3 = questioncard.getChildByName("Answer3");

        console.log(this.text);
        //sentence = text.Question + '\n' + '\n' + text.Answer[0] + '\n' + text.Answer[1] + '\n' + text.Answer[2];
        sentence = this.text.Question;
        Question_text.string = sentence;

        var text1 = Answer1.getChildByName("Background").getChildByName("Label").getComponent(cc.Label);
        var text2 = Answer2.getChildByName("Background").getChildByName("Label").getComponent(cc.Label);
        var text3 = Answer3.getChildByName("Background").getChildByName("Label").getComponent(cc.Label);
        text1.string = this.text.Answer[0];
        text2.string = this.text.Answer[1];
        text3.string = this.text.Answer[2];
        console.log(this.text.Answer[0]);
        console.log(this.text.Answer[1]);
        console.log(this.text.Answer[2]);
        console.log(text1.string);
        console.log(text2.string);
        console.log(text3.string);

        //设置正确答案
        switch (this.text.correct) {
            case 1:
                correct_button = Answer1;
                break;
            case 2:
                correct_button = Answer2;
                break;
            case 3:
                correct_button = Answer3;
                break;
        }

        var tishi = questioncard.getChildByName("tishi");
        var tishi_text = tishi.getComponent(cc.Label);
        var question = questioncard.getChildByName("Question");

        Answer1.on('click', function () {
            cc.loader.loadRes("/picture/KnowledgeCard/KnowledgeCard", cc.SpriteAtlas, function (err, atlas) {
                if (err) {
                    console.log("Load xuanzhong failed!");
                }
                var sprite = atlas.getSpriteFrame('btn_xuanzhongdaan');
                Answer1.getChildByName("Background").getComponent(cc.Sprite).spriteFrame = sprite;
                Answer1.getChildByName("Background").getChildByName("Label").color = cc.color("#FFFFFFC5");
                Answer1.getChildByName("Background").getChildByName("Label").getComponent(cc.Label).fontSize = 65;
            });
            if (Answer1 != correct_button) {
                Answer1.getChildByName("false").opacity = 255;
                question.active = false;
                tishi.active = true;
                tishi_text.string = "很遗憾，你在众人面前失了颜面，魅力值扣除10。";
            }
            else {
                correct_button.getChildByName("right").opacity = 255;
                question.active = false;
                tishi.active = true;
                tishi_text.string.string = "恭喜你，你果然是才貌双全，魅力值增加20，学识增加15。";
                self.AddScore(1);
            }
            Answer1.getComponent(cc.Button).interactable = false;
            Answer2.getComponent(cc.Button).interactable = false;
            Answer3.getComponent(cc.Button).interactable = false;
            choose_button = Answer1;
        });

        Answer2.on('click', function () {
            cc.loader.loadRes("/picture/KnowledgeCard/KnowledgeCard", cc.SpriteAtlas, function (err, atlas) {
                if (err) {
                    console.log("Load xuanzhong failed!");
                }
                var sprite = atlas.getSpriteFrame('btn_xuanzhongdaan');
                Answer2.getChildByName("Background").getComponent(cc.Sprite).spriteFrame = sprite;
                Answer2.getChildByName("Background").getChildByName("Label").color = cc.color("#FFFFFFC5");
                Answer2.getChildByName("Background").getChildByName("Label").getComponent(cc.Label).fontSize = 65;
            });
            if (Answer2 != correct_button) {
                Answer2.getChildByName("false").opacity = 255;
                question.active = false;
                tishi.active = true;
                tishi_text.string = "很遗憾，你在众人面前失了颜面，魅力值扣除10。";
            }
            else {
                correct_button.getChildByName("right").opacity = 255;
                question.active = false;
                tishi.active = true;
                tishi_text.string = "恭喜你，你果然是才貌双全，魅力值增加20，学识增加15。";
                self.AddScore(1);
            }
            Answer1.getComponent(cc.Button).interactable = false;
            Answer2.getComponent(cc.Button).interactable = false;
            Answer3.getComponent(cc.Button).interactable = false;
            choose_button = Answer2;
        });

        Answer3.on('click', function () {
            
            cc.loader.loadRes("/picture/KnowledgeCard/KnowledgeCard", cc.SpriteAtlas, function (err, atlas) {
                if (err) {
                    console.log("Load xuanzhong failed!");
                }
                var sprite = atlas.getSpriteFrame('btn_xuanzhongdaan');
                Answer3.getChildByName("Background").getComponent(cc.Sprite).spriteFrame = sprite;
                Answer3.getChildByName("Background").getChildByName("Label").color = cc.color("#FFFFFFC5");
                Answer3.getChildByName("Background").getChildByName("Label").getComponent(cc.Label).fontSize = 65;
            });

            if (Answer3 != correct_button) {
                Answer3.getChildByName("false").opacity = 255;
                question.active = false;
                tishi.active = true;
                tishi_text.string = "很遗憾，你在众人面前失了颜面，魅力值扣除10。";
            }
            else {
                correct_button.getChildByName("right").opacity = 255;
                question.active = false;
                tishi.active = true;
                tishi_text.string = "恭喜你，你果然是才貌双全，魅力值增加20，学识增加15。";
                self.AddScore(1);
            }
            Answer1.getComponent(cc.Button).interactable = false;
            Answer2.getComponent(cc.Button).interactable = false;
            Answer3.getComponent(cc.Button).interactable = false;
            choose_button = Answer3;
        });
    },
    AddScore:function(right){
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