const express = require('express');
const router = express.Router();
const server = require('../helpers/serverRequest')
const bot = require('../helpers/bot');
router.get('/test', async (req, res) => {
    res.status(200).json({ message: "succsess" })
})
// const configFile =  require('../config.json');
const BACKEND_SERVER = process.env.BACKEND_SERVER || "https://www.yalynka.info/" //configFile.BACKEND_SERVER;
router.post('/', async (req, res) => {
    try {
        console.log(req);
        const { message, callback_query } = req.body;
        if (message) {
            const {
                chat,
                from,
                text,
                message_id,
                group_chat_created,
                left_chat_member,
                left_chat_participant,
                new_chat_member,
                new_chat_members,
                new_chat_participant,
                migrate_to_chat_id,
                migrate_from_chat_id,
                new_chat_title
            } = message;
            var namber = text;
            server.get(text,"ajax-curl.php",(status)=>{
                var text = "ДЛЯ ПЕРЕВІРКИ ВВЕДІТЬ \nНОМЕР ЕТИКЕТКИ АБО БИРКИ";
                var photo = BACKEND_SERVER+"images/logo.png"
                if(status.indexOf('/images/tree-false.png') !== -1){
                        text = "ВАША ЯЛИНКА НЕ ЗАРЕЄСТРОВАНА \nУ СИСТЕМІ ЕЛЕКТРОННОГО \nОБЛІКУ ДЕРЕВИНИ\nЦе означає, що її могли зрубати незаконно \nКУПУЙ ЛЕГАЛЬНУ ЯЛИНКУ,ВРЯТУЙ ЛІСИ УКРАЇНИ!";
                    var button = {
                        inline_keyboard:[[]]
                    }
                    photo = BACKEND_SERVER+"images/tree-false.png"
                    
                }
                else if (status.indexOf('/images/tree-ok.png') !== -1) {
                       text = "ВІТАЄМО! \nВАША ЯЛИНКА ЛЕГАЛЬНА"
                    var button = {
                        inline_keyboard:[[{
                            text:"Познайомитися з ялинкою",
                            callback_data:namber
                        }]]
                    }
                    photo = BACKEND_SERVER+"images/tree-ok.png"
                }
                bot.sendPhoto(chat.id,photo,text,button,(requestStatus)=>{
                    res.status(200).json({ status: requestStatus })

                    console.log(requestStatus);
                })
                
            })
        }
        else if (callback_query){
            const {
                data,
                message
            } = callback_query;

            server.get(data,"ajax-curl.php",(status)=>{
                var photo = BACKEND_SERVER+"images/description.png"
                var button = {
                    inline_keyboard:[[]]
                }
                var data = status.split('<div class="item-detalies"><span>');
                data[0] = "Вітаємо!\n"
                data = data.map(d=> d.replace('</span>',':'))
                data = data.map(d=> d.replace('</div>','\n'))
                data[data.length-1] = data[data.length-1].split('\n')[0]
                var text = '';
                data.map(e=>{
                    text += e;
                })
                bot.sendPhoto(message.chat.id,photo,text,button,(requestStatus)=>{
                    console.log(requestStatus);
                    res.status(200).json({ status: requestStatus })
                })
            });
        }

        // console.log(data,message.from.id)
        // res.status(200).json({ status: 200 })
    }
    catch (err) {
        console.log(err);
        res.status(200).send(err.toString());
    }
})
module.exports = router;