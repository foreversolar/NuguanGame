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
        back: cc.Node,
        me:cc.Node,
        playerName: cc.Label,
        mySay: cc.Label,
        ren: 0,
        fo: 0,
        text: cc.JsonAsset,
    },


    onLoad () {
        cc.director.preloadScene("zoumadeng");
        var figure = this.me.getChildByName("figure_nuli");
        globalUtil.setDialogueFigurePic(figure)

    },

    start() {
        this.playerName.string = cc.sys.localStorage.getItem('nickName')
        this.me.opacity = 255;

        var Dialogue = this.text.json.rounds50;

        var i = 1;

        var self = this;
        const DB = wx.cloud.database();
        DB.collection('UserData').where({
            _openid: cc.sys.localStorage.getItem('openid'),
        })
            .get({
                success(res) {
                    self.ren = res.data[0].ren;
                    self.fo = res.data[0].fo;

                    if (self.ren > self.fo) {
                        cc.loader.loadRes("picture/Background/bg_shinei", function (err, texture) {
                            if (err) {
                                console.log("Load picture failed!");
                            }
                            var sprite = new cc.SpriteFrame(texture);
                            self.back.getComponent(cc.Sprite).spriteFrame = sprite;

                            self.mySay.string = Dialogue.dia2[0]
                            self.node.on('touchend', function () {
                                if (i > 3) {
                                    cc.sys.localStorage.setItem('story', 50);
                                    cc.director.loadScene("zoumadeng");
                                } else {
                                    self.mySay.string = Dialogue.dia2[i]
                                }
                                i++;
                            }, self);
                        });
                    } else {
                        cc.loader.loadRes("picture/Background/bg_temple", function (err, texture) {
                            if (err) {
                                console.log("Load picture failed!");
                            }
                            var sprite = new cc.SpriteFrame(texture);
                            self.back.getComponent(cc.Sprite).spriteFrame = sprite;

                            self.mySay.string = Dialogue.dia1[0]
                            self.node.on('touchend', function () {
                                if (i > 3) {
                                    cc.sys.localStorage.setItem('story', 50);
                                    cc.director.loadScene("zoumadeng");
                                } else {
                                    self.mySay.string = Dialogue.dia1[i]
                                }
                                i++;
                            }, self);
                        });
                    }
                }
            });

    },
});
