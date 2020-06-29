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
        option3:cc.Button,

        friendSay:cc.Label,
        mySay:cc.Label,
    },


    onLoad () {
        cc.director.preloadScene("Game");
        var figure = this.me.getChildByName("figure_nuli");
        globalUtil.setDialogueFigurePic(figure)
    },

    start() {
        this.playerName.string = cc.sys.localStorage.getItem('nickName')
        this.option.active = false
        var that=this
        this.Dialogue=[
            "你可多加注意，记得添衣.",
            "是——阿嚏！",
            "今日中午熬煮了羊肉汤，我且替你勺一碗来，喝了也好暖暖身子。",
            "啊，谢谢——嚏！",
            "给。",
            "呜呜，又有股怪味儿！",
            "让我猜猜里头哪个叫人不舒服了，难道是__",
            "",
            "说起来你为什么不喜欢大蒜呀。",
            "我就是不喜欢窜脑袋的味儿！",
            "不过这汤对身体可是大有好处的，香豉，大蒜，酥油，药食两效，可是有益之物。",
            "好嘛，不过说起来，我听说丽娘最近也身体抱恙，还有些严重啊。",
            "是吗，难怪近几日都不见她了，若是最近得空，不若我二人去探望一下丽娘吧？",
            "好呀！而且，丽娘年岁业已不小，这场病若真是不好，恐怕还得向总事太监申请离宫了。",
        ]
        var touchpoint=7;
        
        this.i=0;
        this.node.on('touchend',function(){      
            if(this.i==this.Dialogue.length){
            cc.sys.localStorage.setItem('story', 11);
                cc.director.loadScene("Game");
            }          
            if (this.i == touchpoint) {
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
        var op3=this.option3
        var that=this;

        this.option1.node.on("click",function(){
                op2.interactable=false;
                op1.interactable=false; 
                op3.interactable=false;
                that.continueDialogue(that,true);
        })

        this.option2.node.on("click",function(){
            op2.interactable=false;
            op1.interactable=false; 
            op3.interactable=false;
                that.continueDialogue(that,false);
        })

        this.option3.node.on("click",function(){
            op2.interactable=false;
            op1.interactable=false; 
            op3.interactable=false;
            that.continueDialogue(that,false);
    })

    },

    continueDialogue:function(self,flag){
        var rightResp="你说对啦，去年就给你说过啦！"
        var wrongResp="不是啦不是啦，是大蒜！"

        this.option.active = false;
        self.friend.opacity = 255;
        self.me.opacity = 0;
        if(flag){
            self.friendSay.string=rightResp;
            const DB = wx.cloud.database();
            DB.collection('UserData').where({
                _openid: cc.sys.localStorage.getItem('openid'),
            })
                .get({
                    success(res) {
                        DB.collection('UserData').doc(res.data[0]._id).update({
                            data: {
                                skill: res.data[0].skill + 1,
                            }
                        })
                    }
                });
        }else{
            self.friendSay.string=wrongResp;
        }
        self.node.resumeSystemEvents(true);

    },

    // UpdateFollowStory:function(self){
    //     self.i=0;
    //     self.Dialogue=[
    //         "说起来你为什么不喜欢大蒜呀。",
    //         "我就是不喜欢窜脑袋的味儿！",
    //         "据说是樱桃容易引发内热，因此蔗浆可以中和。",
    //         "那么酥酪应该只是为调味而加咯？",
    //         "应当如是。",
    //     ]
    //     self.me.opacity=255;
    //     self.mySay.string="无妨，原是我口快～";

    //     this.node.on('touchend',function(){      
    //         if(this.i==this.Dialogue.length+1){
    //             cc.director.loadScene("Game");
    //         }          
    //         if (this.i == touchpoint) {
    //             this.me.opacity=0;
    //             this.option.active = true;
    //             this.option1.interactable=true;
    //             this.option2.interactable=true;
    //             this.node.pauseSystemEvents(true);
    //         }else{
    //             console.log(this.i)
    //             console.log(this.Dialogue.length)
    //             if(this.me.opacity==0 || this.friend.opacity==255){
    //                 this.me.opacity=255;
    //                 this.mySay.string=this.Dialogue[this.i];
    //                 this.friend.opacity=0;
    //             }else{
    //                 this.friend.opacity=255;
    //                 this.friendSay.string=this.Dialogue[this.i];
    //                 this.me.opacity=0;
    //             }
    //         }
    //         this.i++;
    //     },this);

    // }
});
