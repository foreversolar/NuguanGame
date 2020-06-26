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
        fuzi:cc.Node,
        playerName: cc.Label,
        friendSay:cc.Label,
        mySay: cc.Label,
        guguSay: cc.Label,
        fuziSay:cc.Label,
        text: cc.JsonAsset,
        liniang_haogandu: 0
    },


    onLoad () {
        cc.director.preloadScene("Game");
    },

    start() {
        const DB = wx.cloud.database();
        DB.collection('UserData').where({
            _openid: cc.sys.localStorage.getItem('openid'),
        })
            .get({
                success(res) {
                    self.liniang_haogandu = res.data[0].liniang;
                }
            });
        this.playerName.string = cc.sys.localStorage.getItem('nickName')
        this.gugu.opacity = 0;
        this.me.opacity = 0;
        this.friend.opacity = 0;
        this.fuzi.opacity = 0;

        var Dialogue;
        var i = 1;
        if (this.liniang_haogandu == 0) {
            Dialogue = this.text.json.rounds16.dialogue1;
            this.fuzi.opacity = 255;
            this.fuziSay.string = Dialogue[0];
            this.node.on('touchend', function () {
                if (i > 4) {
                    cc.director.loadScene("Game");
                } else if (i == 1) {
                    this.fuzi.opacity = 0;
                    this.me.opacity = 255;
                    this.mySay.string = Dialogue[i]
                } else if (i == 2) {
                    this.fuzi.opacity = 255;
                    this.me.opacity = 0;
                    this.fuziSay.string = Dialogue[i]
                } else if (i == 3) {
                    this.fuzi.opacity = 0;
                    this.friend.opacity = 255;
                    this.friendSay.string = Dialogue[i]
                } else if (i == 4) {
                    this.friend.opacity = 0;
                    this.me.opacity = 255;
                    this.mySay.string = Dialogue[i]
                }

                i++;
            }, this)
        } else if (this.liniang_haogandu == 1 || this.liniang_haogandu == 2) {
            Dialogue = this.text.json.rounds16.dialogue2;
            this.friend.opacity = 255;
            this.friendSay.string = Dialogue[0];
            this.node.on('touchend', function () {
                if (i > 6) {
                    cc.director.loadScene("Game");
                } else if (i % 2 == 1) {
                    this.friend.opacity = 0;
                    this.me.opacity = 255;
                    this.mySay.string = Dialogue[i]
                } else if (i % 2 == 0) {
                    this.friend.opacity = 255;
                    this.me.opacity = 0;
                    this.friendSay.string = Dialogue[i]
                }

                i++;
            }, this)
        } else {
            Dialogue = this.text.json.rounds16.dialogue3;
            this.gugu.opacity = 255;
            this.guguSay.string = Dialogue[0];
            this.node.on('touchend', function () {
                if (i > 6) {
                    cc.director.loadScene("Game");
                } else if (i < 5) {
                    if (i % 2 == 1) {
                        this.gugu.opacity = 0;
                        this.me.opacity = 255;
                        this.mySay.string = Dialogue[i]
                    } else if (i % 2 == 0) {
                        this.gugu.opacity = 255;
                        this.me.opacity = 0;
                        this.guguSay.string = Dialogue[i]
                    }
                } else if (i == 5) {
                    this.gugu.opacity = 0;
                    this.friend.opacity = 255
                    this.friendSay.string = Dialogue[i]
                } else if (i == 6) {
                    this.gugu.opacity = 255;
                    this.friend.opacity = 0;
                    this.guguSay.string = Dialogue[i]
                } else if (i == 7) {
                    this.gugu.opacity = 0;
                    this.me.opacity = 255;
                    this.mySay.string = Dialogue[i]
                } else if (i == 8) {
                    this.me.opacity = 0;
                    this.friend.opacity = 255;
                    this.friendSay.string = Dialogue[i]
                }

                i++;
            }, this)
        }
    }
});
