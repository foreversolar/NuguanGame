// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        back:cc.Button,
    },

    // LIFE-CYCLE CALLBACKS:

    //onLoad () {},

    start () {
        var ButtonComponent = this.node.getChildByName("Start");
        var Button = ButtonComponent.getComponent(cc.Button);
        var Back_Button = this.node.getChildByName("Back_Button");
        var B_Button = Back_Button.getComponent(cc.Button);
        var self = this;
        var QuestionAsset;
        cc.loader.loadRes('Question', function (err, jsonAsset) {
            if(err){
                console.log("Load json failed!");
            }
            QuestionAsset = jsonAsset.json;
        });

        //开始答题
        Button.node.on('click',function(){
            self.LoadQuestion(0,QuestionAsset); 
            self.node.getChildByName("headline").opacity = 255;
            self.node.getChildByName("Back_Button").opacity = 0;                      
            Button.interactable = false;
            ButtonComponent.opacity = 0;
            Back_Button.opacity = 0;
            B_Button.interactable = false;
        });
        this.back.node.on('click',function(){
            cc.director.loadScene("Game");
        })
    },

    //update (dt) {},
    LoadQuestion:function(index,QuestionAsset){
        //设置题目信息
        var right = 0;
        var Question_text = this.node.getChildByName("Question").getComponent(cc.Label);
        var correct_button;
        var choose_button;
        var sentence;
        var self = this;
        //答案选项
        var change = this.node.getChildByName("Change");
        var next = this.node.getChildByName("Next");
        var Answer1 = this.node.getChildByName("Answer1");
        var Answer2 = this.node.getChildByName("Answer2");
        var Answer3 = this.node.getChildByName("Answer3");

        //xunhauntou
        var text = QuestionAsset.Question[index];
        //sentence = text.Question +'\n'+ text.Answer[0] +'\n'+ text.Answer[1] +'\n'+ text.Answer[2];
        sentence = text.Question;
        Answer1.getChildByName("Background").getChildByName("Label").getComponent(cc.Label).string = text.Answer[0];
        Answer2.getChildByName("Background").getChildByName("Label").getComponent(cc.Label).string = text.Answer[1];
        Answer3.getChildByName("Background").getChildByName("Label").getComponent(cc.Label).string = text.Answer[2];
        Question_text.string = sentence;
        Answer1.opacity = 255;
        Answer2.opacity = 255;
        Answer3.opacity = 255;
        Answer1.getComponent(cc.Button).interactable = true;
        Answer2.getComponent(cc.Button).interactable = true;
        Answer3.getComponent(cc.Button).interactable = true;
        //设置正确答案
        switch(text.correct){
            case 1:
                correct_button = Answer1;
                break;
            case 2:
                correct_button = Answer2;
                break;
            case 3:
                correct_button = Answer3;
                break;
        }
        
        Answer1.on('click',function(){            
            correct_button.getChildByName("right").opacity = 255;
            // cc.loader.loadRes('/picture/btn_xuanzhongdaan', function (err, texture) { 
            //     if(err){
            //         console.log("Load xuanzhong failed!");
            //     }
            //     var sprite  = new cc.SpriteFrame(texture);
            //     Answer1.getChildByName("Background").getComponent(cc.Sprite).spriteFrame = sprite;
            // });

            cc.loader.loadRes("/picture/KnowledgeCard/KnowledgeCard", cc.SpriteAtlas, function (err, atlas) {
                if(err){
                    console.log("Load xuanzhong failed!");
                }
                var sprite = atlas.getSpriteFrame('btn_xuanzhongdaan');
                Answer1.getChildByName("Background").getComponent(cc.Sprite).spriteFrame = sprite;
                Answer1.getChildByName("Background").getChildByName("Label").color = cc.color("#FFFFFFC5");
                Answer1.width=Answer1.width*2.5;
                Answer1.height=Answer1.height*2.5;
            });

            if(Answer1!=correct_button){
                    Answer1.getChildByName("false").opacity = 255;
            }
            else{
                right++;
            }
            self.turn(1);
            Answer1.getComponent(cc.Button).interactable = false;
            Answer2.getComponent(cc.Button).interactable = false;
            Answer3.getComponent(cc.Button).interactable = false;
            change.getComponent(cc.Button).interactable = true;
            change.opacity = 255;
            next.getComponent(cc.Button).interactable = true;
            next.opacity = 255;
            choose_button = Answer1;
            Question_text.string = text.explain;
            console.log(Question_text.string);
        });

        Answer2.on('click',function(){
            correct_button.getChildByName("right").opacity = 255;
            // cc.loader.loadRes('/picture/btn_xuanzhongdaan', function (err, texture) { 
            //     if(err){
            //         console.log("Load xuanzhong failed!");
            //     }
            //     var sprite  = new cc.SpriteFrame(texture);
            //     Answer2.getChildByName("Background").getComponent(cc.Sprite).spriteFrame = sprite;
            // });

            cc.loader.loadRes("/picture/KnowledgeCard/KnowledgeCard", cc.SpriteAtlas, function (err, atlas) {
                if(err){
                    console.log("Load xuanzhong failed!");
                }
                var sprite = atlas.getSpriteFrame('btn_xuanzhongdaan');
                Answer2.getChildByName("Background").getComponent(cc.Sprite).spriteFrame = sprite;
                Answer2.getChildByName("Background").getChildByName("Label").color = cc.color("#FFFFFFC5");
                Answer2.width=Answer2.width*2;
                Answer2.height=Answer2.height*2;
            });

            if(Answer2!=correct_button){
                Answer2.getChildByName("false").opacity = 255;
            }
            else{
                right++;
            }
            self.turn(1);
            Answer1.getComponent(cc.Button).interactable = false;
            Answer2.getComponent(cc.Button).interactable = false;
            Answer3.getComponent(cc.Button).interactable = false;
            change.getComponent(cc.Button).interactable = true;
            change.opacity = 255;
            
            next.getComponent(cc.Button).interactable = true;
            next.opacity = 255;
            choose_button = Answer2;
            Question_text.string = text.explain;
        });

        Answer3.on('click',function(){
            correct_button.getChildByName("right").opacity = 255;
            // cc.loader.loadRes('/picture/btn_xuanzhongdaan', function (err, texture) { 
            //     if(err){
            //         console.log("Load xuanzhong failed!");
            //     }
            //     var sprite  = new cc.SpriteFrame(texture);
            //     Answer3.getChildByName("Background").getComponent(cc.Sprite).spriteFrame = sprite;
            // });

            cc.loader.loadRes("/picture/KnowledgeCard/KnowledgeCard", cc.SpriteAtlas, function (err, atlas) {
                if(err){
                    console.log("Load xuanzhong failed!");
                }
                var sprite = atlas.getSpriteFrame('btn_xuanzhongdaan');
                Answer3.getChildByName("Background").getComponent(cc.Sprite).spriteFrame = sprite;
                Answer3.getChildByName("Background").getChildByName("Label").color = cc.color("#FFFFFFC5");
                Answer3.width=Answer3.width*3;
                Answer3.height=Answer3.height*3;
            });


            if(Answer3!=correct_button){
                Answer3.getChildByName("false").opacity = 255;
            }
            else{
                right++;
            }
            self.turn(1);
            Answer1.getComponent(cc.Button).interactable = false;
            Answer2.getComponent(cc.Button).interactable = false;
            Answer3.getComponent(cc.Button).interactable = false;
            change.getComponent(cc.Button).interactable = true;
            change.opacity = 255;
            next.getComponent(cc.Button).interactable = true;
            next.opacity = 255;
            choose_button = Answer3;
            Question_text.string = text.explain;
        });
        
        change.on('click',function(){
            if(Question_text.string != sentence){
                Question_text.string = sentence;
                self.turn(0);
            }
            else{
                Question_text.string = text.explain;
                self.turn(1);
            }
        });

        next.on('click',function(){
            if(index == 0){
                // cc.loader.loadRes('/picture/btn_weixuanzhongdaan', function (err, texture) { 
                //     if(err){
                //         console.log("Load xuanzhong failed!");
                //     }
                //     var sprite  = new cc.SpriteFrame(texture);
                //     choose_button.getChildByName("Background").getComponent(cc.Sprite).spriteFrame = sprite;
                // });

                cc.loader.loadRes("/picture/KnowledgeCard/KnowledgeCard", cc.SpriteAtlas, function (err, atlas) {
                    if(err){
                        console.log("Load xuanzhong failed!");
                    }
                    var sprite = atlas.getSpriteFrame('btn_weixuanzhongdaan');
                    choose_button.getChildByName("Background").getComponent(cc.Sprite).spriteFrame = sprite;
                    choose_button.getChildByName("Background").getChildByName("Label").color = cc.color(138,51,51);
                });
                self.turn(0);
                correct_button.getChildByName("right").opacity = 0;
                choose_button.getChildByName("false").opacity = 0;
                change.getComponent(cc.Button).interactable = false;
                change.opacity = 0;
                next.getComponent(cc.Button).interactable = false;
                next.opacity = 0;
                index++;
                text = QuestionAsset.Question[index];
                //sentence = text.Question +'\n'+ text.Answer[0] +'\n'+ text.Answer[1] +'\n'+ text.Answer[2];
                sentence = text.Question;
                Answer1.getChildByName("Background").getChildByName("Label").getComponent(cc.Label).string = text.Answer[0];
                Answer2.getChildByName("Background").getChildByName("Label").getComponent(cc.Label).string = text.Answer[1];
                Answer3.getChildByName("Background").getChildByName("Label").getComponent(cc.Label).string = text.Answer[2];
                Question_text.string = sentence;
                Answer1.getComponent(cc.Button).interactable = true;
                Answer2.getComponent(cc.Button).interactable = true;
                Answer3.getComponent(cc.Button).interactable = true;
                switch(text.correct){
                    case 1:
                        correct_button = Answer1;
                        break;
                    case 2:
                        correct_button = Answer2;
                        break;
                    case 3:
                        correct_button = Answer3;
                        break;
                }
            }
            else{
                // cc.loader.loadRes('/picture/btn_weixuanzhongdaan', function (err, texture) { 
                //     if(err){
                //         console.log("Load xuanzhong failed!");
                //     }
                //     var sprite  = new cc.SpriteFrame(texture);
                //     choose_button.getChildByName("Background").getComponent(cc.Sprite).spriteFrame = sprite;
                // });

                cc.loader.loadRes("/picture/KnowledgeCard/KnowledgeCard", cc.SpriteAtlas, function (err, atlas) {
                    if(err){
                        console.log("Load xuanzhong failed!");
                    }
                    var sprite = atlas.getSpriteFrame('btn_weixuanzhongdaan');
                    choose_button.getChildByName("Background").getComponent(cc.Sprite).spriteFrame = sprite;
                });


                Answer1.opacity = 0;
                Answer2.opacity = 0;
                Answer3.opacity = 0;
                var head = self.node.getChildByName("headline");
                var Back_Button = self.node.getChildByName("Back_Button");
                var B_Button = Back_Button.getComponent(cc.Button);
                Back_Button.opacity = 255;
                head.opacity = 0;
                B_Button.interactable = true;
                self.AddScore(right);
                Question_text.string = "你答对了"+right+"道题目，获得经验"+right*30+",点击右上角返回";
                next.opacity = 0;
                next.getComponent(cc.Button).interactable = false;
                change.opacity = 0;
                change.getComponent(cc.Button).interactable = false;
            }
        });
    },

    turn:function(q_a){
        var head = this.node.getChildByName("headline");
        var address = "";
        if(q_a == 1){
            address += 'ui_答案解析';
        }
        else{
            address +='ui_知识卡片标题';
        }

        cc.loader.loadRes("/picture/KnowledgeCard/KnowledgeCard", cc.SpriteAtlas, function (err, atlas) {
            if(err){
                console.log("Load xuanzhong failed!");
            }
            var sprite = atlas.getSpriteFrame(address);
            head.getComponent(cc.Sprite).spriteFrame = sprite;
        });

        // cc.loader.loadRes(address,function(err,texture){
        //     if(err){
        //         console.log("Turn failed!");
        //     }
        //     console.log(address)
        //     var sprite = new cc.SpriteFrame(texture);
        //     head.getComponent(cc.Sprite).spriteFrame = sprite;
        // })
    },

    setButton:function(Button,t_f){
        Button.getComponent(cc.Button).interactable = t_f;
        if(t_f){
            Button.opacity = 255;
        }
        else{
            Button.opacity = 0;
        }
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
                        knowledge:res.data[0].knowledge+right*30,
                        study_times:res.data[0].study_times+1,
                    }
                })
            }
        });
    }
});