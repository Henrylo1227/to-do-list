// this controller loads data from server and return a list of tasks
const axios = require('../../../../node_modules/axios/dist/browser/axios.cjs');
const {
    DisplayAlert
} = require('../../AlertModule/controller/alertController');
const { MyAlert, FAILURE } = require('../../AlertModule/model/myAlert');

function loadTasksFromServer() {
    // retrieve task data from database by sending http request to server side
    // A promise with the set of task data is returned on success
    return new Promise((resolve, reject) => {
        axios('/todo/all-task')
            .then((response) => {
                console.debug(`TableInit: successfully retrieve table data: ${response.data}`);
                const dataList = response.data;
                console.debug(dataList);
                resolve(dataList);
            }).catch((error) => {
                const alert = new MyAlert(FAILURE, "Unable to retrieve data from database");
                DisplayAlert(alert);
                console.error(`loadTaskController: failed to retrieve table data: ${error.message}`);
                reject(error);
            });
    });
}

function removeATaskFromServer(taskId){
    // remove a task with taskId by sending http request to server side.
    // A promise with the new set of data is returned on success
    return new Promise((resolve, reject) => {
        axios({
            method: 'post',
            url: '/todo/remove-a-task',
            data: {
                taskId: taskId,
            }
        }).then( (response) => {
            // update table data
            const dataList = response.data;
            // alert
            DisplayAlert(new MyAlert(SUCCESS, "Successfully remove a task"));
            resolve(dataList);
        }).catch((error) => {
            DisplayAlert(new MyAlert(FAILURE, "Unable to remove task"))
            console.error(`removeATaskFromServer: failed to remove task: ${error.message}`);
            reject(error);
        });
    })
}

module.exports = {
    loadTasksFromServer,
    removeATaskFromServer
}