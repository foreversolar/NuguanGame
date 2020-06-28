// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        beijing: cc.Node,
        label1: cc.Node,
        label2: cc.Node
    },

    onLoad() {
    },

    start() {

        var judge = Math.floor(Math.random() * 2); 

        if (judge == 0) {
            this.label1.opacity = 255;
            this.label2.opacity = 0;
            const DB = wx.cloud.database();
            DB.collection('UserData').where({
                _openid: cc.sys.localStorage.getItem('openid'),
            })
                .get({
                    success(res) {
                        DB.collection('UserData').doc(res.data[0]._id).update({
                            data: {
                                teshu1: 1,
                                money: res.data[0].money - 300,
                                charm: res.data[0].charm - 5
                            }
                        })
                    }
                });
        } else {
            this.label1.opacity = 0;
            this.label2.opacity = 255;
            const DB = wx.cloud.database();
            DB.collection('UserData').where({
                _openid: cc.sys.localStorage.getItem('openid'),
            })
                .get({
                    success(res) {
                        DB.collection('UserData').doc(res.data[0]._id).update({
                            data: {
                                teshu1: 1,
                                money: res.data[0].money - 200,
                                charm: res.data[0].charm +3
                            }
                        })
                    }
                });
        }


        this.node.on('touchend', function () {
            cc.director.loadScene("Next");
        });
    },
});
