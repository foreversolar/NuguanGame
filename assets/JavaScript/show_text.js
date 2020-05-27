// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        text:cc.Label,
        button:cc.Button,
        Json_word:cc.JsonAsset,
        flag:false,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        cc.director.preloadScene("Dialogue", function () {
            cc.log("Dialogue preloaded");
        });
    },

    start () {
        var self = this;
        this.showText1();
        this.node.on('touchend',function(){
            if(self.flag == true){
                self.showText(self.button);
                self.flag = false;
            }
        });
        this.button.node.on('click', function () {
            cc.director.loadScene("Dialogue");
        });
    },

    //update (dt) {},

    showText1:function() {
        var Dialogue = this.Json_word.json.StartText[0];  
        var index= 0;
        var interval = 0.05;
        var repeat=Dialogue.length-1;
        var delay = 0.01;
        this.text.string = "";
        this.schedule(function(){
            if(index == Dialogue.length-1){
                this.flag = true;
            }
            this.text.string += Dialogue[index];
            index++;
        },interval,repeat,delay);
    },

    showText:function(button){
        var str = this.Json_word.json.StartText[1];
        var index= 0;
        var interval = 0.05;
        var repeat=str.length-1;
        var delay = 0.01;
        this.text.string = "";
        this.schedule(function(){
            if(index == str.length-1){
               button.interactable = true;
            }
            this.text.string += str[index];
            index++;
        },interval,repeat,delay);
    },
});
