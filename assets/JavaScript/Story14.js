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
        Liniang: cc.Node,
        playerName: cc.Label,
        option:cc.Node,
        op1:cc.Button,
        op2:cc.Button,
        op3:cc.Button,
        friendSay:cc.Label,
        mySay: cc.Label,
        liniangSay:cc.Label,
        text:cc.JsonAsset,
        i:1,
        choice:0,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        cc.director.preloadScene("Game");
    },

    start () {
        this.option.active = false;
        Dialogue = this.text.json.rounds14;
        var self = this;
        this.node.on('touchend',function(){      
            switch(self.i){
            case 1:
                self.me.opacity = 255;
                self.friend.opacity = 0;
                self.mySay.string = Dialogue[self.i];
                break;
            case 2:
                self.me.opacity = 0;
                self.friend.opacity = 255;
                self.friendSay.string = Dialogue[self.i];
                break;
            case 3:
                self.Liniang.opacity = 255;
                self.friend.opacity = 0;
                self.liniangSay.string = Dialogue[self.i];
                break;      
            case 4:
                self.me.opacity = 255;
                self.Liniang.opacity = 0;
                self.mySay.string = Dialogue[self.i];
                break;    
            case 5:
                self.Liniang.opacity = 255;
                self.me.opacity = 0;
                self.liniangSay.string = Dialogue[self.i];
                break;    
            case 6:
                self.me.opacity = 255;
                self.Liniang.opacity = 0;
                self.mySay.string = Dialogue[self.i];
                break;    
            case 7:
                self.Liniang.opacity = 255;
                self.me.opacity = 0;
                self.liniangSay.string = Dialogue[self.i];
                break;    
            case 8:
                self.me.opacity = 255;
                self.Liniang.opacity = 0;
                self.mySay.string = Dialogue[self.i];
                break;    
            case 9:
                self.Liniang.opacity = 255;
                self.me.opacity = 0;
                self.liniangSay.string = Dialogue[self.i];
                break;    
            case 10:
                self.Liniang.opacity=0;
                self.node.pauseSystemEvents(false);
                self.option.active = true;
                break;
            case 11:
                self.friend.opacity = 255;
                self.Liniang.opacity = 0;
                self.friendSay.string = Dialogue[self.i];
                break;    
            default:
                cc.director.loadScene("Game");
            }
            self.i++;
        }); 
        var self = this;
        this.op1.node.on("click", function () {
            self.option.active = false;
            self.choice = 1;
            self.continueDialogue(1);
        });

        this.op2.node.on("click", function () {
            self.option.active = false;
            self.choice = 2;
            self.continueDialogue(2);
        });

        this.op3.node.on("click", function () {
            self.option.active = false;
            self.choice = 2;
            self.continueDialogue(3);
        }) 
    },

    continueDialogue: function (flag) {
        this.Liniang.opacity = 255;
        if (flag == 1) {
            this.liniangSay.string = "唉，近来抄读经书也难以叫我心中安定。";
        } else if(flag == 2){
            this.liniangSay.string = "莫要胡乱揣测。";
        }else{
            this.liniangSay.string = "你倒是也读佛经，唉，宫中不少人后来也都...";
        }
        this.node.resumeSystemEvents(true);
    },
    // update (dt) {},
});
