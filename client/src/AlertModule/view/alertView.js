/* Alert Module 
all alerts are attached to a div #alert-row
there are three types of alerts.
1. success: the latest operation is successful
2. failure: the latest operation is failed
3. connection error: that the server is down, service is no longer avaliable
*/
const { MyAlert, SUCCESS, FAILURE, CONNECT_ERROR } = require('../model/myAlert'); 

function CreateAlertView(alert){
    // Create a view for the alert according to alert type
    // parameter: alert: MyAlert
    // reutrn: a html view of the alert

    let alertView = $('<div></div>').text(alert.msg);

    if (alert.type == SUCCESS){
        alertView
        .addClass('p-2 alert alert-success w-100')
        .attr('role', 'alert');
        return alertView;
    }

    if (alert.type == FAILURE){
        alertView
        .addClass('p-2 alert alert-danger w-100')
        .attr('role', 'alert');
        return alertView;
    }
    if (alert.type == CONNECT_ERROR){
        alertView
        .addClass('p-2 alert alert-warning w-100')
        .attr('role', 'alert');
        return alertView;
    }

}

function AttachAllAlertView(alertViewList){
    // TODO
    // Attach all alertView in the alertViewList to the alertRow
    const alertRow = $('#alert-row');

    // clear alerts in alert row
    alertRow.empty();

    // reattach all existing alertViewList
    alertViewList.forEach(view => {
        alertRow.append(view);
    });
}

module.exports = { CreateAlertView, AttachAllAlertView };