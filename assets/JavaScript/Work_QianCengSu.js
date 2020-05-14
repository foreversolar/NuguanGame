// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
        // bar: {
        //     get () {
        //         return this._bar;
        //     },
        //     set (value) {
        //         this._bar = value;
        //     }
        // },
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
        ui:cc.Node,
        text:cc.Label,
        startGame:cc.Button,
        end:cc.Button,
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
        var randY = Math.random()*600 -300;
        // // 根据屏幕宽度，随机得到一个 x 坐标
        // var maxX = this.node.width/2;
        // randX = (Math.random() - 0.5) * 2 * maxX;
        return cc.v2(randX, randY);
    },

    start () {
        var that=this
        this.startGame.node.on("click",function(){
            console.log(that.ui)
            that.ui.opacity=0;
            that.startGame.interactable=false;
            that.status=2;
        })
        this.end.node.on("click",function(){
            cc.director.loadScene("Game");
        })
    
    },

    update (dt) {

        if(this.status==2 && this.times<8){
            this.spawnNewBing();
            this.times=this.times+1;
        }
        if(this.times==8){
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
    
        if(this.scores>4){
            this.text.string="你在这次的后厨争霸中叠了"+this.scores+"层的千层酥，真是了不起呢！"
        }else{
            this.text.string="你在这次的后厨争霸中叠了"+this.scores+"层的千层酥，要多多加油哦！"
        }
        this.startGame.node.opacity=0;
        this.end.node.opacity=255;
        this.end.interactable=true;
        this.ui.opacity=255;
    }
});
