﻿// Learn cc.Class:
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
        text: cc.JsonAsset
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

        var Dialogue;
        var i = 1;

        var Dialogue = this.text.json.rounds38;
        this.fuziSay.string = Dialogue[0];

        this.node.on('touchend', function () {
            if (i > 4) {
                cc.sys.localStorage.setItem('story', 38);
                cc.director.loadScene("Game");
            } else if (i ==2) {
                this.fuzi.opacity = 255;
                this.me.opacity = 0;
                this.friend.opacity = 0;
                this.fuziSay.string = Dialogue[i]
            } else if (i == 3) {
                this.me.opacity = 0;
                this.fuzi.opacity = 0;
                this.friend.opacity = 255;
                this.friendSay.string = Dialogue[i]
            } else if (i==1 || i==4) {
                this.fuzi.opacity = 0;
                this.friend.opacity = 0;
                this.me.opacity = 255;
                this.mySay.string = Dialogue[i]
            }
            i++;
        }, this);
    },
});
