// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        not_choosepic:cc.SpriteFrame,
        choosepic:cc.SpriteFrame,
        tips:cc.Label,
        start_test:cc.Button,
        QuestionJson:cc.JsonAsset,
        right:0,
        Get:0,
        times:0,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.node.getChildByName("Work").active = false;
    },

    start () {
        var self = this;
        var Notice = this.node.getChildByName("Notice");
        var Study = this.node.getChildByName("Study");
        var add_tips = function(){
            self.tips.string = "考核一共分两轮，第一轮是知识考核，第二轮是技能考核，这一次的技能考核将在樱桃园举行，只要像平常一样正常发挥，你一定可以的！！";
            self.start_test.node.opacity = 255;
            self.start_test.interactable = true;
        };
        Notice.on('touchend',add_tips);
        this.start_test.node.on('click',function(){
            Notice.off('touched',add_tips);
            Notice.opacity = 0;
            Study.opacity = 255;
            self.Study_Test();
            self.start_test.interactable = false;
            self.start_test.node.opacity = 0;
            cc.tween(Notice)
            .to(0.1, { position: cc.v2(0, -1000)})
            .start();
        });
    },

    Study_Test:function(){
        var self = this;
        var index = Math.floor(Math.random()*3);
        var text = this.QuestionJson.json.Question[index];
        //var sentence =  text.Question +'\n'+ text.Answer[0] +'\n'+ text.Answer[1] +'\n'+ text.Answer[2];
        var sentence =  text.Question;
        var sentence1 = text.Answer[0];
        var sentence2 = text.Answer[1];
        var sentence3 = text.Answer[2];
        
        var Study = this.node.getChildByName("Study");
        var Content = Study.getChildByName("Question").getComponent(cc.Label);
        var Answer1 = Study.getChildByName("Answer1");
        var Content1 = Answer1.getChildByName("Background").getChildByName("Label").getComponent(cc.Label);
        var Answer2 = Study.getChildByName("Answer2");
        var Content2 = Answer2.getChildByName("Background").getChildByName("Label").getComponent(cc.Label);
        var Answer3 = Study.getChildByName("Answer3");
        var Content3 = Answer3.getChildByName("Background").getChildByName("Label").getComponent(cc.Label);
        var Button = Study.getChildByName("Start");
        var Next = Study.getChildByName("Next");
        var choose_button;
        var correct_button;

        Button.on('click',function(){
            Button.opacity = 0;
            Button.getComponent(cc.Button).interactable = false;
            Content.string = sentence;
            Content1.string = sentence1;
            Content2.string = sentence2;
            Content3.string = sentence3;
            Answer1.opacity = 255;
            Answer2.opacity = 255;
            Answer3.opacity = 255;
            Answer1.getComponent(cc.Button).interactable = true;
            Answer2.getComponent(cc.Button).interactable = true;
            Answer3.getComponent(cc.Button).interactable = true;

            switch(text.correct){
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
            Answer1.on('click',function(){            
                Answer1.getComponent(cc.Button).disabledSprite = self.choosepic;
                if(Answer1==correct_button){
                    self.right++;
                }
                Answer1.getComponent(cc.Button).interactable = false;
                Answer2.getComponent(cc.Button).interactable = false;
                Answer3.getComponent(cc.Button).interactable = false;
                //可能需要
                Next.getComponent(cc.Button).interactable = true;
                Next.opacity = 255;
                choose_button = Answer1;
            });
    
            Answer2.on('click',function(){
                Answer2.getComponent(cc.Button).disabledSprite = self.choosepic;
                if(Answer2==correct_button){
                    self.right++;
                }
                Answer1.getComponent(cc.Button).interactable = false;
                Answer2.getComponent(cc.Button).interactable = false;
                Answer3.getComponent(cc.Button).interactable = false;
                //可能要                
                Next.getComponent(cc.Button).interactable = true;
                Next.opacity = 255;
                choose_button = Answer2;
            });
    
            Answer3.on('click',function(){
                Answer3.getComponent(cc.Button).disabledSprite = self.choosepic;
                if(Answer3==correct_button){
                    self.right++;
                }
                Answer1.getComponent(cc.Button).interactable = false;
                Answer2.getComponent(cc.Button).interactable = false;
                Answer3.getComponent(cc.Button).interactable = false;
                //可能要
                Next.getComponent(cc.Button).interactable = true;
                Next.opacity = 255;
                choose_button = Answer3;
            });
        });

        Next.on('click',function(){
            if(self.times == 2){
                self.node.getChildByName("Study").opacity = 0;
                //self.node.getChildByName("Work").opacity = 255;
                //加载工作考核
                self.node.getChildByName("Work").active = true;
                cc.tween(Study)
                .to(0.1, { position: cc.v2(0, -1000)})
                .start();
            }
            else{
                //修改下一题信息
                index = Math.floor(Math.random()*((10-index)/2))+index+1;
                self.times++;
                text = self.QuestionJson.json.Question[index];
                //sentence =  text.Question +'\n'+ text.Answer[0] +'\n'+ text.Answer[1] +'\n'+ text.Answer[2];
                sentence =  text.Question;
                sentence1 =  text.Answer[0];
                sentence2 =  text.Answer[1];
                sentence3 =  text.Answer[2];
                Content.string = sentence;
                Content1.string = sentence1;
                Content2.string = sentence2;
                Content3.string = sentence3;
                switch(text.correct){
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
                choose_button.getComponent(cc.Button).disabledSprite = self.not_choosepic;
                Answer1.getComponent(cc.Button).interactable = true;
                Answer2.getComponent(cc.Button).interactable = true;
                Answer3.getComponent(cc.Button).interactable = true;
                Next.opacity = 0;
                Next.getComponent(cc.Button).interactable = false;
            }
        });
    },

    // update (dt) {},

    Result:function(){
        cc.tween(this.node.getChildByName("Notice"))
            .to(0, { position: cc.v2(0, 0)})
            .start();
        this.Get = parseInt(this.node.getChildByName("Work").getComponent("Test_Yingtao").Score.getChildByName("Score").getComponent(cc.Label).string);
        this.node.getChildByName("Notice").opacity = 255;
        if(this.right == 3&&this.Get > 15){
            this.node.getChildByName("Notice").getChildByName("Words").getComponent(cc.Label).string = "恭喜你成功通过了考核！皇天不负有心人，你靠着自己的努力成功晋升为掌膳。在接下来的日子里，希望你认真练习烹饪技艺，升得典膳后方可进行精品菜肴的烹饪，加油！";
            this.addScore(1);
        }
        else{
            this.node.getChildByName("Notice").getChildByName("Words").getComponent(cc.Label).string =  "很遗憾你未能通过考核！宫中制度严格，容不得半分马虎，希望你能打起十二分的精气神，认真研习，吃得苦中苦，方为人上人，希望下次考核的时候不要再错失良机。";
        }
        this.node.getChildByName("Notice").on('touchend',function(){
            cc.director.loadScene('Next');
        });
    },

    addScore:function(result){
        const DB = wx.cloud.database();
        DB.collection('UserData').where({
            _openid: cc.sys.localStorage.getItem('openid'),
        })
        .get({
            success(res) {
                if(result == 1){
                    cc.sys.localStorage.setItem('level', res.data[0].level+1);
                    DB.collection('UserData').doc(res.data[0]._id).update({
                        data:{
                            level:res.data[0].level+1,
                        }
                    })
                    DB.collection('TestResult').where({
                        _openid: cc.sys.localStorage.getItem('openid'),
                    })
                    .get({
                        success(res) {
                                DB.collection('TestResult').doc(res.data[0]._id).update({
                                    data:{
                                        round5:cc.sys.localStorage.getItem('level'),
                                    }
                                })
                        }
                    });
                }   
            }
            
        });
    }
});
