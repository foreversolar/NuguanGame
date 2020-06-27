
import globalUtil from "util";

cc.Class({
    extends: cc.Component,

    properties: {
        bg:cc.Node,
        bottom_selector: cc.Node,
        color_selector:cc.Node,
        path_selector:cc.Node,

        bottom:cc.Node,
        path:cc.Node,
        color:cc.Node,

        bottom1:cc.Node,
        bottom2:cc.Node,
        bottom3:cc.Node,

        path1:cc.Node,
        path2:cc.Node,
        path3:cc.Node,
        
        colork:cc.Node,
        colorp:cc.Node,
        colorr:cc.Node,

        in_cake:cc.Node,
        in_path:cc.Node,
        in_color:"red",

        tip:cc.Label,
        
        startBtn:cc.Node,
        Box:cc.Node,
        leaveBtn:cc.Node
    },

    onLoad () {
        this.setTips()
        this.bottomPic="";
        this.pathPic="";

        this.startBtn.on("click", function () {
            this.startGame()
        }, this);

        this.leaveBtn.on("click",function(){
            cc.director.loadScene("Game");  
        },this);

        //Color
        this.color_selector.on("click", function () {
            this.color.opacity=255;
        }, this);

        this.colork.on("click",function(){

            this.colorPic="k";
            this.colorProcess("k");
        },this)
        this.colorp.on("click",function(){
            this.colorPic="p";
            this.colorProcess("p");
        },this)
        this.colorr.on("click",function(){
            this.colorPic="r";
            this.colorProcess("r");
        },this)

        //Bottom
        this.bottom_selector.on("click", function () {
            this.bottom.opacity=255;
        }, this);

        this.bottom1.on("click",function(){
            this.bottomProcess();
            this.loadImg(this.in_cake,"bottom1-r");
            this.bottomPic="bottom1";
        },this)

        this.bottom2.on("click",function(){
            this.bottomProcess();
            this.loadImg(this.in_cake,"bottom2-r");
            this.bottomPic="bottom2";
        },this)

        this.bottom3.on("click",function(){
            this.bottomProcess();
            this.loadImg(this.in_cake,"bottom3-r");
            this.bottomPic="bottom3";
        },this)

        //Path
        this.path_selector.on("click", function () {
        }, this);

        this.path1.on("click",function(){
            this.pathProcess();
            this.loadImg(this.in_path,"path1-r");
            this.pathPic="path1";
        },this)

        this.path2.on("click",function(){
            this.pathProcess();
            this.loadImg(this.in_path,"path2-r");
            this.pathPic="path2";
        },this)

        this.path3.on("click",function(){
            this.pathProcess();
            this.loadImg(this.in_path,"path3-r");
            this.pathPic="path3";
        },this)
    },

    start () {


    },

    loadImg: function(container,url){
        cc.loader.loadRes("/picture/Cake/Cake", cc.SpriteAtlas, function (err, atlas) {
            var sprite = atlas.getSpriteFrame(url);
            container.getComponent(cc.Sprite).spriteFrame = sprite;
        });
    } ,

    bottomProcess: function(){
        this.bottom.opacity=0;
        this.bottom_selector.getComponent(cc.Button).interactable=false;
        this.path_selector.getComponent(cc.Button).interactable=true;

        this.path1.getComponent(cc.Button).interactable=true;
        this.path2.getComponent(cc.Button).interactable=true;
        this.path3.getComponent(cc.Button).interactable=true;
        this.path.opacity=255;
    },

    pathProcess:function(){
        this.path.opacity=0;
        this.path_selector.getComponent(cc.Button).interactable=false;
        this.color_selector.getComponent(cc.Button).interactable=true;
        this.colork.getComponent(cc.Button).interactable=true;
        this.colorp.getComponent(cc.Button).interactable=true;
        this.colorr.getComponent(cc.Button).interactable=true;
        this.color.opacity=255;
    },
    colorProcess:function(color){
        this.color.opacity=0;
        this.color_selector.getComponent(cc.Button).interactable=false;

        //完整命名：
        // picture/Cake/path3-r
        // picture/Cake/bottom3-r
        var bottompicture=this.bottomPic+"-"+color;
        this.loadImg(this.in_cake,bottompicture);
        var pathpicture=this.pathPic+"-"+color;
        this.loadImg(this.in_path,pathpicture);
        this.endGame();
    },
    
    setTips:function(){
        var cakeTips=[
            "唯有牡丹真国色\n正红艳冠群芳默",
            "梅花最肯破寒风\n春来樱桃好姿容",
            "蔓藤攀升子孙广\n莲子登科入宫堂",
        ]
        var cake = Math.ceil(Math.random() * 3);
        this.tip.string=cakeTips[cake-1];
        this.type=cake;
        // 贵妃红牡丹：唯有牡丹真国色\n正红艳冠群芳默
        // 樱桃粉梅花：梅花最肯破寒风，春来樱桃好姿容
        // 葡萄紫莲花：蔓藤攀升子孙广，莲子登科入宫堂
    },

    checkResult:function(){
        if (this.type==1){
            return this.bottomPic=="bottom3" &&  this.pathPic=="path1" && this.colorPic=="r";
        }else if (this.type==2){
            return this.bottomPic=="bottom2" &&  this.pathPic=="path2" && this.colorPic=="k";
        }else{
            return this.bottomPic=="bottom1" &&  this.pathPic=="path3" && this.colorPic=="p";
        }
    },

    startGame:function(){
        this.bottom_selector.getComponent(cc.Button).interactable=true;
        this.setBgColor(255)
        this.startBtn.getComponent(cc.Button).interactable=false;
        this.leaveBtn.getComponent(cc.Button).interactable=false;
        this.Box.opacity=0;
    },

    endGame:function(){
        this.AddScore(10);
        this.color_selector.getComponent(cc.Button).interactable=false;
        this.setBgColor(121)
        this.startBtn.opacity=0
        this.leaveBtn.opacity=0
        this.Box.opacity=255;
        this.Box.getChildByName("message").getComponent(cc.Label).string=this.ResultTips();
        this.bg.on(cc.Node.EventType.TOUCH_END,function(){
            cc.director.loadScene("Game");  
        });
    },

    ResultTips:function(){
        var result=this.checkResult();
        var resultTips="";
        var cakeTips="";
        console.log(result)

        if (this.type==1){
            cakeTips="唯有牡丹真国色,正红艳冠群芳默"
        }else if (this.type==2){
            cakeTips="梅花最肯破寒风,春来樱桃好姿容"
        }else{
            cakeTips="蔓藤攀升子孙广，莲子登科入宫堂"
        }

        if (result) {
            resultTips="贵妃娘娘很喜欢你制作的糕点，" + cakeTips + ", 看来你已经领会到了。" 
        }else{
            resultTips="贵妃娘娘看起来不是十分满意，" + cakeTips + ", 还需要多多领会哦。"
        }

        return resultTips
    },


    setBgColor:function(c){
        this.bg.color=new cc.Color(c,c,c);
        this.bottom_selector.color=new cc.Color(c,c,c);
        this.color_selector.color=new cc.Color(c,c,c);
        this.path_selector.color=new cc.Color(c,c,c);
    },

    AddScore:function(right){
        const DB = wx.cloud.database();
        DB.collection('UserData').where({
            _openid: cc.sys.localStorage.getItem('openid'),
        })
        .get({
            success(res) {
                DB.collection('UserData').doc(res.data[0]._id).update({
                    data:{
                        experience:res.data[0].experience+right*30,
                        work_times:res.data[0].work_times+1,
                    }
                })
            }
        });
    }

    // update (dt) {},
});
