// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        Score:cc.Label,
        score:0,
    },

    start () {
        this.node.on('touchmove',this.onTouchMove,this);
        cc.macro.ENABLE_MULTI_TOUCH = false;
        
        var manager = cc.director.getCollisionManager();
        manager.enabled = true;
        //开启debug绘制后会在页面内生成碰撞框
        //manager.enabledDebugDraw = true;
    },
    onTouchMove:function(t){   
        var delta=t.getDelta();
        this.node.x+=delta.x;
    },
    //other：对方的碰撞组件，self，自身的碰撞组件
    onCollisionEnter: function (other, self) {
        //console.log('on collision enter');
        switch(other.node.name){
        case "cherry1":
            this.score+=2;
            break;   
        case "cherry2":
            this.score++;
            break;   
        case "cherry3":
            if(this.score > 0){
                this.score--;
            }
            break;    
        }
        this.Score.string = this.score.toString();
        other.node.destroy();
    },
    // update (dt) {},
});
