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
    },

    // LIFE-CYCLE CALLBACKS:

    //onLoad () {},

    start () {
        var bg=this.node.getChildByName("background");
        var hand1 = bg.getChildByName("hand1").getComponent(cc.Button);
        var hand2 = bg.getChildByName("hand2").getComponent(cc.Button);
        var hand3 = bg.getChildByName("hand3").getComponent(cc.Button);

        var ux=bg.getChildByName("ux");
        var ux_end=bg.getChildByName("ux_end");
        var start=ux.getChildByName("btn").getComponent(cc.Button);
        var back=ux_end.getChildByName("btn").getComponent(cc.Button);
        var text=ux_end.getChildByName("text");

        var happy=Math.ceil(Math.random()*3); 

        start.node.on('click',function(){    
            ux.opacity=0
            console.log("click start")
            start.interactable = false;
            hand1.interactable = true;
            hand2.interactable = true;
            hand3.interactable = true;

        });

        hand1.node.on('click',function(){            
            cc.loader.loadRes('/picture/btn_张开的手', function (err, texture) { 
                if(err){
                    console.log("Load btn_张开的手 failed!");
                }
                var sprite  = new cc.SpriteFrame(texture);
                hand1.getComponent(cc.Sprite).spriteFrame = sprite;
            });

            if(happy==1){
                text.getComponent(cc.Label).string="哇，你怎么猜到的！（金币+5）";
            }else{
                text.getComponent(cc.Label).string="哈哈，不在这里！";
            }
            ux_end.opacity=255;
            back.interactable=true;

        });

        hand2.node.on('click',function(){            
            cc.loader.loadRes('/picture/btn_张开的手', function (err, texture) { 
                if(err){
                    console.log("Load btn_张开的手 failed!");
                }
                var sprite  = new cc.SpriteFrame(texture);
                hand2.getComponent(cc.Sprite).spriteFrame = sprite;
            });

            if(happy==2){
                text.getComponent(cc.Label).string="哇，你怎么猜到的！（金币+5）";
            }else{
                text.getComponent(cc.Label).string="哈哈，不在这里！";
            }
            ux_end.opacity=255;
            back.interactable=true;

        });


        hand3.node.on('click',function(){            
            cc.loader.loadRes('/picture/btn_张开的手', function (err, texture) { 
                if(err){
                    console.log("Load btn_张开的手 failed!");
                }
                var sprite  = new cc.SpriteFrame(texture);
                hand3.getComponent(cc.Sprite).spriteFrame = sprite;
            });

            if(happy==3){
                text.getComponent(cc.Label).string="哇，你怎么猜到的！（金币+5）";
            }else{
                text.getComponent(cc.Label).string="哈哈，不在这里！";
            }
            ux_end.opacity=255;
            back.interactable=true;

        });

        back.node.on('click',function(){       
            cc.director.loadScene("Game");  
            console.log("click end")   
        });

    },

    callback: function (button) {

    }

    // update (dt) {},
});
