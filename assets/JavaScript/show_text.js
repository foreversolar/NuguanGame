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
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        cc.director.preloadScene("Dialogue", function () {
            cc.log("Dialogue preloaded");
        });
    },

    start () {
        this.showText(this.button);
        this.button.node.on('click', function () {
            cc.director.loadScene("Dialogue");
        });
    },

    //update (dt) {},

    showText:function(button){
        var str = this.Json_word.json.StartText;
        var index= 0;
        var interval = 0.05;
        var repeat=str.length-1;
        var delay = 0;
        this.text.string = "";
        this.schedule(function(){
            if(index == str.length-1){
               button.interactable = true;
            }
            this.text.string += str[index];
            if((index-22)%23 == 0&&index!=0){
                this.text.string += '\n';
            }
            index++;
        },interval,repeat,delay);
    },
});
