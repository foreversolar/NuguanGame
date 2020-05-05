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
        work_button:cc.Button,
        next_button:cc.Button,
    },

    

    // LIFE-CYCLE CALLBACKS:
    onLoad () {
        this.loadData();
        cc.director.preloadScene("Next", function () {
            cc.log("Next Preloaded");
        });    
    },

    start () {
        var Player_Attribute = this.node.getChildByName("Player_Attribute");
        var self = this;
        this.player_button.node.on('click', function(){
            self.loadData();
            self.ShowPage(false);
            Player_Attribute.opacity = 255;
        });
        this.pa_back_button.node.on('click', function(){
            self.ShowPage(true);
            Player_Attribute.opacity = 0;
        });
        this.stuty_button.node.on('click', function(){
            self.scheduleOnce(function(){
                cc.director.loadScene("Study");
            });
        });
        this.yule_button.node.on('click', function(){
            var choices=self.yule_button.node.getChildByName("choices");
            if(choices.opacity==255){
                choices.opacity=0;
            }else{
                choices.opacity=255;
            }
        });

        var menu=this.yule_button.node.getChildByName("choices");
        menu.getChildByName("liushangqushui").on('click',function(){
            self.scheduleOnce(function(){
                cc.director.loadScene("YuLe_QuShuiLiuShang");
            });
        });

        
        menu.getChildByName("canggou").on('click',function(){
            self.scheduleOnce(function(){
                cc.director.loadScene("YuLe_CangGou");
            });
        });
        
        this.work_button.node.on('click', function(){
            self.scheduleOnce(function(){
                cc.director.loadScene("Gongwu_Kapian");
            });
        });

        this.next_button.node.on('click', function () {
            cc.director.loadScene("Next");
        });
    },

    ShowPage:function(t_f){
        this.player_button.interactable = t_f;
        this.stuty_button.interactable = t_f;
        this.yule_button.interactable = t_f;
        this.work_button.interactable = t_f;
        //self.next_button.interactable = t_f;
    },
    /*
    setButton:function(Button,t_f){
        Button.getComponent(cc.Button).interactable = t_f;
        if(t_f){
            Button.opacity = 255;
        }
        else{
            Button.opacity = 0;
        }
    }*/

    loadData:function(){
        //数据库操作
        var User={
            name:String,
            level:1,
            health:80,
            experience:0,
            skill:0,
            knowledge:0,
            charm:0,
            money:0
        };
        var self = this;
        const DB = wx.cloud.database();
        DB.collection('UserData').where({
            _openid: cc.sys.localStorage.getItem('openid'),
        })
        .get({
            success(res) {
                if(res.data.length>0){
                    User.name = res.data[0].name;
                    User.level = res.data[0].level;
                    User.health = res.data[0].health;
                    User.experience = res.data[0].experience;
                    User.skill = res.data[0].skill;
                    User.knowledge = res.data[0].knowledge;
                    User.charm = res.data[0].charm;
                    User.money = res.data[0].money;
                    //console.log("1.0"+User);
                    //self.setAttribute(User); 
                }
                else{
                    DB.collection('UserData').add({
                        data: {
                            name:"AddName",
                            level:User.level,
                            health:User.health,
                            experience:User.experience,
                            skill:User.skill,
                            knowledge:User.knowledge,
                            charm:User.charm,
                            money:User.money,
                        },
                        success(res) {
                            //self.setAttribute(User); 
                        }
                    });
                }  
                console.log("2.0"+User.health);
                self.setAttribute(User);  
            }
        });
    },

    setAttribute:function(User){
        //添加属性值
        console.log("2."+User.health); 
        var Player_Attribute = this.node.getChildByName("Player_Attribute").getChildByName("Main_Player");
        var health = Player_Attribute.getChildByName("healthbar").getComponent(cc.Sprite);
        var experience = Player_Attribute.getChildByName("experiencebar").getComponent(cc.Sprite);
        var knowledge = Player_Attribute.getChildByName("knowledgebar").getComponent(cc.Sprite);
        var skill = Player_Attribute.getChildByName("skillbar").getComponent(cc.Sprite);
        var charm = Player_Attribute.getChildByName("charmbar").getComponent(cc.Sprite);
        health.fillRange = 0.1 + User.health/1000;
        experience.fillRange = 0.1 + User.experience/1000;
        console.log("1."+experience.fillRange+"2."+User.experience);
        knowledge.fillRange = 0.1 + User.knowledge/1000;
        skill.fillRange = 0.1 + User.skill/1000;
        charm.fillRange = 0.1 + User.charm/1000;
        console.log("1."+charm.fillRange+"2."+User.charm);
    }
});
