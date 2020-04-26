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
        //rest_button:cc.Button,
        //work_button:cc.Button,
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
            //self.ShowPage(false);
            self.scheduleOnce(function(){
                cc.director.loadScene("Study");
            });
        });

        this.yule_button.node.on('click', function(){
            //self.ShowPage(false);
            cc.director.loadScene("YuLe_CangGou");
        });

        this.next_button.node.on('click', function () {
            //self.ShowPage(false);
            cc.director.loadScene("YuLe_QuShuiLiuShang");
        });
    },

    ShowPage:function(t_f){
        this.player_button.interactable = t_f;
        this.stuty_button.interactable = t_f;
        this.yule_button.interactable = t_f;
        //self.rest_button.interactable = t_f;
        //self.work_button.interactable = t_f;
        self.next_button.interactable = t_f;
    },

    /*resetQA:function(Page){
        var Panel = Page.getChildByName("Panel");
        Panel.getChildByName("Question").getComponent(cc.Label).string = "这里是研习环节，通过回答相关问题即可增长你的学识，提升等级。开始之后会出现相应的题目和选项，请在右边选择你认为正确的选项，回答正确即可增长学识。";
        var start = Panel.getChildByName("Start");
        var Answer1 = Panel.getChildByName("Answer1");
        var Answer2 = Panel.getChildByName("Answer2");
        var Answer3 = Panel.getChildByName("Answer3");
        var Change = Panel.getChildByName("Change");
        var Next = Panel.getChildByName("Next");
        var Character = Panel.getChildByName
        this.setButton(start,true);
        this.setButton(Answer1,false);
        this.setButton(Answer2,false);
        this.setButton(Answer3,false);
        this.setButton(Change,false);
        this.setButton(Next,false);

    },

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
