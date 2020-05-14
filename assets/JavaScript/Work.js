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
    },

    // LIFE-CYCLE CALLBACKS:
    
    onLoad () {
        //选定3个坏的
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
        this.SetBad(bad);//要改

        var self = this;
        var Intro = this.node.getChildByName("Intro");
        var startButton = Intro.getChildByName("start").getComponent(cc.Button);
        startButton.node.on('click',function(){
            Intro.opacity = 0;
            self.node.getChildByName("TouMing").opacity = 255;
            startButton.node.opacity = 0;
            startButton.interactable = false;
            self.Select("Card1",bad);
            self.Select("Card2",bad);
            self.Select("Card3",bad);
            self.Select("Card4",bad);
            self.Select("Card5",bad);
            self.Select("Card6",bad);
            self.Select("Card7",bad);
            self.Select("Card8",bad);
        });
    },

    start () {
        var back = this.node.getChildByName("Intro").getChildByName("back").getComponent(cc.Button);
        back.node.on('click',function(){
            cc.director.loadScene("Game");
        });
    },

    //update (dt) {},
    
    Select:function(Button,bad){
        var Bad_flag = false;
        var i = 0;
        for(i = 0;i<3;i++){
            if(Button == "Card"+(bad[i]+1).toString()){
                Bad_flag = true;
                break;
            }
        }
        var bad1 = this.node.getChildByName("TouMing").getChildByName("Bad1");
        var bad2 = this.node.getChildByName("TouMing").getChildByName("Bad2");
        var bad3 = this.node.getChildByName("TouMing").getChildByName("Bad3");
        var card = this.node.getChildByName("TouMing").getChildByName(Button);
        var cardButton = card.getComponent(cc.Button);
        var self = this;
        this.scheduleOnce(function(){
            cardButton.interactable = true;
            bad1.opacity = 0;
            bad2.opacity = 0;
            bad3.opacity = 0;
        },3);
        cardButton.node.on('click',function(){
            cardButton.interactable = false;
            self.Opened++;
            if(Bad_flag){
                self.Get++;
                switch(i){
                case 0:
                    bad1.opacity = 255;
                    break;
                case 1:
                    bad2.opacity = 255;
                    break;
                case 2:
                    bad3.opacity = 255;
                    break;
                }
            }
            if(self.Opened==3){
                self.closeAll();
                var Intro = self.node.getChildByName("Intro");
                var content = Intro.getChildByName("content").getComponent(cc.Label);
                if(self.Get == 3){
                    content.string = "恭喜你已经挑出了所有坏掉的食物！经验增加120";
                }
                else{
                    content.string = "你挑出了"+self.Get+"道坏掉的食物,很遗憾，有坏掉的食物被送到了餐桌上，总管很生气！";
                }
                self.AddScore(self.Get);
                Intro.opacity = 255;
                var back = Intro.getChildByName("back");
                back.opacity = 255;
                back.getComponent(cc.Button).interactable = true; 
            }
        });
    },

    closeAll:function(){
        var Panel = this.node.getChildByName("TouMing");
        Panel.getChildByName("Card1").getComponent(cc.Button).interactable = false;
        Panel.getChildByName("Card2").getComponent(cc.Button).interactable = false;
        Panel.getChildByName("Card3").getComponent(cc.Button).interactable = false;
        Panel.getChildByName("Card4").getComponent(cc.Button).interactable = false;
        Panel.getChildByName("Card5").getComponent(cc.Button).interactable = false;
        Panel.getChildByName("Card6").getComponent(cc.Button).interactable = false;
        Panel.getChildByName("Card7").getComponent(cc.Button).interactable = false;
        Panel.getChildByName("Card8").getComponent(cc.Button).interactable = false;
    },

    SetBad:function(bad){
        var c = "Card";
        var cards = new Array(3);
        var Card = new Array(3);
        var bad1 = this.node.getChildByName("TouMing").getChildByName("Bad1");
        var bad2 = this.node.getChildByName("TouMing").getChildByName("Bad2");
        var bad3 = this.node.getChildByName("TouMing").getChildByName("Bad3");
        for(var i = 0;i<3;i++){
            cards[i] = c + (bad[i]+1).toString();
            Card[i] = this.node.getChildByName("TouMing").getChildByName(cards[i]);
        }
        cc.tween(bad1)
        .to(0,{ position: Card[0].position})
        .start();
        cc.tween(bad2)
        .to(0,{ position: Card[1].position})
        .start();
        cc.tween(bad3)
        .to(0,{ position: Card[2].position})
        .start();
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
                        experience:res.data[0].experience+right*40,
                        work_times:res.data[0].work_times+1,
                    }
                })
            }
        });
    }
});
