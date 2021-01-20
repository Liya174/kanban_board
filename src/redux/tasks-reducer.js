import { countTasks } from "../common/countingTasks";

const allTasksLocal = JSON.parse(localStorage.getItem("allTasksLocal"));

const OPEN_INPUT = "tasks/OPEN_INPUT";
const REPLACE_TASKS_ISSUE = "tasks/REPLACE_TASKS_ISSUE";
const ADD_NEW_TASKS_ISSUE = "tasks/ADD_NEW_TASKS_ISSUE";
const CHANGE_ISSUE_BODY = "tasks/CHANGE_ISSUE_BODY";
const DELETE_ISSUE = "tasks/DELETE_ISSUE";

export const initialState = {
    allTasks: allTasksLocal || [
        {
            id: 0,
            name: "Backlog",
            issues: [],
            isAbbButtonClicked: false,
            url: "/taskinfo/backlog",
        },
        {
            id: 1,
            name: "Ready",
            issues: [
                {
                    id: 0,
                    title: "First issue",
                    body:
                        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. In dictum non consectetur a erat nam. Lobortis mattis aliquam faucibus purus. Nisi est sit amet facilisis magna etiam tempor orci. Ultrices dui sapien eget mi proin sed. Dictum varius duis at consectetur lorem donec. Vehicula ipsum a arcu cursus vitae congue mauris. Accumsan lacus vel facilisis volutpat est velit egestas. Tellus id interdum velit laoreet id donec ultrices tincidunt. Maecenas volutpat blandit aliquam etiam erat velit scelerisque in dictum. Ut placerat orci nulla pellentesque dignissim. Vulputate eu scelerisque felis imperdiet. Tincidunt vitae semper quis lectus nulla at volutpat diam ut. Auctor elit sed vulputate mi. ",
                    createTime: new Date().toLocaleString(),
                },
                {
                    id: 1,
                    title: "Second issue",
                    body:
                        "Neque ornare aenean euismod elementum nisi quis eleifend quam adipiscing. Arcu cursus euismod quis viverra nibh cras pulvinar. Non nisi est sit amet facilisis magna etiam. Mi eget mauris pharetra et ultrices. Bibendum enim facilisis gravida neque. Tellus in metus vulputate eu scelerisque felis imperdiet proin. Ac feugiat sed lectus vestibulum mattis ullamcorper velit. Cursus sit amet dictum sit amet justo donec enim diam. Tortor vitae purus faucibus ornare suspendisse sed nisi lacus. Ut faucibus pulvinar elementum integer enim neque volutpat ac.",
                    createTime: new Date().toLocaleString(),
                },
            ],
            isAbbButtonClicked: false,
            url: "/taskinfo/ready",
        },
        {
            id: 2,
            name: "In progress",
            issues: [],
            isAbbButtonClicked: false,
            url: "/taskinfo/inprogress",
        },
        {
            id: 3,
            name: "Finished",
            issues: [],
            isAbbButtonClicked: false,
            url: "/taskinfo/finished",
        },
    ],
    activeTasks: function () {
        return this.allTasks[0].issues.length;
    },
    finishedTasks: function () {
        return this.allTasks[3].issues.length;
    },
};

