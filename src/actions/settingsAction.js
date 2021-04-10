import { 
    DISABLE_BALANCE_ON_ADD,
    DISABLE_BALANCE_ON_EDIT,
    ALLOW_REGISTRATION
} from "./types";

export const setDisableBalanceOnAdd = () => {
    // get settings from local storage
    const settings = JSON.parse(localStorage.getItem("settings"));
    // update local storage item
    settings.disableBalanceOnAdd = !settings.disableBalanceOnAdd;
    // save back to local storage
    localStorage.setItem("settings", JSON.stringify(settings));

    return {
        type: DISABLE_BALANCE_ON_ADD,
        payload: settings.disableBalanceOnAdd
    }
}

export const setDisableBalanceOnEdit = () => {
      // get settings from local storage
      const settings = JSON.parse(localStorage.getItem("settings"));
      // update local storage item
      settings.disableBalanceOnEdit = !settings.disableBalanceOnEdit;
      // save back to local storage
      localStorage.setItem("settings", JSON.stringify(settings));

    return {
        type: DISABLE_BALANCE_ON_EDIT,
        payload: settings.disableBalanceOnEdit
    }
}

export const setallowRegistration = () => {
    // get settings from local storage
    const settings = JSON.parse(localStorage.getItem("settings"));
    // update local storage item
    settings.allowRegistration = !settings.allowRegistration;
    // save back to local storage
    localStorage.setItem("settings", JSON.stringify(settings));

    return {
        type: ALLOW_REGISTRATION,
        payload: settings.allowRegistration
    }
}