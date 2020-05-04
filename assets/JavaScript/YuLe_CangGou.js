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
        text: "测试",
        ux_end: cc.Node,
        back: cc.Button,
    },

    // LIFE-CYCLE CALLBACKS:

    //onLoad () {},

    start () {
        var self = this;
        var bg = this.node.getChildByName("background");
        var hand1 = bg.getChildByName("hand1").getComponent(cc.Button);
        var hand2 = bg.getChildByName("hand2").getComponent(cc.Button);
        var hand3 = bg.getChildByName("hand3").getComponent(cc.Button);
        var ux = bg.getChildByName("ux");
        var start = ux.getChildByName("btn").getComponent(cc.Button);
        self.ux_end = bg.getChildByName("ux_end");
        self.back = self.ux_end.getChildByName("btn").getComponent(cc.Button);
        self.text = self.ux_end.getChildByName("text");

        start.node.on('click',function(){    
            ux.opacity=0
            start.interactable = false;
            hand1.interactable = true;
            hand2.interactable = true;
            hand3.interactable = true;

        });
    
        //回调函数不能有参数，只能在函数内部传参了

        hand1.node.on("click", function () {
            this.LuckDetermineAndShow(1, hand1);
        }, this);
        hand2.node.on("click", function () {
            this.LuckDetermineAndShow(2, hand2);
        }, this);
        hand3.node.on("click", function () {
            this.LuckDetermineAndShow(3, hand3);
        }, this);

        this.back.node.on('click',function(){       
            cc.director.loadScene("Game");  
        });

    },

    //用this来访问属性
    LuckDetermineAndShow: function (number, button) {
        var self=this
        console.log(number)
        var happy = Math.ceil(Math.random() * 3);
        if (happy == number) {
            cc.loader.loadRes("/picture/WorkAndFun/WorkAndFun", cc.SpriteAtlas, function (err, atlas) {
                if (err) {
                    console.log("Load 有钩子的手 failed!");
                }
                var sprite = atlas.getSpriteFrame("btn_有钩子的手");
                button.node.getComponent(cc.Sprite).spriteFrame = sprite;
                self.AddScore(1);
            });
            this.text.getComponent(cc.Label).string = "哇，你怎么猜到的！（金币+5）";
        } else {
            cc.loader.loadRes("/picture/WorkAndFun/WorkAndFun", cc.SpriteAtlas, function (err, atlas) {
                if (err) {
                    console.log("Load 张开的手 failed!");
                }
                var sprite = atlas.getSpriteFrame("btn_张开的手");
                button.node.getComponent(cc.Sprite).spriteFrame = sprite;
            });
            this.text.getComponent(cc.Label).string = "哈哈，不在这里！";
        }

        this.scheduleOnce(function () {
            this.ux_end.opacity = 255;
            this.back.interactable = true;
        }, 0.5);
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
                    }
                })
            }
        });
    }

    // update (dt) {},
});
