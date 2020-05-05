cc.Class({
    extends: cc.Component,
 
    properties: {
        progressBar:{
            default:null,
            type:cc.ProgressBar
        },
 
    },
 
    // LIFE-CYCLE CALLBACKS:
    //进度条使用有待考究
 
    onLoad () {
        cc.director.preloadScene("Gongwu_Kapian", function () {
            cc.log("Gongwu_Kapian preloaded");
        });
        cc.director.preloadScene("YuLe_CangGou", function () {
            cc.log("YuLe_CangGou preloaded");
        });
       cc.director.preloadScene("YuLe_QuShuiLiuShang", function () {
            cc.log("YuLe_QuShuiLiuS preloaded");
        });
    },
 
    start () {
        cc.director.loadScene("Start");
    },
 
    update (dt) {
        if(!this.resource){
            return ;
        }
        var progress = this.progressBar.progress;
        if(progress >= 1){
            console.log('加载完成')
            //加载完成
            this.progressBar.node.active = false;
            this.enabled = false;
            return ;
        }
 
        if(progress < this.progress){
            progress += dt;
        }
 
        this.progressBar.progress = progress;
 
    },

});