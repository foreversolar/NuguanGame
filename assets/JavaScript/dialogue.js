// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        DialogueList:cc.JsonAsset,
        text:cc.RichText,
        ifplaying:1
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        cc.director.preloadScene('Game');
        cc.director.preloadScene("Game", function () {
            cc.log("game scene preloaded");
        });
        cc.director.preloadScene("Work_QianCengSu", function () {
            cc.log("work_qiancengsu scene preloaded");
        });
        cc.director.preloadScene("Gongwu_Kapian", function () {
            cc.log("work_qiancengsu scene preloaded");
        });
    },

    start () {
        var i = 0;
        var j = 0;
        var k = 0;
        var self = this;
        var textjson = this.DialogueList.json;
        var str = textjson.StartDialogue[i];
        var colors = textjson.ifcolor[i];

        var Character_left = this.node.getChildByName("Character_left");
        var Character_right = this.node.getChildByName("Character_right");
        var Dialogue_L = this.node.getChildByName("dialogue_left");
        var Dialogue_R = this.node.getChildByName("dialogue_right");

        var interval = 0.05;
        var repeat=str.length-1;
        var delay = 0;

        var if_color = false;
        var len = 0;
        var nextDialogue = function(){
            len++;
            if(str[j]=='<'){
                if_color = true;
                j++;    
            }
            else if(str[j]=='>'){
                if_color = false;
                j++;    
            }
            if(if_color){
                this.text.string += "<color=#FEFB57>"+str[j]+"</color>";
            }   
            else{
                this.text.string += str[j]; 
            }  
            if(len%29 == 0&&len!=0){
                this.text.string += '\n';
            }
            j++;
            if(j == str.length){
                i++;
                this.ifplaying = 1;
            }
        };
        

        this.node.on('touchend',function(){
            if(i == textjson.StartDialogue.length)
                cc.director.loadScene('Game');
            else{
                if(Character_left.opacity == 0&&Dialogue_L.opacity == 0&&k!=0){
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
            }
            k++;
            if(self.ifplaying){
                self.ifplaying = 0;
                self.text.string = "";
                if(i < textjson.StartDialogue.length){
                    str = textjson.StartDialogue[i];
                    colors = textjson.ifcolor[i];
                    repeat=str.length-1-colors*2;
                }
                self.schedule(nextDialogue,interval,repeat,delay);
                j = 0;
                len = 0;
            }
            else{
                self.unschedule(nextDialogue);  
                j = 0;
                len = 0;
                if_color = false;
                self.text.string = "";
                i++;
                if(i<self.DialogueList.json.StartDialogue.length){
                    str = textjson.StartDialogue[i];
                    colors = textjson.ifcolor[i];
                    repeat=str.length-1-colors*2;
                }
                self.schedule(nextDialogue,interval,repeat,delay);
            }
        },this);
    },

    //update (dt) {},
});
