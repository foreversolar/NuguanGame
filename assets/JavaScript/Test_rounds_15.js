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
        choice:0,
        chooes1:0,
        choosed:false,
        not_choosepic:cc.SpriteFrame,
        choosepic:cc.SpriteFrame,
        sprite1:cc.SpriteFrame,
        sprite2:cc.SpriteFrame,
        sprite3:cc.SpriteFrame,
        sprite4:cc.SpriteFrame,
        number:cc.Sprite,
        time1:cc.SpriteFrame,
        time2:cc.SpriteFrame,
        time3:cc.SpriteFrame,
        times:0,
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        var self = this;
        var Notice = this.node.getChildByName("Notice");
        var Study = this.node.getChildByName("Study");
        var add_tips = function(){
            self.tips.string = "考核一共分两轮，第一轮是知识考核，第二轮是技能考核，这一次的技能考核将在厨房举行，只要像平常一样正常发挥，你一定可以的！！";
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
            .to(0.1, { position: cc.v2(0, 1000)})
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
                self.node.getChildByName("Work").opacity = 255;
                //加载工作考核
                self.loadWork();
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

    /*loadPic:function(choose_button){
        cc.loader.loadRes("/picture/KnowledgeCard/KnowledgeCard", cc.SpriteAtlas, function (err, atlas) {
            if(err){
                console.log("Load xuanzhong failed!");
            }
            var sprite = atlas.getSpriteFrame('btn_xuanzhongdaan');
            choose_button.getChildByName("Background").getComponent(cc.Sprite).spriteFrame = sprite;
        });
    },*/

    loadWork:function(){
        //设置相同卡片
        var choice = new Array(8);
        for(var i = 0;i<8;i++){
            var index;
            while(1){
                index = Math.floor(Math.random()*8);
                var flag = true;
                for(var j=0;j<i;j++){
                    if(index == choice[j]){
                        flag = false;
                    }
                }
                if(flag){
                    break;
                }
            }
            choice[i] = index;
        }
        var i = 3;
        this.schedule(function(){
            if(i == 0){
                this.number.node.parent.opacity = 0;
            }else if(i == 1){
                this.number.spriteFrame = this.time1;
            }else if(i == 2){
                this.number.spriteFrame = this.time2;
            }else if(i == 3){
                this.number.spriteFrame = this.time3;                
            }
            i--;
        },1,4,0);
        //随机加载对应图片
        this.loadPicture(choice);
        //5s记忆
        this.Select("Card1",choice,1);
        this.Select("Card2",choice,2);
        this.Select("Card3",choice,3);
        this.Select("Card4",choice,4);
        this.Select("Card5",choice,5);
        this.Select("Card6",choice,6);
        this.Select("Card7",choice,7);
        this.Select("Card8",choice,8);        
    },

    Select:function(Button,choice,index){
        //获取每个按钮
        var card = this.node.getChildByName("Work").getChildByName(Button);
        var cardButton = card.getComponent(cc.Button);
        let tween = cc.tween()
        .to(0.5, { scale: 1.05 })
        .to(0.1, { opacity: 0 });
        var self = this;
        this.scheduleOnce(function(){
            cardButton.interactable = true;
        },3);
        cardButton.node.on('click',function(){
            cardButton.interactable = false;
            //第一张图是什么
            //card1-8对应choice0-7，同属于相邻数的card相同
            if(self.choosed == false){
                self.chooes1 = index;
                switch(choice[index-1]){
                    //cardindex为0
                    case 0:
                        self.choice = 1;
                        self.choosed = true;
                        break;
                    case 1:
                        //cardindex为1
                        self.choice = 2;
                        self.choosed = true;
                        break;
                    case 2:
                        self.choice = 3;
                        self.choosed = true;
                        break;
                    case 3:
                        //加载图片2
                        self.choice = 4;
                        self.choosed = true;
                        break;
                    case 4:
                        self.choice = 5;
                        self.choosed = true;
                        break;
                    case 5:
                        //加载图片3
                        self.choice = 6;
                        self.choosed = true;
                        break;
                    case 6:
                        self.choice = 7;
                        self.choosed = true;
                        break;
                    case 7:
                        self.choice = 8;
                        self.choosed = true;
                        break;
                    default:
                        console.log(choice[index]+" out of range.");
                        break;
                }
                //console.log(self.choice);  
            }
            //第二张图是什么
            else{
                var chooes2;
                //选择choice
                switch(choice[index-1]){
                    case 0:
                    case 1:
                        //选择choice(0,1)
                        chooes2 = 1;
                        break;
                    case 2:
                    case 3:
                        //加载图片2(3,4)
                        chooes2 = 2;
                        break;
                    case 4:
                    case 5:
                        //加载图片3(5,6)
                        chooes2 = 3;
                        break;
                    case 6:
                    case 7:
                        chooes2 = 4;
                        break;
                    default:
                        console.log(choice[index]+" out of range.(2)");
                        break;
                }
                console.log(self.choice);
                console.log(chooes2);                    
                if(self.choice == chooes2*2||self.choice == chooes2*2-1){
                    self.Get++;
                    //对了放大然后消失
                    tween.clone(card).start();
                    tween.clone(self.node.getChildByName("Work").getChildByName("Card"+self.chooes1.toString())).start();
                }
                self.choosed = false;
                self.chooes1 = 0;
                self.choice = 0;
            }
            self.Opened++;
            if(self.Opened==8){                
                self.scheduleOnce(function(){
                    self.Result();
                },1);
                console.log(self.Get);                
            }
        });
    },

    loadPicture(choice){
        var name = "Card";
        var bg = this.node.getChildByName("Work");
        for(var i = 0;i < 8;i++){
            var cardname = name + (i+1).toString();
            var card = bg.getChildByName(cardname);
            switch(choice[i]){
                case 0:
                    //console.log(1);
                    card.getComponent(cc.Button).pressedSprite = this.sprite1;
                    card.getComponent(cc.Button).disabledSprite = this.sprite1;
                    card.getChildByName("Background").getComponent(cc.Sprite).SpriteFrame = this.sprite1;
                    break;
                case 1:
                    //console.log(2);
                    card.getComponent(cc.Button).pressedSprite = this.sprite1;
                    card.getComponent(cc.Button).disabledSprite = this.sprite1;
                    card.getChildByName("Background").getComponent(cc.Sprite).SpriteFrame = this.sprite1;
                    break;
                case 2:
                    //console.log(3);
                    card.getComponent(cc.Button).pressedSprite = this.sprite2;
                    card.getComponent(cc.Button).disabledSprite = this.sprite2;
                    card.getChildByName("Background").getComponent(cc.Sprite).SpriteFrame = this.sprite2;
                    break;
                case 3:
                    //console.log(4);
                    card.getComponent(cc.Button).pressedSprite = this.sprite2;
                    card.getComponent(cc.Button).disabledSprite = this.sprite2;
                    card.getChildByName("Background").getComponent(cc.Sprite).SpriteFrame = this.sprite2;
                    break;
                case 4:
                    //console.log(5);
                    card.getComponent(cc.Button).pressedSprite = this.sprite3;
                    card.getComponent(cc.Button).disabledSprite = this.sprite3;
                    card.getChildByName("Background").getComponent(cc.Sprite).SpriteFrame = this.sprite3;
                    break;
                case 5:
                    //console.log(6);
                    card.getComponent(cc.Button).pressedSprite = this.sprite3;
                    card.getComponent(cc.Button).disabledSprite = this.sprite3;
                    card.getChildByName("Background").getComponent(cc.Sprite).SpriteFrame = this.sprite3;
                    break;
                case 6:
                    //console.log(7);
                    card.getComponent(cc.Button).pressedSprite = this.sprite4;
                    card.getComponent(cc.Button).disabledSprite = this.sprite4;
                    card.getChildByName("Background").getComponent(cc.Sprite).SpriteFrame = this.sprite4;
                    break;
                case 7:
                    //console.log(8);
                    card.getComponent(cc.Button).pressedSprite = this.sprite4;
                    card.getComponent(cc.Button).disabledSprite = this.sprite4;
                    card.getChildByName("Background").getComponent(cc.Sprite).SpriteFrame = this.sprite4;
                    break;
                default:
                    console.log(choice[i]+" out of range.");
                    break;
            }
        }
    },
    // update (dt) {},

    Result:function(){
        cc.tween(this.node.getChildByName("Notice"))
            .to(0, { position: cc.v2(0, 0)})
            .start();
        this.node.getChildByName("Work").opacity = 0;
        this.node.getChildByName("Notice").opacity = 255;
        console.log( " "+this.right+" "+this.Get);
        if(this.right == 3&&this.Get == 4){
            this.node.getChildByName("Notice").getChildByName("Words").getComponent(cc.Label).string = "恭喜你成功通过了考核！皇天不负有心人，你靠着自己的努力成功晋升为典膳，负责辅佐司膳，完成部分菜品的烹饪。在接下来的日子里，希望你认真练习烹饪技艺，升得典膳后方可进行精品菜肴的烹饪，加油！";
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
                                        round15:cc.sys.localStorage.getItem('level'),
                                    }
                                })
                        }
                    });
                }   
            }
            
        });
    }
});
