// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        bingPrefab:{
            default:null,
            type:cc.Prefab
        },
        maxHeight:300,
        minHeight:-300,
        baseline:cc.Node, 
        status:0, //0-ready 1-running 2-another one 3-end;
        times:0,
        scores:0,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {

    },

    spawnNewBing:function(){
        // console.log(this.status);
        var newBing=cc.instantiate(this.bingPrefab);
        newBing.getComponent("BingControl").bg=this.node;
        newBing.getComponent("BingControl").baseline=this.baseline;
        //注意先后问题。
        this.node.addChild(newBing);
        newBing.setPosition(this.getNewPosition());
    },


    getNewPosition: function () {
        var randX = -this.node.width/2;
        var height=500
        var low=this.minHeight
        var randY = Math.random()*(height-low)+low; //(-250,250)
        // // 根据屏幕宽度，随机得到一个 x 坐标
        // var maxX = this.node.width/2;
        // randX = (Math.random() - 0.5) * 2 * maxX;
        return cc.v2(randX, randY);
    },

    start () {
        this.status=2;
    },

    update (dt) {
        if(this.status==2 && this.times<20){
            this.spawnNewBing();
            this.times=this.times+1;
            this.minHeight+=30;
        }
        if(this.times==20){
            this.status=3;
            this.times=this.times+1;
        }
        if(this.status==3){
            this.endGame();
            this.status==4;
        }

    },
    addScore:function(score){
        this.scores=this.scores+score;
    },
    updateStatus:function(status){
        this.status=status;
        console.log("status is "+this.status);
    },

    endGame:function(){
        this.node.active = false;
        this.node.parent.getComponent("Test_rounds_15").Result();
    }
});
