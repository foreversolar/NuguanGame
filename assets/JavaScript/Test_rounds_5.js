// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        tips:cc.Label,
        start_test:cc.Button,
        QuestionJson:cc.JsonAsset,
        right:0,
        Opened:0,
        Get:0,
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        var self = this;
        var Notice = this.node.getChildByName("Notice");
        var Study = this.node.getChildByName("Study");
        var add_tips = function(){
            self.tips.string = "考核一共分两轮，第一轮是知识考核，第二轮是技能考核，只要像平常一样正常发挥，你一定可以的！！";
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
            cc.tween(self.start_test.node)
            .to(0.1, { position: cc.v2(0, 1000)})
            .start();
        });
    },

    

    Study_Test:function(){
        var self = this;
        var index = 0;
        var text = this.QuestionJson.json.Question[index];
        var sentence =  text.Question +'\n'+ text.Answer[0] +'\n'+ text.Answer[1] +'\n'+ text.Answer[2];
        
        var Study = this.node.getChildByName("Study");
        var Content = Study.getChildByName("Question").getComponent(cc.Label);
        var Answer1 = Study.getChildByName("Answer1");
        var Answer2 = Study.getChildByName("Answer2");
        var Answer3 = Study.getChildByName("Answer3");
        var Button = Study.getChildByName("Start");
        var Next = Study.getChildByName("Next");
        var choose_button;
        var correct_button;

        Button.on('click',function(){
            Button.opacity = 0;
            Button.getComponent(cc.Button).interactable = false;
            Content.string = sentence;
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
                self.loadPic(Answer1);
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
                self.loadPic(Answer2);
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
                self.loadPic(Answer3);
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
            if(index == 2){
                self.node.getChildByName("Study").opacity = 0;
                self.node.getChildByName("Work").opacity = 255;
                //加载工作考核
                self.loadWork();
                /*cc.tween(Study)
                .to(0.1, { position: cc.v2(0, -1000)})
                .start();*/
            }
            else{
                index++;
                text = self.QuestionJson.json.Question[index];
                sentence =  text.Question +'\n'+ text.Answer[0] +'\n'+ text.Answer[1] +'\n'+ text.Answer[2];
                cc.loader.loadRes("/picture/KnowledgeCard/KnowledgeCard", cc.SpriteAtlas, function (err, atlas) {
                    if(err){
                        console.log("Load xuanzhong failed!");
                    }
                    var sprite = atlas.getSpriteFrame('btn_weixuanzhongdaan');
                    choose_button.getChildByName("Background").getComponent(cc.Sprite).spriteFrame = sprite;
                });
                Answer1.getComponent(cc.Button).interactable = true;
                Answer2.getComponent(cc.Button).interactable = true;
                Answer3.getComponent(cc.Button).interactable = true;
                Next.opacity = 0;
                Next.getComponent(cc.Button).interactable = false;
            }
        });
    },

    loadPic:function(choose_button){
        cc.loader.loadRes("/picture/KnowledgeCard/KnowledgeCard", cc.SpriteAtlas, function (err, atlas) {
            if(err){
                console.log("Load xuanzhong failed!");
            }
            var sprite = atlas.getSpriteFrame('btn_xuanzhongdaan');
            choose_button.getChildByName("Background").getComponent(cc.Sprite).spriteFrame = sprite;
        });
    },

    loadWork:function(){
        //设置坏的卡片
        var bad = new Array(3);
        for(var i = 0;i<3;i++){
            var index;
            while(1){
                index = Math.floor(Math.random()*8);
                var flag = true;
                for(var j=0;j<i;j++){
                    if(index == bad[j]){
                        flag = false;
                    }
                }
                if(flag){
                    break;
                }
            }
            bad[i] = index;
        }
        this.SetBad(bad);
        //5s记忆
        this.Select("Card1",bad);
        this.Select("Card2",bad);
        this.Select("Card3",bad);
        this.Select("Card4",bad);
        this.Select("Card5",bad);
        this.Select("Card6",bad);
        this.Select("Card7",bad);
        this.Select("Card8",bad);
        //移开答题，不然会遮挡
        
    },

    SetBad:function(bad){
        var Work = this.node.getChildByName("Work");
        var c = "Card";
        var cards = new Array(3);
        var Card = new Array(3);
        for(var i = 0;i<3;i++){
            cards[i] = c + (bad[i]+1).toString();
            Card[i] = Work.getChildByName(cards[i]).getComponent(cc.Button);
        }

        cc.loader.loadRes("/picture/KnowledgeCard/KnowledgeCard", cc.SpriteAtlas, function (err, atlas) {
            if(err){
                console.log("Load xuanzhong failed!");
            }
            var sprite = atlas.getSpriteFrame("btn_xuanzhongdaan");
            for(var i=0;i<3;i++){
                Card[i].disabledSprite = sprite;
            }   
        });
    },

    Select:function(Button,bad){
        var Work = this.node.getChildByName("Work");
        var Bad_flag = false;
        for(var i = 0;i<3;i++){
            if(Button == "Card"+(bad[i]+1).toString()){
                Bad_flag = true;
                break;
            }
        }
        var card = Work.getChildByName(Button);
        var cardButton = card.getComponent(cc.Button);
        var self = this;
        this.scheduleOnce(function(){
            cardButton.interactable = true;
        },5);
        cardButton.node.on('click',function(){
            cardButton.interactable = false;
            self.Opened++;
            if(Bad_flag){
                self.Get++;
            }
            if(self.Opened==3){
                self.closeAll(self);
                self.Result();
            }
        });
    },

    closeAll:function(self){
        self.node.getChildByName("Card1").getComponent(cc.Button).interactable = false;
        self.node.getChildByName("Card2").getComponent(cc.Button).interactable = false;
        self.node.getChildByName("Card3").getComponent(cc.Button).interactable = false;
        self.node.getChildByName("Card4").getComponent(cc.Button).interactable = false;
        self.node.getChildByName("Card5").getComponent(cc.Button).interactable = false;
        self.node.getChildByName("Card6").getComponent(cc.Button).interactable = false;
        self.node.getChildByName("Card7").getComponent(cc.Button).interactable = false;
        self.node.getChildByName("Card8").getComponent(cc.Button).interactable = false;
    },
    // update (dt) {},

    Result:function(){
        this.node.getChildByName("Work").opacity = 0;
        this.node.getChildByName("Notice").opacity = 255;
        if(this.right == 3&&this.Get == 3){
            this.node.getChildByName("Notice").getChildByName("Words").getComponent(cc.Label).string = "恭喜你成功通过了考核！皇天不负有心人，你靠着自己的努力成功晋升为掌膳，负责辅佐典膳，完成部分菜品的烹饪。在接下来的日子里，希望你认真练习烹饪技艺，升得典膳后方可进行精品菜肴的烹饪，加油！";
            this.addScore(1);
        }
        else{
            this.node.getChildByName("Notice").getChildByName("Words").getComponent(cc.Label).string =  "很遗憾你未能通过考核！宫中制度严格，容不得半分马虎，希望你能打起十二分的精气神，认真研习，吃得苦中苦，方为人上人，希望下次考核的时候不要再错失良机。";
        }
        this.node.getChildByName("Notice").on('touchend',function(){
            cc.director.loadScene('Game');
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
                    DB.collection('UserData').doc(res.data[0]._id).update({
                        data:{
                            level:res.data[0].level+1,
                        }
                    })
                }
            }
        });
    }
});
