// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html
import globalUtil from "util";

cc.Class({
    extends: cc.Component,

    properties: {
        me:cc.Node,
        friend:cc.Node,
        playerName:cc.Label,
        option:cc.Node,
        option1:cc.Button,
        option2:cc.Button,
        friendSay:cc.Label,
        mySay:cc.Label,
        voice:cc.Node,
    },


    onLoad () {
        cc.director.preloadScene("Game");
        var figure = this.me.getChildByName("figure");
        globalUtil.setDialogueFigurePic(figure)
    },

    start() {
        this.playerName.string = cc.sys.localStorage.getItem('nickName')
        this.option.active = false
        var that=this
        this.Dialogue=[
            "谁能知道呢？往好处想，或者是有赏赐也未必。",
            "你可别要吓我啊，就算是有贵妃娘娘的赏赐，那也是把虢国夫人给得罪了。",
            "哎，倘若非得择一而靠，那也是没有办法的事情。",
            "你多加小心啊。",
            "",
            "你就是那个做出十遂羹的司膳？巧手匠心，果然不错。",
            "十遂羹，哼，确实如妹妹一般，需得装饰良多呀。",
            "姐姐暂且莫要嘲笑于我，你不是要出道题目考她一考么？",
            "胡风日盛，宫中饮食应当也或多或少受些影响吧，今日我想瞧瞧，你是否也能做出些豪迈的饮食。",
            "自当从命。既然是西域风味，羊肉必定是要用的了，那么我们就做...",
            "",
        ]

        var touchpoint=10;
        var tippoint=4
        var changepoint=9

        
        this.i=0;
        this.node.on('touchend',function(){      
            if(this.voice.opacity==255){
                this.voice.opacity=0;
            }

            if(this.i==this.Dialogue.length){
                cc.director.loadScene("Game");
            }          
            if (this.i == touchpoint) {
                this.option.active = true;
                this.option1.interactable=true;
                this.option2.interactable=true;
                this.node.pauseSystemEvents(true);
            }else if(this.i== tippoint){
                this.me.opacity=0;
                this.friend.opacity=0;
                this.voice.opacity=255;
                this.changeRole(this.friend,1);
                this.changeRole(this.me,2);
            }else if (this.i==changepoint){
                this.changeRole(this.me,3);
                this.me.opacity=255;
                this.mySay.string=this.Dialogue[this.i];
                this.friend.opacity=0;
            }else{
                if(this.friend.opacity==255){
                    this.me.opacity=255;
                    this.mySay.string=this.Dialogue[this.i];
                    this.friend.opacity=0;
                }else{
                    this.friend.opacity=255;
                    this.friendSay.string=this.Dialogue[this.i];
                    this.me.opacity=0;
                }
            }
            console.log(this.i)
            this.i++;
        },this);
        var op1=this.option1
        var op2=this.option2
        var that=this;

        this.option1.node.on("click",function(){
            op2.interactable=false;
            op1.interactable=false; 
            that.continueDialogue(that,true);
        })

        this.option2.node.on("click",function(){
            op2.interactable=false;
            op1.interactable=false; 
            that.continueDialogue(that,false);
        })

    },

    continueDialogue:function(self,flag){
        this.option.active = false;
        var AResp = "在巨胡饼当中每一层夹上羊肉，以胡椒作为佐料，再把酥油用以调香，放入炉中烤制。这就是古楼子了，嗯，并非是小户人家可以吃得到的，不过也足可以显出豪迈之风了。";
        var BResp = "羊肚切丝而制，堆叠成花，既精致又不乏西域之风味。";
        if (flag){
            this.mySay.string == AResp;
            const DB = wx.cloud.database();
            DB.collection('UserData').where({
                _openid: cc.sys.localStorage.getItem('openid'),
            })
                .get({
                    success(res) {
                        DB.collection('UserData').doc(res.data[0]._id).update({
                            data: {
                                fo: res.data[0].fo + 1
                            }
                        })
                    }
                });
        }else{
            this.mySay.string = BResp;
            const DB = wx.cloud.database();
            DB.collection('UserData').where({
                _openid: cc.sys.localStorage.getItem('openid'),
            })
                .get({
                    success(res) {
                        DB.collection('UserData').doc(res.data[0]._id).update({
                            data: {
                                ren: res.data[0].ren + 1
                            }
                        })
                    }
                });
        }
        self.node.resumeSystemEvents(true);
     },

     changeRole:function(container,role){
        var figure=container.getChildByName("figure")
        var name=container.getChildByName("name")
        if (role==1){
            this.setFigure(figure,"/picture/Dialogue/guifei");
            name.getComponent(cc.Label).string="杨贵妃"
        }else if(role==2){
            this.setFigure(figure,"/picture/Dialogue/furen");
            name.getComponent(cc.Label).string="虢国夫人"
        }else if (role==3){
            this.setFigure(figure,"/picture/Dialogue/figure_nuli");
            name.getComponent(cc.Label).string="玩家"
        }else if (role==3){
            this.setFigure(figure,"/picture/Dialogue/figure_nuli");
            name.getComponent(cc.Label).string="阿慧"
        }
     },

     setFigure: function(container,url){
        console.log(container)
        cc.loader.loadRes(url, function (err, texture) { 
            if(err){
                console.log("Load picture failed!");
            }
            var sprite  = new cc.SpriteFrame(texture);
            container.getComponent(cc.Sprite).spriteFrame = sprite;
        });
} ,

});
