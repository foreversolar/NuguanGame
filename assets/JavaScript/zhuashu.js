// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        beijing: cc.Node,
        label1: cc.Node
    },

    onLoad() {
    },

    start() {

        this.label1.opacity = 255;
        this.node.on('touchend', function () {
            cc.director.loadScene("Game");
        });
    },
});
