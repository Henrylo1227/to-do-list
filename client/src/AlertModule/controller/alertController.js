/* Alert Module 
all alerts are attached to a div #alert-row
there are three types of alerts.
1. success: the latest operation is successful
2. failure: the latest operation is failed
3. connection error: that the server is down, service is no longer avaliable
*/
const { CreateAlertView, AttachAllAlertView } = require('../view/alertView');
const { MyAlert } = require('../model/myAlert');
const { Queue } = require('@datastructures-js/queue');

const MAX_ALERT = 3;

const sleep = ms => new Promise(res => setTimeout(res, ms));

class AlertController {
    constructor (){
        this.alertQueue = new Queue();
    }

    addAlert(alert){
        this.alertQueue.dequeue();
        this.alertQueue.enqueue(alert);
        this.updateUI();
    }

    updateUI(){
        const alertArray = this.alertQueue.toArray();
        let alertViewList = [];
        alertArray.forEach(alert => {
            const newAlertView = CreateAlertView(alert);
            alertViewList.push(newAlertView);
        });
        AttachAllAlertView(alertViewList);
    }
}

module.exports = AlertController;