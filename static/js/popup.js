var calcGrades = document.getElementById('calculate');
// var reCalcGrades = document.getElementById('recalculate');

calcGrades.onclick = function(element) {
    //update the extension storage value
    //Pass init or remove message to content script
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {command: "clicked"}, function(response) {
            console.log(response);
        });
    });
    calcGrades.disabled = 'true';
};
// reCalcGrades.onclick = function(element) {
//     //update the extension storage value
//     //Pass init or remove message to content script
//     chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
//         chrome.tabs.sendMessage(tabs[0].id, {command: "recalc"}, function(response) {
//             console.log(response);
//         });
//     });
//
// };