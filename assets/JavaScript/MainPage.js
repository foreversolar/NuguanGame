// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        player_button:cc.Button,
        pa_back_button:cc.Button,
        stuty_button:cc.Button,
        yule_button:cc.Button,
        work_button:cc.Button,
        next_button:cc.Button,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        
    },

    start () {
        var Player_Attribute = this.node.getChildByName("Player_Attribute");
        var self = this;
        this.player_button.node.on('click', function(){
            self.ShowPage(false);
            Player_Attribute.opacity = 255;
        });
        this.pa_back_button.node.on('click', function(){
            self.ShowPage(true);
            Player_Attribute.opacity = 0;
        });
        this.stuty_button.node.on('click', function(){
            self.scheduleOnce(function(){
                cc.director.loadScene("Study");
            });
        });
        this.yule_button.node.on('click', function(){
            cc.director.loadScene("YuLe_CangGou");
        });
        this.work_button.node.on('click', function(){
            cc.director.loadScene("Gongwu_Kapian");
        });
        this.next_button.node.on('click', function () {
            cc.director.loadScene("YuLe_QuShuiLiuShang");
        });
    },

    ShowPage:function(t_f){
        this.player_button.interactable = t_f;
        this.stuty_button.interactable = t_f;
        //self.rest_button.interactable = t_f;
        //self.work_button.interactable = t_f;
        //self.next_button.interactable = t_f;
    },

    /*

    setButton:function(Button,t_f){
        Button.getComponent(cc.Button).interactable = t_f;
        if(t_f){
            Button.opacity = 255;
        }
        else{
            Button.opacity = 0;
        }
    }*/
});
