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
        Ans3: cc.Button,
        option: cc.Node,
        beijing: cc.Node
    },

    onLoad() {
        this.option.active = false;  
    },

    start () {
        var self = this;

        this.node.on('touchend', function () {
            self.option.active = true;
        });     

        this.Ans1.node.on('click',function(){
            self.option.active = false;
            cc.director.loadScene("Game");
            self.ChangeAttribute(1);
        });
        this.Ans2.node.on('click',function(){
            self.option.active = false;
            cc.director.loadScene("Game");
            self.ChangeAttribute(2);
        });
        this.Ans3.node.on('click',function(){
            self.option.active = false;
            cc.director.loadScene("Game");
            self.ChangeAttribute(3);
        });
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
