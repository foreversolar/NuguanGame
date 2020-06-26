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
        me:cc.Node,
        friend:cc.Node,
        playerName:cc.Label,
        option:cc.Node,
        option1:cc.Button,
        option2:cc.Button,
        option3:cc.Button,
        friendSay:cc.Label,
        mySay:cc.Label,
    },


    onLoad () {
        cc.director.preloadScene("Game");

    },

    start() {
        this.playerName.string = cc.sys.localStorage.getItem('nickName')
        this.option.active = false
        var that=this
        this.Dialogue=[
            "哎，为什么我连‘糖粥’这样简单的食物都做不好呀？",
            "是哪里做不好呢？",
            "就是，就是我做的‘糖粥’总是没有姑姑们做得有种特别的香味！",
            "你一定是忘记了__。",
            "是这样吗！哎，我就说怎么回事呢。",
            "记起来就好。"
        ]
        
        var i=1;
        this.node.on('touchend',function(){      
            if(i>5){
                cc.director.loadScene("Game");
            }          
            if (i == 4) {
                this.option.active = true;
                this.option1.interactable=true;
                this.option2.interactable=true;
                this.option3.interactable = true;
                this.node.pauseSystemEvents(true);
                console.log(i);
            }else{
                if(this.me.opacity==0){
                    this.me.opacity=255;
                    this.mySay.string=this.Dialogue[i];
                    this.friend.opacity=0;
                }else{
                    this.friend.opacity=255;
                    this.friendSay.string=this.Dialogue[i];
                    this.me.opacity=0;
                }
            }
            i++;
        },this);

        // this.option1.node.on("click",function(){
        //     cc.loader.loadRes("/picture/KnowledgeCard/KnowledgeCard", cc.SpriteAtlas, function (err, atlas) {
        //         if(err){
        //             console.log("Load xuanzhong failed!");
        //         }
        //         var sprite = atlas.getSpriteFrame('btn_xuanzhongdaan');
        //         this.option1.node.getComponent(cc.Sprite).spriteFrame = sprite;
        //     });
        // })
        // this.option2.node.on("click",function(){
        //     cc.loader.loadRes("/picture/KnowledgeCard/KnowledgeCard", cc.SpriteAtlas, function (err, atlas) {
        //         if(err){
        //             console.log("Load xuanzhong failed!");
        //         }
        //         var sprite = atlas.getSpriteFrame('btn_xuanzhongdaan');
        //         this.option2.node.getComponent(cc.Sprite).spriteFrame = sprite;
        //     });
        // })
        // this.option3.node.on("click",function(){
        //     cc.loader.loadRes("/picture/KnowledgeCard/KnowledgeCard", cc.SpriteAtlas, function (err, atlas) {
        //         if(err){
        //             console.log("Load xuanzhong failed!");
        //         }
        //         var sprite = atlas.getSpriteFrame('btn_xuanzhongdaan');
        //         this.option3.node.getComponent(cc.Sprite).spriteFrame = sprite;
        //     });
        // })


        var op1=this.option1
        var op2=this.option2
        var op3=this.option3
        var that=this;

        this.option1.node.on("click",function(){
            cc.loader.loadRes("/picture/KnowledgeCard/KnowledgeCard", cc.SpriteAtlas, function (err, atlas) {
                if(err){
                    console.log("Load xuanzhong failed!");
                }
                var sprite = atlas.getSpriteFrame('btn_xuanzhongdaan');           
                op1.node.getComponent(cc.Sprite).spriteFrame = sprite;
                var label=op1.node.getChildByName("tip");
                op1.node.x+=30;
                op1.node.y-=20;
                label.x-=45;
                label.y-=10;
                op2.interactable=false;
                op3.interactable=false;   
                op1.interactable=false; 
                that.continueDialogue(that,true);
            });
        })

        this.option2.node.on("click",function(){
            cc.loader.loadRes("/picture/KnowledgeCard/KnowledgeCard", cc.SpriteAtlas, function (err, atlas) {
                if(err){
                    console.log("Load xuanzhong failed!");
                }
                var sprite = atlas.getSpriteFrame('btn_xuanzhongdaan');           
                op2.node.getComponent(cc.Sprite).spriteFrame = sprite;
                var label=op2.node.getChildByName("tip");
                op2.node.x+=30;
                op2.node.y-=20;
                label.x-=45;
                label.y-=10;
                op2.interactable=false;
                op3.interactable=false;   
                op1.interactable=false; 
                that.continueDialogue(that,false);

            });
        })

        this.option3.node.on("click",function(){
            cc.loader.loadRes("/picture/KnowledgeCard/KnowledgeCard", cc.SpriteAtlas, function (err, atlas) {
                if(err){
                    console.log("Load xuanzhong failed!");
                }
                var sprite = atlas.getSpriteFrame('btn_xuanzhongdaan');           
                op3.node.getComponent(cc.Sprite).spriteFrame = sprite;
                var label=op3.node.getChildByName("tip");
                op3.node.x+=30;
                op3.node.y-=20;
                label.x-=45;
                label.y-=10;
                op2.interactable=false;
                op3.interactable=false;   
                op1.interactable=false; 
                that.continueDialogue(that,false);
            });
        })

    },

    continueDialogue:function(self,flag){
        var rightResp="是这样吗！哎，我就说怎么回事呢。"
        var wrongResp="我用了这个的呀，啊，我想起来了，是不是要加杏仁碎？对，就是它。"

        this.option.active = false;
        self.friend.opacity = 255;
        self.me.opacity = 0;
        if(flag){
            self.friendSay.string = rightResp;
            this.AddScore();
        }else{
            self.friendSay.string=wrongResp
        }
        self.node.resumeSystemEvents(true);
    },

    AddScore: function () {
        const DB = wx.cloud.database();
        DB.collection('UserData').where({
            _openid: cc.sys.localStorage.getItem('openid'),
        })
            .get({
                success(res) {
                    DB.collection('UserData').doc(res.data[0]._id).update({
                        data: {
                            ahui: res.data[0].ahui + 1,
                            skill: res.data[0].skill + 1,
                        }
                    })
                }
            });
    }
});
