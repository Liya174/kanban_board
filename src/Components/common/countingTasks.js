export const countTasks = (id, tasksId, prevNumber, isAddingIssue) => {
    return id === tasksId
        ? isAddingIssue
            ? prevNumber + 1
            : prevNumber - 1
        : prevNumber;
};
