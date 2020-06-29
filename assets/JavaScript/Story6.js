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
        fuzi: cc.Node,
        playerName: cc.Label,
        beijingjieshao: cc.Node,
        option1:cc.Node,
        option2:cc.Node,
        op1_1: cc.Button,
        op1_2: cc.Button,
        op2_1:cc.Button,
        op2_2:cc.Button,
        friendSay:cc.Label,
        mySay: cc.Label,
        fuziSay:cc.Label,
        jieshao: cc.Label,
        text:cc.JsonAsset,
    },


    onLoad () {
        cc.director.preloadScene("Game");

        var figure=this.me.getChildByName("figure");
        globalUtil.setDialogueFigurePic(figure)
    },

    start() {
        this.playerName.string = cc.sys.localStorage.getItem('nickName');
        this.option1.active = false;
        this.option2.active = false;
        var Dialogue1 = this.text.json.rounds6.dialogue1;
        this.friend.opacity = 0;
        this.fuzi.opacity = 0;
        this.me.opacity = 0;
        var i=0;
        this.node.on('touchend',function(){      
            if (i > 24) {
                cc.sys.localStorage.setItem('story', 6);
                cc.director.loadScene("Game");
            }
            if(i<8){
                if(i%2 == 0){
                    this.beijingjieshao.opacity = 0;
                    this.me.opacity = 0;
                    this.friend.opacity = 255;
                    this.friendSay.string = Dialogue1[i];
                }else{
                    this.me.opacity = 255;
                    this.friend.opacity = 0;
                    this.mySay.string = Dialogue1[i];
                }
            }
            else if(i == 8){
                this.me.opacity = 0;
                this.beijingjieshao.opacity = 255;
                this.jieshao.string =Dialogue1[i];
            }
            else if(i>8&&i<14){
                this.beijingjieshao.opacity = 0;
                if(i%2 != 0){
                    this.me.opacity = 0;
                    this.friend.opacity = 255;
                    this.friendSay.string = Dialogue1[i];
                }else{
                    this.me.opacity = 255;
                    this.friend.opacity = 0;
                    this.mySay.string = Dialogue1[i];
                }
            }
            else if(i<17){
                this.me.opacity = 0;
                if(i%2 == 0){
                    this.friend.opacity = 0;
                    this.fuzi.opacity = 255;
                    this.fuziSay.string = Dialogue1[i];
                }else{
                    this.friend.opacity = 255;
                    this.fuzi.opacity = 0;
                    this.friendSay.string = Dialogue1[i];
                }
            }
            else if(i == 17){
                this.node.pauseSystemEvents(true);
                this.option1.active = true;
                this.op1_1.interactable = true;
                this.op1_2.interactable = true;
            }
            else if(i == 18){
                this.friend.opacity = 0;
                this.me.opacity = 255;
                this.mySay.string = Dialogue1[i];
            }
            else if(i == 19){
                this.me.opacity = 0;
                this.beijingjieshao.opacity = 255;
                this.jieshao.string = Dialogue1[i];
            }
            else if(i == 20){
                this.beijingjieshao.opacity = 0;
                this.fuzi.opacity = 255;
                this.fuziSay.string = Dialogue1[i];
            }
            else if(i == 21){
                this.friend.opacity = 255;
                this.fuzi.opacity = 0;
                this.friendSay.string = Dialogue1[i];
            }
            else if(i == 22){
                this.me.opacity = 255;
                this.friend.opacity = 0;
                this.mySay.string =  Dialogue1[i];
            }
            else if(i == 23){
                this.node.pauseSystemEvents(true);
                this.option2.active = true;
                this.op2_1.interactable = true;
                this.op2_2.interactable = true;
            }
            else if(i == 24){
                this.friend.opacity = 0;
                this.option2.active = false;
                this.me.opacity = 255;
                this.mySay.string = "不管怎么样，你总算有个出宫的机会了。";
            }
            
            i++;
        },this);

        var op1_1 = this.op1_1
        var op1_2 = this.op1_2
        var that = this;

        var op2_1 = this.op2_1
        var op2_2 = this.op2_2

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

        this.op2_1.node.on("click", function () {
            cc.loader.loadRes("/picture/KnowledgeCard/KnowledgeCard", cc.SpriteAtlas, function (err, atlas) {
                if (err) {
                    console.log("Load button failed!");
                }
                var sprite = atlas.getSpriteFrame("btn_xuanzhongdaan");
                op2_1.node.getComponent(cc.Sprite).spriteFrame = sprite;
                var label = op2_1.node.getChildByName("tip");
                op2_1.node.x += 30;
                op2_1.node.y -= 20;
                label.x -= 45;
                label.y -= 10;
                that.option2.active = false;
                op2_2.interactable=false;
                op2_1.interactable = false; 
                that.continueDialogue2(that, false);
            });
        })

        this.op2_2.node.on("click",function(){
            cc.loader.loadRes("/picture/KnowledgeCard/KnowledgeCard", cc.SpriteAtlas, function (err, atlas) {
                if (err) {
                    console.log("Load button failed!");
                }
                var sprite = atlas.getSpriteFrame("btn_xuanzhongdaan");
                op2_2.node.getComponent(cc.Sprite).spriteFrame = sprite;
                var label = op2_1.node.getChildByName("tip");
                op2_2.node.x += 30;
                op2_2.node.y -= 20;
                label.x -= 45;
                label.y -= 10;
                that.option2.active = false;
                op2_2.interactable=false;
                op2_1.interactable=false; 
                that.continueDialogue2(that,true);
            });
        })
    },

    continueDialogue1: function (self, flag) {
        var Resp1 = "呃....这...那好吧"
        var Resp2 = "哎呀，这，算我们的不是了——"

        self.friend.opacity = 255;
        self.me.opacity = 0;
        self.fuzi.opacity = 0;
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
                                fo: res.data[0].fo + 1
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
                                ren: res.data[0].ren + 1
                            }
                        })
                    }
                });
        }
        self.node.resumeSystemEvents(true);
    },

    continueDialogue2: function (self, flag) {
        var Resp1 ="就这样？那也实在便宜这俩小子了。";
        var Resp2 ="啊，那就是你加了冰片末？这可太好了，我可就受不住那冰片窜脑袋的味道。";

        self.me.opacity = 0;
        self.fuzi.opacity = 0;
        self.friend.opacity = 255;
        if(flag){
            self.friendSay.string = Resp1;
            const DB = wx.cloud.database();
            DB.collection('UserData').where({
                _openid: cc.sys.localStorage.getItem('openid'),
            })
                .get({
                    success(res) {
                        DB.collection('UserData').doc(res.data[0]._id).update({
                            data: {
                                skill: res.data[0].skill + 1,
                            }
                        })
                    }
                });
        }else{
            self.friendSay.string = Resp2;
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
        }
        self.node.resumeSystemEvents(true);
    }
});
