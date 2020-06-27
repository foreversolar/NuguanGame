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
        xiaoer: cc.Node,
        guizunan: cc.Node,
        guizunv: cc.Node,
        playerName: cc.Label,
        friendSay:cc.Label,
        mySay: cc.Label,
        option: cc.Node,
        op1: cc.Button,
        op2: cc.Button,
        text: cc.JsonAsset
    },


    onLoad () {
        cc.director.preloadScene("Game");
        var figure = this.me.getChildByName("figure_nuli");
        globalUtil.setDialogueFigurePic(figure)
    },

    start() {
        this.playerName.string = cc.sys.localStorage.getItem('nickName')
        this.option.active = false;
        this.op1.interactable = false;
        this.op2.interactable = false;
        this.xiaoer.opacity = 0;
        this.guizunan.opacity = 0;
        this.guizunv.opacity = 0;
        this.me.opacity = 0;
        this.friend.opacity = 255;

        var self = this;

        var Dialogue = this.text.json.rounds24;
        var i = 1;
        this.node.on('touchend', function () {
            if (i > 16) {
                cc.director.loadScene("Game");
            } else if (i < 8) {
                if (i % 2 == 1) {
                    self.friend.opacity = 0;
                    self.me.opacity = 255;
                    self.mySay.string = Dialogue[i]
                } else if (i % 2 == 0) {
                    self.friend.opacity = 255;
                    self.me.opacity = 0;
                    self.friendSay.string = Dialogue[i]
                }
            } else if (i == 8) {
                self.xiaoer.opacity = 255;
                self.me.opacity = 0;
            } else if (i > 8 && i < 12) {
                if (i % 2 == 0) {
                    self.xiaoer.opacity = 0;
                    self.friend.opacity = 0;
                    self.me.opacity = 255;
                    self.mySay.string = Dialogue[i]
                } else if (i % 2 == 1) {
                    self.xiaoer.opacity = 0;
                    self.friend.opacity = 255;
                    self.me.opacity = 0;
                    self.friendSay.string = Dialogue[i]
                }
            } else if (i == 12) {
                self.friend.opacity = 0;
                self.me.opacity = 0;
                self.guizunan.opacity = 255;
            } else if (i == 13) {
                self.guizunan.opacity = 0;
                self.guizunv.opacity = 255;
            } else if (i == 14) {
                self.guizunv.opacity = 0;
                self.friend.opacity = 255;
                self.me.opacity = 0;
                self.friendSay.string = Dialogue[i]
            } else if (i == 15) {
                self.option.active = true;
                self.op1.interactable = true;
                self.op2.interactable = true;
                self.node.pauseSystemEvents(true);
            } else if (i == 16) {
                self.friend.opacity = 0;
                self.me.opacity = 255;
                self.mySay.string = Dialogue[i]
            }

            i++;
        }, this)

        var op1 = this.op1
        var op2 = this.op2
        var that = this;

        this.op1.node.on("click", function () {
            op1.interactable = false;
            op2.interactable = false;
            that.option.active = false;
            that.continueDialogue1(that, true);
        })

        this.op2.node.on("click", function () {
            op1.interactable = false;
            op2.interactable = false;
            that.option.active = false;
            that.continueDialogue1(that, false);
        })
    },

    continueDialogue1: function (self, flag) {
        if (flag) {
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
            const DB = wx.cloud.database();
            DB.collection('UserData').where({
                _openid: cc.sys.localStorage.getItem('openid'),
            })
                .get({
                    success(res) {
                        DB.collection('UserData').doc(res.data[0]._id).update({
                            data: {
                                ren: res.data[0].ren + 1
                            }
                        })
                    }
                });
        }

        self.me.opacity = 0;
        self.friend.opacity = 255;
        self.friendSay.string = "那个三千万匹，是帛吗？这，这可是——";
        console.log(self.friendSay.string);
        self.node.resumeSystemEvents(true);
    }
});
