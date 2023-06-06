/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/app.js":
/*!********************!*\
  !*** ./src/app.js ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _taskTable_module_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./taskTable/module.js */ \"./src/taskTable/module.js\");\n\r\n\r\n(0,_taskTable_module_js__WEBPACK_IMPORTED_MODULE_0__.TableInit)();\n\n//# sourceURL=webpack://to-do-list_nodejs/./src/app.js?");

/***/ }),

/***/ "./src/taskTable/Task.js":
/*!*******************************!*\
  !*** ./src/taskTable/Task.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nclass Task{\r\n    constructor(selectState, checkState, description){\r\n        this.selectState = selectState;\r\n        this.checkState = checkState;\r\n        this.description = description;\r\n    }\r\n\r\n    //Method\r\n    toggleSelectState(){\r\n        this.selectState = !this.selectState;\r\n    }\r\n\r\n    toggleCheckState(){\r\n        this.checkState = !this.checkState;\r\n    }\r\n\r\n    getCheckState(){\r\n        return this.checkState;\r\n    }\r\n\r\n    getSelectState(){\r\n        return this.selectState;\r\n    }\r\n\r\n    getDescription(){\r\n        return this.description;\r\n    }\r\n}\r\n\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Task);\n\n//# sourceURL=webpack://to-do-list_nodejs/./src/taskTable/Task.js?");

/***/ }),

