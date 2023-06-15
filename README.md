# ToDoApp

1. Try "mobile first"
2. Write HTML/CSS code for Header section of ToDo
3. Sidebar --> start with "Inbox" div, then project (arrow, plus sign - without clicks)
4. Central block of a page - image, hover of "Add task"

5. HTML/CSS optimization:
        - check if app is adaptive
        - no duplicates
        - group pieces of code, if possible
        - variables, where appropriate

6. Add actions for all button (e.g. "Add task", "Close menu", modal windows, etc.):
        6.1. close menu functionality
        6.2. "add task" modal window - yet without internal functionality?
        6.3. Sidebar "add project" button" - write code for modal window ("Cancel" button must close window, "Add" button must be disabled)

7. Repeat HTML/CSS optimization:
        - check if app is adaptive
        - no duplicates
        - group pieces of code, if possible
        - variables, where appropriate
        - point 6 optimization

8. - "Add task" functionality
    - create Task 
    - save it into Object (variable), if there are many of them massive of Objects
    - "Delete" button, which will delete selected Task
    - separate list of completed "Task" with visual effects (e.g. opacity changing)


# 16.06 - Bugs
1. window.onclick function - same functionality cannot be provided with addTaskModalWindow/addProjectModalWindow as it is with sidebar
2. Editor image - drags to the left, when sidebar is hidden
3. Add Project Modal - border-top-left / -top-right properties are not applied