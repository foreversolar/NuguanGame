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
    },

    onLoad () {
        this.setTips();
        this.bottomPic="";
        this.pathPic="";

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
            this.loadImg(this.in_cake,"/picture/Cake/bottom1-r");
            this.bottomPic="bottom1";
        },this)

        this.bottom2.on("click",function(){
            this.bottomProcess();
            this.loadImg(this.in_cake,"/picture/Cake/bottom2-r");
            this.bottomPic="bottom2";
        },this)

        this.bottom3.on("click",function(){
            this.bottomProcess();
            this.loadImg(this.in_cake,"/picture/Cake/bottom3-r");
            this.bottomPic="bottom3";
        },this)

        //Path
        this.path_selector.on("click", function () {
        }, this);

        this.path1.on("click",function(){
            this.pathProcess();
            this.loadImg(this.in_path,"/picture/Cake/path1-r");
            this.pathPic="path1";
        },this)

        this.path2.on("click",function(){
            this.pathProcess();
            this.loadImg(this.in_path,"/picture/Cake/path2-r");
            this.pathPic="path2";
        },this)

        this.path3.on("click",function(){
            this.pathProcess();
            this.loadImg(this.in_path,"/picture/Cake/path3-r");
            this.pathPic="path3";
        },this)
    },

    loadImg: function(container,url){
            cc.loader.loadRes(url, function (err, texture) { 
                if(err){
                    console.log("Load picture failed!");
                }
                var sprite  = new cc.SpriteFrame(texture);
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
        var bottompicture="/picture/Cake/"+this.bottomPic+"-"+color;
        this.loadImg(this.in_cake,bottompicture);
        var pathpicture="/picture/Cake/"+this.pathPic+"-"+color;
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
            console.log(this.bottomPic+this.pathPic+this.colorPic)
            return this.bottomPic=="bottom3" &&  this.pathPic=="path1" && this.colorPic=="r";
        }else if (this.type==2){
            console.log(this.bottomPic+this.pathPic+this.colorPic)
            return this.bottomPic=="bottom2" &&  this.pathPic=="path2" && this.colorPic=="k";
        }else{
            console.log(this.bottomPic+this.pathPic+this.colorPic)
            return this.bottomPic=="bottom1" &&  this.pathPic=="path3" && this.colorPic=="p";
        }
    },

    endGame:function(){
        var result=this.checkResult();
        this.node.active = false;
        this.node.parent.getComponent("Test_rounds_45").Result(result);
    },

    setBgColor:function(c){
        this.bg.color=new cc.Color(c,c,c);
        this.bottom_selector.color=new cc.Color(c,c,c);
        this.color_selector.color=new cc.Color(c,c,c);
        this.path_selector.color=new cc.Color(c,c,c);
    }

    // update (dt) {},
});
