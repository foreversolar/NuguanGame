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
    },


    onLoad () {
        cc.director.preloadScene("Game");
        var figure = this.me.getChildByName("figure_nuli");
        globalUtil.setDialogueFigurePic(figure)
    },

    start() {
        this.playerName.string=cc.sys.localStorage.getItem('nickName')
        this.option.active = false
        var that=this
        this.Dialogue=[
            "啊，应当是那个吧，我没什么印象了。",
            "这真真的不是我喜欢菜，味道实在太冲了，不过安禄山大人当时尝过之后似乎极为喜欢呢。",
            "毕竟是腌制的事物，而且制作周期也不短，不过就算闻着臭吃着香，也不是你喜欢的类型。",
            "有些东西是闻着臭吃着香，也有些东西看着香吃着臭，那宁肯是前者的好。错过了好的总比遇上了坏的来得——来得安全些。",
            "",
        ]
        var touchpoint=4;
        
        this.i=0;
        this.node.on('touchend',function(){      
            if(this.i==this.Dialogue.length){
                cc.director.loadScene("Game");
            }          
            if (this.i == touchpoint) {
                this.option.active = true;
                this.option1.interactable=true;
                this.option2.interactable=true;
                this.node.pauseSystemEvents(true);
            }else{
                console.log(this.i)
                console.log(this.Dialogue.length)
                if(this.me.opacity==0 || this.friend.opacity==255){
                    this.me.opacity=255;
                    this.mySay.string=this.Dialogue[this.i];
                    this.friend.opacity=0;
                }else{
                    this.friend.opacity=255;
                    this.friendSay.string=this.Dialogue[this.i];
                    this.me.opacity=0;
                }
            }
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
        var AResp = "你可别乱说了，我可没这意思。";
        var BResp = "也是";
        this.friend.opacity=255;
        this.me.opacity=0;
        if (flag){
            this.friendSay.string == AResp;
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
            this.friendSay.string = BResp;
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
});
