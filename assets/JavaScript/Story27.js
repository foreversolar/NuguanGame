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
        this.option.active = false
        var that=this
        this.Dialogue=[
            "喂，你瞧见外头了么？",
            "什么？",
            "是圣人！还有贵妃娘娘呀！",
            "什么！？往咱们这儿来？",
            "我猜只是经过——",
            "呼，走了么？",
            "我猜走了。嗯，确实走了，你在学做什么呀？",
            "一道冷盘，红罗丁。油脂混合血，腥味已经很重而且油脂又腻，得是极高的技艺方才能做的好吃了。",
            "我想也是。不过说起来，唉，虽然也不是什么可以说的事情——贵妃娘娘姿容之美已是世所罕见，可是善妒之心却如寻常女子一般，前几日又将一位宫女投入冷宫，实在是...",
            ""
        ]
        var touchpoint=9;
        
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
        cc.director.loadScene("Game");
     },
});
