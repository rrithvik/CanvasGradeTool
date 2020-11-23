var calcGrades = document.getElementById('calculate');
var themes = document.getElementById("themeSelect");
var check = document.getElementById("themedImages");
var loadThemes = document.getElementById("autoLoadTheme");
// var reCalcGrades = document.getElementById('recalculate');

chrome.storage.sync.get('imageTheme', function(data) {
    check.checked = data.imageTheme;
});
chrome.storage.sync.get('loadTheme', function(data) {
    loadThemes.checked = data.loadTheme;
});
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

check.addEventListener("change", function() {
    let images = this.checked;
    chrome.storage.sync.set({ imageTheme: images });
    chrome.storage.sync.get('theme', function(data) {
        chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
            chrome.tabs.sendMessage(tabs[0].id, {command: data.theme}, function (response) {
                console.log(response);
            });
        });
    });
});

loadThemes.addEventListener("change", function() {
    let autoLoad = this.checked;
    chrome.storage.sync.set({ loadTheme: autoLoad });
});

themes.addEventListener("change", function() {
    let theme = this.value;
    chrome.storage.sync.set({ theme: theme });
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {command: theme}, function(response) {
            console.log(response);
        });
    });
});
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