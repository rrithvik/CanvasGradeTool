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
    let final_grade = document.getElementsByClassName('student_assignment final_grade')[0];
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
            // let final_grade = document.getElementsByClassName('student_assignment final_grade')[0];
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
                // let finalTd = $(categories[i].parentElement.parentElement).find('#catPercent')[0];
                // finalTd.textContent = '0.00%';
            }
            // document.getElementById("final_grade").textContent = '0.00%';
            let body = document.getElementById("tot_table_row");
            let finalTot = 0;
            let finalWeight = 0;
            for (const [subj, vals] of Object.entries(scores)) {
                for(let i = 0; i<categories.length; i++){
                    if (categories[i].value === subj){
                        let weight = parseFloat($(categories[i].parentElement.parentElement).find('#catWeight')[0].textContent);
                        // let finalTd = $(categories[i].parentElement.parentElement).find('#catPercent')[0];
                        let finalVals = 0;
                        if(vals[1] !== 0){
                            finalVals = vals[0] / vals[1] * 100;
                        }
                        finalWeight += weight;
                        finalTot += (finalVals / 100 * weight);
                        // finalTd.textContent = finalVals.toFixed(2).toString() + '%';
                    }
                }
            }
            if (finalWeight>100) {
                finalWeight = 100;
            }
            document.getElementById("total_grade").textContent = (finalWeight).toFixed(2).toString() + '%';
            // document.getElementById("final_grade").textContent = (finalTot *100/finalWeight).toFixed(2).toString() + '%';
        };
        det.appendChild(remBt);
    }

    let tb = document.getElementById("grades_summary").getElementsByTagName('tbody')[0];
    let addElements = document.createElement('tr');
    addElements.className='addAssignmentDiv';
    let selTitleTh = document.createElement('th');
    let selTitle = document.createElement('input');
    let selCat = document.createElement('td');
    let empStat = document.createElement('td');
    let selScoreTd = document.createElement('td');
    let selScore = document.createElement('input');
    let selTotalTd = document.createElement('td');
    let selTotal = document.createElement('input');
    let addElemBD = document.createElement('td');
    let addElemBt= document.createElement('button');
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
    for (const [subj, vals] of Object.entries(scores)) {
        opt = document.createElement('option');
        opt.value = subj;
        opt.textContent = subj;
        dropdown.appendChild(opt);
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

    if(table.length === 0) {
        let final_grade = document.getElementsByClassName('student_assignment final_grade');
        let categories = document.getElementsByClassName('catName');
        let group_totals = document.getElementsByClassName('student_assignment hard_coded group_total');
        for(let i=0; i<group_totals.length; i++){
            let s = group_totals[i].getElementsByClassName('title')[0].textContent.trim();
            if(!(s in scores)){
                scores[s] = [0.00,0.00];
            }
        }
        $.get(chrome.runtime.getURL('/templates/table.html'), function (data) {
            // let loc = document.getElementById("print-grades-container");
            let loc = document.getElementById("assignments-not-weighted").children[0].children[0];
            let cont = document.createElement("div");
            let doc = new DOMParser().parseFromString(data, 'text/html');
            let table = doc.getElementById("tot_table_row");
            let finalTot = 0;
            let dropdown = document.getElementById('selCategory');
            $(dropdown).empty();

            for (const [subj, vals] of Object.entries(scores)) {
                let name = subj;
                let opt = document.createElement('option');
                opt.textContent=name;
                opt.value=name;
                dropdown.appendChild(opt);
                let tempTr = document.createElement("tr");
                let tempTh = document.createElement("th");
                let tempInp = document.createElement("input");
                tempInp.type = 'text';
                tempInp.className = "catName";
                tempInp.setAttribute('value', subj);
                tempTh.appendChild(tempInp);
                let tempTd = document.createElement("td");
                let tempWeight = document.createElement("input");
                // let finalTd = document.createElement("td");
                tempWeight.id = 'catWeight';
                tempWeight.type = "number";
                tempWeight.style = "max-width: 50px";
                // finalTd.id = 'catPercent';
                let weight = (100 / Object.keys(scores).length).toFixed(2);

                let finalVals = 0;
                if (vals[1] !== 0) {
                    finalVals = vals[0] / vals[1] * 100;
                }
                finalTot += (finalVals / 100 * weight);
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
            // doc.getElementById("final_grade").textContent = finalTot.toFixed(2).toString() + '%';
            final_grade[1].innerHTML = 'Total: ' + finalTot.toFixed(2).toString() + '%';
            final_grade[0].getElementsByClassName('grade')[0].innerHTML = finalTot.toFixed(2).toString() + '%';
            cont.appendChild(doc.firstChild);
            $(cont.innerHTML).insertBefore(loc);
            loc.remove();
        });
    }
    else{
        let final_grade = document.getElementsByClassName('student_assignment final_grade');
        console.log(final_grade);
        let tableTr = document.getElementById('assignments-not-weighted').children[0].children[1].children[1].children;
        let weights = {};
        let trueWeights = {};
        for(let i=0; i<tableTr.length-1;i++){
            let subj = tableTr[i].children[0].textContent;
            let perc = tableTr[i].children[1].textContent;
            weights[subj] = perc;
        }
        for (const [subj, vals] of Object.entries(weights)) {
            trueWeights[subj] = vals;
            if(!(subj in scores)){
                scores[subj] = [0.00,0.00];
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
                tempInp.className = "catName";
                tempInp.setAttribute('value', subj);
                tempTh.appendChild(tempInp);
                let tempTd = document.createElement("td");
                let tempWeight = document.createElement("input");
                // let finalTd = document.createElement("td");
                tempWeight.id = 'catWeight';
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
            if(finalWeight>100){
                finalWeight = 100;
            }
            // doc.getElementById("final_grade").textContent = (finalTot/finalWeight *100).toFixed(2).toString() + '%';
            final_grade[0].getElementsByClassName('grade')[0].innerHTML = (finalTot/finalWeight *100).toFixed(2).toString() + '%';
            final_grade[1].innerHTML = 'Total: ' + (finalTot/finalWeight *100).toFixed(2).toString() + '%';
            cont.appendChild(doc.firstChild);
            $(cont.innerHTML).insertBefore(loc);
            loc.nextElementSibling.remove();
            loc.remove();
        });

    }
    sendResponse({result: "success"});

});

//on init perform based on chrome storage value
window.onload=function(){

}