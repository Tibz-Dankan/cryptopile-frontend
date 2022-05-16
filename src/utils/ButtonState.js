// function to disable a button
export const disableButton = (buttonId) => {
  if (!buttonId) return;
  document.getElementById(buttonId).disabled = true;
};

// function to enable a button
export const enableButton = (buttonId) => {
  if (!buttonId) return;
  document.getElementById(buttonId).disabled = false;
};
