// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        bg:cc.Node,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        var manager = cc.director.getCollisionManager();
        manager.enabled = true;
        //开启debug绘制后会在页面内生成碰撞框
        //manager.enabledDebugDraw = true;
    },

    start () {

    },
    onCollisionEnter: function (other, self) {
        if(this.bg.getComponent("Gongwu_Yingtao") == null){
            this.bg.getComponent("Test_Yingtao").get++;
        }
        else{
            this.bg.getComponent("Gongwu_Yingtao").get++;              
        }
        other.node.destroy();
    },

    // update (dt) {},
});
