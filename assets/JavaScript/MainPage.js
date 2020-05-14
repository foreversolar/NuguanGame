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
        Username:cc.String,
        level:1,
        health:80,
        experience:0,
        skill:0,
        knowledge:0,
        charm:0,
        money:0,
        rounds:1,
        work_times:0,
        study_times:0,
        playing_times:0,
        storyP:0,
    },

    

    // LIFE-CYCLE CALLBACKS:
    onLoad () {
        this.loadData();
        cc.director.preloadScene("Next", function () {
            cc.log("Next Preloaded");
        });
        this.StoryPlay();    
        //this.rounds=cc.sys.localStorage.getItem('rounds');
    },

    start () {
        var Player_Attribute = this.node.getChildByName("Player_Attribute");
        var notice = this.node.getChildByName("notice");
        var notice_label = notice.getChildByName("label").getComponent(cc.Label);
        var notice_back_button = notice.getChildByName("Back_Button").getComponent(cc.Button);
        var self = this;
        notice_back_button.node.on('click',function(){
            notice.opacity = 0;
            notice_back_button.interactable = false;
        });
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
            if(self.study_times < 1){
                self.scheduleOnce(function(){
                    cc.director.loadScene("Study");
                });
            }
            else{
                //弹窗
                notice.opacity = 255;
                notice_back_button.interactable = true;
                notice_label.string = "这个回合你已经进行过足够多的研习了，不要学习的太累！";
            }
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
            if(self.playing_times<4){
                self.scheduleOnce(function(){
                    cc.director.loadScene("YuLe_QuShuiLiuShang");
                });
            }
            else{
                //弹窗
                notice.opacity = 255;
                notice_back_button.interactable = true;
                notice_label.string = "这个回合你已经进行过足够多的娱乐了，娱乐需适度！";
            }
        });

        menu.getChildByName("qiancengsu").on('click',function(){
            if(self.playing_times<4){
                self.scheduleOnce(function(){
                    cc.director.loadScene("Work_QianCengSu");
                });
            }
            else{
                //弹窗
                notice.opacity = 255;
                notice_back_button.interactable = true;
                notice_label.string = "这个回合你已经进行过足够多的娱乐了，娱乐需适度！";
            }
        });
        
        menu.getChildByName("canggou").on('click',function(){
            if(self.playing_times<4){
                self.scheduleOnce(function(){
                    cc.director.loadScene("YuLe_CangGou");
                });
            }
            else{
                //弹窗
                notice.opacity = 255;
                notice_back_button.interactable = true;
                notice_label.string = "这个回合你已经进行过足够多的娱乐了，娱乐需适度！";
            }
        });
        
        this.work_button.node.on('click', function(){
            if(self.work_times == 0){
                self.scheduleOnce(function(){
                    cc.director.loadScene("Gongwu_Kapian");
                });
            }
            else{
                //弹窗
                notice.opacity = 255;
                notice_back_button.interactable = true;
                notice_label.string = "这个回合你已经完成了宫务，去做些其他的吧！";
            }
        });

        this.next_button.node.on('click', function () {
            if(self.rounds == 4&&self.level == 1){
                cc.director.loadScene("Test");
            }
            self.ResetRound();
            cc.director.loadScene("Next");
        });
    },

    ShowPage:function(t_f){
        this.player_button.interactable = t_f;
        this.stuty_button.interactable = t_f;
        this.yule_button.interactable = t_f;
        this.work_button.interactable = t_f;
        this.next_button.interactable = t_f;
    },
    
    loadData:function(){
        //数据库操作
        var self = this;
        const DB = wx.cloud.database();
        DB.collection('UserData').where({
            _openid: cc.sys.localStorage.getItem('openid'),
        })
        .get({
            success(res) {
                if(res.data.length>0){
                    self.Username = res.data[0].name;
                    self.level = res.data[0].level;
                    self.health = res.data[0].health;
                    self.experience = res.data[0].experience;
                    self.skill = res.data[0].skill;
                    self.knowledge = res.data[0].knowledge;
                    self.charm = res.data[0].charm;
                    self.money = res.data[0].money;
                    self.rounds = res.data[0].rounds;
                    self.playing_times = res.data[0].playing_times;
                    self.study_times = res.data[0].study_times;
                    self.work_times = res.data[0].work_times;
                    cc.sys.localStorage.setItem('rounds', self.rounds);
                }
                else{
                    DB.collection('UserData').add({
                        data: {
                            name:"AddName",
                            level:self.level,
                            health:self.health,
                            experience:self.experience,
                            skill:self.skill,
                            knowledge:self.knowledge,
                            charm:self.charm,
                            money:self.money,
                            rounds:self.rounds,
                            playing_times:self.playing_times,
                            study_times:self.study_times,
                            work_times:self.work_times,
                        },
                        success(res) {
                            //self.setAttribute(User);
                            // cc.sys.localStorage. setItem(' rounds',res.data[0].rounds); 
                        }
                    });
                    //self.Username = "AddName-new";
                }  
                self.setAttribute();  
                //self.StoryPlay();
            }
        });
    },

    setAttribute:function(){
        //添加属性值
        var Player_Attribute = this.node.getChildByName("Player_Attribute").getChildByName("Main_Player");
        
        var username = Player_Attribute.getChildByName("username").getComponent(cc.Label);
        username.string = this.Username;

        var money = this.node.getChildByName("money").getComponent(cc.Label);
        money.string = String(this.money);

        var rounds = this.node.getChildByName("round").getComponent(cc.Label);
        rounds.string = "第" + String(this.rounds);

        var health = Player_Attribute.getChildByName("healthbar").getComponent(cc.Sprite);
        health.fillRange = 0.1 + this.health/1000;

        var experience = Player_Attribute.getChildByName("experiencebar").getComponent(cc.Sprite);
        experience.fillRange = 0.1 + this.experience/1000;

        var knowledge = Player_Attribute.getChildByName("knowledgebar").getComponent(cc.Sprite);
        knowledge.fillRange = 0.1 + this.knowledge/1000;

        var skill = Player_Attribute.getChildByName("skillbar").getComponent(cc.Sprite);
        skill.fillRange = 0.1 + this.skill/1000;

        var charm = Player_Attribute.getChildByName("charmbar").getComponent(cc.Sprite);
        charm.fillRange = 0.1 + this.charm/1000;
    },

    ResetRound:function(){
        this.playing_times = 0;
        this.study_times = 0;
        this.work_times = 0;        
        const DB = wx.cloud.database();
        DB.collection('UserData').where({
            _openid: cc.sys.localStorage.getItem('openid'),
        })
        .get({
            success(res) {
                DB.collection('UserData').doc(res.data[0]._id).update({
                    data:{
                        playing_times:0,
                        study_times:0,
                        work_times:0,
                    }
                });
            }
        });
    },
    StoryPlay:function () {
        var storyP=cc.sys.localStorage.getItem('story');
        if (storyP== undefined){
            storyP=0;
        }
        console.log(storyP)
        if(this.rounds==4 && storyP<4){
            console.log("load story4")
            cc.sys.localStorage. setItem('story',4); 
            cc.director.loadScene("Story4");
        }else if(this.rounds==1 && storyP<1){
            console.log("load story1")
            cc.sys.localStorage. setItem('story',1); 
            cc.director.loadScene("Story1");
        }
    }
});
