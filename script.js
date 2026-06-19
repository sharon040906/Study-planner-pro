const taskInput = document.getElementById("task");
const deadlineInput = document.getElementById("deadline");

const taskList = document.getElementById("taskList");
const completedTaskList = document.getElementById("completedTaskList");

const completedTasksText =
    document.getElementById("completedTasks");

const completionRateText =
    document.getElementById("completionRate");

const categorySelect =
    document.getElementById("category");

const newCategoryInput =
    document.getElementById("newCategory");

const welcomeUser =
    document.getElementById("welcomeUser");

welcomeUser.textContent =
    "Welcome, " + localStorage.getItem("name");

let totalTasks = 0;
let completedTasks = 0;

/* --------------------
   UPDATE PROGRESS
--------------------- */

function updateProgress()
{
    completedTasksText.textContent =
        `Tasks Completed: ${completedTasks} / ${totalTasks}`;

    let percentage = 0;

    if(totalTasks > 0)
    {
        percentage =
            Math.round(
                (completedTasks / totalTasks) * 100
            );
    }

    completionRateText.textContent =
        `Completion Rate: ${percentage}%`;
}

/* --------------------
   ADD CATEGORY
--------------------- */

function addCategory()
{
    const categoryName =
        newCategoryInput.value.trim();

    if(categoryName === "")
    {
        alert("Please enter a category!");
        return;
    }

    const option =
        document.createElement("option");

    option.value =
        categoryName.toLowerCase();

    option.textContent =
        categoryName;

    categorySelect.appendChild(option);

    newCategoryInput.value = "";

    alert("Category Added Successfully!");
}

/* --------------------
   ADD TASK
--------------------- */

function addTask()
{
    const taskName =
        taskInput.value.trim();

    const deadline =
        deadlineInput.value;

    const category =
        categorySelect.value;

    if(taskName === "")
    {
        alert("Please enter a task!");
        return;
    }

    const li =
        document.createElement("li");

    const taskText =
        document.createElement("span");

    if(deadline !== "")
    {
        taskText.textContent =
            `${taskName} | ${category.toUpperCase()} | Due: ${deadline}`;
    }
    else
    {
        taskText.textContent =
            `${taskName} | ${category.toUpperCase()}`;
    }

    const completeBtn =
        document.createElement("button");

    completeBtn.textContent =
        "Complete";

    const deleteBtn =
        document.createElement("button");

    deleteBtn.textContent =
        "Delete";

    /* COMPLETE TASK */

    completeBtn.onclick = function()
    {
        if(!li.classList.contains("completed"))
        {
            li.classList.add("completed");

            taskText.style.textDecoration =
                "line-through";

            completedTaskList.appendChild(li);

            completeBtn.remove();

            completedTasks++;

            updateProgress();
        }
    };

    /* DELETE TASK */

    deleteBtn.onclick = function()
    {
        if(li.classList.contains("completed"))
        {
            completedTasks--;
        }

        totalTasks--;

        li.remove();

        updateProgress();
    };

    li.appendChild(taskText);

    li.appendChild(completeBtn);

    li.appendChild(deleteBtn);

    taskList.appendChild(li);

    totalTasks++;

    updateProgress();

    taskInput.value = "";

    deadlineInput.value = "";
}

/* --------------------
   LOGOUT
--------------------- */

function logout()
{
    localStorage.removeItem("loggedIn");

    window.location.href =
        "login.html";
}

updateProgress();