// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        bg1: cc.Node,
        bg2: cc.Node,
        bg3: cc.Node,
        bg3label: cc.Label,
        bg4: cc.Node,
        bg4label: cc.Label,
        bg5: cc.Node,
        bg6: cc.Node,
        bg6label: cc.Label,
        bg7: cc.Node,
        bg8: cc.Node,
        bg9: cc.Node,
        bg9label: cc.Label,
        bg10: cc.Node,
        bg11: cc.Node,
        bg11label: cc.Label,
        liniang: 0,
        ren: 0,
        fo: 0,
        level: 1,
        restartPanel:cc.Node,
        Yes:cc.Button,
    },

    onLoad() {
        this.Yes.on('click',function(){
            cc.director.loadScene("Start");
        });
        this.level = cc.sys.localStorage.getItem("level")
        this.bg1.active = true;
        this.bg2.active = false;
        this.bg3.active = false;
        this.bg4.active = false;
        this.bg5.active = false;
        this.bg6.active = false;
        this.bg7.active = false;
        this.bg8.active = false;
        this.bg9.active = false;
        this.bg10.active = false;
        this.bg11.active = false;

        if (this.level == 1) {
            this.bg3label.string = "头次晋升的机会，君不幸晋升失败";
            this.bg6label.string = "天宝十三载，君不幸晋升失败";
            this.bg9label.string = "天宝十四载，君不幸晋升失败";
        } else if (this.level == 2){
            this.bg3label.string = "头次晋升的机会，君从女吏升上掌膳";
            this.bg6label.string = "天宝十三载，君不幸晋升失败";
            this.bg9label.string = "天宝十四载，君不幸晋升失败";
        } else if (this.level == 3) {
            this.bg3label.string = "头次晋升的机会，君从女吏升上掌膳";
            this.bg6label.string = "天宝十三载，君不幸晋升失败";
            this.bg9label.string = "天宝十四载，君不幸晋升失败";
        } else if (this.level == 4) {
            this.bg3label.string = "头次晋升的机会，君从女吏升上掌膳";
            this.bg6label.string = "天宝十三载，君从典膳升上司膳";
            this.bg9label.string = "天宝十四载，君不幸晋升失败";
        } else if (this.level == 5) {
            this.bg3label.string = "头次晋升的机会，君从女吏升上掌膳";
            this.bg6label.string = "天宝十三载，君从典膳升上司膳";
            this.bg9label.string = "天宝十四载，君从司膳升上尚食";
        }

        var self = this;
        const DB = wx.cloud.database();
        DB.collection('UserData').where({
            _openid: cc.sys.localStorage.getItem('openid'),
        })
            .get({
                success(res) {
                    self.ren = res.data[0].ren;
                    self.fo = res.data[0].fo;
                    self.liniang = res.data[0].liniang;

                    if (self.liniang == 0) {
                        cc.loader.loadRes("picture/zoumadeng/bg_yuanzi", function (err, texture) {
                            if (err) {
                                console.log("Load picture failed!");
                            }
                            var sprite = new cc.SpriteFrame(texture);
                            self.bg4.getComponent(cc.Sprite).spriteFrame = sprite;
                        });
                        if (self.level < 3)
                            self.bg4label.string = "天宝十一载，君不幸晋升失败。不久，丽娘离宫，君不知其去处。同年，李相去世，而圣人却依旧以声色自娱。";
                        else
                            self.bg4label.string = "天宝十一载，君从掌膳升上典膳。不久，丽娘离宫，君不知其去处。同年，李相去世，而圣人却依旧以声色自娱。";
                    } else if (self.liniang == 1 || self.liniang == 2) {
                        cc.loader.loadRes("picture/zoumadeng/bg_yuanzi", function (err, texture) {
                            if (err) {
                                console.log("Load picture failed!");
                            }
                            var sprite = new cc.SpriteFrame(texture);
                            self.bg4.getComponent(cc.Sprite).spriteFrame = sprite;
                        });
                        if (self.level < 3)
                            self.bg4label.string = "天宝十一载，君不幸晋升失败。不久，丽娘离宫，她似乎回乡。同年，李相去世，而圣人却依旧以声色自娱。";
                        else
                            self.bg4label.string = "天宝十一载，君从掌膳升上典膳。不久，丽娘离宫，她似乎回乡。同年，李相去世，而圣人却依旧以声色自娱。";
                    } else {
                        cc.loader.loadRes("picture/zoumadeng/bg_temple", function (err, texture) {
                            if (err) {
                                console.log("Load picture failed!");
                            }
                            var sprite = new cc.SpriteFrame(texture);
                            self.bg4.getComponent(cc.Sprite).spriteFrame = sprite;
                        });
                        if (self.level < 3)
                            self.bg4label.string = "天宝十一载，君不幸晋升失败。不久，丽娘离宫，前往感业寺修行。同年，李相去世，而圣人却依旧以声色自娱。";
                        else
                            self.bg4label.string = "天宝十一载，君从掌膳升上典膳。不久，丽娘离宫，前往感业寺修行。同年，李相去世，而圣人却依旧以声色自娱。";
                    }

                    if (self.ren > self.fo) {
                        cc.loader.loadRes("picture/Background/bg_shinei", function (err, texture) {
                            if (err) {
                                console.log("Load picture failed!");
                            }
                            var sprite = new cc.SpriteFrame(texture);
                            self.bg11.getComponent(cc.Sprite).spriteFrame = sprite;
                            if (self.level == 1) {
                                self.bg11label.string = "上阳宫中白发人，闲坐聊以度余生。过往宫中美食犹在目前，与人相谈似乎也足做谈资。曾经虽为女吏，却也曾博得贵妃赏识，史书上或可留一句写名的话。";
                            } else if (self.level == 2) {
                                self.bg11label.string = "上阳宫中白发人，闲坐聊以度余生。过往宫中美食犹在目前，与人相谈似乎也足做谈资。曾经虽为掌膳，却也曾博得贵妃赏识，史书上或可留一句写名的话。";
                            } else if (self.level == 3) {
                                self.bg11label.string = "上阳宫中白发人，闲坐聊以度余生。过往宫中美食犹在目前，与人相谈似乎也足做谈资。曾经也管至典膳，却也曾博得贵妃赏识，史书上或可留一句写名的话。";
                            } else if (self.level == 4) {
                                self.bg11label.string = "上阳宫中白发人，闲坐聊以度余生。过往宫中美食犹在目前，与人相谈似乎也足做谈资。曾经官至司膳，却也曾博得贵妃赏识，史书上或可留一句写名的话。";
                            } else if (self.level == 5) {
                                self.bg11label.string = "上阳宫中白发人，闲坐聊以度余生。过往宫中美食犹在目前，与人相谈似乎也足做谈资。曾经官至尚食，却也曾博得贵妃赏识，史书上或可留一句写名的话。";
                            }
                        });
                    } else {
                        cc.loader.loadRes("picture/zoumadeng/bg-shufang", function (err, texture) {
                            if (err) {
                                console.log("Load picture failed!");
                            }
                            var sprite = new cc.SpriteFrame(texture);
                            self.bg11.getComponent(cc.Sprite).spriteFrame = sprite;
                            if (self.level == 1) {
                                self.bg11label.string = "佛门青灯长清冷，唯有心静知其真。素饭素餐终日，佛门苦修长年，过往繁华早已不再，曾虽为女吏，却博得贵妃赏识，此皆又有何益？";
                            } else if (self.level == 2) {
                                self.bg11label.string = "佛门青灯长清冷，唯有心静知其真。素饭素餐终日，佛门苦修长年，过往繁华早已不再，曾虽为掌膳，却博得贵妃赏识，此皆又有何益？";
                            } else if (self.level == 3) {
                                self.bg11label.string = "佛门青灯长清冷，唯有心静知其真。素饭素餐终日，佛门苦修长年，过往繁华早已不再，即令官至典膳，又有何益？";
                            } else if (self.level == 4) {
                                self.bg11label.string = "佛门青灯长清冷，唯有心静知其真。素饭素餐终日，佛门苦修长年，过往繁华早已不再，即令官至司膳，又有何益？";
                            } else if (self.level == 5) {
                                self.bg11label.string = "佛门青灯长清冷，唯有心静知其真。素饭素餐终日，佛门苦修长年，过往繁华早已不再，即令官至尚食，又有何益？";
                            }
                        });
                    }
                }
            });

        
    },

    start () {
        var self = this;
        var i = 1;
        this.node.on('touchend', function () {
            if (i>10) {
                cc.director.loadScene("Game");
            } else if(i==1){
                self.bg1.active = false;
                self.bg2.active = true;
            } else if (i == 2) {
                self.bg2.active = false;
                self.bg3.active = true;
            } else if (i == 3) {
                self.bg3.active = false;
                self.bg4.active = true;
            } else if (i == 4) {
                self.bg4.active = false;
                self.bg5.active = true;
            } else if (i == 5) {
                self.bg5.active = false;
                self.bg6.active = true;
            } else if (i == 6) {
                self.bg6.active = false;
                self.bg7.active = true;
            } else if (i == 7) {
                self.bg7.active = false;
                self.bg8.active = true;
            } else if (i == 8) {
                self.bg8.active = false;
                self.bg9.active = true;
            } else if (i == 9) {
                self.bg9.active = false;
                self.bg10.active = true;
            } else if (i == 10) {
                self.bg10.active = false;
                self.bg11.active = true;
            }else if (i == 11) {
                //清空数据
                self.restartPanel.opacity = 255;
                self.Yes.interactable = true;
                self.restart();
            }
            i++;
        });
    },

    restart:function(){
        const DB = wx.cloud.database();
        DB.collection('UserData').where({
            _openid: cc.sys.localStorage.getItem('openid'),
        })
            .get({
                success(res) {
                        DB.collection('UserData').update({
                            data: {
                                level: 1,
                                health: 80,
                                experience: 0,
                                skill: 0,
                                knowledge: 0,
                                charm: 0,
                                money: 0,
                                rounds: 1,
                                work_times: 0,
                                study_times: 0,
                                playing_times: 0,
                                storyP: 0,
                                teshu1: 0,
                                teshu2: 0,
                                teshu3: 0,
                                teshu4: 0,
                                nickName: cc.sys.localStorage.getItem('nickName'),
                                ren: 0,
                                fo: 0,
                                ahui: 0,
                                liniang: 0,
                                finish_Question:0,
                            },
                            success(res) {
                                cc.sys.localStorage.setItem('story', 0);
                            }
                        });
                        DB.collection('TestResult').add({
                            data: {
                                round5:-1,
                                round15:-1,
                                round30:-1,
                             round45:-1,
                            },                                    
                        });    
                }
            });
    }
});
