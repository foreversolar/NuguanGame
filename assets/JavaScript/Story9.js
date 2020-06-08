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
        friendSay:cc.Label,
        mySay: cc.Label,
        option:cc.Node,
        op1: cc.Button,
        op2: cc.Button,
        op3: cc.Button,
        text:cc.JsonAsset,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        cc.director.preloadScene("Game");
    },

    start () {
        this.option.active = false;
        var Dialogue = this.text.json.rounds9;
        var self = this; 
        var i = 0;
        this.node.on('touchend',function(){
            //console.log(i);
            i++;
            if(i>10){
                cc.director.loadScene("Game");
            }
            if(i<5){
                if(i % 2 == 0){
                    self.me.opacity = 255;
                    self.friend.opacity = 0;
                    self.mySay.string = Dialogue[i];
                }
                else{
                    self.friend.opacity = 255;
                    self.me.opacity = 0;
                    self.friendSay.string = Dialogue[i];
                }
            }
            else if(i == 5){
                //判断问题
                self.me.opacity = 0;
                self.friend.opacity = 0;
                self.friendSay.string = Dialogue[i];
                self.node.pauseSystemEvents(true);
                self.option.active = true;
                self.op1.interactable = true;
                self.op2.interactable = true;
                self.op3.interactable = true;
            }
            else if(i == 6){
                self.friend.opacity = 0;
                self.me.opacity = 255;
                self.mySay.string = Dialogue[i];  
            }
            else if(i == 7){
                self.friend.opacity = 255;
                self.mySay.string = Dialogue[i];
            }
            else if(i>7){
                if(i % 2 != 0){
                    self.me.opacity = 255;
                    self.friend.opacity = 0;
                    self.mySay.string = Dialogue[i];
                }
                else{
                    self.friend.opacity = 255;
                    self.me.opacity = 0;
                    self.friendSay.string = Dialogue[i];
                }
            }
            //i++;
        });
        var op1 = this.op1;
        var op2 = this.op2;
        var op3 = this.op3;
        op1.node.on("click", function () {
            op1.interactable = false;
            op2.interactable = false;
            op3.interactable = false;
            self.option.active = false;
            self.continueDialogue(self, 1);
        });

        op2.node.on("click", function () {
            op1.interactable = false;
            op2.interactable = false;
            op3.interactable = false;
            self.option.active = false;
            self.continueDialogue(self, 2);
        });

        op3.node.on("click", function () {
            op1.interactable = false;
            op2.interactable = false;
            op3.interactable = false;
            self.option.active = false;
            self.continueDialogue(self, 3);
        });
    },

    continueDialogue: function (self, flag) {
        self.friend.opacity = 255;
        if (flag == 1) {
            //
        } else if(flag == 2){
            //
        }
        else if(flag == 3){
            //
        }
        self.node.resumeSystemEvents(true);
    },
    // update (dt) {},
});
