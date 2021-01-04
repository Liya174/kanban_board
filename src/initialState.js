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
    activeTasks: 0,
    finishedTasks: 0,
    isMenuVisible: false,
};
