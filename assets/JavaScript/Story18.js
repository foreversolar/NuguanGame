// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

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
    },

    start() {
        var that=this
        this.Dialogue=[
           "是呀，不过李相年岁已高，这也是...",
           "虽说咱们卑微不敢胡言国事，只是皇上如今专以声色自娱，司膳司的工作几乎整日不曾断过。",
           "是呐，单是给贵妃娘娘的荔枝运送便是极废劳力的事情...唉，也不知道宫外百姓又作何想。",
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
