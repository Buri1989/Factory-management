const actionFileBLL = require('../BLL/actionsFileBLL');
const MAX_ACTIONS = 50;
let currentDate = new Date().toISOString().slice(0, 10);


const loginAuthCheck = async (userId) => {
    let isUserAllowed = true;

    /*Check if user have actions logged in the json file */
    const actionJsonFile = await actionFileBLL.getAllUsersDataFromFile();

    const haveActions = actionJsonFile.actions.filter(
        (action) => action.id = userId);

    if (haveActions.length === 0) {
        /*If user don't have any actions records,
        insert a new action with MAX_ACTIONS to the json*/
        obj = {
            id: userId,
            maxActions: MAX_ACTIONS,
            date: currentDate,
            actionAllowed: MAX_ACTIONS,
        };
        actionFileBLL.updateUserDataFromFile(obj);
        isUserAllowed = true;
    };

    /*If user do have actions logged, check if he have actions on current day.*/
    if (haveActions > 0) {
        const actionOnToday = haveActions.filter(
            (action) => action.date.slice(0, 10) == currentDate);

        /*If user have actions on today,find the minimum action allowed */
        if (actionOnToday.length > 0) {
            const minActionsAllowedToday = actionOnToday.reduce((prev, curr) => {
                return prev.actionAllowed < curr.actionAllowed ? prev : curr;
            });

            /*If the minimum actionAllowed === 0 return to login with a message */
            if (minActionsAllowedToday.actionAllowed === 0) {
                /*return to login page with unauthorized msg */
                isUserAllowed = false;
            };
            /*If the minimum actionAllowed < maxActions && actionAllowed  > 0 => add a new row with actionAllowed - 1 */
            if (minActionsAllowedToday.actionAllowed > 0 && minActionsAllowedToday.actionAllowed <= minActionsAllowedToday.maxActions) {
                obj = {
                    id: userId,
                    maxActions: minActionsAllowedToday.maxActions,
                    date: currentDate,
                    actionAllowed: minActionsAllowedToday.actionAllowed - 1,
                };
                actionFileBLL.updateUserDataFromFile(obj);
                isUserAllowed = true;
            };
        }
        /*If user don't have actions on today , create one  */
        if (actionOnToday.length === 0) {
            obj = {
                id: userId,
                maxActions: MAX_ACTIONS,
                date: currentDate,
                actionAllowed: MAX_ACTIONS,
            };
            actionFileBLL.updateUserDataFromFile(obj);
            isUserAllowed = true;
        }
    }
    return isUserAllowed;
}


const isUserHasCredit = async (userId) => {
    let isUserAllowed = false;
    let creditNum = 0;

    const actionJsonFile = await actionFileBLL.getAllUsersDataFromFile();

    const todayUserMinActionAllowed = actionJsonFile.actions
        .filter(
            (action) =>
                action.id === userId && action.date.slice(0, 10) == currentDate
        )
        .reduce((prev, curr) => {
            return prev.actionAllowed < curr.actionAllowed ? prev : curr;
        });

    /*If the minimum actionAllowed === 0 return to login with a message*/
    if (todayUserMinActionAllowed.actionAllowed === 0) {
        /*return to login page with unauthorized msg */
        isUserAllowed = false;
    }

    /*If the minimum actionAllowed < maxActions && (actionAllowed>0) -> add a new row with actionAllowed - 1*/
    if (
        todayUserMinActionAllowed.actionAllowed > 0 &&
        todayUserMinActionAllowed.actionAllowed <=
        todayUserMinActionAllowed.maxActions
    ) {
        obj = {
            id: userId,
            maxActions: todayUserMinActionAllowed.maxActions,
            date: currentDate,
            actionAllowed: todayUserMinActionAllowed.actionAllowed - 1,
        };
        actionFileBLL.updateActionsUsersFromJson(obj);
        isUserAllowed = true;
        creditNum = todayUserMinActionAllowed.actionAllowed - 1;
    }

    return { isUserAllowed, creditNum };
};


const getUserCreditStatus = async (userId) => {
    let isUserAllowed = false;
    let creditNum = 0;

    const actionJsonFile = await actionFileBLL.getAllUsersDataFromFile();

    const todayUserMinActionAllowed = actionJsonFile.actions
        .filter(
            (action) =>
                action.id === userId && action.date.slice(0, 10) == currentDate
        )
        .reduce((prev, curr) => {
            return prev.actionAllowed < curr.actionAllowed ? prev : curr;
        });

    /*If the minimum actionAllowed === 0 return to login with a message*/
    if (todayUserMinActionAllowed.actionAllowed === 0) {
        /*return to login page with unauthorized msg */
        isUserAllowed = false;
    }

    /*If the minimum actionAllowed < maxActions && (actionAllowed>0)*/
    if (
        todayUserMinActionAllowed.actionAllowed > 0 &&
        todayUserMinActionAllowed.actionAllowed <=
        todayUserMinActionAllowed.maxActions
    ) {
        creditNum = todayUserMinActionAllowed.actionAllowed;
        isUserAllowed = true;
    }

    return { isUserAllowed, creditNum };
};

module.exports = { loginAuthCheck, isUserHasCredit, getUserCreditStatus };