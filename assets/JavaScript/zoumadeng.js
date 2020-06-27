// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        bg1: cc.Node,
        bg2: cc.Node,
        bg3: cc.Node,
        bg4: cc.Node,
        bg5: cc.Node,
        bg6: cc.Node,
        bg7: cc.Node,
        bg8: cc.Node,
        bg9: cc.Node,
        bg10: cc.Node,
        bg11: cc.Node
    },

    onLoad() {
        this.bg1.active = true;
        this.bg2.active = false;
        this.bg3.active = false;
        this.bg4.active = false;
        this.bg5.active = false;
        this.bg6.active = false;
        this.bg7.active = false;
        this.bg8.active = false;
        this.bg9.active = false;
        this.bg10.active = false;
        this.bg11.active = false;
    },

    start () {
        var self = this;
        var i = 1;
        this.node.on('touchend', function () {
            if (i>10) {
                cc.director.loadScene("Game");
            } else if(i==1){
                self.bg1.active = false;
                self.bg2.active = true;
            } else if (i == 2) {
                self.bg2.active = false;
                self.bg3.active = true;
            } else if (i == 3) {
                self.bg3.active = false;
                self.bg4.active = true;
            } else if (i == 4) {
                self.bg4.active = false;
                self.bg5.active = true;
            } else if (i == 5) {
                self.bg5.active = false;
                self.bg6.active = true;
            } else if (i == 6) {
                self.bg6.active = false;
                self.bg7.active = true;
            } else if (i == 7) {
                self.bg7.active = false;
                self.bg8.active = true;
            } else if (i == 8) {
                self.bg8.active = false;
                self.bg9.active = true;
            } else if (i == 9) {
                self.bg9.active = false;
                self.bg10.active = true;
            } else if (i == 10) {
                self.bg10.active = false;
                self.bg11.active = true;
            }

            i++;
        });
    }
});
