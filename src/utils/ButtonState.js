// function to disable a button
export const disableButton = (buttonId) => {
  document.getElementById(buttonId).disabled = true;
};

// function to enable a button
export const enableButton = (buttonId) => {
  document.getElementById(buttonId).disabled = false;
};
