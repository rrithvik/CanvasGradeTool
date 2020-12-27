//
// function calcIndGrades(index){
//
// }
function getScores() {}
function setThemes(command, imageTheme, videoTheme) {
    if(document.getElementsByClassName('canvas-easy-grader').length=== 0){
        var css = '',
            head = document.head || document.getElementsByTagName('head')[0],
            style = document.createElement('style');
        style.className = 'canvas-easy-grader';

        head.appendChild(style);
    }else{
        var css = '',
        style = document.getElementsByClassName('canvas-easy-grader')[0];
    }

    if(command === 'light'){
        css = "";
    }else if(command === 'dark'){
        css = "" +
            "body {\n" +
                "background: rgb(0, 0, 0) !important;\n" +
                "color: rgb(0, 0, 255) !important;\n" +
                "filter: invert(100%) hue-rotate(180deg) !important;\n" +
            "}\n";
        if (!imageTheme) {
            css += "" +
            "img {\n" +
                "filter: invert(100%) hue-rotate(180deg) !important;\n" +
            "}\n";
        }
        if (!videoTheme) {
            css += "" +
            "video {\n" +
                "filter: invert(100%) hue-rotate(180deg) !important;\n" +
            "}\n";
        }
    }

    else if(command === 'inverted'){
        css = "" +
            "body{\n" +
            "    background:#000 !important;\n" +
            "    -webkit-filter: invert(100%) !important;\n" +
            "    filter: invert(100%) !important;\n" +
            "}\n";
        if (!imageTheme) {
            css += "" +
            "img {\n" +
            "    webkit-filter: invert(100%) !important;\n" +
            "    filter: invert(100%) !important;\n" +
            "}\n";
        }
        if (!videoTheme) {
            css += "" +
            "video {\n" +
            "    webkit-filter: invert(100%) !important;\n" +
            "    filter: invert(100%) !important;\n" +
            "}\n";
        }
    }
    else if(command === 'dark-glow'){
        css = "" +
            "body {\n" +
            "    background:#000 !important;\n" +
            "    color: #f00 !important;\n" +
            "    -webkit-filter: invert(100%) !important;\n" +
            "    filter: invert(100%) !important;\n" +
            "}\n";
        if (!imageTheme) {
            css += "" +
            "img {\n" +
            "    webkit-filter: invert(100%) !important;\n" +
            "    filter: invert(100%) !important;\n" +
            "}\n";
        }
        if (!videoTheme) {
            css += "" +
            "video {\n" +
            "    webkit-filter: invert(100%) !important;\n" +
            "    filter: invert(100%) !important;\n" +
            "}\n";
        }
    }
    else if(command === 'bnw'){
        css = "" +
            "body {\n" +
                "filter: grayscale(100%) !important;\n" +
            "}\n";
        if (!imageTheme) {
            css += "" +
            "img {\n" +
            "    filter: grayscale(100%) !important;\n" +
            "}\n";
        }
        if (!videoTheme) {
            css += "" +
            "video {\n" +
            "    filter: grayscale(100%) !important;\n" +
            "}\n";
        }
    }
    else if(command === 'hot-pink'){
        css = "" +
            "body {\n" +
                "background: rgb(0, 0, 0) !important;\n" +
                "color: rgb(0, 0, 0) !important;\n" +
                "filter: invert(100%) hue-rotate(270deg) drop-shadow(16px 16px 80px rgba(255,0,255,0.7)) !important;\n" +
            "}\n";
        if (!imageTheme) {
            css += "" +
            "img {\n" +
            "    filter: invert(100%) hue-rotate(90deg) drop-shadow(0px 0px 0px blue) !important;\n" +
            "}\n";
        }
        if (!videoTheme) {
            css += "" +
            "video {\n" +
            "    filter: invert(100%) hue-rotate(90deg) drop-shadow(0px 0px 0px blue) !important;\n" +
            "}\n";
        }
    }
    else if(command === 'dark-future'){
        css = "" +
            "body {\n" +
                "background: rgb(0, 0, 0) !important;\n" +
                "color: rgb(0, 0, 255) !important;\n" +
                "filter: invert(100%) hue-rotate(180deg) drop-shadow(16px 16px 80px rgba(0,0,255,0.7)) !important;\n" +
            "}\n";
        if (!imageTheme) {
            css += "" +
            "img {\n" +
            "    filter: invert(100%) hue-rotate(180deg) drop-shadow(0px 0px 0px blue) !important;\n" +
            "}\n";
        }
        if (!videoTheme) {
            css += "" +
            "video {\n" +
            "    filter: invert(100%) hue-rotate(180deg) drop-shadow(0px 0px 0px blue) !important;\n" +
            "}\n";
        }
    }
    else if(command === 'purple'){
        css = "" +
            "body {\n" +
                "filter: hue-rotate(45deg) !important;\n" +
            "}\n";
    }
    style.innerHTML = css;
}
// function presetThemes(command, imageTheme) {
//     if(document.getElementsByClassName('pre-canvas-easy-grader').length=== 0){
//         var css = '',
//             head = document.head || document.getElementsByTagName('head')[0],
//             style = document.createElement('style');
//         style.className = 'pre-canvas-easy-grader';
//
//         head.appendChild(style);
//     }else{
//         var css = '',
//             style = document.getElementsByClassName('pre-canvas-easy-grader')[0];
//     }
//
//     if(command === 'light'){
//         css = "";
//     }else if(command === 'dark'){
//         css = "" +
//             "body {\n" +
//                 "background: rgb(0, 0, 0) !important;\n " +
//                 "color: rgb(0, 0, 255) !important;\n" +
//                 "filter: invert(100%) hue-rotate(180deg) !important;\n" +
//             "}\n";
//         if (!imageTheme) {
//             css += "" +
//             "img {\n" +
//                 "filter: invert(100%) hue-rotate(180deg);\n" +
//             "}\n";
//         }
//     }
//     else if(command === 'inverted'){
//         css = "" +
//             "body{\n" +
//             "    background:#000;\n" +
//             "    -webkit-filter: invert(100%);\n" +
//             "    filter: invert(100%);\n" +
//             "}\n";
//         if (!imageTheme) {
//             css += "" +
//             "img {\n" +
//             "    webkit-filter: invert(100%);\n" +
//             "    filter: invert(100%);\n" +
//             "}\n";
//         }
//     }
//     else if(command === 'dark-glow'){
//         css = "" +
//             "body {\n" +
//             "    background:#000;\n" +
//             "    color: #f00;\n" +
//             "    -webkit-filter: invert(100%);\n" +
//             "    filter: invert(100%);\n" +
//             "}\n";
//         if (!imageTheme) {
//             css += "" +
//             "img {\n" +
//             "    webkit-filter: invert(100%);\n" +
//             "    filter: invert(100%);\n" +
//             "}\n";
//         }
//     }
//     else if(command === 'bnw'){
//         css = "" +
//             "body {\n" +
//                 "filter: grayscale(100%);\n" +
//             "}\n";
//         if (!imageTheme) {
//             css += "" +
//             "img {\n" +
//             "    filter: grayscale(0%);\n" +
//             "}\n";
//         }
//     }
//     else if(command === 'hot-pink'){
//         css = "" +
//             "body {\n" +
//                 "background: rgb(0, 0, 0);\n" +
//                 "color: rgb(0, 0, 0);\n" +
//                 "filter: invert(100%) hue-rotate(270deg) drop-shadow(16px 16px 80px purple);\n" +
//             "}\n";
//         if (!imageTheme) {
//             css += "" +
//             "img {\n" +
//             "    filter: invert(100%) hue-rotate(90deg) drop-shadow(0px 0px 0px blue);\n" +
//             "}\n";
//         }
//     }
//     else if(command === 'dark-future'){
//         css = "" +
//             "body {\n" +
//                 "background: rgb(0, 0, 0);\n" +
//                 "color: rgb(0, 0, 255);\n" +
//                 "filter: invert(100%) hue-rotate(180deg) drop-shadow(16px 16px 80px blue);\n" +
//             "}\n";
//         if (!imageTheme) {
//             css += "" +
//             "img {\n" +
//             "    filter: invert(100%) hue-rotate(180deg) drop-shadow(0px 0px 0px blue);\n" +
//             "}\n";
//         }
//     }
//     else if(command === 'purple'){
//         css = "" +
//             "body {\n" +
//                 "filter: hue-rotate(45deg);\n" +
//             "}\n";
//     }
//     style.innerHTML = css;
// }
chrome.storage.sync.get(['theme', 'loadTheme','imageTheme', 'videoTheme'], function(data) {
    if(data.loadTheme === true) {
        let imageTheme = data.imageTheme;
        let videoTheme = data.videoTheme;
        setThemes(data.theme, imageTheme, videoTheme);
    }
});
// document.addEventListener('DOMContentLoaded', function() {
//     chrome.storage.sync.get(['theme', 'loadTheme','imageTheme'], function(data) {
//         if(data.loadTheme === true) {
//             let imageTheme = data.imageTheme;
//             setThemes(data.theme, imageTheme);
//         }
//     });
//         document.getElementsByClassName('pre-canvas-easy-grader')[0].remove();
// });
//message listener for background
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse)    {
    chrome.storage.sync.get(['theme', 'imageTheme', 'videoTheme'], function(data) {
        let imageTheme = data.imageTheme;
        let videoTheme = data.videoTheme;
        setThemes(data.theme, imageTheme, videoTheme);
    });
    if(request.command === 'clicked') {
        let s = document.createElement('script');
        s.src = chrome.runtime.getURL('/static/js/injectScript.js');
        s.onload = function () {
            this.remove();
        };
        (document.head || document.documentElement).appendChild(s);
        let scores = {};
        let assignments = document.getElementById("grades_summary").querySelectorAll(".student_assignment:not(.hard_coded):not(.dropped)");
        for (let i = 0; i < assignments.length; i++) {
            if(assignments[i].getElementsByClassName("submission_status")[0].textContent.trim() === 'graded' || (assignments[i].getElementsByClassName("submission_status")[0].textContent.trim() === 'pending_review' && assignments[i].getElementsByClassName("submission_icon icon-quiz").length === 0) ){
                let subj = assignments[i].getElementsByClassName("context")[0].textContent;
                let score = assignments[i].getElementsByClassName("original_points")[0].textContent;
                if ($(assignments[i].getElementsByClassName("assignment_score")).find(".what_if_score").length > 0) {
                    score = assignments[i].getElementsByClassName("what_if_score")[0].textContent;
                }
                if (isNaN(parseFloat(score))) {
                    score = '0';
                }
                let possible = assignments[i].getElementsByClassName("points_possible")[0].textContent;
                if (isNaN(parseFloat(possible))) {
                    possible = '0';
                }
                if (subj in scores) {
                    if ($(assignments[i].getElementsByClassName("assignment_score")).find(".icon-off").length === 0) {
                        scores[subj][0] += parseFloat(score);
                        scores[subj][1] += parseFloat(possible);
                    } else {
                        scores[subj][0] += 0;
                        scores[subj][1] += 0;
                    }
                } else {
                    if ($(assignments[i].getElementsByClassName("assignment_score")).find(".icon-off").length === 0) {
                        scores[subj] = [parseFloat(score), parseFloat(possible)];
                    } else {
                        scores[subj] = [0.00, 0.00];
                    }
                }
            }
            let det = assignments[i].getElementsByClassName("details")[0];
            $(det).empty();
            let remBt = document.createElement('button');
            remBt.textContent = 'X';
            remBt.className = 'btn remBt';
            remBt.onclick = function () {
                $(this).parent().parent().remove();
                let categories = document.getElementsByClassName("catName");
                let dropdown = document.getElementById('selCategory');
                // let final_grade = document.getElementsByClassName('student_assignment final_grade')[0];
                let scores = {};
                let assignments = document.getElementById("grades_summary").querySelectorAll(".student_assignment:not(.hard_coded):not(.dropped)");
                for (let i = 0; i < assignments.length; i++) {
                    if(assignments[i].getElementsByClassName("submission_status")[0].textContent.trim() === 'graded' || (assignments[i].getElementsByClassName("submission_status")[0].textContent.trim() === 'pending_review' && assignments[i].getElementsByClassName("submission_icon icon-quiz").length === 0) ){
                        let subj = assignments[i].getElementsByClassName("context")[0].textContent;
                        let score = assignments[i].getElementsByClassName("original_points")[0].textContent;
                        if ($(assignments[i].getElementsByClassName("assignment_score")).find(".what_if_score").length > 0) {
                            score = assignments[i].getElementsByClassName("what_if_score")[0].textContent;
                        }
                        if (isNaN(parseFloat(score))) {
                            score = '0';
                        }
                        let possible = assignments[i].getElementsByClassName("points_possible")[0].textContent;
                        if (isNaN(parseFloat(possible))) {
                            possible = '0';
                        }
                        if (subj in scores) {
                            if ($(assignments[i].getElementsByClassName("assignment_score")).find(".icon-off").length === 0) {
                                scores[subj][0] += parseFloat(score);
                                scores[subj][1] += parseFloat(possible);
                            } else {
                                scores[subj][0] += 0;
                                scores[subj][1] += 0;
                            }
                        } else {
                            if ($(assignments[i].getElementsByClassName("assignment_score")).find(".icon-off").length === 0) {
                                scores[subj] = [parseFloat(score), parseFloat(possible)];
                            } else {
                                scores[subj] = [0.00, 0.00];
                            }
                        }
                    }
                }
                for (let i = 0; i < categories.length; i++) {
                    // let finalTd = $(categories[i].parentElement.parentElement).find('#catPercent')[0];
                    // finalTd.textContent = '0.00%';
                }
                // document.getElementById("final_grade").textContent = '0.00%';
                let body = document.getElementById("tot_table_row");
                let finalTot = 0;
                let finalWeight = 0;
                for (const [subj, vals] of Object.entries(scores)) {
                    for (let i = 0; i < categories.length; i++) {
                        if (categories[i].value === subj) {
                            let weight = parseFloat($(categories[i].parentElement.parentElement).find('.catWeight')[0].textContent);
                            // let finalTd = $(categories[i].parentElement.parentElement).find('#catPercent')[0];
                            let finalVals = 0;
                            if (vals[1] !== 0) {
                                finalVals = vals[0] / vals[1] * 100;
                            }
                            finalWeight += weight;
                            finalTot += (finalVals / 100 * weight);
                            // finalTd.textContent = finalVals.toFixed(2).toString() + '%';
                        }
                    }
                }
                if (finalWeight > 100) {
                    finalWeight = 100;
                }
                document.getElementById("total_grade").textContent = (finalWeight).toFixed(2).toString() + '%';
                // document.getElementById("final_grade").textContent = (finalTot *100/finalWeight).toFixed(2).toString() + '%';
            };
            det.appendChild(remBt);
        }
        assignments = document.getElementById("grades_summary").querySelectorAll(".student_assignment:not(.hard_coded)");
        for (let i = 0; i < assignments.length; i++) {
            let det = assignments[i].getElementsByClassName("details")[0];
            $(det).empty();
            let remBt = document.createElement('button');
            remBt.textContent = 'X';
            remBt.className = 'btn remBt';
            remBt.onclick = function () {
                $(this).parent().parent().remove();
                let categories = document.getElementsByClassName("catName");
                let scores = {};
                let final_grade = document.getElementsByClassName('student_assignment final_grade');
                let group_totals = document.getElementsByClassName('student_assignment hard_coded group_total');
                let assignments = document.getElementById("grades_summary").querySelectorAll(".student_assignment:not(.hard_coded):not(.dropped)");
                for (let i = 0; i < assignments.length; i++) {
                    if((assignments[i].getElementsByClassName("submission_status")[0].textContent.trim()) === 'graded' || (assignments[i].getElementsByClassName("submission_status")[0].textContent.trim() === 'unsubmitted' && assignments[i].getElementsByClassName("grade changed").length !== 0) || (assignments[i].getElementsByClassName("submission_status")[0].textContent.trim() === 'pending_review' && assignments[i].getElementsByClassName("submission_icon icon-quiz").length === 0) ){
                        let subj = assignments[i].getElementsByClassName("context")[0].textContent;
                        let score = assignments[i].getElementsByClassName("original_points")[0].textContent;
                        if ($(assignments[i].getElementsByClassName("assignment_score")).find(".what_if_score").length > 0) {
                            score = assignments[i].getElementsByClassName("what_if_score")[0].textContent;
                        }
                        if (isNaN(parseFloat(score))) {
                            score = '0';
                        }
                        let possible = assignments[i].getElementsByClassName("points_possible")[0].textContent;
                        if (isNaN(parseFloat(possible))) {
                            possible = '0';
                        }
                        if (subj in scores) {
                            if ($(assignments[i].getElementsByClassName("assignment_score")).find(".icon-off").length === 0) {
                                scores[subj][0] += parseFloat(score);
                                scores[subj][1] += parseFloat(possible);
                            } else {
                                scores[subj][0] += 0;
                                scores[subj][1] += 0;
                            }
                        } else {
                            if ($(assignments[i].getElementsByClassName("assignment_score")).find(".icon-off").length === 0) {
                                scores[subj] = [parseFloat(score), parseFloat(possible)];
                            } else {
                                scores[subj] = [0.00, 0.00];
                            }
                        }
                    }
                }
                let tableTr = document.getElementById('table_grade_body').getElementsByTagName('tr');
                let weights = {};
                let trueWeights = {};
                for (let i = 0; i < tableTr.length - 1; i++) {
                    let subj = tableTr[i].children[0].children[0].textContent;
                    let perc = tableTr[i].children[1].children[0].textContent;
                    weights[subj] = perc;
                }
                for (const [subj, vals] of Object.entries(weights)) {
                    trueWeights[subj] = vals;
                    if (!(subj in scores)) {
                        scores[subj] = [0.00, 0.00];
                        trueWeights[subj] = 0;
                    }
                }
                let finalTot = 0;
                let finalWeight = 0;
                for (let i = 0; i < categories.length; i++) {
                    // let finalTd = $(categories[i].parentElement.parentElement).find('#catPercent')[0];
                    // finalTd.textContent = '0.00%';
                }
                // document.getElementById("final_grade").textContent = '0.00%';

                for (let i = 0; i < group_totals.length; i++) {
                    let subj = group_totals[i].getElementsByClassName('title')[0].textContent.trim();
                    console.log(subj, scores[subj]);
                    if (subj in scores) {
                        group_totals[i].getElementsByClassName('grade')[0].innerHTML = (parseFloat(scores[subj][0]) / parseFloat(scores[subj][1]) * 100).toFixed(2).toString() + '%';
                        group_totals[i].getElementsByClassName('points_possible')[0].innerHTML = parseFloat(scores[subj][0]).toFixed(2).toString() + ' / ' + parseFloat(scores[subj][1]).toFixed(2).toString();
                    } else {
                        group_totals[i].getElementsByClassName('grade')[0].innerHTML = 'N/A';
                        group_totals[i].getElementsByClassName('points_possible')[0].innerHTML = '0.00 / 0.00';
                    }
                }
                for (const [subj, vals] of Object.entries(scores)) {
                    for (let i = 0; i < categories.length; i++) {
                        if (categories[i].value === subj) {
                            let weight = parseFloat($(categories[i].parentElement.parentElement).find('.catWeight')[0].value);
                            // let finalTd = $(categories[i].parentElement.parentElement).find('#catPercent')[0];
                            let finalVals = 0;
                            if (vals[1] !== 0) {
                                finalVals = vals[0] / vals[1] * 100;
                            }
                            finalWeight += weight;
                            finalTot += (finalVals / 100 * weight);
                            // finalTd.textContent = finalVals.toFixed(2).toString() + '%';
                        }
                    }
                }
                document.getElementById("total_grade").textContent = (finalWeight).toFixed(2).toString() + '%';
                if (finalWeight > 100) {
                    finalWeight = 100;
                }
                let final_score = 0;
                if (finalWeight === 0){
                    final_score = 0.00;
                }
                else{
                    final_score = finalTot / finalWeight * 100;
                }
                // document.getElementById("final_grade").textContent = (finalTot *100/finalWeight).toFixed(2).toString() + '%';
                if (final_grade.length === 2) {
                    final_grade[0].getElementsByClassName('grade')[0].innerHTML = (finalTot / finalWeight * 100).toFixed(2).toString() + '%';
                    final_grade[1].innerHTML = 'Total: ' + (final_score).toFixed(2).toString() + '%';
                }
                else {
                    final_grade[0].innerHTML = 'Total: ' + (final_score).toFixed(2).toString() + '%';
                }
            };
            det.appendChild(remBt);
        }

        let tb = document.getElementById("grades_summary").getElementsByTagName('tbody')[0];
        let addElements = document.createElement('tr');
        addElements.className = 'addAssignmentDiv';
        let selTitleTh = document.createElement('th');
        let selTitle = document.createElement('input');
        let selCat = document.createElement('td');
        let empStat = document.createElement('td');
        let selScoreTd = document.createElement('td');
        let selScore = document.createElement('input');
        let selTotalTd = document.createElement('td');
        let selTotal = document.createElement('input');
        let addElemBD = document.createElement('td');
        let addElemBt = document.createElement('button');
        let dropdown = document.createElement('select');
        let table = document.getElementsByClassName('summary');
        let opt;

        //configure select title input
        selTitle.value = 'Assignment Name';
        selTitle.type = 'text';
        selTitle.id = 'selTitle';
        // selTitle.contentEditable = 'true';
        selTitleTh.appendChild(selTitle);

        dropdown.id = 'selCategory';
        //add dropdown to select category tr tag
        let group_totals = document.getElementsByClassName('student_assignment hard_coded group_total');

        for (let i = 0; i < group_totals.length; i++) {
            let subj = group_totals[i].getElementsByClassName('title')[0].textContent.trim();
            console.log(subj, scores[subj]);
            if (subj in scores) {
                group_totals[i].getElementsByClassName('grade')[0].innerHTML = (parseFloat(scores[subj][0]) / parseFloat(scores[subj][1]) * 100).toFixed(2).toString() + '%';
                group_totals[i].getElementsByClassName('points_possible')[0].innerHTML = parseFloat(scores[subj][0]).toFixed(2).toString() + ' / ' + parseFloat(scores[subj][1]).toFixed(2).toString();
            } else {
                group_totals[i].getElementsByClassName('grade')[0].innerHTML = 'N/A';
                group_totals[i].getElementsByClassName('points_possible')[0].innerHTML = '0.00 / 0.00';
            }
        }
        if(document.getElementById('assignments-not-weighted').getElementsByClassName('summary').length >0) {
            let ddtableTr = document.getElementById('assignments-not-weighted').children[0].children[1].children[1].children;
            let ddweights = {};
            for (let i = 0; i < ddtableTr.length - 1; i++) {
                let subj = ddtableTr[i].children[0].textContent;
                ddweights[subj] = ddtableTr[i].children[1].textContent;
            }
            for (const [subj, vals] of Object.entries(ddweights)) {
                opt = document.createElement('option');
                opt.value = subj;
                opt.textContent = subj;
                dropdown.appendChild(opt);
            }
        }
        selCat.appendChild(dropdown);

        //add temp val of 0 to both scores and total and make them editable
        selScore.id = 'selScore';
        selScore.value = '0';
        selScore.type = 'number';
        selScore.style = 'max-width: 50px;';
        selScoreTd.appendChild(selScore);
        // selScore.contentEditable = 'true';
        selTotal.id = 'selTotal';
        selTotal.value = '0';
        selTotal.type = 'number';
        selTotal.style = 'max-width: 50px;';
        selTotalTd.appendChild(selTotal);
        // selTotal.contentEditable = 'true';

        //configure the Add Button
        addElemBt.id = 'addAssignment';
        addElemBt.className = 'btn';
        addElemBt.textContent = '+';
        addElemBD.appendChild(addElemBt);

        //add All Elements to the larger Element to add to the document to allow for adding assignments
        addElements.appendChild(selTitleTh);
        addElements.appendChild(selCat);
        addElements.appendChild(empStat);
        addElements.appendChild(selScoreTd);
        addElements.appendChild(selTotalTd);
        addElements.appendChild(addElemBD);

        tb.insertBefore(addElements, tb.firstChild);

        if (table.length === 0) {
            let final_grade = document.getElementsByClassName('student_assignment final_grade');
            let categories = document.getElementsByClassName('catName');
            let group_totals = document.getElementsByClassName('student_assignment hard_coded group_total');
            for (let i = 0; i < group_totals.length; i++) {
                let s = group_totals[i].getElementsByClassName('title')[0].textContent.trim();
                if (!(s in scores)) {
                    scores[s] = [0.00, 0.00];
                }
            }
            $.get(chrome.runtime.getURL('/templates/table.html'), function (data) {
                // let loc = document.getElementById("print-grades-container");
                let loc = document.getElementById("assignments-not-weighted").children[0].children[0];
                let cont = document.createElement("div");
                let doc = new DOMParser().parseFromString(data, 'text/html');
                let table = doc.getElementById("tot_table_row");
                let finalTot = 0;
                let finalWeight = 0;
                let dropdown = document.getElementById('selCategory');
                $(dropdown).empty();

                for (const [subj, vals] of Object.entries(scores)) {
                    let name = subj;
                    let opt = document.createElement('option');
                    opt.textContent = name;
                    opt.value = name;
                    dropdown.appendChild(opt);
                    let tempTr = document.createElement("tr");
                    let tempTh = document.createElement("th");
                    let tempInp = document.createElement("input");
                    tempInp.type = 'text';
                    tempInp.style = 'width: fit-content';
                    tempInp.className = "catName";
                    tempInp.setAttribute('value', subj);
                    tempTh.appendChild(tempInp);
                    let tempTd = document.createElement("td");
                    let tempWeight = document.createElement("input");
                    // let finalTd = document.createElement("td");
                    tempWeight.className = 'catWeight';
                    tempWeight.type = "number";
                    tempWeight.style = "max-width: 50px";
                    // finalTd.id = 'catPercent';
                    let weight = (100 / Object.keys(scores).length).toFixed(2);
                    let finalVals = 0;
                    if (vals[1] !== 0) {
                        finalVals = vals[0] / vals[1] * 100;
                    }
                    finalTot += (finalVals / 100 * weight);
                    if(scores[subj][1] !== 0)
                        finalWeight += (100 / Object.keys(scores).length);
                    // tempTd.contentEditable = "true";
                    console.log(weight.toString());
                    tempWeight.setAttribute('value', weight.toString());
                    // finalTd.textContent = finalVals.toFixed(2).toString() + '%';
                    tempTd.appendChild(tempWeight);
                    tempTr.appendChild(tempTh);
                    tempTr.appendChild(tempTd);
                    // tempTr.appendChild(finalTd);
                    $(tempTr).insertBefore(table);
                }
                doc.getElementById("total_grade").textContent = (finalWeight).toFixed(2).toString() + '%';
                // doc.getElementById("final_grade").textContent = finalTot.toFixed(2).toString() + '%';
                if (finalWeight > 100) {
                    finalWeight = 100;
                }
                let final_score = 0;
                if (finalWeight === 0){
                    final_score = 0.00;
                }
                else{
                    final_score = finalTot / finalWeight * 100;
                }
                // document.getElementById("final_grade").textContent = (finalTot *100/finalWeight).toFixed(2).toString() + '%';
                if (final_grade.length === 2) {
                    final_grade[0].getElementsByClassName('grade')[0].innerHTML = (final_score).toFixed(2).toString() + '%';
                    final_grade[1].innerHTML = 'Total: ' + (final_score).toFixed(2).toString() + '%';
                }
                else {
                    final_grade[0].innerHTML = 'Total: ' + (final_score).toFixed(2).toString() + '%';
                }cont.appendChild(doc.firstChild);
                $(cont.innerHTML).insertBefore(loc);
                loc.remove();
            });
        }
        else {
            let final_grade = document.getElementsByClassName('student_assignment final_grade');
            let tableTr = document.getElementById('assignments-not-weighted').children[0].children[1].children[1].children;
            let weights = {};
            let trueWeights = {};
            for (let i = 0; i < tableTr.length - 1; i++) {
                let subj = tableTr[i].children[0].textContent;
                let perc = tableTr[i].children[1].textContent;
                weights[subj] = perc;
            }
            for (const [subj, vals] of Object.entries(weights)) {
                trueWeights[subj] = vals;
                if (!(subj in scores)) {
                    scores[subj] = [0.00, 0.00];
                    trueWeights[subj] = 0;
                }
            }
            $.get(chrome.runtime.getURL('/templates/table.html'), function (data) {
                // let loc = document.getElementById("print-grades-container");
                let loc = document.getElementById("assignments-not-weighted").children[0].children[0];
                let cont = document.createElement("div");
                let doc = new DOMParser().parseFromString(data, 'text/html');
                let table = doc.getElementById("tot_table_row");
                let finalTot = 0;
                let finalWeight = 0;
                for (const [subj, vals] of Object.entries(scores)) {
                    let tempTr = document.createElement("tr");
                    let tempTh = document.createElement("th");
                    let tempInp = document.createElement("input");
                    tempInp.type = 'text';
                    tempInp.style = "width: fit-content";
                    tempInp.className = "catName";
                    tempInp.setAttribute('value', subj);
                    tempTh.appendChild(tempInp);
                    let tempTd = document.createElement("td");
                    let tempWeight = document.createElement("input");
                    // let finalTd = document.createElement("td");
                    tempWeight.className = 'catWeight';
                    tempWeight.type = "number";
                    tempWeight.style = "max-width: 50px"
                    // finalTd.id = 'catPercent';
                    let weight = parseFloat(weights[subj]);

                    let finalVals = 0;
                    if (vals[1] !== 0) {
                        finalVals = vals[0] / vals[1] * 100;
                    }
                    finalTot += (finalVals / 100 * weight);
                    finalWeight += parseFloat(trueWeights[subj]);
                    // tempTd.contentEditable = "true";
                    console.log(weight.toString());
                    tempWeight.setAttribute('value', weight.toString());
                    // finalTd.textContent = finalVals.toFixed(2).toString() + '%';
                    tempTd.appendChild(tempWeight);
                    tempTr.appendChild(tempTh);
                    tempTr.appendChild(tempTd);
                    // tempTr.appendChild(finalTd);
                    $(tempTr).insertBefore(table);
                }
                doc.getElementById("total_grade").textContent = (finalWeight).toFixed(2).toString() + '%';
                if (finalWeight > 100) {
                    finalWeight = 100;
                }
                let final_score = 0;
                if (finalWeight === 0){
                    final_score = 0.00;
                }
                else{
                    final_score = finalTot / finalWeight * 100;
                }
                // document.getElementById("final_grade").textContent = (finalTot *100/finalWeight).toFixed(2).toString() + '%';
                if (final_grade.length === 2) {
                    final_grade[0].getElementsByClassName('grade')[0].innerHTML = (final_score).toFixed(2).toString() + '%';
                    final_grade[1].innerHTML = 'Total: ' + (final_score).toFixed(2).toString() + '%';
                }
                else {
                    final_grade[0].innerHTML = 'Total: ' + (final_score).toFixed(2).toString() + '%';
                }
                cont.appendChild(doc.firstChild);
                $(cont.innerHTML).insertBefore(loc);
                loc.nextElementSibling.remove();
                loc.remove();
            });

        }
        sendResponse({result: "success"});

        $.get(chrome.runtime.getURL('/templates/finalGradeCalc.html'), function(data) {
            let loc = document.getElementById("print-grades-container");
            let cont = document.createElement("div");
            let doc = new DOMParser().parseFromString(data, 'text/html');

            cont.appendChild(doc.firstChild);
            $(cont.innerHTML).insertBefore(loc);
        });
    }

});

//on init perform based on chrome storage value
window.onload=function(){

}