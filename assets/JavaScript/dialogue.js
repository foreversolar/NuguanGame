// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        Character_left:cc.Sprite,
        Character_right:cc.Sprite,
        Dialogue:cc.Sprite,
        DialogueList:cc.JsonAsset,
        text:cc.Label,

        ifplaying:1
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        //初始化云服务器
        wx.cloud.init({
            traceUser: true,
             env: 'ltc-eyfvh'
        });
    
        //调用云函数
        wx.cloud.callFunction({
            name: 'getopenid',complete: res => {
                cc.sys.localStorage.setItem('openid', res.result.openid);
            }
        });
    },

    start () {
        var self = this;
        var index = 0;
        cc.director.preloadScene('Game'),
        this.node.on('touchend',function(){
            if(self.ifplaying){
                self.ifplaying = 0;
                self.Dialogue_continue(index);
                if(index<self.DialogueList.json.StartDialogue.length){
                    index++;
                }
            }
        },this);
    },
    //update (dt) {},


    Dialogue_continue:function(index){
        var textjson = this.DialogueList.json;
        var Character_left = this.node.getChildByName("Character_left");
        var Character_right = this.node.getChildByName("Character_right");
        var Dialogue_L = this.node.getChildByName("dialogue_left");
        var Dialogue_R = this.node.getChildByName("dialogue_right");
        if(index == textjson.StartDialogue.length)
            cc.director.loadScene('Game');
        else{
            if(Character_left.opacity == 0&&Dialogue_L.opacity == 0&&index!=0){
                Character_right.opacity = 0;
                Dialogue_R.opacity = 0;
                Character_left.opacity = 255;
                Dialogue_L.opacity = 255;
            }
            else{
                Character_right.opacity = 255;
                Dialogue_R.opacity = 255;
                Character_left.opacity = 0;
                Dialogue_L.opacity = 0;
            }
            this.showText(textjson.StartDialogue[index]);
        }
    },

    showText:function(str){
        var index= 0;
        var interval = 0.05;
        var repeat=str.length-1;
        var delay = 0;
        this.text.string = "";
        this.schedule(function(){
            this.text.string += str[index];
            if((index-28)%29 == 0&&index!=0)
                this.text.string += '\n';
            index++;
            if(index == str.length-1)
                this.ifplaying = 1;
        },interval,repeat,delay);  
    },
});
