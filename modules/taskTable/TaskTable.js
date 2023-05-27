export class TaskTable {
    constructor() {
      this.taskList = [];
    }
  
    // Methods
    getTaskNum() {
      return this.taskNum;
    }
  
    appendTaskToTable(task, id) {
      this.taskList.push(task);
      this.createTaskUI(task, id);
      // add del button listener //TO-DO
      this.attachDelTaskBtnListener('del-' + id.toString());
    }
  
    // create empty task table with headings and an empty body
    createTaskTableUI() {
      const itemTableRow = $('<div></div>').addClass('row');
      const itemTable = $('<table></table>').addClass('table table-hover');
      itemTableRow.append(itemTable);
  
      const thead = $('<thead></thead>');
      itemTable.append(thead);
  
      const tr = $('<tr></tr>');
      thead.append(tr);
  
      const th1 = $('<th></th>').addClass('col-sm-1').attr('scope', 'col');
      tr.append(th1);
  
      const selectAllBox = $('<input>')
        .attr('id', 'select-all-checkbox')
        .addClass('form-check-input')
        .attr('type', 'checkbox')
        .prop('checked', false)
        .attr('aria-label', 'select all items');
      th1.append(selectAllBox);
  
      const th2 = $('<th></th>').addClass('col-sm-1').text('#').attr('scope', 'col');
      tr.append(th2);
  
      const th3 = $('<th></th>').addClass('col-sm-8').text('Task').attr('scope', 'col');
      tr.append(th3);
  
      const th4 = $('<th></th>').addClass('col-sm-1').attr('scope', 'col');
      tr.append(th4);
  
      const checkBtn = $('<button></button>')
        .attr('id', 'check-all-btn')
        .attr('type', 'button')
        .addClass('btn btn-success');
      th4.append(checkBtn);
  
      const checkBtnImg = $('<i></i>').addClass('fa-solid fa-check');
      checkBtn.append(checkBtnImg);
  
      const th5 = $('<th></th>').addClass('col-sm-1').attr('scope', 'col');
      tr.append(th5);
  
      const removeAllBtn = $('<button></button>')
        .attr('id', 'remove-selected-btn')
        .attr('type', 'button')
        .addClass('btn btn-danger');
      th5.append(removeAllBtn);
  
      const delBtnImg = $('<i></i>').addClass('fa-solid fa-trash-can');
      removeAllBtn.append(delBtnImg);
  
      // Append to the html
      const mainContainer = $('#main-container');
      mainContainer.append(itemTableRow);
  
      // Append table body, where the task is added here;
      const tableBody = $('<tbody></tbody>').attr('id', 'table-body').addClass('table-group-divider');
      itemTable.append(tableBody);
    }
  
    // create task row in the table with task[Object] and its object id
    createTaskUI(task, id) {
      const tr = $('<tr></tr>');
  
      // select checkbox
      const selectCheckBoxTd = $('<td></td>').attr('scope', 'row');
      tr.append(selectCheckBoxTd);
  
      const taskSelectCheckbox = $('<input>')
        .attr('id', 'select-' + id)
        .prop('checked', task.getSelectState())
        .addClass('form-check-input')
        .attr('type', 'checkbox')
        .val(task.getSelectState().toString())
        .attr('aria-label', 'check the item: ' + id.toString());
      selectCheckBoxTd.append(taskSelectCheckbox);
  
      // #id
      const idTd = $('<td></td>').text(id + 1); // index to #
      tr.append(idTd);
  
      // Task description
      const taskDescTd = $('<td></td>').text(task.getDescription());
      tr.append(taskDescTd);
  
      // Task check btn
      const taskCheckTd = $('<td></td>');
      tr.append(taskCheckTd);
  
      const taskCheckBtn = $('<button></button>')
        .attr('type', 'button')
        .addClass('btn btn-light')
        .attr('aria-label', 'check task: ' + task.getDescription());
      const taskCheckBtnId = 'check-' + id.toString();
      taskCheckBtn.attr('id', taskCheckBtnId);
      taskCheckTd.append(taskCheckBtn);
  
      const taskCheckImg = $('<i></i>').addClass('fa-sharp fa-solid fa-check');
      taskCheckBtn.append(taskCheckImg);
  
      // Task delete btn
      const taskDelTd = $('<td></td>');
      tr.append(taskDelTd);
  
      const taskDelBtn = $('<button></button>')
        .attr('type', 'button')
        .addClass('btn btn-light')
        .attr('aria-label', 'remove task: ' + task.getDescription());
      const delBtnId = 'del-' + id.toString();
      taskDelBtn.attr('id', delBtnId);
      taskDelTd.append(taskDelBtn);
  
      const delBtnImg = $('<i></i>').addClass('fa-regular fa-trash-can');
      taskDelBtn.append(delBtnImg);
  
      // Attach newly created table row to the table body
      const tableBody = $('#table-body');
      tableBody.append(tr);
    }
  
    attachDelTaskBtnListener(btnId) {
      const btn = $('#' + btnId);
      if (btn != null) {
        btn.on('click', () => {
          // the taskId of the deleted item
          const delTaskId = btnId.slice(4); // remove "del-"
          this.removeTask(delTaskId);
          // TODO: Update database
  
          // update the UI
          this.reloadTableUI();
        });
      } else {
        console.log('btn object is null, btnId: ' + btnId);
        console.log(this.taskList);
      }
    }
  
    removeTask(taskId) {
      const tempList = [];
      console.log(this.taskList.length);
      for (let i = 0; i < this.taskList.length; i++) {
        if (i != taskId) {
          tempList.push(this.taskList[i]);
        }
      }
      this.taskList = tempList;
      console.log('new task list: ' + this.taskList);
    }
  
    // apply change
    reloadTableUI() {
      const tableBody = $('#table-body');
      tableBody.empty();
      this.taskList.forEach((task, index) => {
        this.createTaskUI(task, index);
  
        this.attachDelTaskBtnListener('del-' + index);
      });
    }
  }
  
  export default TaskTable;
  