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
        fuzi: cc.Node,
        playerName: cc.Label,
        option:cc.Node,
        op1: cc.Button,
        op2: cc.Button,
        op3: cc.Button,
        friendSay:cc.Label,
        mySay: cc.Label,
        fuziSay:cc.Label,
        text: cc.JsonAsset
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        cc.director.preloadScene("Game");
        var figure = this.me.getChildByName("figure_nuli");
        globalUtil.setDialogueFigurePic(figure)
    },

    start() {
        this.playerName.string = cc.sys.localStorage.getItem('nickName')
        this.option.active = false;
        var self = this;
        this.me.opacity = 0;
        this.friend.opacity = 0;
        this.fuzi.opacity = 255;

        var Dialogue = this.text.json.rounds29;
        var i = 1;

        this.node.on('touchend',function(){      
            if (i > 10) {
                cc.sys.localStorage.setItem('story', 29);
                cc.director.loadScene("Game");
            } else if (i == 1 || i == 6) {
                self.me.opacity = 0;
                self.friend.opacity = 255;
                self.fuzi.opacity = 0;
                self.friendSay.string = Dialogue[i]
            } else if (i == 2 || i == 7) {
                self.me.opacity = 0;
                self.friend.opacity = 0;
                self.fuzi.opacity = 255;
                self.fuziSay.string = Dialogue[i]
            } else if (i == 3 || i == 4 || i == 5 || i == 8) {
                self.me.opacity = 255;
                self.friend.opacity = 0;
                self.fuzi.opacity = 0;
                self.mySay.string = Dialogue[i]
            } else if (i == 9) {
                self.node.pauseSystemEvents(false);
                self.option.active = true;
            } else if (i == 10) {
                self.me.opacity = 255;
                self.friend.opacity = 0;
                self.fuzi.opacity = 0;
                self.mySay.string = Dialogue[i]
            }
            i++;
        }); 
        var self = this;
        var op1 = this.op1;
        var op2 = this.op2;
        var op3 = this.op3;
        op1.node.on("click", function () {
            self.option.active = false;
            self.continueDialogue(true);
        })

        op2.node.on("click", function () {
            self.option.active = false;
            self.continueDialogue(false);
        })       

        op3.node.on("click", function () {
            self.option.active = false;
            self.continueDialogue(false);
        })  
    },

    continueDialogue: function (flag) {
        this.me.opacity = 0;
        this.friend.opacity = 0;
        if (flag) {
            this.fuzi.opacity = 255;
            this.fuziSay.string = "你真的是聪明极了呢！有你在，可就放心了！";
            const DB = wx.cloud.database();
            DB.collection('UserData').where({
                _openid: cc.sys.localStorage.getItem('openid'),
            })
                .get({
                    success(res) {
                        DB.collection('UserData').doc(res.data[0]._id).update({
                            data: {
                                skill: res.data[0].skill+ 1
                            }
                        })
                    }
                });
        } else {
            this.fuzi.opacity = 255;
            this.fuziSay.string = "诶诶，等等！瑞圣奴可是柑子，你怎么给弄成别的了！";
        }
        this.node.resumeSystemEvents(true);
    },
});