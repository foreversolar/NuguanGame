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
        gugu: cc.Node,
        playerName: cc.Label,
        beijingjieshao: cc.Node,
        option1:cc.Node,
        op1_1: cc.Button,
        op1_2: cc.Button,
        friendSay:cc.Label,
        mySay: cc.Label,
        guguSay:cc.Label,
        jieshao: cc.Label,
        text:cc.JsonAsset,
    },


    onLoad () {
        cc.director.preloadScene("Game");
    },

    start () {
        this.option1.active = false;
        this.gugu.opacity = 255;
        this.me.opacity = 0;
        this.friend.opacity = 0;
        this.beijingjieshao.opacity = 0;

        var Dialogue = this.text.json.rounds10;
        
        var i=0;
        this.node.on('touchend',function(){     
            if(i>11){
                cc.director.loadScene("Game");
            }
            if(i<4){
                if (i % 2 == 1) {
                    this.gugu.opacity = 0;
                    this.beijingjieshao.opacity = 0;
                    this.me.opacity = 0;
                    this.friend.opacity = 255;
                    this.friendSay.string = Dialogue[i];
                } else {
                    this.gugu.opacity = 0;
                    this.beijingjieshao.opacity = 0;
                    this.me.opacity = 255;
                    this.friend.opacity = 0;
                    this.mySay.string = Dialogue[i];
                }
            } else if (i == 4) {
                this.gugu.opacity = 0;
                this.me.opacity = 0;
                this.friend.opacity = 0;
                this.beijingjieshao.opacity = 255;
                this.jieshao.string = Dialogue[i];
            }
            else if (i>4 && i<12 && i!=10) {
                if (i % 2 == 0) {
                    this.gugu.opacity = 0;
                    this.beijingjieshao.opacity = 0;
                    this.me.opacity = 0;
                    this.friend.opacity = 255;
                    this.friendSay.string = Dialogue[i];
                } else {
                    this.gugu.opacity = 0;
                    this.beijingjieshao.opacity = 0;
                    this.me.opacity = 255;
                    this.friend.opacity = 0;
                    this.mySay.string = Dialogue[i];
                }
            } else if (i == 10) {
                this.gugu.opacity = 0;
                this.node.pauseSystemEvents(true);
                this.op1_1.interactable = true;
                this.op1_2.interactable = true;
                this.option1.active = true;
            }
            
            i++;
        },this);

        var op1_1 = this.op1_1
        var op1_2 = this.op1_2
        var that = this;

        this.op1_1.node.on("click", function () {
            op1_1.interactable = false;
            op1_2.interactable = false;
            that.option1.active = false;
            that.continueDialogue1(that, true);
        })

        this.op1_2.node.on("click", function () {
            op1_2.interactable = false;
            op1_1.interactable = false;
            that.option1.active = false;
            that.continueDialogue1(that, false);
        })
    },

    continueDialogue1: function (self, flag) {
        if (flag) {
            self.me.opacity = 0;
            self.friend.opacity = 255;
            self.friendSay.string = "好啦好啦，别卖弄啦。";
            //技巧数值增加
        } else {
            self.me.opacity = 0;
            self.friend.opacity = 255;
            self.friendSay.string = "真是的真是的！我嘴变臭了啦！";
            //阿慧好感度增加
        }
        self.node.resumeSystemEvents(true);
    }
});
