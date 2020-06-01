// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        beizi: cc.Node,
        tishi: cc.Node,
        dati: cc.Node
    },

    // LIFE-CYCLE CALLBACKS:

    //onLoad () {},

    start() {
        this.dati.active = false;
        this.tishi.active = false;
        var anim = this.beizi.getComponent(cc.Animation);
        anim.play();
    },
});