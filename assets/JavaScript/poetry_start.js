// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        back:cc.Button,
    },

    // LIFE-CYCLE CALLBACKS:

    //onLoad () {},

    start() {
        var questioncard = this.node.getChildByName("QuestionPage").getChildByName("Panel");
        questioncard.active = false;
        var beizi = this.node.getChildByName("background").getChildByName("beizi");
        var anim = beizi.getComponent(cc.Animation);
        anim.play();
    },
});