/***/ "./src/taskTable/TaskTable.js":
/*!************************************!*\
  !*** ./src/taskTable/TaskTable.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   TaskTable: () => (/* binding */ TaskTable),\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _removeTask_removeTaskManager_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./removeTask/removeTaskManager.js */ \"./src/taskTable/removeTask/removeTaskManager.js\");\n/* harmony import */ var _checkTask_checkTaskManager_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./checkTask/checkTaskManager.js */ \"./src/taskTable/checkTask/checkTaskManager.js\");\n/* harmony import */ var _Task_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Task.js */ \"./src/taskTable/Task.js\");\n\r\n\r\n\r\nclass TaskTable {\r\n    constructor() {\r\n      this.taskList = [];\r\n    }\r\n  \r\n    // Methods\r\n    getTaskNum() {\r\n      return this.taskNum;\r\n    }\r\n  \r\n    appendTaskToTable(task, id) {\r\n      this.taskList.push(task);\r\n      this.createTaskUI(task, id);\r\n      this.attachCheckTaskBtnListener(id);\r\n      this.attachDelTaskBtnListener(id);\r\n    }\r\n  \r\n    // create empty task table with headings and an empty body\r\n    createTaskTableUI() {\r\n      const itemTableRow = $('<div></div>').addClass('row');\r\n      const itemTable = $('<table></table>').addClass('table table-hover');\r\n      itemTableRow.append(itemTable);\r\n  \r\n      const thead = $('<thead></thead>');\r\n      itemTable.append(thead);\r\n  \r\n      const tr = $('<tr></tr>');\r\n      thead.append(tr);\r\n  \r\n      const th1 = $('<th></th>').addClass('col-sm-1').attr('scope', 'col');\r\n      tr.append(th1);\r\n  \r\n      const selectAllBox = $('<input>')\r\n        .attr('id', 'select-all-checkbox')\r\n        .addClass('form-check-input')\r\n        .attr('type', 'checkbox')\r\n        .prop('checked', false)\r\n        .attr('aria-label', 'select all items');\r\n      th1.append(selectAllBox);\r\n  \r\n      const th2 = $('<th></th>').addClass('col-sm-1').text('#').attr('scope', 'col');\r\n      tr.append(th2);\r\n  \r\n      const th3 = $('<th></th>').addClass('col-sm-8').text('Task').attr('scope', 'col');\r\n      tr.append(th3);\r\n  \r\n      const th4 = $('<th></th>').addClass('col-sm-1').attr('scope', 'col');\r\n      tr.append(th4);\r\n  \r\n      const checkBtn = $('<button></button>')\r\n        .attr('id', 'check-selected-btn')\r\n        .attr('type', 'button')\r\n        .addClass('btn btn-success');\r\n      th4.append(checkBtn);\r\n  \r\n      const checkBtnImg = $('<i></i>').addClass('fa-solid fa-check');\r\n      checkBtn.append(checkBtnImg);\r\n  \r\n      const th5 = $('<th></th>').addClass('col-sm-1').attr('scope', 'col');\r\n      tr.append(th5);\r\n  \r\n      const removeAllBtn = $('<button></button>')\r\n        .attr('id', 'remove-selected-btn')\r\n        .attr('type', 'button')\r\n        .addClass('btn btn-danger');\r\n      th5.append(removeAllBtn);\r\n  \r\n      const delBtnImg = $('<i></i>').addClass('fa-solid fa-trash-can');\r\n      removeAllBtn.append(delBtnImg);\r\n  \r\n      // Append to the html\r\n      const mainContainer = $('#main-container');\r\n      mainContainer.append(itemTableRow);\r\n  \r\n      // Append table body, where the task is added here;\r\n      const tableBody = $('<tbody></tbody>').attr('id', 'table-body').addClass('table-group-divider');\r\n      itemTable.append(tableBody);\r\n    }\r\n  \r\n    // create task row in the table with task[Object] and its object id\r\n    createTaskUI(task, id) {\r\n      const tr = $('<tr></tr>');\r\n  \r\n      // select checkbox\r\n      const selectCheckBoxTd = $('<td></td>').attr('scope', 'row');\r\n      tr.append(selectCheckBoxTd);\r\n  \r\n      const taskSelectCheckbox = $('<input>')\r\n        .attr('id', 'select-' + id)\r\n        .prop('checked', task.getSelectState())\r\n        .addClass('form-check-input')\r\n        .attr('type', 'checkbox')\r\n        .val(task.getSelectState().toString())\r\n        .attr('aria-label', 'check the item: ' + id);\r\n      selectCheckBoxTd.append(taskSelectCheckbox);\r\n  \r\n      // #id\r\n      const idTd = $('<td></td>').text(id + 1); // index to #\r\n      tr.append(idTd);\r\n  \r\n      // Task description\r\n      const taskDescTd = $('<td></td>');\r\n      if (task.getCheckState()){\r\n        const strikedText = $('<s></s>').text(task.getDescription());\r\n        taskDescTd.append(strikedText);\r\n      }else{\r\n        taskDescTd.text(task.getDescription());\r\n      }\r\n      tr.append(taskDescTd);\r\n  \r\n      // Task check btn\r\n      const taskCheckTd = $('<td></td>');\r\n      tr.append(taskCheckTd);\r\n  \r\n      const taskCheckBtn = $('<button></button>')\r\n        .attr('type', 'button')\r\n        .addClass('btn btn-light')\r\n        .attr('aria-label', 'check task: ' + task.getDescription());\r\n      const taskCheckBtnId = 'check-' + id;\r\n      taskCheckBtn.attr('id', taskCheckBtnId);\r\n      taskCheckTd.append(taskCheckBtn);\r\n  \r\n      const taskCheckImg = $('<i></i>').addClass('fa-sharp fa-solid fa-check');\r\n      taskCheckBtn.append(taskCheckImg);\r\n  \r\n      // Task delete btn\r\n      const taskDelTd = $('<td></td>');\r\n      tr.append(taskDelTd);\r\n  \r\n      const taskDelBtn = $('<button></button>')\r\n        .attr('type', 'button')\r\n        .addClass('btn btn-light')\r\n        .attr('aria-label', 'remove task: ' + task.getDescription());\r\n      const delBtnId = 'del-' + id;\r\n      taskDelBtn.attr('id', delBtnId);\r\n      taskDelTd.append(taskDelBtn);\r\n  \r\n      const delBtnImg = $('<i></i>').addClass('fa-regular fa-trash-can');\r\n      taskDelBtn.append(delBtnImg);\r\n  \r\n      // Attach newly created table row to the table body\r\n      const tableBody = $('#table-body');\r\n      tableBody.append(tr);\r\n    }\r\n\r\n    //check / uncheck single task\r\n    attachCheckTaskBtnListener(taskId){\r\n      const btn = $('#check-' + taskId);\r\n      if (btn != null){\r\n        console.log('Attach check btn listener');\r\n        btn.on('click', ()=>{\r\n          (0,_checkTask_checkTaskManager_js__WEBPACK_IMPORTED_MODULE_1__.checkATask)(this, taskId);\r\n        });\r\n      } else {\r\n        console.log('btn object is null, taskId: ' + taskId);\r\n        console.log(this.taskList);\r\n      }\r\n    }\r\n  \r\n    //remove / delete single task\r\n    attachDelTaskBtnListener(taskId) {\r\n      const btn = $('#del-' + taskId);\r\n      if (btn != null) {\r\n        btn.on('click', () => {\r\n          // the taskId of the deleted item\r\n          (0,_removeTask_removeTaskManager_js__WEBPACK_IMPORTED_MODULE_0__.removeATask)(this, taskId);  \r\n        \r\n        });\r\n      } else {\r\n        console.log('btn object is null, taskId: ' + taskId);\r\n        console.log(this.taskList);\r\n      }\r\n    }\r\n  \r\n    // apply change\r\n    reloadTableUI() {\r\n      const tableBody = $('#table-body');\r\n      tableBody.empty();\r\n      this.taskList.forEach((task, index) => {\r\n        //index as taskId\r\n        this.createTaskUI(task, index);\r\n        //check\r\n        this.attachCheckTaskBtnListener(index);\r\n        //del\r\n        this.attachDelTaskBtnListener(index);\r\n      });\r\n    }\r\n  }\r\n  \r\n  /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (TaskTable);\r\n  \n\n//# sourceURL=webpack://to-do-list_nodejs/./src/taskTable/TaskTable.js?");

