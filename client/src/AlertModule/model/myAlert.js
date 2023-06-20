/* Alert Module 
all alerts are attached to a div #alert-row
there are three types of alerts.
1. success: the latest operation is successful
2. failure: the latest operation is failed
3. connection error: that the server is down, service is no longer avaliable
*/

// TYPE CODE
const SUCCESS = 1;
const FAILURE = 2;
const CONNECT_ERROR = 3;

class MyAlert {
    constructor (type, msg){
        this.type = type;
        this.msg = msg;
    }

}

module.exports = { MyAlert, SUCCESS, FAILURE, CONNECT_ERROR };