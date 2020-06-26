var globalUtil = {

    // container应该是node节点，url以“/picture/...”开始定位
    loadImg: function(container,url){
            cc.loader.loadRes(url, function (err, texture) { 
                if(err){
                    console.log("Load picture failed!");
                }
                var sprite  = new cc.SpriteFrame(texture);
                container.getComponent(cc.Sprite).spriteFrame = sprite;
            });
    } ,

    randColor: function () {
        var c1 = 55 + 200 * cc.random0To1()
        var c2 = 55 + 200 * cc.random0To1()
        var c3 = 55 + 200 * cc.random0To1()
        var c4 = 55 + 200 * cc.random0To1()
        return cc.color(c1, c2, c3, c4)
    },

    setMainSceneFigurePic: function (container,scene) {
    
    },

    setDialogueFigurePic: function (container,scene) {
        var level = cc.sys.localStorage.getItem('level')
        if (level ==2 ){

        }else if (level ==3 ){

        }else if (level ==4 ){

        }else if (level ==5 ){

        }else{

        }
    },

    setAttributePanelFigurePic: function (container,scene) {
    
    },
}
 
//导出为引用模块
module.exports = globalUtil