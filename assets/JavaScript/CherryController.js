// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
    },

    start () {
        var speed = Math.floor(Math.random()*2)+1.5;
        cc.tween(this.node).by(speed,{position:cc.v2(0,-800)}).start();
    },

    // update (dt) {},
});
