// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html
import globalUtil from "util";

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
        friendSay:cc.Label,
        mySay:cc.Label,
    },


    onLoad () {
        cc.director.preloadScene("Game");
        var figure = this.me.getChildByName("figure");
        globalUtil.setDialogueFigurePic(figure)
    },

    start() {
        this.playerName.string = cc.sys.localStorage.getItem('nickName')
        this.option.active = false
        var that=this
        this.Dialogue=[
            "上次那位偶遇的书生递给你的几张书页，你收下了.",
            "这如何敢收？况且我二人不过司膳司宫女，哪有机会接触到能举荐他人的高官呢",
            "啊？什么高官",
            "你真真是自幼入宫，这许多门路都不省得么？这唤作干谒，原是读书人四处拜访以求举荐机会的事情",
            "你是不是有几分瞧我不起",
            "啊？我全无此意，阿慧你不要太多想",
            "你叫我如何不多想呢？你相貌才华厨艺每样都胜过于我，虽无明言，然而却常常觉得我这也不知，那也不晓"
        ]
        var touchpoint=this.Dialogue.length
        
        this.i=0;
        this.node.on('touchend',function(){      
            if(this.i==this.Dialogue.length+1){
                cc.director.loadScene("Game");
            }          
            if (this.i == touchpoint) {
                this.me.opacity=0;
                this.option.active = true;
                this.option1.interactable=true;
                this.option2.interactable=true;
                this.node.pauseSystemEvents(true);
            }else{
                console.log(this.i)
                console.log(this.Dialogue.length)
                if(this.me.opacity==0 || this.friend.opacity==255){
                    this.me.opacity=255;
                    this.mySay.string=this.Dialogue[this.i];
                    this.friend.opacity=0;
                }else{
                    this.friend.opacity=255;
                    this.friendSay.string=this.Dialogue[this.i];
                    this.me.opacity=0;
                }
            }
            this.i++;
        },this);

        var op1=this.option1
        var op2=this.option2
        var that=this;

        this.option1.node.on("click",function(){
                op2.interactable=false;
                op1.interactable=false; 
                that.continueDialogue(that,false,touchpoint);
        })

        this.option2.node.on("click",function(){
                op2.interactable=false;
                op1.interactable=false; 
                that.continueDialogue(that,true,touchpoint);
        })

    },

    continueDialogue:function(self,flag,touchpoint){
        var rightResp="抱歉，是我一时激动。"
        var wrongResp="是哪，自然是我小题大做了。你既无意，那不提此事也罢。"

        this.option.active = false;
        // self.friend.opacity=255;
        if(flag){
            self.friendSay.string=rightResp;
            self.friend.opacity=0;
            self.UpdateFollowStory(self,touchpoint);
            const DB = wx.cloud.database();
            DB.collection('UserData').where({
                _openid: cc.sys.localStorage.getItem('openid'),
            })
                .get({
                    success(res) {
                        DB.collection('UserData').doc(res.data[0]._id).update({
                            data: {
                                ahui: res.data[0].ahui + 1,
                                ren: res.data[0].ren+1
                            }
                        })
                    }
                });
        }else{
            self.friendSay.string = wrongResp;
            const DB = wx.cloud.database();
            DB.collection('UserData').where({
                _openid: cc.sys.localStorage.getItem('openid'),
            })
                .get({
                    success(res) {
                        DB.collection('UserData').doc(res.data[0]._id).update({
                            data: {
                                ahui: res.data[0].ahui - 1,
                                fo: res.data[0].fo+ 1,
                            }
                        })
                    }
                });
        }
        self.node.resumeSystemEvents(true);

    },

    UpdateFollowStory:function(self,touchpoint){
        self.i=0;
        self.Dialogue=[
            "今日宫中新进了一批樱桃，来时丽娘让我俩做了酪樱桃分送各宫。",
            "好，只是我有一事不明，酪樱桃为什么非加蔗浆不可？有些时候樱桃就已经够甜的了。",
            "据说是樱桃容易引发内热，因此蔗浆可以中和。",
            "那么酥酪应该只是为调味而加咯？",
            "应当如是。",
        ]
        self.me.opacity=255;
        self.mySay.string="无妨，原是我口快～";

        this.node.on('touchend',function(){      
            if(this.i==this.Dialogue.length+1){
                cc.director.loadScene("Game");
            }          
            if (this.i == touchpoint) {
                this.me.opacity=0;
                this.option.active = true;
                this.option1.interactable=true;
                this.option2.interactable=true;
                this.node.pauseSystemEvents(true);
            }else{
                console.log(this.i)
                console.log(this.Dialogue.length)
                if(this.me.opacity==0 || this.friend.opacity==255){
                    this.me.opacity=255;
                    this.mySay.string=this.Dialogue[this.i];
                    this.friend.opacity=0;
                }else{
                    this.friend.opacity=255;
                    this.friendSay.string=this.Dialogue[this.i];
                    this.me.opacity=0;
                }
            }
            this.i++;
        },this);

    }
});
