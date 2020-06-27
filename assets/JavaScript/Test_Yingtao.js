// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        Cherry1:cc.Prefab,
        Cherry2:cc.Prefab,
        Cherry3:cc.Prefab,
        basket:cc.Node,
        Score:cc.Node,
        create:0,
        number:0,
        get:0,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.cherrypool1 = new cc.NodePool();
        this.cherrypool2 = new cc.NodePool();
        this.cherrypool3 = new cc.NodePool();
        let initCount = 5;
        for(let i =0;i<initCount;i++){
            let newCherry1=cc.instantiate(this.Cherry1);
            let newCherry2=cc.instantiate(this.Cherry2);
            let newCherry3=cc.instantiate(this.Cherry3);
            this.cherrypool1.put(newCherry1);
            this.cherrypool2.put(newCherry2);
            this.cherrypool3.put(newCherry3);
        }
    },

    start(){
        var self = this;
        var interval = 1;
        var repeat = this.number;
        var delay = 0.85;
        var type = 0;
        this.schedule(function(){
            type = Math.floor(Math.random()*3);//0-3
            self.addCherry(type);
            self.create++;
            if(self.create == repeat){
                self.endGame();
            }
        },interval,repeat,delay);
    },

    addCherry:function(type){
        let cherry;
        let newcherry;
        let pool;
        switch(type){
        case 0:
            cherry = this.Cherry1;
            pool = this.cherrypool1;
            break;
        case 1:
            cherry = this.Cherry2;
            pool = this.cherrypool2;
            break;
        case 2:
            cherry = this.Cherry3;
            pool = this.cherrypool3;
            break;
        }
        if(pool.size() > 0){
            newcherry = pool.get();
        }
        else{
            newcherry = cc.instantiate(cherry)
        }
        //var newCherry=cc.instantiate(cherry);
        this.node.addChild(newcherry);
        newcherry.setPosition(this.getNewPosition());
    },

    getNewPosition:function(){
        var randX = Math.random()*(this.node.width-200)-(this.node.width/2-100);
        var Y = this.node.height/2;
        return cc.Vec2(randX,Y);
    },

    endGame:function(){
        this.node.active = false;
        this.node.parent.getComponent("Test_rounds_5").Result();
    },

    update (dt) {
        if(this.get == this.number+1){
            this.endGame();
        }
    },
});