/***/ }),

/***/ "./src/taskTable/addNewTask/AddNewTaskManager.js":
/*!*******************************************************!*\
  !*** ./src/taskTable/addNewTask/AddNewTaskManager.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   addTaskInit: () => (/* binding */ addTaskInit)\n/* harmony export */ });\n/* harmony import */ var _Task_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Task.js */ \"./src/taskTable/Task.js\");\n/* harmony import */ var _TaskTable_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../TaskTable.js */ \"./src/taskTable/TaskTable.js\");\n\r\n\r\n\r\nfunction addTaskInit(table){\r\n\r\n    const addNewTaskBtn = document.getElementById('add-new-task-btn');\r\n\r\n    addNewTaskBtn.addEventListener('click', ()=>{\r\n        showCreateNewTaskModalForm(table);\r\n    });\r\n    \r\n}\r\n\r\n//create a modal form to collect infomation on new task\r\nfunction showCreateNewTaskModalForm(table){\r\n    $('#addTaskModal').modal('show');\r\n    const createTaskBtn = document.getElementById('createTaskBtn');\r\n    const taskDescriptionInput = document.getElementById('taskDescription');\r\n\r\n    taskDescriptionInput.addEventListener('keypress', (event) =>{\r\n        if (event.key === 'Enter'){\r\n            createTaskBtn.click();\r\n        }\r\n    });\r\n    \r\n    createTaskBtn.addEventListener('click', () => {\r\n        const taskDescription = taskDescriptionInput.value;\r\n        if (taskDescription.trim() !== '') {\r\n            // Perform task creation logic here\r\n            const newTask = new _Task_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"](false, false, taskDescription.trim());\r\n            addTaskToTable(newTask, table);\r\n\r\n            // Reset the input field\r\n            taskDescriptionInput.value = '';\r\n\r\n            // Close the modal\r\n            $('#addTaskModal').modal('hide');\r\n        }  \r\n    });\r\n\r\n}\r\n\r\nfunction addTaskToTable(newTask, table){\r\n    table.appendTaskToTable(newTask, table.taskList.length);\r\n}\r\n\r\n\n\n//# sourceURL=webpack://to-do-list_nodejs/./src/taskTable/addNewTask/AddNewTaskManager.js?");

/***/ }),

/***/ "./src/taskTable/checkTask/checkTaskManager.js":
/*!*****************************************************!*\
  !*** ./src/taskTable/checkTask/checkTaskManager.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   checkATask: () => (/* binding */ checkATask),\n/* harmony export */   checkTaskInit: () => (/* binding */ checkTaskInit)\n/* harmony export */ });\n/* harmony import */ var _selectTask_SelectorManager_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../selectTask/SelectorManager.js */ \"./src/taskTable/selectTask/SelectorManager.js\");\n\r\nfunction checkTaskInit(table){\r\n    //add check-selected-task btn listener\r\n    $('#check-selected-btn').on('click', ()=>{\r\n        ///check all selected task\r\n        const selectedTasks = (0,_selectTask_SelectorManager_js__WEBPACK_IMPORTED_MODULE_0__.getCheckedSelectorList)();\r\n        const selectedTaskIdList = [];\r\n        selectedTasks.forEach( (e) => {\r\n            console.log('check selected: ' +e.id.slice(7));\r\n            selectedTaskIdList.push(e.id.slice(7));\r\n        });\r\n        checkSelectedTasks(table, selectedTaskIdList);\r\n    });\r\n\r\n}\r\n\r\n//check a single task in the table\r\nfunction checkATask(table, taskId){\r\n    console.log('checkATask: checking a task with taskId: '+taskId);\r\n    console.log('\\ttask checked status (before): '+table.taskList[taskId].getCheckState());\r\n    table.taskList[taskId].toggleCheckState();\r\n    console.log('\\ttask checked status (after): '+table.taskList[taskId].getCheckState());\r\n    //table.taskList[taskId]\r\n    table.reloadTableUI();\r\n\r\n}\r\n\r\nfunction checkSelectedTasks(table, taskIdList){\r\n    for (let i = 0; i < taskIdList.length; i++){\r\n        let taskId = taskIdList[i];\r\n        console.log('checkATask: checking a task with taskId: '+taskId);\r\n        console.log('\\ttask checked status (before): '+table.taskList[taskId].getCheckState());\r\n        table.taskList[taskId].toggleCheckState();\r\n        console.log('\\ttask checked status (after): '+table.taskList[taskId].getCheckState());\r\n    }\r\n    table.reloadTableUI();\r\n}\r\n\r\n\n\n//# sourceURL=webpack://to-do-list_nodejs/./src/taskTable/checkTask/checkTaskManager.js?");

