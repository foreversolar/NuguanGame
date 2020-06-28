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
        fuzi:cc.Node,
        playerName: cc.Label,
        friendSay:cc.Label,
        mySay: cc.Label,
        fuziSay: cc.Label,
        text: cc.JsonAsset,
        option: cc.Node,
        option1: cc.Button,
        option2: cc.Button,
    },


    onLoad () {
        cc.director.preloadScene("Game");
        var figure = this.me.getChildByName("figure_nuli");
        globalUtil.setDialogueFigurePic(figure)
    },

    start() {
        this.playerName.string = cc.sys.localStorage.getItem('nickName')
        this.me.opacity = 0;
        this.friend.opacity = 0;
        this.fuzi.opacity = 255;

        this.option.active = false;
        this.option1.interactable = false;
        this.option2.interactable = false;

        var Dialogue;
        var i = 1;

        var Dialogue = this.text.json.rounds34;
        this.fuziSay.string = Dialogue[0];

        this.node.on('touchend', function () {
            if (i > 12) {
                cc.director.loadScene("Game");
            } else if (i <= 7) {
                if (i % 2 == 0) {
                    this.fuzi.opacity = 255;
                    this.me.opacity = 0;
                    this.friend.opacity = 0;
                    this.fuziSay.string = Dialogue[i]
                } else {
                    this.fuzi.opacity = 0;
                    this.me.opacity = 255;
                    this.friend.opacity = 0;
                    this.mySay.string = Dialogue[i]
                }
            } else if (i == 8) {
                this.fuzi.opacity = 0;
                this.me.opacity = 0;
                this.friend.opacity = 255;
                this.friendSay.string = Dialogue[i]
            } else if (i == 9) {
                this.fuzi.opacity = 0;
                this.me.opacity = 255;
                this.friend.opacity = 0;
                this.mySay.string = Dialogue[i]
            } else if (i == 10) {
                this.option.active = true;
                this.option1.interactable = true;
                this.option2.interactable = true;
                this.node.pauseSystemEvents(true);
            } else if (i==11||i==12) {
                this.fuzi.opacity = 0;
                this.me.opacity = 255;
                this.friend.opacity = 0;
                this.mySay.string = Dialogue[i]
            }
            i++;
        }, this);

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
        var Resp = "石耳、石发、石绵、海紫菜、鹿角、腊菜、天花蕈、沙鱼、海鳔白、石决明、虾魁腊"
        if (flag) {
            self.mySay.string = Resp;
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
            self.mySay.string = Resp;
        }
        self.me.opacity = 255;
        self.friend.opacity = 0;
        self.fuzi.opacity = 0;
        self.node.resumeSystemEvents(true);
    },
});
