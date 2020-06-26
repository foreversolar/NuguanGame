// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        Ans1:cc.Button,
        Ans2:cc.Button,
        option: cc.Node,
        beijing: cc.Node,
        label: cc.Label,
        over:0,
    },

    onLoad() {
        this.option.active = false;  
    },

    start () {
        var self = this;

        this.node.on('touchend', function () {
            if (self.over == 1) {
                cc.director.loadScene("Game");
            } else {
                self.option.active = true;
            }
        });     

        this.Ans1.node.on('click',function(){
            self.option.active = false;
            self.over = 1;
            self.continue(self,true)
        });
        this.Ans2.node.on('click',function(){
            self.option.active = false;
            self.over = 1;
            self.continue(self, false)
        });
    },

    continue: function (self, flag) {
        self.option.active = false;
        if (flag) {
            self.label.string = "但,这娘娘们用的东西我可不敢戴着，还是等过几天找个出宫的机会给当了，换些银两在身上比较合适。";
        } else {
            self.label.string = "所幸交给了姑姑，竟是贵妃娘娘的簪子，否则可就大事不妙了，物归原主，还得了些赏赐，也还快活！";
        }
    }
});
