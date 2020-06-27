// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        text:cc.Label,
        ui:cc.Node,
        startbutton:cc.Button,
        cancel:cc.Button,
        ground:-400,
        basket:cc.Node,
        basket_speed:0,
        yingtao:cc.Prefab,
        score:cc.Node,
        status:0,       //0-ready 1-running 2-end;
        times:0,        //生成数量
        maxtimes:40,    //最多生成数
        scores:0,       //分数
        max_count:0,
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        //添加按钮事件
        var self=this;
        this.startbutton.node.on("click",function(){
            self.ui.opacity=0;
            self.basket.opacity = 255;
            self.score.opacity = 255;
            self.startbutton.interactable=false;
            self.cancel.interactable=false;
            //开启碰撞检测
            cc.director.getCollisionManager().enabled = true;
        });
        this.cancel.node.on('click',function(){
            cc.director.loadScene("Game");
        });
    },

    //时刻判断状态
    //update (dt) {},

    /*
     * 当碰撞产生的时候调用
     * @param  {Collider} other 产生碰撞的另一个碰撞组件
     * @param  {Collider} self  产生碰撞的自身的碰撞组件
    */
    onCollisionEnter: function (other, self) {
        this.max_count--;
        this.score++;
        /*console.log('on collision enter');

        //碰撞系统会计算出碰撞组件在世界坐标系下的相关的值，并放到 world 这个属性里面
        var world = self.world;

        // 碰撞组件的 aabb 碰撞框
        var aabb = world.aabb;

        // 节点碰撞前上一帧 aabb 碰撞框的位置
        var preAabb = world.preAabb;

        // 碰撞框的世界矩阵
        var t = world.transform;

        // 以下属性为 矩形 和 多边形 碰撞组件特有属性
        var ps = world.points;*/
    },

    Go:function(){
        var self = this;
        this.schedule(function(){
            if(self.max_count<3){
                self.addYingTao();
                self.times=self.times+1;
                self.max_count++;
            }
        },0.5,max_count,0);
        if(this.status==2){
            this.endGame();
        }
    },
    addYingTao:function(){
        var YingTao=cc.instantiate(this.yingtao);
        YingTao.getComponent("YingTaoController").bg=this.node;
        YingTao.getComponent("YingTaoController").baseline=this.baseline;
        this.node.addChild(YingTao);
        YingTao.setPosition(this.getNewPosition());
    },

    getNewPosition: function () {
        var randX = Math.random()*1600-800;
        //根据屏幕宽度，随机得到一个 x 坐标
        return cc.v2(randX, 460);
    },
    
    addScore:function(score){
        this.scores=this.scores + score;
    },

    endGame:function(){
        if(this.times>20){
            this.text.string="你接到了"+this.times+"个樱桃，真是了不起呢！"
        }else{
            this.text.string="你接到了"+this.times+"个樱桃，要多多加油哦！"
        }
        this.startbutton.node.opacity=0;
        this.cancel.node.opacity=0;
        this.ui.opacity=255;
        this.ui.on('touchend',function(){
            cc.director.loadScene("Game");  
        });
        this.node.color=new cc.Color(121, 121, 121);
    }
});
