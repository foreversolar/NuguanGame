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
        baseline:cc.Node, 
        status:0,  // 0: stop 1: move 2: fall 3. end
        moveHeight:100,
        moveDuration:0.3,
        maxMoveSpeed:250,
        accel:1,
        scores:0,
        test:0
    },

    onLoad () {
        this.gameControl=this.bg.getComponent("Work_QianCengSu");
        if(this.gameControl == null){
            this.gameControl=this.bg.getComponent("Test_QianCengSu");
        }
        if(this.gameControl.status>=3){
            this.destroy();
        }
        this.gameControl.status=1;
        this.jumpAction=this.move();
        this.node.runAction(this.jumpAction);
        this.fallAction=this.fall();
        
        this.speed=0;
        this.base=this.baseline.y;
        this.baseleft=this.baseline.x-this.baseline.width/2;
        this.baseright=this.baseline.x+this.baseline.width/2;
    },

    start () {
        //踩坑1：要添加button组件才能有click监听
        this.bg.on('click', function (event) {
            this.status=2;
        }, this);
    
    },

    move:function(){
        var jumpUp=cc.moveBy(this.moveDuration,cc.v2(0,this.moveHeight)).easing(cc.easeCubicActionInOut());
        var jumpDown=cc.moveBy(this.moveDuration,cc.v2(0,-this.moveHeight)).easing(cc.easeCubicActionInOut());
        return cc.repeatForever(cc.sequence(jumpUp,jumpDown));
    },

    fall:function(){
        var fallDown=cc.moveBy(this.moveDuration,cc.v2(0,-10)).easing(cc.easeCubicActionInOut());
        return cc.repeatForever(fallDown);
    },


    update:function (dt) {
        if(this.status==1){
            // move
            this.speed+=this.accel*dt;
            this.node.x+=this.speed*dt;
        }else if (this.status==2){
            this.node.stopAction(this.jumpAction)
            this.node.runAction(this.fallAction);
            // this.node.stopAction(this.fallAction);
        }

        if(this.node.x>1200 || this.status==3){
            this.node.stopAction(this.jumpAction)
            this.gameControl.updateStatus(3);
            this.destroy();
        }
        if(this.node.y<this.base || this.node.y<-500){
            this.baseline.y+=20;
            this.node.stopAllActions()
            var left=this.node.x-this.node.width/2;
            var right=this.node.x+this.node.width/2;
            if(left<this.baseleft ||right > this.baseright){
                //console.log("bad")
                this.gameControl.updateStatus(3);
            }else{
                //console.log("good")
                this.gameControl.addScore(1);
                //this.bg.getComponent("Work_QianCengSu").status=2;
                this.gameControl.updateStatus(2);
            }
            this.destroy();
        }
    },
    onDestroy(){
    }
});
