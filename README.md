# to-do-list Project
This is a simple to-do list project to explore and practice the use of Javascript and its library.
## Project Description
This project adopt a basic client/server structure over http to perform to-do list functionality. That includes checking task and removing tasks. Since the data is stored in the database in server side, data is preserved even after reloading the page.
## Functionality
### Add new tasks
1. Create new task by clicking the 'add' button
    ![Alt add a task](/readmeImage/project_demo_add_new_task.png)

2. Enter the task description and click 'Create Task'
    ![Alt create a task](readmeImage/project_demo_add_new_task_create_task.png)

3. A new task is created
    ![Alt task created](readmeImage/project_demo_add_new_task_task_created.png)
### Checking/Unchecking tasks
Tasks can be checked/unchecked by this group of 'tick' buttons
    ![Alt check task](readmeImage/project_demo_check_task.png)
#### Check/Uncheck a task
1. Click on the check button of a specific task
    ![Alt check a task demo](readmeImage/project_demo_check_a_task.png)
2. The task is checked
    ![Alt tasks checked](readmeImage/project_demo_check_a_task_task_checked.png)
Uncheck a task can be performed in the same way.
#### Check/Uncheck a number of tasks
A number of tasks can be checked/unchecked at once by the following steps
1. Select a number of tasks with the checkboxs
    ![Alt select a number of task demo](readmeImage/project_demo_check_a_list_of_task.png)
2. Click the 'check selected' button to check all selected tasks
    ![Alt check a number of task demo](readmeImage/project_demo_check_a_list_of_task_checked.png)
Uncheck a number of tasks can be performed in the same way.
### Removing tasks
Tasks can be removed by this group of 'remove' buttons
    ![Alt remove task](readmeImage/project_demo_remove_button_group.png)
#### Remove a task
1. Remove a task by clicking the 'remove' button
    ![Alt remove a task](readmeImage/project_demo_remove_a_task.png)
2. A task is removed
    ![Alt a task removed](readmeImage/project_demo_a_task_removed.png)

#### Remove a number of tasks
A number of tasks can be removed at once by the following steps
1. Select a number of tasks with the checkboxs
    ![Alt select a number of task demo](readmeImage/project_demo_remove_a_list_of_task.png)
2. Click the 'remove selected' button to remove all selected tasks
    ![Alt selected tasks are removed](readmeImage/project_demo_remove_a_list_of_task_removed.png)
## Launching the application
### Server side
#### Start the server
> ```ps
> PS F:\GitHub\to-do-list> npm run server
> > to-do-list_nodejs@0.0.1 server
> > node ./server/server.js
>
> openConnection: open database connection
> closeConnection: close database conection
> Server: Server is running on http://127.0.0.1:3000
> Database initialized successfully.

#### Access the application
![Alt to-do list demo](/readmeImage/project_demo.png)
