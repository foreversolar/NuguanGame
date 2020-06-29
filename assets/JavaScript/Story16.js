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
        gugu: cc.Node,
        fuzi:cc.Node,
        playerName: cc.Label,
        friendSay:cc.Label,
        mySay: cc.Label,
        guguSay: cc.Label,
        fuziSay:cc.Label,
        text: cc.JsonAsset,
        liniang:0
    },


    onLoad () {
        cc.director.preloadScene("Game");
        var figure = this.me.getChildByName("figure_nuli");
        globalUtil.setDialogueFigurePic(figure)
        
    },

    start() {
        this.playerName.string = cc.sys.localStorage.getItem('nickName')
        this.gugu.opacity = 0;
        this.me.opacity = 0;
        this.friend.opacity = 0;
        this.fuzi.opacity = 0;

        var Dialogue;
        var i = 1;
        var self = this;
        const DB = wx.cloud.database();
        DB.collection('UserData').where({
            _openid: cc.sys.localStorage.getItem('openid'),
        })
            .get({
                success(res) {
                    self.liniang = res.data[0].liniang;
                    if (self.liniang == 0) {
                        Dialogue = self.text.json.rounds16.dialogue1;
                        self.fuzi.opacity = 255;
                        self.fuziSay.string = Dialogue[0];
                        self.node.on('touchend', function () {
                            if (i > 4) {
                                cc.sys.localStorage.setItem('story', 16);
                                cc.director.loadScene("Game");
                            } else if (i == 1) {
                                self.fuzi.opacity = 0;
                                self.me.opacity = 255;
                                self.mySay.string = Dialogue[i]
                            } else if (i == 2) {
                                self.fuzi.opacity = 255;
                                self.me.opacity = 0;
                                self.fuziSay.string = Dialogue[i]
                            } else if (i == 3) {
                                self.fuzi.opacity = 0;
                                self.friend.opacity = 255;
                                self.friendSay.string = Dialogue[i]
                            } else if (i == 4) {
                                self.friend.opacity = 0;
                                self.me.opacity = 255;
                                self.mySay.string = Dialogue[i]
                            }

                            i++;
                        }, self)
                    } else if (self.liniang == 1) {
                        Dialogue = self.text.json.rounds16.dialogue2;
                        self.friend.opacity = 255;
                        self.friendSay.string = Dialogue[0];
                        self.node.on('touchend', function () {
                            if (i > 6) {
                                cc.sys.localStorage.setItem('story', 16);
                                cc.director.loadScene("Game");
                            } else if (i % 2 == 1) {
                                self.friend.opacity = 0;
                                self.me.opacity = 255;
                                self.mySay.string = Dialogue[i]
                            } else if (i % 2 == 0) {
                                self.friend.opacity = 255;
                                self.me.opacity = 0;
                                self.friendSay.string = Dialogue[i]
                            }

                            i++;
                        }, self)
                    } else {
                        Dialogue = self.text.json.rounds16.dialogue3;
                        self.gugu.opacity = 255;
                        self.guguSay.string = Dialogue[0];
                        self.node.on('touchend', function () {
                            if (i > 6) {
                                cc.sys.localStorage.setItem('story', 16);
                                cc.director.loadScene("Game");
                            } else if (i < 5) {
                                if (i % 2 == 1) {
                                    self.gugu.opacity = 0;
                                    self.me.opacity = 255;
                                    self.mySay.string = Dialogue[i]
                                } else if (i % 2 == 0) {
                                    self.gugu.opacity = 255;
                                    self.me.opacity = 0;
                                    self.guguSay.string = Dialogue[i]
                                }
                            } else if (i == 5) {
                                self.gugu.opacity = 0;
                                self.friend.opacity = 255
                                self.friendSay.string = Dialogue[i]
                            } else if (i == 6) {
                                self.gugu.opacity = 255;
                                self.friend.opacity = 0;
                                self.guguSay.string = Dialogue[i]
                            } else if (i == 7) {
                                self.gugu.opacity = 0;
                                self.me.opacity = 255;
                                self.mySay.string = Dialogue[i]
                            } else if (i == 8) {
                                self.me.opacity = 0;
                                self.friend.opacity = 255;
                                self.friendSay.string = Dialogue[i]
                            }

                            i++;
                        }, this)
                    }
                }
            });
    }
});
