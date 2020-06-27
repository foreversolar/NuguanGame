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

        var Dialogue = this.text.json.rounds44;
        this.fuziSay.string = Dialogue[0];

        this.node.on('touchend', function () {
            if (i > 12) {
                cc.director.loadScene("Game");
            } else if (i <= 6 && i != 3) {
                if (i % 2 == 0) {
                    this.fuzi.opacity = 255;
                    this.me.opacity = 0;
                    this.friend.opacity = 0;
                    this.fuziSay.string = Dialogue[i]
                } else {
                    this.fuzi.opacity = 0;
                    this.me.opacity = 0;
                    this.friend.opacity = 255;
                    this.friendSay.string = Dialogue[i]
                }
            } else if (i <= 10) {
                if (i % 2 == 0) {
                    this.fuzi.opacity = 0;
                    this.me.opacity = 0;
                    this.friend.opacity = 255;
                    this.friendSay.string = Dialogue[i]
                } else {
                    this.fuzi.opacity = 0;
                    this.me.opacity = 255;
                    this.friend.opacity = 0;
                    this.mySay.string = Dialogue[i]
                }
            } else if (i == 11) {
                this.fuzi.opacity = 0;
                this.me.opacity = 255;
                this.friend.opacity = 0;
                this.mySay.string = Dialogue[i]
                this.option.active = true;
                this.option1.interactable = true;
                this.option2.interactable = true;
                this.node.pauseSystemEvents(true);
            } else if (i == 12) {
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
        var Resp1 = "我知道你想问什么，不过，我本来也不愿意让别人知道。送我进宫当年，便是因为只要入选就能得几两银子。入宫以后，我倒宁愿他们不再和我有丝毫联系了呢，谁知道总是来找我要钱，骆驼不喝水也要死的呢！当我是银号么？"
        var Resp2 = "我倒是宁愿没有，有这样的家人，和死了又有什么分别？听到死讯的那一瞬间，我真的，很高兴，就像解脱了一样。这么久以来，我没有出过宫，直到和你溜出去的时候，我才发现，有些规矩，本来就是可以不守的。"
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
