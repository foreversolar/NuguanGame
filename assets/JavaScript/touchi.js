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
        option: cc.Node,
        beijing: cc.Node,
        label: cc.Label,
        over:0,
    },

    onLoad() {
        this.option.active = false;  
    },

    start () {
        var self = this;

        this.node.on('touchend', function () {
            if (self.over == 1) {
                cc.director.loadScene("Next");
            } else {
                self.option.active = true;
            }
        });     

        this.Ans1.node.on('click',function(){
            self.option.active = false;
            self.over = 1;
            self.continue(self,true)
        });
        this.Ans2.node.on('click',function(){
            self.option.active = false;
            self.over = 1;
            self.continue(self, false)
        });
    },

    continue: function (self, flag) {
        self.option.active = false;
        if (flag) {
            self.label.string = "这汤汁名不虚传，口感嫩滑，口味清香，煮烂在汤中的鸡丝多添了几分口感，甚是美味，有机会定要偷师学会！";
            const DB = wx.cloud.database();
            DB.collection('UserData').where({
                _openid: cc.sys.localStorage.getItem('openid'),
            })
                .get({
                    success(res) {
                        DB.collection('UserData').doc(res.data[0]._id).update({
                            data: {
                                teshu3: 1,
                                skill: res.data[0].skill + 1,
                                experience: res.data[0].experience + 2
                            }
                        })
                    }
                });
        } else {
            self.label.string = "呀！姑姑来了，这汤汁成色刚好，您看看还需要继续盯着熬制吗？（所幸没偷吃，不然可就要被罚了.....）";
            const DB = wx.cloud.database();
            DB.collection('UserData').where({
                _openid: cc.sys.localStorage.getItem('openid'),
            })
                .get({
                    success(res) {
                        DB.collection('UserData').doc(res.data[0]._id).update({
                            data: {
                                teshu3: 1,
                                experience: res.data[0].experience + 2
                            }
                        })
                    }
                });
        }
    }
});
