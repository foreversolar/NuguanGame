// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
        // bar: {
        //     get () {
        //         return this._bar;
        //     },
        //     set (value) {
        //         this._bar = value;
        //     }
        // },
        text: cc.Label,
        ux_end: cc.Node,
        back: cc.Button,
        startBtn:cc.Button,
        ux:cc.Node,
        bgCard:cc.Node,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        cc.loader.loadRes("/picture/WorkAndFun/WorkAndFun", cc.SpriteAtlas, function (err, atlas) {
            if (err) {
                console.log("Load 有钩子的手 failed!");
            }
            atlas.getSpriteFrame("btn_有钩子的手");
        });
    },


    start () {
        var self = this;
        this.hand1 = this.bgCard.getChildByName("hand1").getComponent(cc.Button);
        this.hand2 = this.bgCard.getChildByName("hand2").getComponent(cc.Button);
        this.hand3 = this.bgCard.getChildByName("hand3").getComponent(cc.Button);

        this.startBtn.node.on('click',function(){ 
            self.hand1.interactable = true;
            self.hand2.interactable = true;
            self.hand3.interactable = true; 
            self.ux.opacity=0;
            self.bgCard.opacity=255;
            self.startBtn.interactable = false;
        });

        this.back.node.on('click',function(){
            cc.director.loadScene("Game");
        })
    
        //回调函数不能有参数，只能在函数内部传参了

        this.hand1.node.on("click", function () {
            this.LuckDetermineAndShow(1, this.hand1);
        }, this);
        this.hand2.node.on("click", function () {
            this.LuckDetermineAndShow(2, this.hand2);
        }, this);
        this.hand3.node.on("click", function () {
            this.LuckDetermineAndShow(3, this.hand3);
        }, this);

    },

    //用this来访问属性
    LuckDetermineAndShow: function (number, button) {
        var self=this
        var happy = Math.ceil(Math.random() * 3);
        if (happy == number) {
            cc.loader.loadRes("/picture/WorkAndFun/WorkAndFun", cc.SpriteAtlas, function (err, atlas) {
                if (err) {
                    console.log("Load 有钩子的手 failed!");
                }
                var sprite = atlas.getSpriteFrame("btn_有钩子的手");
                button.node.getComponent(cc.Sprite).spriteFrame = sprite;
            });
            self.AddScore(1);
            this.text.string = "哇，你怎么猜到的！（金币+5）";
        } else {
            cc.loader.loadRes("/picture/WorkAndFun/WorkAndFun", cc.SpriteAtlas, function (err, atlas) {
                if (err) {
                    console.log("Load 张开的手 failed!");
                }
                var sprite = atlas.getSpriteFrame("btn_张开的手");
                button.node.getComponent(cc.Sprite).spriteFrame = sprite;
            });
            this.text.string = "哈哈，不在这里！";
        }

        this.scheduleOnce(function () {
            this.bgCard.opacity=0;
            this.ux_end.opacity = 255;
            this.hand1.interactable = false;
            this.hand2.interactable = false;
            this.hand3.interactable = false; 
            this.ux_end.on(cc.Node.EventType.TOUCH_END,function(){
                cc.director.loadScene("Game");  
            });
            this.node.color=new cc.Color(121, 121, 121);
        }, 0.4);
        
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
                        money:res.data[0].money+right*5,
                        playing_times:res.data[0].playing_times+1,
                    }
                })
            }
        });
    }

    // update (dt) {},
});
