// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
        // bar: {
        //     get () {
        //         return this._bar;
        //     },
        //     set (value) {
        //         this._bar = value;
        //     }
        // },
        me:cc.Node,
        friend: cc.Node,
        gugu: cc.Node,
        dachu: cc.Node,
        playerName: cc.Label,
        beijingjieshao: cc.Node,
        option1: cc.Node,
        option2:cc.Node,
        diaop1: cc.Button,
        diaop2: cc.Button,
        op1:cc.Button,
        op2:cc.Button,
        op3:cc.Button,
        friendSay:cc.Label,
        mySay: cc.Label,
        jieshao: cc.Label,
        dachuSay: cc.Label,
    },


    onLoad () {
        cc.director.preloadScene("Game");
    },

    start() {
        this.playerName.string = cc.sys.localStorage.getItem('nickName');

        this.beijingjieshao.opacity = 0;
        this.me.opacity = 0;
        this.friend.opacity = 0;
        this.gugu.opacity = 255;
        this.dachu.opacity = 0;
        var that = this
        this.option1.active = false
        this.option2.active = false
        this.Dialogue=[
            "前几日我听说虢国夫人府上大厨邓连新制了一种甜品，特意求其教授于司膳司各位，至于能否掌握的了，就看各位的悟性了。",
            "一直听说虢国夫人甚是大方，今日得去若能够得几分赏赐，那可好了。",
            "可是--",
            "（虽然虢国夫人奢侈放荡之风闻名于外，不过阿慧只自幼生在宫中，这些是不晓得的。）",
            "玩家选择",
            "场景转换",
            "司膳司丽娘托我教授诸位这‘透花糍’之制法，先请诸位瞧这做好的“透花糍”，有没有肯猜猜这里头‘花’儿，是个什么料做的？",
            "难道不是花渍成的吗？",
            "自然不是。",
            "玩家选择",
            "这里头的‘花儿’，我管它叫做‘灵沙臛’，是拿红豆做成的。这透花糍的材料确实只不过红豆与糯米而已，只是动了些许手段，就能使得这二者看上去与本身几乎毫无关系了。",
            "场景转换",
            "真遗憾呀，没能见到传说中素颜面圣也完全不掩国色的虢国夫人。",
            "是吗？",
            "（这虢国夫人府如此金碧辉煌...却...）"
        ]
        
        var i=1;
        this.node.on('touchend',function(){      
            if(i>14){
                cc.director.loadScene("Game");
            }
            if (i == 0) {
                console.log(i);
                this.beijingjieshao.opacity = 0;
                this.gugu.opacity = 255;
            } else if (i == 1) {
                this.gugu.opacity = 0;
                this.friend.opacity = 255;
                this.friendSay.string = this.Dialogue[i];
            } else if (i == 2) {
                this.friend.opacity = 0;
                this.me.opacity = 255;
                this.mySay.string = this.Dialogue[i];
            } else if (i == 3) {
                this.mySay.string = this.Dialogue[i];
            } else if (i == 4) {
                this.node.pauseSystemEvents(true);
                this.option1.active = true;
                this.diaop1.interactable = true;
                this.diaop2.interactable = true;
            } else if (i == 5) {
                this.friend.opacity = 0;
                this.beijingjieshao.opacity = 255;
                this.jieshao.string ="说话间，我们跟随着府上管家来到了虢国夫人府内厨，见到了传闻中技艺精湛的大厨邓连。"
            } else if (i == 6) {
                this.beijingjieshao.opacity = 0;
                this.dachu.opacity = 255;
                this.dachuSay.string = this.Dialogue[i];
            } else if (i == 7) {
                this.dachu.opacity = 0;
                this.friend.opacity = 255;
                this.friendSay.string = this.Dialogue[i];
            } else if (i == 8) {
                this.friend.opacity = 0;
                this.dachu.opacity = 255;
                this.dachuSay.string = this.Dialogue[i];
            } else if (i == 9) {
                this.node.pauseSystemEvents(true);
                this.option2.active = true;
                this.op1.interactable = true;
                this.op2.interactable = true;
                this.op3.interactable = true;
                console.log(i);
            } else if (i == 10) {
                this.dachuSay.string = this.Dialogue[i];
            } else if (i == 11) {
                this.dachu.opacity = 0;
                this.beijingjieshao.opacity = 255;
                this.jieshao.string = "大厨果然名不虚传，这虢国夫人府中可真是卧虎藏龙。天色渐晚，管家送各位娘子出门回宫。"
            } else if (i == 12) {
                this.beijingjieshao.opacity = 0;
                this.friend.opacity = 255;
                this.friendSay.string = this.Dialogue[i];
            } else if (i == 13) {
                this.friend.opacity = 0;
                this.me.opacity = 255;
                this.mySay.string = this.Dialogue[i];
            } else if (i == 14) {
                this.mySay.string = this.Dialogue[i];
            }
            i++;
        },this);

        var diaop1 = this.diaop1
        var diaop2 = this.diaop2
        var that = this;

        var op1 = this.op1
        var op2 = this.op2
        var op3 = this.op3

        this.diaop1.node.on("click", function () {
            diaop2.interactable = false;
            diaop1.interactable = false;
            that.option1.active = false;
            that.continueDialogue1(that, true);
        })

        this.diaop2.node.on("click", function () {
            diaop2.interactable = false;
            diaop1.interactable = false;
            that.option1.active = false;
            that.continueDialogue1(that, false);
        })

        this.op1.node.on("click", function () {
            console.log("click");
            cc.loader.loadRes("/picture/KnowledgeCard/KnowledgeCard", cc.SpriteAtlas, function (err, atlas) {
                if (err) {
                    console.log("Load 张开的手 failed!");
                }
                var sprite = atlas.getSpriteFrame("btn_xuanzhongdaan");
                op1.node.getComponent(cc.Sprite).spriteFrame = sprite;
                var label = op1.node.getChildByName("tip");
                op1.node.x += 30;
                op1.node.y -= 20;
                label.x -= 45;
                label.y -= 10;
                that.option2.active = false;
                op2.interactable=false;
                op3.interactable=false;   
                op1.interactable = false; 
                that.continueDialogue2(that, false);
            });
        })

        this.op2.node.on("click",function(){
            cc.loader.loadRes("/picture/KnowledgeCard/KnowledgeCard", cc.SpriteAtlas, function (err, atlas) {
                if (err) {
                    console.log("Load 张开的手 failed!");
                }
                var sprite = atlas.getSpriteFrame("btn_xuanzhongdaan");
                op2.node.getComponent(cc.Sprite).spriteFrame = sprite;
                var label = op1.node.getChildByName("tip");
                op2.node.x += 30;
                op2.node.y -= 20;
                label.x -= 45;
                label.y -= 10;
                that.option2.active = false;
                op2.interactable=false;
                op3.interactable=false;   
                op1.interactable=false; 
                that.continueDialogue2(that,true);
            });
        })

        this.op3.node.on("click",function(){

            cc.loader.loadRes("/picture/KnowledgeCard/KnowledgeCard", cc.SpriteAtlas, function (err, atlas) {
                if (err) {
                    console.log("Load 张开的手 failed!");
                }
                var sprite = atlas.getSpriteFrame("btn_xuanzhongdaan");
                op3.node.getComponent(cc.Sprite).spriteFrame = sprite;
                var label = op3.node.getChildByName("tip");
                op3.node.x += 30;
                op3.node.y -= 20;
                label.x -= 45;
                label.y -= 10;
                that.option2.active = false;
                op2.interactable=false; 
                op3.interactable=false;   
                op1.interactable=false; 
                that.continueDialogue2(that,false);
            });
        })
    },

    continueDialogue1: function (self, flag) {
        var rightResp = "是这样吗！我们可得加把油呀。"
        var wrongResp = "你怎么敢说这样的话呀！我便算了，你和别人，在宫中可千万别这样放肆了。"

        self.gugu.opacity = 0;
        self.me.opacity = 0;
        self.dachu.opacity = 0;
        self.friend.opacity = 255;
        if (flag) {
            self.friendSay.string = rightResp
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
        } else {
            self.friendSay.string = wrongResp
            const DB = wx.cloud.database();
            DB.collection('UserData').where({
                _openid: cc.sys.localStorage.getItem('openid'),
            })
                .get({
                    success(res) {
                        DB.collection('UserData').doc(res.data[0]._id).update({
                            data: {
                                fo: res.data[0].fo+ 1
                            }
                        })
                    }
                });
        }
        self.node.resumeSystemEvents(true);
    },

    continueDialogue2: function (self, flag) {
        var rightResp ="不错，确实如此。"
        var wrongResp ="怎么会是这个呢？"
        self.gugu.opacity = 0;
        self.me.opacity = 0;
        self.friend.opacity = 0;
        self.dachu.opacity = 255;
        if(flag){
            self.dachuSay.string = rightResp
            const DB = wx.cloud.database();
            DB.collection('UserData').where({
                _openid: cc.sys.localStorage.getItem('openid'),
            })
                .get({
                    success(res) {
                        DB.collection('UserData').doc(res.data[0]._id).update({
                            data: {
                                skill: res.data[0].skill + 1
                            }
                        })
                    }
                });
        }else{
            self.dachuSay.string=wrongResp
        }
        self.node.resumeSystemEvents(true);
    }
});
