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
        playerName: cc.Label,
        friendSay:cc.Label,
        mySay: cc.Label,
        option: cc.Node,
        option1: cc.Button,
        option2: cc.Button,
        text: cc.JsonAsset
    },


    onLoad () {
        cc.director.preloadScene("Game");
        var figure = this.me.getChildByName("figure_nuli");
        globalUtil.setDialogueFigurePic(figure)
    },

    start() {
        this.playerName.string = cc.sys.localStorage.getItem('nickName')
        this.me.opacity = 255;
        this.friend.opacity = 0;
        
        this.option.active = false;
        this.option1.interactable = false;
        this.option2.interactable = false;

        var Dialogue;
        var i = 1;

        var Dialogue = this.text.json.rounds42;
        this.mySay.string = Dialogue[0];

        this.node.on('touchend', function () {
            if (i > 10) {
            cc.sys.localStorage.setItem('story', 42);
                cc.director.loadScene("Game");
            } else if (i < 8) {
                if (i % 2 == 0) {
                    this.friend.opacity = 0;
                    this.me.opacity = 255;
                    this.mySay.string = Dialogue[i]
                } else {
                    this.friend.opacity = 255;
                    this.me.opacity = 0;
                    this.friendSay.string = Dialogue[i]
                }
            } else if (i == 8) {
                this.friend.opacity = 255;
                this.me.opacity = 0;
                this.friendSay.string = Dialogue[i]
            }else if (i == 9) {
                this.option.active = true;
                this.option1.interactable = true;
                this.option2.interactable = true;
                this.node.pauseSystemEvents(true);
            } else if (i == 10) {
                this.friend.opacity = 0;
                this.me.opacity = 255;
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
        var Resp1 = "竟还有你想不到的时候。我打算藏一些碎金在鱼腹之中，他若是贪食不孝，自会吞金而死，若是供奉于我父母灵前，待鱼肉腐败，那也不需多少时间，自然金子就归他了。"
        var Resp2 = "你想必也猜到了吧。我打算藏一些碎金在鱼腹之中，他若是贪食不孝，自会吞金而死，若是供奉于我父母灵前，待鱼肉腐败，那也不需多少时间，自然金子就归他了。"
        if (flag) {
            self.friendSay.string = Resp1;
            const DB = wx.cloud.database();
            DB.collection('UserData').where({
                _openid: cc.sys.localStorage.getItem('openid'),
            })
                .get({
                    success(res) {
                        DB.collection('UserData').doc(res.data[0]._id).update({
                            data: {
                                ahui: res.data[0].ahui+ 2
                            }
                        })
                    }
                });
        } else {
            self.friendSay.string = Resp2;
            const DB = wx.cloud.database();
            DB.collection('UserData').where({
                _openid: cc.sys.localStorage.getItem('openid'),
            })
                .get({
                    success(res) {
                        DB.collection('UserData').doc(res.data[0]._id).update({
                            data: {
                                ahui: res.data[0].ahui + 1,
                                skill: res.data[0].skill+1
                            }
                        })
                    }
                });
        }
        self.me.opacity = 0;
        self.friend.opacity = 255;
        self.node.resumeSystemEvents(true);
    },
});
