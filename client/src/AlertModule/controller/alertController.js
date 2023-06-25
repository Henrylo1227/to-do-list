/* Alert Module 
all alerts are attached to a div #alert-row
there are three types of alerts.
1. success: the latest operation is successful
2. failure: the latest operation is failed
3. connection error: that the server is down, service is no longer avaliable
*/
const { CreateAlertView, AttachAlertView, EmptyAlertView } = require('../view/alertView');

function DisplayAlert(alert){
    AttachAlertView(CreateAlertView(alert));
}

function ClearAlert(){
    EmptyAlertView();
}

module.exports = { DisplayAlert, ClearAlert};