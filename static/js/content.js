//
// function calcIndGrades(index){
//
// }
function getScores() {}

//message listener for background
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse)    {

    let s = document.createElement('script');
    s.src = chrome.runtime.getURL('/static/js/injectScript.js');
    s.onload = function() {
        this.remove();
    };
    (document.head || document.documentElement).appendChild(s);
    let scores = {};
    let assignments = document.getElementById("grades_summary").querySelectorAll(".student_assignment:not(.hard_coded):not(.dropped)");
    for(let i = 0; i<assignments.length; i++){
        let subj = assignments[i].getElementsByClassName("context")[0].textContent;
        let score = assignments[i].getElementsByClassName("original_points")[0].textContent;
        if ($(assignments[i].getElementsByClassName("assignment_score")).find(".what_if_score").length > 0){
            score = assignments[i].getElementsByClassName("what_if_score")[0].textContent;
        }
        if (isNaN(parseFloat(score))){
            score = '0';
        }
        let possible = assignments[i].getElementsByClassName("points_possible")[0].textContent;
        if (isNaN(parseFloat(possible))){
            possible = '0';
        }
        if(subj in scores){
            if ($(assignments[i].getElementsByClassName("assignment_score")).find(".icon-off").length === 0) {
                scores[subj][0] += parseFloat(score);
                scores[subj][1] += parseFloat(possible);
            }
            else{
                scores[subj][0] += 0;
                scores[subj][1] += 0;
            }
        }
        else {
            if ($(assignments[i].getElementsByClassName("assignment_score")).find(".icon-off").length === 0) {
                scores[subj] = [parseFloat(score), parseFloat(possible)];
            }
            else{
                scores[subj] = [0.00,0.00];
            }
        }

        let det = assignments[i].getElementsByClassName("details")[0];
        $(det).empty();
        let remBt = document.createElement('button');
        remBt.textContent = 'X';
        remBt.className = 'remBt';
        remBt.onclick = function(){
            $(this).parent().parent().remove();
            let categories = document.getElementsByClassName("catName");
            let dropdown = document.getElementById('selCategory');
            let scores = {};
            let assignments = document.getElementById("grades_summary").querySelectorAll(".student_assignment:not(.hard_coded):not(.dropped)");
            for(let i = 0; i<assignments.length; i++){
                let subj = assignments[i].getElementsByClassName("context")[0].textContent;
                let score = assignments[i].getElementsByClassName("original_points")[0].textContent;
                if ($(assignments[i].getElementsByClassName("assignment_score")).find(".what_if_score").length > 0){
                    score = assignments[i].getElementsByClassName("what_if_score")[0].textContent;
                }
                if (isNaN(parseFloat(score))){
                    score = '0';
                }
                let possible = assignments[i].getElementsByClassName("points_possible")[0].textContent;
                if (isNaN(parseFloat(possible))){
                    possible = '0';
                }
                if(subj in scores){
                    if ($(assignments[i].getElementsByClassName("assignment_score")).find(".icon-off").length === 0) {
                        scores[subj][0] += parseFloat(score);
                        scores[subj][1] += parseFloat(possible);
                    }
                    else{
                        scores[subj][0] += 0;
                        scores[subj][1] += 0;
                    }
                }
                else {
                    if ($(assignments[i].getElementsByClassName("assignment_score")).find(".icon-off").length === 0) {
                        scores[subj] = [parseFloat(score), parseFloat(possible)];
                    }
                    else{
                        scores[subj] = [0.00,0.00];
                    }
                }
            }
            for(let i = 0; i<categories.length; i++){
                let finalTd = $(categories[i].parentElement.parentElement).find('#catPercent')[0];
                finalTd.textContent = '0.00%';
            }
            document.getElementById("final_grade").textContent = '0.00%';

            let body = document.getElementById("tot_table_row");
            let finalTot = 0;
            let finalWeight = 0;
            for (const [subj, vals] of Object.entries(scores)) {
                for(let i = 0; i<categories.length; i++){
                    if (categories[i].value === subj){
                        let weight = parseFloat($(categories[i].parentElement.parentElement).find('#catWeight')[0].textContent);
                        let finalTd = $(categories[i].parentElement.parentElement).find('#catPercent')[0];
                        let finalVals = 0;
                        if(vals[1] !== 0){
                            finalVals = vals[0] / vals[1] * 100;
                        }
                        finalWeight += weight;
                        finalTot += (finalVals / 100 * weight);
                        finalTd.textContent = finalVals.toFixed(2).toString() + '%';
                    }
                }
            }
            if (finalWeight>100) {
                finalWeight = 100;
            }
            document.getElementById("total_grade").textContent = (finalWeight).toFixed(2).toString() + '%';
            document.getElementById("final_grade").textContent = (finalTot *100/finalWeight).toFixed(2).toString() + '%';

        };
        det.appendChild(remBt);
    }

    let tb = document.getElementById("grades_summary").getElementsByTagName('tbody')[0];
    let addElements = document.createElement('tr');
    addElements.className='addAssignmentDiv';
    let selTitle = document.createElement('th');
    let selCat = document.createElement('td');
    let empStat = document.createElement('td');
    let selScore = document.createElement('td');
    let selTotal = document.createElement('td');
    let addElemBD = document.createElement('td');
    let addElemBt= document.createElement('button');
    let dropdown = document.createElement('select');
    let opt;

    //configure select title input
    selTitle.textContent = 'Assignment Name';
    selTitle.id = 'selTitle';
    selTitle.contentEditable = 'true';
    dropdown.id = 'selCategory';
    //add dropdown to select category tr tag
    for (const [subj, vals] of Object.entries(scores)) {
        opt = document.createElement('option');
        opt.value = subj;
        opt.textContent = subj;
        dropdown.appendChild(opt);
    }
    selCat.appendChild(dropdown);

    //add temp val of 0 to both scores and total and make them editable
    selScore.id = 'selScore';
    selScore.textContent = '0';
    selScore.contentEditable = 'true';
    selTotal.id = 'selTotal';
    selTotal.textContent = '0';
    selTotal.contentEditable = 'true';

    //configure the Add Button
    addElemBt.id = 'addAssignment';
    addElemBt.textContent = 'Add Assignment';
    addElemBD.appendChild(addElemBt);

    //add All Elements to the larger Element to add to the document to allow for adding assignments
    addElements.appendChild(selTitle);
    addElements.appendChild(selCat);
    addElements.appendChild(empStat);
    addElements.appendChild(selScore);
    addElements.appendChild(selTotal);
    addElements.appendChild(addElemBD);

    tb.insertBefore(addElements, tb.firstChild);



    $.get(chrome.runtime.getURL('/templates/table.html'), function(data) {
        let loc = document.getElementById("print-grades-container");
        let cont = document.createElement("div");
        let doc = new DOMParser().parseFromString(data, 'text/html');
        let table= doc.getElementById("tot_table_row");
        let finalTot = 0;

        for (const [subj, vals] of Object.entries(scores)) {
            let tempTr = document.createElement("tr");
            let tempTh = document.createElement("th");
            let tempInp = document.createElement("input");
            tempInp.className="catName";
            tempInp.setAttribute('value',subj);
            tempTh.appendChild(tempInp);
            let tempTd = document.createElement("td");
            let finalTd = document.createElement("td");
            tempTd.id = 'catWeight';
            finalTd.id = 'catPercent';
            let weight = (100 / Object.keys(scores).length).toFixed(2);

            let finalVals = 0;
            if(vals[1] !== 0){
                finalVals = vals[0] / vals[1] * 100;
            }
            finalTot += (finalVals / 100 * weight);
            tempTd.contentEditable = "true";
            tempTd.textContent = weight.toString();
            finalTd.textContent = finalVals.toFixed(2).toString() + '%';
            tempTr.appendChild(tempTh);
            tempTr.appendChild(tempTd);
            tempTr.appendChild(finalTd);
            $(tempTr).insertBefore(table);
        }
        doc.getElementById("final_grade").textContent = finalTot.toFixed(2).toString() + '%';
        cont.appendChild(doc.firstChild);
        $(cont.innerHTML).insertBefore(loc);
    });

    sendResponse({result: "success"});

});

//on init perform based on chrome storage value
window.onload=function(){

}