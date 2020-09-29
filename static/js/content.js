//
// function calcIndGrades(index){
//
// }
function getScores() {}
//message listener for background
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse)    {

    if(request.command === "clicked"){
        let assignments = document.getElementById("grades_summary").querySelectorAll(".student_assignment:not(.hard_coded):not(.dropped)");
        let scores = {};
        for(let i = 0; i<assignments.length; i++){
            let subj = assignments[i].getElementsByClassName("context")[0].textContent;
            let score = assignments[i].getElementsByClassName("original_points")[0].textContent;
            if (isNaN(parseFloat(score))){
                score = '0';
            }
            let possible = assignments[i].getElementsByClassName("points_possible")[0].textContent;
            if (isNaN(parseFloat(possible))){
                possible = '0';
            }
            console.log(subj +  '  ' + score + '   ' + possible);
            if(subj in scores){
                scores[subj][0] += parseFloat(score);
                scores[subj][1] += parseFloat(possible);
            }
            else {
                scores[subj] = [parseFloat(score), parseFloat(possible)];
            }
            let det = assignments[i].getElementsByClassName("details")[0];
            $(det).empty();
            let remBt = document.createElement('button');
            remBt.textContent = 'X';
            remBt.className = 'remBt';
            remBt.onclick = function(){$(this).parent().parent().remove()};
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

        let s = document.createElement('script');
        s.src = chrome.runtime.getURL('/static/js/injectScript.js');
        s.onload = function() {
            this.remove();
        };
        (document.head || document.documentElement).appendChild(s);

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
                let weight = (100 / Object.keys(scores).length).toFixed(2);

                let finalVals = 0;
                if(vals[1] !== 0){
                    finalVals = vals[0] / vals[1] * 100;
                }
                finalTot += (finalVals / 100 * weight);
                tempTd.contentEditable = "true";
                tempTd.textContent = weight.toString();
                finalTd.textContent = finalVals.toFixed(2).toString();
                tempTr.appendChild(tempTh);
                tempTr.appendChild(tempTd);
                tempTr.appendChild(finalTd);
                $(tempTr).insertBefore(table);
            }
            doc.getElementById("final_grade").textContent = finalTot.toString() + '%';
            cont.appendChild(doc.firstChild);
            $(cont.innerHTML).insertBefore(loc);
        });
    }
    else if (request.command === 'recalc'){
        let elems = document.getElementById("table_grade_body").getElementsByTagName('tr');
        let tot = 0;
        let ft = 0;
        for (var i = 0; i < elems.length; i++) {
            let elem = elems[i];
            let temp = elem.getElementsByTagName('td');
            if (i === elems.length - 1) {
                console.log(tot);
                console.log(ft);
                temp[0].textContent = tot.toString() + "%";
                if(tot > 100){
                    tot = 100;
                }
                temp[1].textContent = (ft/tot).toFixed(2).toString() + '%';
            } else {
                console.log(temp[0]);
                console.log(temp[1]);
                tot += parseFloat(temp[0].textContent);
                ft += (parseFloat(temp[1].textContent) * parseFloat(temp[0].textContent));
            }
        }
    }
// {
//     let weighted = document.getElementById("show_grades").getElementsByTagName("tr")
//     for (let i = 1; i < weighted.length; i++) {
//         let subj = weighted[i].children[0].textContent;
//         let weight = weighted[i].children[1].textContent;
//         console.log(tot)
//         weightedGrades[subj] = parseFloat(weight);
//     }
//     let tot = weightedGrades["Total"]
//     let finalGrade = 0;
//     for (const [subj, vals] of Object.entries(scores)) {
//         // console.log(subj + "   " + (scores[subj][0]/scores[subj][1]) * weightedGrades[subj]);
//         finalGrade += (scores[subj][0] / scores[subj][1]) * weightedGrades[subj];
//     }
//     finalGrade /= tot;
// }
// console.log(tot);
// console.log(scores);
// console.log(weightedGrades);
// console.log(finalGrade);
sendResponse({result: "success"});

});

//on init perform based on chrome storage value
window.onload=function(){

}