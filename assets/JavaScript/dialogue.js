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
            cc.log("Gongwu_Kapian scene preloaded");
        });
    },

    start () {
        var i = 0;
        var j = 0;
        var self = this;
        var textjson = this.DialogueList.json;
        var speaker = textjson.StartDialogue[i].speaker;
        var str = textjson.StartDialogue[i].context;
        var colors = textjson.start_ifcolor[i];

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
                if(self.ifplaying){
                    self.ifplaying = 0;
                    self.text.string = "";
                    if(i < textjson.StartDialogue.length){
                        speaker = textjson.StartDialogue[i].speaker;
                        str = textjson.StartDialogue[i].context;
                        colors = textjson.start_ifcolor[i];
                        repeat = str.length-1-colors*2;
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
                    console.log(10000+i)
                    if(i < textjson.StartDialogue.length){
                        str = textjson.StartDialogue[i].context;
                        colors = textjson.start_ifcolor[i];
                        repeat = str.length-1-colors*2;
                        speaker = textjson.StartDialogue[i].speaker;
                    }
                    self.schedule(nextDialogue,interval,repeat,delay);
                }
                if(speaker == 1){
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
        },this);
    },

    //update (dt) {},
});
