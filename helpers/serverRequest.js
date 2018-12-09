// const configFile =  require('../config.json');
const BACKEND_SERVER = process.env.BACKEND_SERVER || "https://www.yalynka.info/"//configFile.BACKEND_SERVER;
const fetch = require('node-fetch');
const request = require('request');
const bot = require('./bot');

const get = async (number, url , callback) => {
    const requestOptions = {
        agent: new (require("https").Agent)({
			rejectUnauthorized: false
		}),      
        method:'POST',
        body:"form_data=namber%3D"+number,
        headers:{ 
            'Content-Type':'application/x-www-form-urlencoded'
        }
    };
    console.log(requestOptions);
    callback(await fetch(BACKEND_SERVER+url, requestOptions).then(res=>res.text()))
}


//ajax-curl.php

module.exports={
    get,
}