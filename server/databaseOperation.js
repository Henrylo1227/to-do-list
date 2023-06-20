const {CONNECT_ERROR, SUCCESS, FAILURE, MyAlert} = require("../client/src/AlertModule/model/MyAlert")

const delay = ms => new Promise(res => setTimeout(res, ms));


async function testss(){
    const a1 = new MyAlert(SUCCESS, "tesmp");

    a1.setExpiredCounter();
    await delay(10000);
    console.log('done');
}


testss();