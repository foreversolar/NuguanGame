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
        me:cc.Node,
        friend:cc.Node,
        playerName:cc.Label,
        friendSay:cc.Label,
        mySay:cc.Label,
    },


    onLoad () {
        cc.director.preloadScene("Game");
        var figure = this.me.getChildByName("figure_nuli");
        globalUtil.setDialogueFigurePic(figure)
    },

    start() {
        this.playerName.string = cc.sys.localStorage.getItem('nickName')
        var that=this
        this.Dialogue=[
           "不过王维大人的与崔兴宗大人同咏的诗歌倒实在是文采极佳，幸有宴中侍奉的机会，我当即抄录了下来，你且看看？",
           "芙蓉阙下会千官，紫禁朱樱出上阑。才是寝园春荐后，非关御苑鸟衔残。归鞍竞带青丝笼，中使频倾赤玉盘。饱食不须愁内热，大官还有蔗浆寒。",
           "如何？是不是写的极好？去岁我俩也吃过这蔗浆樱桃，可写不出什么这样的句子。",
           "崔大人和的也好：未央朝谒正逶迤，天上樱桃锡此时。朱实初传九华殿，繁花旧杂万年枝。未胜晏子江南橘，莫比潘家大谷梨。闻道令人好颜色，神农本草自应知。",
           "是哪，实在是想不到只是文字也能留住这樱桃的色香味来。",
        ]
        var touchpoint=10;
        
        this.i=0;
        this.node.on('touchend',function(){      
            if(this.i==this.Dialogue.length){
                cc.director.loadScene("Game");
            }          
            if (this.i == touchpoint) {
                this.me.opacity=0;
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

    },

    continueDialogue:function(self,flag){
        var rightResp="你说对啦，去年就给你说过啦！"
        var wrongResp="不是啦不是啦，是大蒜！"

        this.option.active = false;
        self.friend.opacity=255;
        if(flag){
            self.friendSay.string=rightResp;
            // self.friend.opacity=0;
            // self.UpdateFollowStory(self);
        }else{
            self.friendSay.string=wrongResp;
        }
        self.node.resumeSystemEvents(true);

    },
});
