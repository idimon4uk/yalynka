// const configFile =  require('../config.json');
const TELEGRAM_TOKEN = process.env.TELEGRAM_TOKEN || "1234:test"//configFile.TOKEN;
const fetch = require('node-fetch');
const request = require('request');
const TELEGRAM_SERVER_URL = "https://api.telegram.org/bot"+TELEGRAM_TOKEN;
const SEND_MESSAGE_URL = TELEGRAM_SERVER_URL+'/sendMessage';
const SEND_PHOTO_URL = TELEGRAM_SERVER_URL+'/sendPhoto';

const sendMessage = async (id, message,callback) =>{
    
    const requestOptions = {
        method: 'POST',
		body: JSON.stringify({
            chat_id: id,
            text: message,
            parse_mode:"HTML"
            
        }),
        headers: { 'Content-Type': 'application/json' },
    };

    console.log(requestOptions,SEND_MESSAGE_URL);
    callback(await fetch(SEND_MESSAGE_URL, requestOptions).then(res => res.text()));

}

const sendPhoto = async (id, photo, caption, reply_markup, callback) =>{
    const requestOptions = {
        method: 'POST',
		body: JSON.stringify({
            chat_id: id,
            photo:photo,
            caption: caption,
            reply_markup:reply_markup
            
        }),
        headers: { 'Content-Type': 'application/json' },
    };

    console.log(requestOptions,SEND_MESSAGE_URL);
    callback(await fetch(SEND_PHOTO_URL, requestOptions).then(res => res.text()));
}

module.exports ={
    sendMessage,
    sendPhoto
}