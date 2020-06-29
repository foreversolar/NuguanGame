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
        friendSay:cc.Label,
        mySay: cc.Label,
        text: cc.JsonAsset
    },


    onLoad () {
        cc.director.preloadScene("Game");
        var figure = this.me.getChildByName("figure_nuli");
        globalUtil.setDialogueFigurePic(figure)
    },

    start() {
        this.playerName.string = cc.sys.localStorage.getItem('nickName')
        var that=this

        var Dialogue = this.text.json.rounds31;
        
        var i = 1;

        this.me.opacity = 255;
        this.friend.opacity = 0;
        this.mySay.string = Dialogue[0];

        this.node.on('touchend',function(){      
            if (i > 4) {
                cc.sys.localStorage.setItem('story', 31);
                cc.director.loadScene("Game");
            }else if (i%2==0) {
                this.me.opacity = 255;
                this.mySay.string = Dialogue[i];
                this.friend.opacity = 0;
            }else{
                this.friend.opacity = 255;
                this.friendSay.string = Dialogue[i];
                this.me.opacity = 0;
            }
            i++;
        },this);

    },
});
