# ToDoApp

1. Try "mobile first"
2. Write HTML/CSS code for Header section of ToDo
3. Sidebar --> start with "Inbox" div, then project (arrow, plus sign - without clicks)
4. Central block of a page - image, hover of "Add task"

5. HTML/CSS optimization: - check if app is adaptive - no duplicates - group pieces of code, if possible - variables, where appropriate

6. Add actions for all button (e.g. "Add task", "Close menu", modal windows, etc.):
   6.1. close menu functionality
   6.2. "add task" modal window - yet without internal functionality?
   6.3. Sidebar "add project" button" - write code for modal window ("Cancel" button must close window, "Add" button must be disabled)

7. Repeat HTML/CSS optimization: - check if app is adaptive - no duplicates - group pieces of code, if possible - variables, where appropriate - point 6 optimization

8. - "Add project" functionality
   - create Project (will be deleted automatically after page refresh)
   <!-- - save it into Object (variable), if there are many of them massive of Objects -->
   - "Delete" button, which will delete selected Project
   - "Edit" button, which will allow to rename Project
   <!-- - separate list of completed "Task" with visual effects (e.g. opacity changing) -->

| Bug Description         | Status      |
| ----------------------- | ----------- |
| window.onclick function | ✅ Complete |

|
| Editor image - drags to the left when sidebar is hidden | ✅ Complete |
| Add Project Modal - border-top-left / -top-right properties are not applied | ✅ Complete |

TASK 16.07:

1. deleteProject - rewrite without forEach, similar to today's example with single eventListener
2. Arrange constants correctly (import only those, which are needed)

TASK 19.07:

1. addTask - functionality + HTML markup, it must also be a separate module!!!
2. modal.js - create a separate module for all modal windows of my todoapp - ✅ Complete
3. editorHeading/Image/etc - write a couple of functions, which can be called from another module, when you need to change Heading/Body/Image - ✅ Complete
4. Split code in projects.js into different functions (creating project, selecting project, deleting project)

HW 28.07:
1. Rewrite using date-fns library in tasks.js
2. task.isDate - delete this property, add "date: dateObject" and "priority: 1" instead (for example)
3. Variants for projects/task connection: connect using id OR put task object inside projects array of objects
