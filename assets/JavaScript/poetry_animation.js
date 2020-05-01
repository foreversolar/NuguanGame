// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        back:cc.Button,
    },

    // LIFE-CYCLE CALLBACKS:

    //onLoad () {},

    start() {
    },

    onAnimCompleted: function () {
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
        var QuestionAsset;
        cc.loader.loadRes('Poetry', function (err, jsonAsset) {
            if (err) {
                console.log("Load json failed!");
            }
            QuestionAsset = jsonAsset.json;
        });

        //答案选项
        var Answer1 = questioncard.getChildByName("Answer1");
        var Answer2 = questioncard.getChildByName("Answer2");
        var Answer3 = questioncard.getChildByName("Answer3");

        Answer1.opacity = 0;
        Answer2.opacity = 0;
        Answer3.opacity = 0;
        Answer1.getComponent(cc.Button).interactable = false;
        Answer2.getComponent(cc.Button).interactable = false;
        Answer3.getComponent(cc.Button).interactable = false;

        //开始答题
        Button.node.on('click', function () {
            Button.interactable = false;
            ButtonComponent.opacity = 0;

            Answer1.opacity = 255;
            Answer2.opacity = 255;
            Answer3.opacity = 255;
            Answer1.getComponent(cc.Button).interactable = true;
            Answer2.getComponent(cc.Button).interactable = true;
            Answer3.getComponent(cc.Button).interactable = true;

            self.LoadQuestion(0, QuestionAsset);
            Button.interactable = false;
            ButtonComponent.opacity = 0;
        });
        this.back.node.on('click', function () {
            cc.director.loadScene("Game");
        })
    },

    //update (dt) {},
    LoadQuestion: function (index, QuestionAsset) {
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

        //xunhauntou
        var text = QuestionAsset.Question[index];
        sentence = text.Question + '\n' + '\n' + text.Answer[0] + '\n' + text.Answer[1] + '\n' + text.Answer[2];
        Question_text.string = sentence;

        //设置正确答案
        switch (text.correct) {
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

        Answer1.on('click', function () {
            cc.loader.loadRes('/picture/btn_xuanzhongdaan', function (err, texture) {
                if (err) {
                    console.log("Load xuanzhong failed!");
                }
                var sprite = new cc.SpriteFrame(texture);
                Answer1.getChildByName("Background").getComponent(cc.Sprite).spriteFrame = sprite;
            });
            if (Answer1 != correct_button) {
                Answer1.getChildByName("false").opacity = 255;
                Question_text.string = "很遗憾，你在众人面前失了颜面，魅力值扣除10。\n点击右上角退出！";
            }
            else {
                correct_button.getChildByName("right").opacity = 255;
                Question_text.string = "恭喜你，你果然是才貌双全，魅力值增加20，学识增加15。\n点击右上角退出！";
                self.AddScore(1);
            }
            Answer1.getComponent(cc.Button).interactable = false;
            Answer2.getComponent(cc.Button).interactable = false;
            Answer3.getComponent(cc.Button).interactable = false;
            choose_button = Answer1;
            console.log(Question_text.string);
        });

        Answer2.on('click', function () {
            cc.loader.loadRes('/picture/btn_xuanzhongdaan', function (err, texture) {
                if (err) {
                    console.log("Load xuanzhong failed!");
                }
                var sprite = new cc.SpriteFrame(texture);
                Answer2.getChildByName("Background").getComponent(cc.Sprite).spriteFrame = sprite;
            });
            if (Answer2 != correct_button) {
                Answer2.getChildByName("false").opacity = 255;
                Question_text.string = "很遗憾，你在众人面前失了颜面，魅力值扣除10。\n点击右上角退出！";
            }
            else {
                correct_button.getChildByName("right").opacity = 255;
                Question_text.string = "恭喜你，你果然是才貌双全，魅力值增加20，学识增加15。\n点击右上角退出！";
                self.AddScore(1);
            }
            Answer1.getComponent(cc.Button).interactable = false;
            Answer2.getComponent(cc.Button).interactable = false;
            Answer3.getComponent(cc.Button).interactable = false;
            choose_button = Answer2;
        });

        Answer3.on('click', function () {
            cc.loader.loadRes('/picture/btn_xuanzhongdaan', function (err, texture) {
                if (err) {
                    console.log("Load xuanzhong failed!");
                }
                var sprite = new cc.SpriteFrame(texture);
                Answer3.getChildByName("Background").getComponent(cc.Sprite).spriteFrame = sprite;
            });
            if (Answer3 != correct_button) {
                Answer3.getChildByName("false").opacity = 255;
                Question_text.string = "很遗憾，你在众人面前失了颜面，魅力值扣除10。\n点击右上角退出！";
            }
            else {
                correct_button.getChildByName("right").opacity = 255;
                Question_text.string = "恭喜你，你果然是才貌双全，魅力值增加20，学识增加15。\n点击右上角退出！";
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
                    }
                })
            }
        });
    }
});