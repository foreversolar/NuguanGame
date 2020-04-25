cc.Class({
    extends: cc.Component,
 
    properties: {
        progressBar:{
            default:null,
            type:cc.ProgressBar
        },
 
    },
 
    // LIFE-CYCLE CALLBACKS:
 
    onLoad () {
        this._urls = [
            {url:'/picture/bg_dating.png', name:'大庭'},
            {url:'/picture/bg_yuanzi.png', name:'院子'},
            {url:'/picture/figure_nuli.png', name:'女吏'},
            {url:'/picture/figure_gugu.png', name:'姑姑'},
            {url:'/picture/bg_shufang.png', name:'书房'},
        ];
 
        this.progressBar.progress = 0;
        this.total=this._urls.length;
        this.count=0;
 
        this._clearAll();

        this._urls.forEach(element => {
            this.count=this.count+1;
            cc.loader.loadRes(element.url,this._progressCallback.bind(this),
                this._completeCallback.bind(this))
            });
    },
 
    start () {
        cc.director.loadScene("Start");
 
    },
 
    _clearAll: function() {
        for(var i = 0; i < this._urls.length; ++i) {
            var url = this._urls[i];
            cc.loader.release(url);
        }
    },
 
    _progressCallback: function(completeCount, totalCount, res) {
        //加载进度回调 
    },
 
    _completeCallback: function(err, texture) {
        //加载完成回调
        this.progress = this.count / this.total;
        console.log("complete one: err:"+err)
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