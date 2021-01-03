const allTasksLocal = JSON.parse(localStorage.getItem("allTasksLocal"));

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
                        "Here is my first issue. It made for testing IssueInfo-container in TaskInfo-container. Maybe, I need add textarea for making texts like this in every issue... should think about it",
                    createTime: new Date().toLocaleString(),
                },
                {
                    id: 1,
                    title: "Second issue",
                    body: "Here is my second issue. Same",
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
    activeTasks: 0,
    finishedTasks: 0,
    isMenuVisible: false,
};
