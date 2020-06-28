cc.Class({
    extends: cc.Component,
 
    properties: {
        progressBar:{
            default:null,
            type:cc.ProgressBar
        },
        startbtn:cc.Button,
        loadAni:cc.Node
    },
 
    // LIFE-CYCLE CALLBACKS:
    //进度条使用有待考究
 
    onLoad () {
        this.scene=0
        cc.director.preloadScene("Gongwu_Kapian", function () {
            cc.log("Gongwu_Kapian preloaded");
            this.scene++;
        }.bind(this));
        cc.director.preloadScene("YuLe_CangGou", function () {
            cc.log("YuLe_CangGou preloaded");
            this.scene++;
        }.bind(this));
        cc.director.preloadScene("YuLe_QuShuiLiuShang", function () {
            cc.log("YuLe_QuShuiLiuS preloaded");
            this.scene++;
        }.bind(this));
        //初始化云服务器
        wx.cloud.init({
            traceUser: true,
             env: 'ltc-eyfvh'
        });
    
        //调用云函数
        wx.cloud.callFunction({
            name: 'getopenid',complete: res => {
                cc.sys.localStorage.setItem('openid', res.result.openid);
            }
        });
    },
 
    start () {
        // this.startbtn.node.on('click', function(){
        //     this.choose();
        // }.bind(this));
    },
 
    update (dt) {
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

        if(this.scene==3){
            // this.startbtn.node.opacity=255;
            this.loadAni.opacity=0;
            this.scene++;
            this.choose();
        } 
    },

    choose:function(){
        const DB = wx.cloud.database();
        DB.collection('UserData').where({
            _openid: cc.sys.localStorage.getItem('openid'),
        })
        .get({
            success(res) {
                if(res.data.length>0){
                    cc.director.loadScene("Game");
                }
                else{
                    let button = wx.createUserInfoButton({
                        type: 'text',
                        text: '开始游戏',
                        style: {
                          left: 350,
                          top: 230,
                          width: 200,
                          height: 40,
                          lineHeight: 40,
                          backgroundColor: '#9ebabf',
                          color: '#ffffff',
                          textAlign: 'center',
                          fontSize: 16,
                          borderRadius: 4
                        }
                      })
                      button.onTap((res) => {
                        console.log(res)
                        button.destroy()
                          cc.sys.localStorage.setItem('nickName', res.userInfo.nickName.substring(0, 4));
                        cc.director.loadScene("Start");
                      })
                }
            },
        });
    }
});