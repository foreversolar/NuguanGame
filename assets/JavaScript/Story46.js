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
        back: cc.Node,
        me:cc.Node,
        friend: cc.Node,
        fuzi: cc.Node,
        luren: cc.Node,
        playerName: cc.Label,
        friendSay:cc.Label,
        mySay: cc.Label,
        fuziSay: cc.Label,
        lurenSay: cc.Label,
        text: cc.JsonAsset,
        option: cc.Node,
        option1: cc.Button,
        option2: cc.Button,
        ahuihaogandu: 10
    },


    onLoad () {
        cc.director.preloadScene("Game");
        var figure = this.me.getChildByName("figure_nuli");
        globalUtil.setDialogueFigurePic(figure);

    },

    start() {
        this.playerName.string = cc.sys.localStorage.getItem('nickName')
        this.me.opacity = 255;
        this.friend.opacity = 0;
        this.fuzi.opacity = 0;
        this.luren.opacity = 0;

        this.option.active = false;
        this.option1.interactable = false;
        this.option2.interactable = false;

        var Dialogue;
        var i = 1;

        var Dialogue = this.text.json.rounds46.dialogue;
        var Dialogue1 = this.text.json.rounds46.dialogue1;
        var Dialogue2 = this.text.json.rounds46.dialogue2;
        var Dialogue3 = this.text.json.rounds46.dialogue3;
        this.mySay.string = Dialogue[0];


        var self = this;
        const DB = wx.cloud.database();
        DB.collection('UserData').where({
            _openid: cc.sys.localStorage.getItem('openid'),
        })
            .get({
                success(res) {
                    self.ahuihaogandu = res.data[0].ahui;

                    var j;
                    if (self.ahuihaogandu >= 0 && self.ahuihaogandu < 4) {
                        j = 20;
                    } else if (self.ahuihaogandu >= 4 && self.ahuihaogandu < 9) {
                        j = 20;
                    } else {
                        j = 18;
                    }

                    self.node.on('touchend', function () {
                        if (i > j) {
                            cc.director.loadScene("Game");
                        } else if (i <= 6) {
                            if (i % 2 == 1) {
                                self.fuzi.opacity = 255;
                                self.me.opacity = 0;
                                self.friend.opacity = 0;
                                self.fuziSay.string = Dialogue[i]
                            } else {
                                self.fuzi.opacity = 0;
                                self.me.opacity = 255;
                                self.friend.opacity = 0;
                                self.mySay.string = Dialogue[i]
                                if (i == 6) {
                                    cc.loader.loadRes("picture/Background/长安街白天", function (err, texture) {
                                        if (err) {
                                            console.log("Load picture failed!");
                                        }
                                        var sprite = new cc.SpriteFrame(texture);
                                        self.back.getComponent(cc.Sprite).spriteFrame = sprite;
                                    });
                                }
                            }
                        } else if (i == 7) {
                            self.fuzi.opacity = 0;
                            self.me.opacity = 0;
                            self.friend.opacity = 0;
                            self.luren.opacity = 255;
                            self.lurenSay.string = Dialogue[i]
                        } else if (i >= 8 && i <= 15) {
                            if (i % 2 == 1) {
                                self.luren.opacity = 0;
                                self.fuzi.opacity = 0;
                                self.me.opacity = 0;
                                self.friend.opacity = 255;
                                self.friendSay.string = Dialogue[i]
                            } else {
                                self.luren.opacity = 0;
                                self.fuzi.opacity = 0;
                                self.me.opacity = 255;
                                self.friend.opacity = 0;
                                self.mySay.string = Dialogue[i]
                            }
                        } else if (i >= 16) {
                            if (self.ahuihaogandu >= 0 && self.ahuihaogandu < 4) {
                                if (i % 2 == 0) {
                                    self.fuzi.opacity = 0;
                                    self.me.opacity = 0;
                                    self.friend.opacity = 255;
                                    self.friendSay.string = Dialogue1[i - 16]
                                } else {
                                    self.fuzi.opacity = 0;
                                    self.me.opacity = 255;
                                    self.friend.opacity = 0;
                                    self.mySay.string = Dialogue1[i - 16]
                                }
                            } else if (self.ahuihaogandu >= 4 && self.ahuihaogandu < 9) {
                                if (i == 20) {
                                    self.option.active = true;
                                    self.option1.interactable = true;
                                    self.option2.interactable = true;
                                    self.node.pauseSystemEvents(true);
                                } else if (i % 2 == 1) {
                                    self.fuzi.opacity = 0;
                                    self.me.opacity = 0;
                                    self.friend.opacity = 255;
                                    self.friendSay.string = Dialogue2[i - 16]
                                } else {
                                    self.fuzi.opacity = 0;
                                    self.me.opacity = 255;
                                    self.friend.opacity = 0;
                                    self.mySay.string = Dialogue2[i - 16]
                                }
                            } else {
                                if (i % 2 == 0) {
                                    self.fuzi.opacity = 0;
                                    self.me.opacity = 0;
                                    self.friend.opacity = 255;
                                    self.friendSay.string = Dialogue3[i - 16]
                                } else {
                                    self.fuzi.opacity = 0;
                                    self.me.opacity = 255;
                                    self.friend.opacity = 0;
                                    self.mySay.string = Dialogue3[i - 16]
                                }
                            }
                        }
                        i++;
                    }, self);
                }
            });

        var that = this;

        this.option1.node.on("click", function () {
            that.option1.interactable = false;
            that.option2.interactable = false;
            that.option.active = false;
            that.continueDialogue(that, true);
        })

        this.option2.node.on("click", function () {
            that.option1.interactable = false;
            that.option2.interactable = false;
            that.option.active = false;
            that.continueDialogue(that, false);
        })
    },

    continueDialogue: function (self, flag) {
        var Resp1 = "不论如何，我今日是不会再回宫的，若你打算离宫，那我们日后江湖再见吧。"
        var Resp2 = "食君之禄，担君之忧？你一个小小司膳司侍婢，也想这些家国大事么？罢了，原是我见识短浅，那么自此别过吧。你我之间，也不过如这捻头，掰之即碎罢了。"
        if (flag) {
            self.friendSay.string = Resp1;
        } else {
            self.friendSay.string = Resp2;
        }
        self.me.opacity = 0;
        self.friend.opacity = 255;
        self.node.resumeSystemEvents(true);
    },
});