export const tasksReducer = (state = initialState, action) => {
    switch (action.type) {
        case OPEN_INPUT: {
            const tasks = state.allTasks;
            const tasksId = action.tasksId;
            return {
                ...state,
                allTasks: [
                    ...tasks.slice(0, tasksId),
                    { ...tasks[tasksId], isAbbButtonClicked: true },
                    ...tasks.slice(tasksId + 1),
                ],
            };
        }

        case REPLACE_TASKS_ISSUE: {
            const tasks = state.allTasks;
            const taskIssues = tasks[action.tasksId].issues.slice();
            const tasksLastId = taskIssues.length
                ? taskIssues[taskIssues.length - 1].id
                : -1;
            const issueInPrevTask = tasks[action.tasksId - 1].issues.find(
                (issue) => issue.title === action.issueTitle
            );

            const newAllTasks = [
                ...tasks.slice(0, action.tasksId - 1),
                {
                    ...tasks[action.tasksId - 1],
                    issues: tasks[action.tasksId - 1].issues.filter(
                        (issue) => issue.id !== issueInPrevTask.id
                    ),
                },
                {
                    ...tasks[action.tasksId],
                    isAbbButtonClicked: false,
                    issues: [
                        ...tasks[action.tasksId].issues,
                        { ...issueInPrevTask, id: tasksLastId + 1 },
                    ],
                },
                ...tasks.slice(action.tasksId + 1),
            ];
            localStorage.setItem("allTasksLocal", JSON.stringify(newAllTasks));

            return {
                ...state,
                allTasks: newAllTasks,
            };
        }

        case ADD_NEW_TASKS_ISSUE: {
            const tasks = state.allTasks;
            const tasksIssues = tasks[0].issues.slice();
            const tasksLastId = tasksIssues.length
                ? tasksIssues[tasksIssues.length - 1].id
                : -1;

            const newIssue = {
                id: tasksLastId + 1,
                title: action.newIssueTitle,
                body: "",
                createTime: new Date().toLocaleString(),
            };

            const newAllTasks = [
                {
                    ...tasks[0],
                    isAbbButtonClicked: false,
                    issues: [...tasks[0].issues, newIssue],
                },
                ...tasks.slice(1),
            ];

            localStorage.setItem("allTasksLocal", JSON.stringify(newAllTasks));

            return {
                ...state,
                allTasks: newAllTasks,
            };
        }

        case CHANGE_ISSUE_BODY: {
            const tasks = state.allTasks;

            const currentTask = tasks
                .slice()
                .find((task) => task.name === action.taskName);

            const newAllTasks = [
                ...tasks.slice(0, currentTask.id),
                {
                    ...tasks[currentTask.id],
                    issues: currentTask.issues.map((issue) =>
                        issue.id === action.issueId
                            ? { ...issue, body: action.bodyText }
                            : issue
                    ),
                },
                ...tasks.slice(currentTask.id + 1),
            ];

            localStorage.setItem("allTasksLocal", JSON.stringify(newAllTasks));
            return {
                ...state,
                allTasks: newAllTasks,
            };
        }

        case DELETE_ISSUE: {
            const tasks = state.allTasks;

            const currentTask = tasks
                .slice()
                .find((task) => task.name === action.taskName);

            const newAllTasks = [
                ...tasks.slice(0, currentTask.id),
                {
                    ...tasks[currentTask.id],
                    issues: currentTask.issues.filter(
                        (issue) => issue.id !== action.issueId
                    ),
                },
                ...tasks.slice(currentTask.id + 1),
            ];

            localStorage.setItem("allTasksLocal", JSON.stringify(newAllTasks));

            return {
                ...state,
                allTasks: newAllTasks,
            };
        }

        default:
            return state;
    }
};

export const openInput = (tasksId) => ({
    type: OPEN_INPUT,
    tasksId,
});

export const replaceTasksIssue = (issueTitle, tasksId) => ({
    type: REPLACE_TASKS_ISSUE,
    issueTitle,
    tasksId,
});

export const addNewTasksIssue = (newIssueTitle) => ({
    type: ADD_NEW_TASKS_ISSUE,
    newIssueTitle,
});

export const changeIssueBody = (bodyText, issueId, taskName) => ({
    type: CHANGE_ISSUE_BODY,
    bodyText,
    issueId,
    taskName,
});

export const deleteIssue = (issueId, taskName) => ({
    type: DELETE_ISSUE,
    issueId,
    taskName,
});

// deleteIssue = (issueId, taskName) => {
//     const tasks = state.allTasks;

//     const currentTask = tasks.slice().find((task) => task.name === taskName);
//     const currentTasksId = currentTask.id;

//     const newAllTasks = [
//         ...tasks.slice(0, currentTasksId),
//         {
//             ...tasks[currentTasksId],
//             issues: currentTask.issues.filter((issue) => issue.id !== issueId),
//         },
//         ...tasks.slice(currentTasksId + 1),
//     ];

//     localStorage.setItem("allTasksLocal", JSON.stringify(newAllTasks));

//     return{
//         ...state, allTasks: newAllTasks,
//     };
// };
