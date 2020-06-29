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
        me:cc.Node,
        friend: cc.Node,
        zhousheng: cc.Node,
        playerName: cc.Label,
        beijingjieshao: cc.Node,
        option1:cc.Node,
        option2:cc.Node,
        op1_1:cc.Button,
        op1_2:cc.Button,
        op2_1:cc.Button,
        op2_2:cc.Button,
        friendSay:cc.Label,
        mySay: cc.Label,
        zhoushengSay:cc.Label,
        jieshao: cc.Label,
        text:cc.JsonAsset,
    },


    onLoad () {
        cc.director.preloadScene("Game");

        var figure=this.me.getChildByName("figure");
        globalUtil.setDialogueFigurePic(figure)
    },

    start() {
        this.playerName.string = cc.sys.localStorage.getItem('nickName')
        this.option1.active = false;
        this.option2.active = false;
        this.zhousheng.opacity = 0;

        var Dialogue = this.text.json.rounds7;
        
        var i=1;
        this.node.on('touchend',function(){     
            if (i > 19) {
                cc.sys.localStorage.setItem('story', 7);
                cc.director.loadScene("Game");
            }
            if(i<10 & i!=3){
                if (i % 2 == 0) {
                    this.beijingjieshao.opacity = 0;
                    this.me.opacity = 0;
                    this.friend.opacity = 255;
                    this.friendSay.string = Dialogue[i];
                } else {
                    this.beijingjieshao.opacity = 0;
                    this.me.opacity = 255;
                    this.friend.opacity = 0;
                    this.mySay.string = Dialogue[i];
                }
            }else if (i == 3) {
                this.node.pauseSystemEvents(true);
                this.op1_1.interactable = true;
                this.op1_2.interactable = true;
                this.option1.active = true;
            }
            else if (i == 10) {
                this.me.opacity = 0;
                this.friend.opacity = 0;
                this.beijingjieshao.opacity = 255;
                this.jieshao.string = Dialogue[i];
            }else if(i == 11){
                this.zhousheng.opacity = 255;
                this.beijingjieshao.opacity = 0;
                this.zhoushengSay.string = Dialogue[i];
            } else if (i == 12) {
                this.zhousheng.opacity = 0;
                this.friend.opacity = 255;
                this.friendSay.string = Dialogue[i];
            } else if (i == 13) {
                this.node.pauseSystemEvents(true);
                this.op2_1.interactable = true;
                this.op2_2.interactable = true;
                this.option2.active = true;
            } else if (i == 14) {
                this.friend.opacity = 0;
                this.zhousheng.opacity = 255;
                this.zhoushengSay.string = Dialogue[i];
            } else if (i == 15) {
                this.zhousheng.opacity = 0;
                this.me.opacity = 255;
                this.mySay.string = Dialogue[i];
            } else if (i == 16) {
                this.me.opacity = 0;
                this.zhousheng.opacity = 255;
                this.zhoushengSay.string = Dialogue[i];
            } else if (i == 17) {
                this.friend.opacity = 255;
                this.zhousheng.opacity = 0;
                this.friendSay.string = Dialogue[i];
            } else if (i == 18) {
                this.friend.opacity = 0;
                this.me.opacity = 255;
                this.mySay.string = Dialogue[i];
            } else if (i == 19) {
                this.me.opacity = 0;
                this.zhousheng.opacity = 255;
                this.zhoushengSay.string = Dialogue[i];
            }
            
            i++;
        },this);

        var op1_1 = this.op1_1
        var op1_2 = this.op1_2
        var that = this;

        var op2_1 = this.op2_1
        var op2_2 = this.op2_2

        this.op1_1.node.on("click", function () {
            op1_1.interactable = false;
            op1_2.interactable = false;
            that.option1.active = false;
            that.continueDialogue1(that, true);
        })

        this.op1_2.node.on("click", function () {
            op1_2.interactable = false;
            op1_1.interactable = false;
            that.option1.active = false;
            that.continueDialogue1(that, false);
        })

        this.op2_1.node.on("click", function () {
            that.option2.active = false;
            op2_2.interactable=false;
            op2_1.interactable = false; 
            that.continueDialogue2(that, false);
        })

        this.op2_2.node.on("click",function(){
            that.option2.active = false;
            op2_2.interactable=false;
            op2_1.interactable=false; 
            that.continueDialogue2(that,true);
        })
    },

    continueDialogue1: function (self, flag) {
        if (flag) {
            //无属性值
        } else {
            const DB = wx.cloud.database();
            DB.collection('UserData').where({
                _openid: cc.sys.localStorage.getItem('openid'),
            })
                .get({
                    success(res) {
                        DB.collection('UserData').doc(res.data[0]._id).update({
                            data: {
                                ahui: res.data[0].ahui + 1
                            }
                        })
                    }
                });
        }
        this.me.opacity = 0;
        this.friend.opacity = 0;
        this.zhousheng.opacity = 0;
        self.beijingjieshao.opacity = 255;
        self.jieshao.string = "一段时间后....";
        self.node.resumeSystemEvents(true);
    },

    continueDialogue2: function (self, flag) {
        this.me.opacity = 0;
        this.zhousheng.opacity = 0;
        self.friend.opacity = 255;
        self.friendSay.string = "啊，原来如此。";
        self.node.resumeSystemEvents(true);
    }
});
