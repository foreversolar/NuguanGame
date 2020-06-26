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
        playerName: cc.Label,
        mySay: cc.Label,
        ren: 0,
        fo: 0,
        text: cc.JsonAsset,
    },


    onLoad () {
        cc.director.preloadScene("zoumadeng");
    },

    start() {
        this.playerName.string = cc.sys.localStorage.getItem('nickName')
        this.me.opacity = 255;

        var Dialogue = this.text.json.rounds50;
        var dia;
        var i = 1;

        if (this.ren > this.fo) {
            this.mySay.string = Dialogue.dia1[0]
            dia = Dialogue.dia1
        } else {
            this.mySay.string = Dialogue.dia2[0]
            dia = Dialogue.dia2
        }

        this.node.on('touchend', function () {
            if (i > 3) {
                cc.director.loadScene("zoumadeng");
            } else {
                this.mySay.string = dia[i]
            }
            i++;
        }, this);

    },
});
