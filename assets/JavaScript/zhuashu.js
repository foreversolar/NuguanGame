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
        label1: cc.Node
    },

    onLoad() {
    },

    start() {

        this.label1.opacity = 255;

        const DB = wx.cloud.database();
        DB.collection('UserData').where({
            _openid: cc.sys.localStorage.getItem('openid'),
        })
            .get({
                success(res) {
                    DB.collection('UserData').doc(res.data[0]._id).update({
                        data: {
                            teshu4: 1,
                            health: res.data[0].health - 5,
                            experience: res.data[0].experience + 2
                        }
                    })
                }
            });
        this.node.on('touchend', function () {
            cc.director.loadScene("Next");
        });
    },
});
