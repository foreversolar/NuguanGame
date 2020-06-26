// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

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

        var Dialogue = this.text.json.rounds40;
        this.mySay.string = Dialogue[0];

        this.node.on('touchend', function () {
            if (i > 5) {
                cc.director.loadScene("Game");
            } else if (i < 5) {
                if (i % 2 == 0) {
                    this.friend.opacity = 0;
                    this.me.opacity = 255;
                    this.mySay.string = Dialogue[i]
                } else {
                    this.friend.opacity = 255;
                    this.me.opacity = 0;
                    this.friendSay.string = Dialogue[i]
                }
            } else if (i ==5) {
                this.option.active = true;
                this.option1.interactable = true;
                this.option2.interactable = true;
                this.node.pauseSystemEvents(true);
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
        var Resp = "究竟好时节的时候，想点开心的事情吧。"

        self.me.opacity = 0;
        self.friend.opacity = 255;
        self.friendSay.string = Resp;
        self.node.resumeSystemEvents(true);
    },
});
