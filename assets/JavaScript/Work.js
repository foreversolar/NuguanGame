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
        var self = this;
        var Intro = this.node.getChildByName("Intro");
        var start = Intro.getChildByName("start");
        var startButton = start.getComponent(cc.Button);
        startButton.node.on('click',function(){
            Intro.opacity = 0;
            startButton.interactable = false;
            start.opacity = 0;
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
        })

    },

    //update (dt) {},
    
    Select:function(Button,bad){
        var Bad_flag = false;
        for(var i = 0;i<3;i++){
            if(Button == "Card"+(bad[i]+1).toString()){
                Bad_flag = true;
                break;
            }
        }
        var card = this.node.getChildByName(Button);
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
        this.node.getChildByName("Card1").getComponent(cc.Button).interactable = false;
        this.node.getChildByName("Card2").getComponent(cc.Button).interactable = false;
        this.node.getChildByName("Card3").getComponent(cc.Button).interactable = false;
        this.node.getChildByName("Card4").getComponent(cc.Button).interactable = false;
        this.node.getChildByName("Card5").getComponent(cc.Button).interactable = false;
        this.node.getChildByName("Card6").getComponent(cc.Button).interactable = false;
        this.node.getChildByName("Card7").getComponent(cc.Button).interactable = false;
        this.node.getChildByName("Card8").getComponent(cc.Button).interactable = false;
    },

    SetBad:function(bad){
        var c = "Card";
        var cards = new Array(3);
        var Card = new Array(3);
        for(var i = 0;i<3;i++){
            cards[i] = c + (bad[i]+1).toString();
            Card[i] = this.node.getChildByName(cards[i]).getComponent(cc.Button);
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
                    }
                })
            }
        });
    }
});
