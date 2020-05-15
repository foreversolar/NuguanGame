// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        Ans1:cc.Button,
        Ans2:cc.Button,
        Ans3:cc.Button,
        over:0,
    },

    onLoad(){
        var self = this;
        this.node.on('touchend',function(){
            if(self.over == 1){
                cc.director.loadScene("Game");
            }
        });     
    },

    start () {
        var self = this;
        this.Ans1.node.on('click',function(){
            self.closeAll();
            self.ChangeAttribute(1);
            self.over = 1;
        });
        this.Ans2.node.on('click',function(){
            self.closeAll();
            self.ChangeAttribute(2);
            self.over = 1;
        });
        this.Ans3.node.on('click',function(){
            self.closeAll();
            self.ChangeAttribute(3);
            self.over = 1;
        });
    },

    closeAll:function(){
        this.Ans1.interactable = false;
        this.Ans2.interactable = false;
        this.Ans3.interactable = false;
    },

    ChangeAttribute:function(choice){
        const DB = wx.cloud.database();
        DB.collection('UserData').where({
            _openid: cc.sys.localStorage.getItem('openid'),
        })
        .get({
            success(res) {
                switch(choice){
                case 1:
                    //shujugaibian1
                case 2:
                    //shujugaibian2
                case 3:
                    //shujugaibian3
                }
            }
        });
    }
    // update (dt) {},
});
