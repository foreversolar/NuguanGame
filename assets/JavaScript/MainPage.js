// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html
import globalUtil from "util";


cc.Class({
    extends: cc.Component,

    properties: {
        player_button: cc.Button,
        head:cc.Node,
        pa_back_button: cc.Button,
        stuty_button: cc.Button,
        yule_button: cc.Button,
        work_button: cc.Button,
        next_button: cc.Button,
        Username: cc.String,
        userNameInMainPage: cc.Label,
        levelNameInMainPage: cc.Label,
        level: 1,
        health: 80,
        experience: 0,
        skill: 0,
        knowledge: 0,
        charm: 0,
        money: 0,
        rounds: 1,
        work_times: 0,
        study_times: 0,
        playing_times: 0,
        storyP: 0,
        teshu1: 0,
        teshu2: 0,
        teshu3: 0,
        teshu4: 0
    },

    // LIFE-CYCLE CALLBACKS:
    onLoad() {
        console.log("loading main game");
        this.loadData();
        cc.director.preloadScene("Next", function () {
            cc.log("Next Preloaded");
        });
        cc.director.preloadScene("YuLe_CangGou", function () {
            cc.log("canggou scene preloaded");
        });
        cc.director.preloadScene("YuLe_QuShuiLiuShang", function () {
            cc.log("qushuiliusahng scene preloaded");
        });

        if(cc.sys.localStorage.getItem('level')==4){
            cc.director.preloadScene("Work_Cake");
        };
        //this.rounds=cc.sys.localStorage.getItem('rounds');
    },

    start() {
        var Player_Attribute = this.node.getChildByName("Player_Attribute");
        var notice = this.node.getChildByName("notice");

        var figureInMainPage = this.node.getChildByName("Nuli");
        globalUtil.setMainSceneFigurePic(figureInMainPage);
        globalUtil.setHeadPic(this.head);


        var notice_label = notice.getChildByName("label").getComponent(cc.Label);
        var notice_back_button = notice.getChildByName("Back_Button").getComponent(cc.Button);
        var self = this;
        notice_back_button.node.on('click', function () {
            notice.opacity = 0;
            notice_back_button.interactable = false;
        });
        this.player_button.node.on('click', function () {
            self.loadData();
            self.ShowPage(false);
            Player_Attribute.opacity = 255;
        });
        this.pa_back_button.node.on('click', function () {
            self.ShowPage(true);
            Player_Attribute.opacity = 0;
        });
        this.stuty_button.node.on('click', function () {
            if (self.study_times < 1) {
                self.scheduleOnce(function () {
                    cc.director.loadScene("Study");
                });
            }
            else {
                //弹窗
                notice.opacity = 255;
                notice_back_button.interactable = true;
                notice_label.string = "这个回合你已经进行过足够多的研习了，不要学习的太累！";
            }
        });
        this.yule_button.node.on('click', function () {
            var choices = self.yule_button.node.getChildByName("choices");
            if (choices.opacity == 255) {
                choices.opacity = 0;
            } else {
                choices.opacity = 255;
            }
        });

        var menu = this.yule_button.node.getChildByName("choices");
        menu.getChildByName("liushangqushui").on('click', function () {
            if (self.playing_times < 4) {
                self.scheduleOnce(function () {
                    cc.director.loadScene("YuLe_QuShuiLiuShang");
                });
            }
            else {
                //弹窗
                notice.opacity = 255;
                notice_back_button.interactable = true;
                notice_label.string = "这个回合你已经进行过足够多的娱乐了，娱乐需适度！";
            }
        });


        menu.getChildByName("canggou").on('click', function () {
            if (self.playing_times < 4) {
                self.scheduleOnce(function () {
                    cc.director.loadScene("YuLe_CangGou");
                });
            }
            else {
                //弹窗
                notice.opacity = 255;
                notice_back_button.interactable = true;
                notice_label.string = "这个回合你已经进行过足够多的娱乐了，娱乐需适度！";
            }
        });

        this.work_button.node.on('click', function () {
            if (self.work_times == 0) {
                self.scheduleOnce(function () {
                    var url = "";
                    if (self.level == 1) {
                        url = "Gongwu_Yingtao";
                        cc.director.loadScene(url);
                    } else if (self.level == 2) {
                        url = "Gongwu_Kapian";
                        cc.director.loadScene(url);
                    } else if (self.level == 3) {
                        url = "Work_QianCengSu";
                        cc.director.loadScene(url);
                    } else if (self.level == 4) {
                        url = "Work_Cake";
                        cc.director.loadScene(url);
                    } else {
                        notice.opacity = 255;
                        notice_back_button.interactable = true;
                        notice_label.string = "司内一切事宜皆好，请尚食放心";
                    }
                });
            }
            else {
                //弹窗
                notice.opacity = 255;
                notice_back_button.interactable = true;
                notice_label.string = "这个回合你已经完成了宫务，去做些其他的吧！";
            }
        });

        this.next_button.node.on('click', function () {
            if (self.rounds == 4 || self.rounds == 14 || self.rounds == 29 || self.rounds == 44) {
                if(self.level == 1){
                cc.director.loadScene("Test_5");
                }else if(self.level == 2){
                cc.director.loadScene("Test_15");
                }else if(self.level == 3){
                cc.director.loadScene("Test_30");
                }else if(self.level == 4){
                cc.director.loadScene("Test_45");
                }
            }
            self.ResetRound();
            var judge = Math.floor(Math.random() * 5); 
            if (self.rounds == 50) {
                console.log("结局")
                cc.director.loadScene("Story50");
            } else if (judge==0) {
                if (self.teshu1 == 0 && self.money >= 400) {
                    cc.director.loadScene("huilu");
                } else if (self.teshu2 == 0) {
                    cc.director.loadScene("houhuayuan");
                } else if (self.teshu3 == 0) {
                    cc.director.loadScene("touchi");
                } else if (self.teshu4 == 0) {
                    cc.director.loadScene("zhuashu");
                } else {
                    cc.director.loadScene("Next");
                }
            }else {
                cc.director.loadScene("Next");
            }
        });
    },

    ShowPage: function (t_f) {
        this.player_button.interactable = t_f;
        this.stuty_button.interactable = t_f;
        this.yule_button.interactable = t_f;
        this.work_button.interactable = t_f;
        this.next_button.interactable = t_f;
    },

    loadData: function () {
        //数据库操作
        var self = this;
        const DB = wx.cloud.database();
        DB.collection('UserData').where({
            _openid: cc.sys.localStorage.getItem('openid'),
        })
            .get({
                success(res) {
                    if (res.data.length > 0) {
                        self.Username = res.data[0].nickName;
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
                        self.teshu1 = res.data[0].teshu1;
                        self.teshu2 = res.data[0].teshu2;
                        self.teshu3 = res.data[0].teshu3;
                        self.teshu4 = res.data[0].teshu4;
                        cc.sys.localStorage.setItem('rounds', self.rounds);
                        cc.sys.localStorage.setItem('nickName', self.Username.substring(0, 4));
                        cc.sys.localStorage.setItem('level', self.level);
                    }
                    else {

                        DB.collection('UserData').add({
                            data: {
                                level: self.level,
                                health: self.health,
                                experience: self.experience,
                                skill: self.skill,
                                knowledge: self.knowledge,
                                charm: self.charm,
                                money: self.money,
                                rounds: 1,//self.rounds,
                                playing_times: self.playing_times,
                                study_times: self.study_times,
                                work_times: self.work_times,
                                nickName: cc.sys.localStorage.getItem('nickName'),
                                ren: 0,
                                fo: 0,
                                ahui: 0,
                                liniang: 0,
                                finish_Question:0,
                                teshu1: 0,
                                teshu2: 0,
                                teshu3: 0,
                                teshu4: 0
                            },
                            success(res) {
                                cc.sys.localStorage.setItem('story', 0);
                                self.rounds = 1;
                                self.setAttribute();
                                self.StoryPlay();
                                //self.setAttribute(User);
                                //cc.sys.localStorage. setItem(' rounds',res.data[0].rounds);
                            }
                        });

                        DB.collection('TestResult').where({
                            _openid: cc.sys.localStorage.getItem('openid'),
                        })
                            .get({
                                success(res) {
                                    if (res.data.length <= 0) {

                                        DB.collection('TestResult').add({
                                            data: {
                                                round5: -1,
                                                round15: -1,
                                                round30: -1,
                                                round45: -1,
                                            }
                                        });
                                    }
                                }
                            });
                    }
                    //这里是比上面的两个数据库操作优先处理的，在第一次创建的时候会读不到数据，所以在上面再写入一次，对话加载同理
                    //console.log(cc.sys.localStorage.getItem('story'));
                    self.setAttribute();
                    self.StoryPlay();
                }
            });
    },

    setAttribute: function () {
        //添加属性值
        var Player_Attribute = this.node.getChildByName("Player_Attribute").getChildByName("Main_Player");

        var username = Player_Attribute.getChildByName("username").getComponent(cc.Label);
        username.string = this.Username;
        this.userNameInMainPage.string = this.Username.substring(0, 4);

        var money = this.node.getChildByName("money").getComponent(cc.Label);
        money.string = String(this.money);

        var rounds = this.node.getChildByName("round").getComponent(cc.Label);
        rounds.string = "第" + String(this.rounds);

        var health = Player_Attribute.getChildByName("healthbar").getComponent(cc.Sprite);
        health.fillRange = 0.1 + this.health / 1000;

        var experience = Player_Attribute.getChildByName("experiencebar").getComponent(cc.Sprite);
        experience.fillRange = 0.1 + this.experience / 1000;

        var knowledge = Player_Attribute.getChildByName("knowledgebar").getComponent(cc.Sprite);
        knowledge.fillRange = 0.1 + this.knowledge / 1000;

        var skill = Player_Attribute.getChildByName("skillbar").getComponent(cc.Sprite);
        skill.fillRange = 0.1 + this.skill / 1000;

        var charm = Player_Attribute.getChildByName("charmbar").getComponent(cc.Sprite);
        charm.fillRange = 0.1 + this.charm / 1000;

        var figure = Player_Attribute.getChildByName("Nuli");
        globalUtil.setAttributePanelFigurePic(figure);

        var position = Player_Attribute.getChildByName("position").getComponent(cc.Label);
        position.string = globalUtil.getPositionName();
        this.levelNameInMainPage.string = globalUtil.getPositionName();


    },


    ResetRound: function () {
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
                    data: {
                        playing_times: 0,
                        study_times: 0,
                        work_times: 0,
                    }
                });
            }
        });    
    },

    StoryPlay: function () {
        var storyP = cc.sys.localStorage.getItem('story');
        if (storyP == undefined) {
            storyP = 0;
        }
        //this.rounds = 1;
        if (this.rounds == 4 && storyP < 4) {
            console.log("load story4")
            cc.director.loadScene("Story4");
        } else if (this.rounds == 1 && storyP < 1) {
            console.log("load story1")
            cc.director.loadScene("Story1");
        } else if (this.rounds == 2 && storyP < 2) {
            console.log("load story2")
            cc.director.loadScene("Anlushan");
        } else if (this.rounds == 6 && storyP < 6) {
            console.log("load story6")
            cc.director.loadScene("Story6");
        } else if (this.rounds == 7 && storyP < 7) {
            console.log("load story7")
            cc.director.loadScene("Story7");
        } else if (this.rounds == 8 && storyP < 8) {
            console.log("load story8")
            cc.director.loadScene("Story8");
        } else if (this.rounds == 9 && storyP < 9) {
            console.log("load story9")
            cc.director.loadScene("Story9");
        } else if (this.rounds == 10 && storyP < 10) {
            console.log("load story10")
            cc.director.loadScene("Story10");
        } else if (this.rounds == 11 && storyP < 11) {
            console.log("load story11")
            cc.director.loadScene("Story11");
        } else if (this.rounds == 13 && storyP < 13) {
            console.log("load story13")
            cc.director.loadScene("Story13");
        } else if (this.rounds == 14 && storyP < 14) {
            console.log("load story14")
            cc.director.loadScene("Story14");
        } else if (this.rounds == 16 && storyP < 16) {
            console.log("load story16")
            cc.sys.localStorage.setItem('story', 16);
            cc.director.loadScene("Story16");
        } else if (this.rounds == 18 && storyP < 18) {
            console.log("load story18")
            cc.director.loadScene("Story18");
        } else if (this.rounds == 20 && storyP < 20) {
            console.log("load story20")
            cc.director.loadScene("Story20");
        } else if (this.rounds == 23 && storyP < 23) {
            console.log("load story23")
            cc.director.loadScene("Story23");
        } else if (this.rounds == 24 && storyP < 24) {
            console.log("load story24")
            cc.director.loadScene("Story24");
        } else if (this.rounds == 27 && storyP < 27) {
            console.log("load story27")
            cc.director.loadScene("Story27");
        } else if (this.rounds == 29 && storyP < 29) {
            console.log("load story29")
            cc.director.loadScene("Story29");
        } else if (this.rounds == 31 && storyP < 31) {
            console.log("load story31")
            cc.director.loadScene("Story31");
        } else if (this.rounds == 32 && storyP < 32) {
            console.log("load story32")
            cc.director.loadScene("Story32");
        } else if (this.rounds == 34 && storyP < 34) {
            console.log("load story34")
            cc.director.loadScene("Story34");
        } else if (this.rounds == 36 && storyP < 36) {
            console.log("load story36")
            cc.director.loadScene("Story36");
        } else if (this.rounds == 38 && storyP < 38) {
            console.log("load story38")
            cc.director.loadScene("Story38");
        } else if (this.rounds == 40 && storyP < 40) {
            console.log("load story40")
            cc.director.loadScene("Story40");
        } else if (this.rounds == 42 && storyP < 42) {
            console.log("load story42")
            cc.director.loadScene("Story42");
        } else if (this.rounds == 44 && storyP < 44) {
            console.log("load story44")
            cc.director.loadScene("Story44");
        } else if (this.rounds == 46 && storyP < 46) {
            console.log("load story46")
            cc.director.loadScene("Story46");
        } else if (this.rounds == 49 && storyP < 49) {
            console.log("load story49")
            cc.director.loadScene("Story49");
        } else if (this.rounds == 51 && storyP < 51) {
            console.log("load story50")
            cc.director.loadScene("Story50");
        } 
        //else { console.log(this.rounds + ' 11 ' + storyP); }
    },
    getName: function (str) {
        var str_length = 0;
        str_cut = new String();
        var str_len = str.length;
        for (var i = 0; i < str_len; i++) {
            a = str.charAt(i);
            str_length++;
            if (escape(a).length > 4) {
                //中文字符的长度经编码之后大于4  
                str_length++;
            }
            str_cut = str_cut.concat(a);
            if (str_length >= len) {
                str_cut = str_cut.concat("...");
                return str_cut;
            }
        }
        //如果给定字符串小于指定长度，则返回源字符串；  
        if (str_length < 3) {
            return str;
        }
    }
});