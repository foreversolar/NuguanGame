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
        next:cc.Button,
        rounds:2,
        firstP:cc.Node,
        secondP:cc.Node,
        thirdP:cc.Node,
    },

    // 渲染下一回合的页面效果
    // 目前渲染还有一点延迟：估计主要来自于数据库的查询问题，待优化。


    onLoad () {

    },

    start () {
        this.getRounds();
        this.next.node.on("click",function(){
          cc.director.loadScene("Game");   
        })

    },

    getRounds:function(){
        var that=this;
        // const DB = wx.cloud.database();
        // DB.collection('UserData').where({
        //     _openid: cc.sys.localStorage.getItem('openid'),
        // })
        // .get({
        //     success(res) {
        //         that.rounds=res.data[0].rounds+1;
        //         console.log(that.rounds);
        //         that.getNums();
        //         DB.collection('UserData').doc(res.data[0]._id).update({
        //             data:{
        //                 rounds:that.rounds,
        //             }
        //         })
        //     }
        // });
        that.rounds=cc.sys.localStorage.getItem('rounds')+1;
        cc.sys.localStorage.setItem('rounds', that.rounds);
        const DB = wx.cloud.database();
        DB.collection('UserData').where({
            _openid: cc.sys.localStorage.getItem('openid'),
        })
        .get({
            success(res) {
                DB.collection('UserData').doc(res.data[0]._id).update({
                    data:{
                        rounds:that.rounds,
                    }
                })
            }
        });
        that.getNums();
    },

    getNums:function(){
        var self=this;
        var first=self.rounds/10;
        var second=0;
        var third=0;
        if(first>1 && self.rounds%10!=0){
            third=self.rounds%10;
            first=(self.rounds-third)/10;   
            second=10; 
        }else if(self.rounds%10==0){
            self.firstP.opacity=0;
            second=self.rounds/10;
            self.secondP.x=self.firstP.x;
            third=10;
        }
         else{
            self.firstP.opacity=0;
            second=self.rounds;
            self.thirdP.opacity=0;
        }
        self.showNum(first,self.firstP);
        self.showNum(second,self.secondP);
        self.showNum(third,self.thirdP);
    },

    showNum:function(num,node){
        var url=num+"";
        cc.loader.loadRes("/picture/MainPage/MainPage", cc.SpriteAtlas, function (err, atlas) {
            if (err) {
                console.log("Load mainpage atlas failed!");
            }
            var sprite = atlas.getSpriteFrame(url);
            node.getComponent(cc.Sprite).spriteFrame = sprite;
        });

        //测试使用
        // console.log(url)
        // cc.loader.loadRes(url,cc.SpriteFrame,function (err, spriteFrame) {
        //     if (err) {
        //         console.log("Load number failed!");
        //     }
        //     node.getComponent(cc.Sprite).spriteFrame = spriteFrame;
        // });
    },

    // update (dt) {},
});
