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
    },

    start() {
        this.playerName.string = cc.sys.localStorage.getItem('nickName')
        this.option.active = false
        var that=this
        this.Dialogue=[
            "但今年，却不是丽娘来说那些话了，其实意思也没怎么变啦，只是....",
            "新春时节，莫要讲这些叫人神伤的话了。",
            "话虽如此，但是——唔！",
            "哈哈，今年也有东西塞你的嘴！",
            "胶...牙饧！太黏啦，我牙齿要分不开啦！",
            "",
        ]
        var touchpoint=5;
        
        this.i=0;
        this.node.on('touchend',function(){      
            if(this.i==this.Dialogue.length){
                cc.director.loadScene("Game");
            }          
            if (this.i == touchpoint) {
                this.me.opacity=0;
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
        if (flag) {
            const DB = wx.cloud.database();
            DB.collection('UserData').where({
                _openid: cc.sys.localStorage.getItem('openid'),
            })
                .get({
                    success(res) {
                        DB.collection('UserData').doc(res.data[0]._id).update({
                            data: {
                                ahui: res.data[0].ahui + 1,
                                ren: res.data[0].ren+ 1,
                            }
                        })
                    }
                });
        } else {
            const DB = wx.cloud.database();
            DB.collection('UserData').where({
                _openid: cc.sys.localStorage.getItem('openid'),
            })
                .get({
                    success(res) {
                        DB.collection('UserData').doc(res.data[0]._id).update({
                            data: {
                                fo: res.data[0].fo+ 1
                            }
                        })
                    }
                });
        }
        this.option.active = false;
        this.friend.opacity=0;
        this.me.opacity=255;
        this.me.mySay="你都在说些什么胡话啦，胶牙饧不就是胶牙饧而已嘛。";
        self.node.resumeSystemEvents(true);
     },
});