/***/ }),

/***/ "./src/taskTable/module.js":
/*!*********************************!*\
  !*** ./src/taskTable/module.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   TableInit: () => (/* binding */ TableInit)\n/* harmony export */ });\n/* harmony import */ var _Task_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Task.js */ \"./src/taskTable/Task.js\");\n/* harmony import */ var _TaskTable_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./TaskTable.js */ \"./src/taskTable/TaskTable.js\");\n/* harmony import */ var _addNewTask_AddNewTaskManager_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./addNewTask/AddNewTaskManager.js */ \"./src/taskTable/addNewTask/AddNewTaskManager.js\");\n/* harmony import */ var _removeTask_removeTaskManager_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./removeTask/removeTaskManager.js */ \"./src/taskTable/removeTask/removeTaskManager.js\");\n/* harmony import */ var _selectTask_SelectorManager_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./selectTask/SelectorManager.js */ \"./src/taskTable/selectTask/SelectorManager.js\");\n/* harmony import */ var _checkTask_checkTaskManager_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./checkTask/checkTaskManager.js */ \"./src/taskTable/checkTask/checkTaskManager.js\");\n\r\n\r\n\r\n\r\n\r\n\r\n\r\nfunction TableInit(){\r\n    const taskTable = new _TaskTable_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"]();\r\n    taskTable.createTaskTableUI();\r\n\r\n    loadSampleData(taskTable);\r\n    loadModules(taskTable);\r\n\r\n}\r\n\r\n// sample data\r\nfunction loadSampleData(table){\r\n    /*sample data*/\r\n    const task1 = new _Task_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"](false, false, 'test1');\r\n    const task2 = new _Task_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"](false, false, 'test2');\r\n    const task3 = new _Task_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"](true, true, 'test3');\r\n    const task4 = new _Task_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"](false, false, 'test4');\r\n    const task5 = new _Task_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"](false, false, 'test5');\r\n    \r\n    const tempTaskList = [];\r\n    tempTaskList.push(task1);\r\n    tempTaskList.push(task2);\r\n    tempTaskList.push(task3);\r\n    tempTaskList.push(task4);\r\n    tempTaskList.push(task5);\r\n    //add sample data to the table\r\n    tempTaskList.forEach( (task, index) => { \r\n        table.appendTaskToTable(task, index);\r\n    });\r\n    /*handled right after database input*/\r\n}\r\n\r\n// read data from db\r\n\r\n//add all button listeners\r\nfunction loadModules(table){\r\n\r\n    //addNewTask Module\r\n    (0,_addNewTask_AddNewTaskManager_js__WEBPACK_IMPORTED_MODULE_2__.addTaskInit)(table);\r\n\r\n    //selectTask Module\r\n    (0,_selectTask_SelectorManager_js__WEBPACK_IMPORTED_MODULE_4__.selectorInit)();\r\n    \r\n    //removeTask Module\r\n    (0,_removeTask_removeTaskManager_js__WEBPACK_IMPORTED_MODULE_3__.removeTaskInit)(table);\r\n\r\n    //checkTask Module\r\n    (0,_checkTask_checkTaskManager_js__WEBPACK_IMPORTED_MODULE_5__.checkTaskInit)(table);\r\n\r\n    \r\n}\n\n//# sourceURL=webpack://to-do-list_nodejs/./src/taskTable/module.js?");

/***/ }),

