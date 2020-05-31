// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        Opened:0,
        Get:0,
        choice:0,
        chooes1:0,
        choosed:false,
        sprite1:cc.SpriteFrame,
        sprite2:cc.SpriteFrame,
        sprite3:cc.SpriteFrame,
        sprite4:cc.SpriteFrame,
    },

    // LIFE-CYCLE CALLBACKS:
    
    onLoad () {
        //设置0-3对应的card
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
        //随机加载对应图片
        this.loadPicture(choice);
        var self = this;
        var Intro = this.node.getChildByName("Intro");
        var startButton = Intro.getChildByName("start").getComponent(cc.Button);
        if(this.loaded == true){
            startButton.interactable = true;
        }
        startButton.node.on('click',function(){
            Intro.opacity = 0;
            self.node.getChildByName("TouMing").opacity = 255;
            Intro.getChildByName("back").getComponent(cc.Button).interactable = false;
            startButton.node.opacity = 0;
            startButton.interactable = false;
            self.Select("Card1",choice,1);
            self.Select("Card2",choice,2);
            self.Select("Card3",choice,3);
            self.Select("Card4",choice,4);
            self.Select("Card5",choice,5);
            self.Select("Card6",choice,6);
            self.Select("Card7",choice,7);
            self.Select("Card8",choice,8);
        });
    },
    
    start () {
        var back = this.node.getChildByName("Intro").getChildByName("back").getComponent(cc.Button);
        back.node.on('click',function(){
            cc.director.loadScene("Game");
        });
    },

    Select:function(Button,choice,index){
        //获取每个按钮
        var card = this.node.getChildByName("TouMing").getChildByName(Button);
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
                //console.log(self.choice);
                //console.log(chooes2);                    
                if(self.choice == chooes2*2||self.choice == chooes2*2-1){
                    self.Get++;
                    //对了放大然后消失
                    tween.clone(card).start();
                    tween.clone(self.node.getChildByName("TouMing").getChildByName("Card"+self.chooes1.toString())).start();
                }
                self.choosed = false;
                self.chooes1 = 0;
                self.choice = 0;
            }
            self.Opened++;
            if(self.Opened==8){
                //self.AddScore(self.Get);
                console.log(self.Get);
                var Intro = self.node.getChildByName("Intro");
                var content = Intro.getChildByName("content").getComponent(cc.Label);
                if(self.Get == 4){
                    content.string = "你挑出了所有相同的食物！经验增加120!";
                }
                else{
                    content.string = "你只挑出了"+self.Get+"道相同的食物！经验增加"+self.Get+"!请继续努力！";
                }
                Intro.opacity = 255;
                Intro.on(cc.Node.EventType.TOUCH_END,function(){
                    cc.director.loadScene("Game");  
                });
                var back = Intro.getChildByName("back");
                back.opacity = 0;
                // back.getComponent(cc.Button).interactable = true; 
            }
            //console.log(self.choosed+" "+self.choice);
        });
    },

    loadPicture(choice){
        var self = this;      
        var name = "Card";
        var bg = this.node.getChildByName("TouMing");
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

    AddScore:function(right){
        const DB = wx.cloud.database();
        DB.collection('UserData').where({
            _openid: cc.sys.localStorage.getItem('openid'),
        })
        .get({
            success(res) {
                DB.collection('UserData').doc(res.data[0]._id).update({
                    data:{
                        experience:res.data[0].experience+right*30,
                        work_times:res.data[0].work_times+1,
                    }
                })
            }
        });
    }
});