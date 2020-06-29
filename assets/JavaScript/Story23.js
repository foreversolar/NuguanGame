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
        friendSay:cc.Label,
        mySay: cc.Label,
        fuziSay:cc.Label,
        i:1,
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
        this.node.on('touchend',function(){      
            if (self.i == 2) {
                cc.sys.localStorage.setItem('story', 23);
                cc.director.loadScene("Game");
            }
            if (self.i == 1) {
                self.node.pauseSystemEvents(false);
                self.option.active = true;
            }
            self.i++;
        }); 
        var self = this;
        var op1 = this.op1;
        var op2 = this.op2;
        op1.node.on("click", function () {
            self.option.active = false;
            self.choice = 1;
            self.continueDialogue(true);
        })

        op2.node.on("click", function () {
            self.option.active = false;
            self.choice = 2;
            self.continueDialogue(false);
        })         
    },

    continueDialogue: function (flag) {
        if (flag) {
            this.friend.opacity = 255;
            this.fuzi.opacity = 0;
            this.me.opacity = 0;
            this.friendSay.string = "哎呀，别和人家开玩笑啦，这是雕酥，做起来极不容易的。";
            const DB = wx.cloud.database();
            DB.collection('UserData').where({
                _openid: cc.sys.localStorage.getItem('openid'),
            })
                .get({
                    success(res) {
                        DB.collection('UserData').doc(res.data[0]._id).update({
                            data: {
                                fo: res.data[0].fo + 1
                            }
                        })
                    }
                });
        } else {
            this.fuzi.opacity = 255;
            this.friend.opacity = 0;
            this.me.opacity = 0;
            this.fuziSay.string = "哇，原来如此。";
            const DB = wx.cloud.database();
            DB.collection('UserData').where({
                _openid: cc.sys.localStorage.getItem('openid'),
            })
                .get({
                    success(res) {
                        DB.collection('UserData').doc(res.data[0]._id).update({
                            data: {
                                ren: res.data[0].ren+ 1,
                                skill: res.data[0].skill + 1,
                            }
                        })
                    }
                });
        }
        this.node.resumeSystemEvents(true);
    },
    // update (dt) {},
});