/***/ "./src/taskTable/removeTask/removeTaskManager.js":
/*!*******************************************************!*\
  !*** ./src/taskTable/removeTask/removeTaskManager.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   removeATask: () => (/* binding */ removeATask),\n/* harmony export */   removeTaskInit: () => (/* binding */ removeTaskInit)\n/* harmony export */ });\n/* harmony import */ var _selectTask_SelectorManager_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../selectTask/SelectorManager.js */ \"./src/taskTable/selectTask/SelectorManager.js\");\n\r\nfunction removeTaskInit(table){\r\n    $('#remove-selected-btn').on('click', ()=>{\r\n        const selectedTasks = (0,_selectTask_SelectorManager_js__WEBPACK_IMPORTED_MODULE_0__.getCheckedSelectorList)();\r\n        const selectedTaskIdList = [];\r\n        selectedTasks.forEach( (e) => {\r\n            console.log(e.id.slice(7));\r\n            selectedTaskIdList.push(e.id.slice(7));//select-n --> n; extract the taskId from the html checkbox id \r\n        });\r\n        removeSelectedTasks(table, selectedTaskIdList);\r\n    });\r\n}\r\n\r\n\r\n//remove a task with taskid from table\r\nfunction removeATask(table, taskId){\r\n    const tempList = [];\r\n    for (let i = 0; i < table.taskList.length; i++) {\r\n      if (i != taskId) {\r\n        tempList.push(table.taskList[i]);\r\n      }\r\n    }\r\n    table.taskList = tempList;\r\n    //Todo: update database\r\n    table.reloadTableUI();\r\n}\r\n\r\n//remove a number of task with a list of taskid from table\r\nfunction removeSelectedTasks(table, taskIdList){\r\n    const tempList = [];\r\n    for (let i = 0; i < table.taskList.length; i++){\r\n        if (!(i in taskIdList)){\r\n            tempList.push(table.taskList[i]);\r\n        }\r\n    }\r\n    table.taskList = tempList;\r\n    //Todo: update database\r\n\r\n    table.reloadTableUI();\r\n}\r\n\r\n\n\n//# sourceURL=webpack://to-do-list_nodejs/./src/taskTable/removeTask/removeTaskManager.js?");

/***/ }),

/***/ "./src/taskTable/selectTask/SelectorManager.js":
/*!*****************************************************!*\
  !*** ./src/taskTable/selectTask/SelectorManager.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   getCheckedSelectorList: () => (/* binding */ getCheckedSelectorList),\n/* harmony export */   selectorInit: () => (/* binding */ selectorInit)\n/* harmony export */ });\nfunction selectorInit(){\r\n    //select all check box\r\n    const selectAllCheckBox = document.getElementById('select-all-checkbox')\r\n    selectAllCheckBox.addEventListener('click', (event)=>{\r\n        if(event.target.checked){\r\n            //toggle all selector as checked\r\n            checkAllSelectors();\r\n        }else{\r\n            //toggle all selector as unchecked\r\n            uncheckAllSelectors();\r\n        }\r\n    });\r\n    //task selector\r\n    const taskSelectorList = getSelectorList();\r\n    taskSelectorList.forEach( (selector) => {\r\n        selector.addEventListener('change', (event)=>{\r\n            //toggle select-all-checkbox if one is unchecked.\r\n            const selectorList = getSelectorList();\r\n            const checkedSelectorList = getCheckedSelectorList();\r\n            if (selectorList.length != checkedSelectorList.length){\r\n                $('#select-all-checkbox').checked = false;\r\n            }\r\n        })\r\n    });\r\n}\r\n\r\n\r\n//return a list selectors in the table\r\nfunction getSelectorList(){\r\n    const selectorCollection = document.querySelectorAll('input.form-check-input');\r\n    return selectorCollection;\r\n}\r\n\r\nfunction getCheckedSelectorList(){\r\n    const checkedSelectorList = [];\r\n    const selectorList = getSelectorList();\r\n    for (let i = 0; i < selectorList.length; i++){\r\n        if (selectorList[i].id!='select-all-checkbox' && selectorList[i].checked == true){\r\n            checkedSelectorList.push(selectorList[i]);\r\n        }\r\n    }\r\n    console.log(checkedSelectorList);\r\n    return checkedSelectorList;\r\n}\r\n\r\nfunction checkAllSelectors(){\r\n    const selectorList = getSelectorList();\r\n    for (let i = 0; i < selectorList.length; i++){\r\n        selectorList[i].checked = true;\r\n    }\r\n}\r\n\r\nfunction uncheckAllSelectors(){\r\n    const selectorList = getSelectorList();\r\n    for (let i = 0; i < selectorList.length; i++){\r\n        selectorList[i].checked = false;\r\n    }\r\n}\r\n\r\n\n\n//# sourceURL=webpack://to-do-list_nodejs/./src/taskTable/selectTask/SelectorManager.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/app.js");
/******/ 	
/******/ })()
;