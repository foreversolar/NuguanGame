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
        var hand1 = bg.getChildByName("hand1");
        var hand2 = bg.getChildByName("hand2");
        var hand3 = bg.getChildByName("hand3");


        hand1.on('click',function(){            
            cc.loader.loadRes('/picture/btn_张开的手', function (err, texture) { 
                if(err){
                    console.log("Load btn_张开的手 failed!");
                }
                var sprite  = new cc.SpriteFrame(texture);
                hand1.getComponent(cc.Sprite).spriteFrame = sprite;
            });
            hand2.getComponent(cc.Button).interactable = false;
            hand3.getComponent(cc.Button).interactable = false;
        });

        hand2.on('click',function(){            
            cc.loader.loadRes('/picture/btn_张开的手', function (err, texture) { 
                if(err){
                    console.log("Load btn_张开的手 failed!");
                }
                var sprite  = new cc.SpriteFrame(texture);
                hand2.getComponent(cc.Sprite).spriteFrame = sprite;
            });
            hand1.getComponent(cc.Button).interactable = false;
            hand3.getComponent(cc.Button).interactable = false;
        });


        hand3.on('click',function(){            
            cc.loader.loadRes('/picture/btn_张开的手', function (err, texture) { 
                if(err){
                    console.log("Load btn_张开的手 failed!");
                }
                var sprite  = new cc.SpriteFrame(texture);
                hand3.getComponent(cc.Sprite).spriteFrame = sprite;
            });
            hand1.getComponent(cc.Button).interactable = false;
            hand2.getComponent(cc.Button).interactable = false;
        });




    },

    callback: function (button) {

    }

    // update (dt) {},
});
