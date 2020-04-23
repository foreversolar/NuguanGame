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
        //picture:cc.JsonAsset,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        /*var json = this.picture.json;
        var Yuanzi = json.Background[0];
        var DuihuaKuang = json.UI[2];
       
        var Bg = json.Background[1];
        var Nuli = json.Figure[0];
        var Gugu = json.Figure[1];
        var Dialogue_bg_L = json.UI[1];
        var Dialogue_bg_R = json.UI[0];

        var Big_Background = this.node.getChildByName("Big_Background");
        var Big_container = Big_Background.getComponent(cc.Sprite);
        this.loadImg(Big_container,Yuanzi.url); 
        var Words_Background = this.node.getChildByName("Words_Background");
        var Words_container = Words_Background.getComponent(cc.Sprite);
        this.loadImg(Words_container,DuihuaKuang.url);
        this.loadAll(Bg);
        this.loadAll(Nuli);
        this.loadAll(Gugu);
        this.loadAll(Dialogue_bg_L);
        this.loadAll(Dialogue_bg_R);*/
    },

    start () {
        
    },

    // update (dt) {},


//动态加载图片的方法
    loadImg: function(container,url){
	    cc.loader.load(url, function (err, texture) {
            if(err){
                console.log(container+".spriteFrame load failed!");
                return;
            }
		    var sprite  = new cc.SpriteFrame(texture);
            container.spriteFrame = sprite;
	    });
    } ,

    loadAll:function(url){
        cc.loader.load(url, function (err, texture) {
            if(err){
                console.log(container+".spriteFrame load failed!");
                return;
            }
	    });
    }
});
