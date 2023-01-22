let tempCat =  '   <th><input type="text" style="width: fit-content" class="catName" value="CATEGORY NAME"></th>' +
                '   <td> <input style="width: 50px" type="number" class="catWeight" contenteditable="true" value="0"></td>' +
                // '   <td id="catPercent">0.00</td>' +
                '';

let categories = document.getElementsByClassName("catName");
let dropdown = document.getElementById('selCategory');

$("#addAssignment").on('click', function() {
    let tb = document.getElementById("grades_summary").getElementsByTagName('tbody')[0];
    let tempTr = document.createElement('tr');
    let aTitle = document.createElement('th');
    let aName = document.createElement('a');
    let aCategory = document.createElement('div');
    tempTr.className = 'student_assignment assignment_graded editable';
    aTitle.className = 'title';
    aName.id = 'assignment_name';
    aName.textContent = document.getElementById('selTitle').value;
    aCategory.id = 'assignment_category';
    aCategory.className = 'context context_hover';
    aCategory.textContent = document.getElementById('selCategory').value;
    aTitle.appendChild(aName);
    aTitle.appendChild(aCategory);
    tempTr.appendChild(aTitle);
    tempTr.appendChild(document.createElement('td'));
    tempTr.appendChild(document.createElement('td'));

    let aScoreDiv = document.createElement('td');
    aScoreDiv.className = 'assignment_score';
    aScoreDiv.title = 'Click to test a different score';
    let aScoreD1 = document.createElement('div');
    aScoreD1.className = 'score_holder';
    aScoreD1.style = 'position: relative; height: 100%;';
    let aScoreS1 = document.createElement('span');
    aScoreS1.className= 'tooltip';
    let aScoreS2 = document.createElement('span');
    aScoreS2.className = 'grade';
    // aScoreS2.contentEditable = 'true';
    aScoreS2.id = 'assignment_score';
    aScoreS2.textContent = document.getElementById('selScore').value + " / " + document.getElementById('selTotal').value;
    let aScoreD2 = document.createElement('div');
    aScoreD2.style = 'display: none;';
    let aScoreS3 = document.createElement('span');
    aScoreS3.className = 'original_points';
    let aScoreStatus = document.createElement('span');
    aScoreStatus.className = 'submission_status';
    aScoreStatus.textContent = 'graded';
    aScoreS3.textContent = document.getElementById('selScore').value;
    aScoreS1.appendChild(aScoreS2);
    aScoreD1.appendChild(aScoreS1);
    aScoreD2.appendChild(aScoreS3);
    aScoreD2.appendChild(aScoreStatus);
    aScoreD1.appendChild(aScoreD2);
    aScoreDiv.appendChild(aScoreD1);
    tempTr.appendChild(aScoreDiv);

    let aTotal = document.createElement('td');
    aTotal.className = "possible points_possible";
    aTotal.textContent = document.getElementById('selTotal').value;
    aTotal.setAttribute("hidden", "true");
    tempTr.appendChild(aTotal);
    let remDiv = document.createElement('td');
    remDiv.style.textAlign = "right";
    let remBt = document.createElement('button');
    remBt.textContent = 'X';
    remBt.className = 'btn remBt';
    remBt.onclick = function(){
        $(this).parent().parent().remove()
        reCalc();
    };
    remDiv.appendChild(remBt);
    tempTr.appendChild(remDiv);
    tb.insertBefore(tempTr, tb.firstChild.nextSibling);

    reCalc();
});

$(document).on('input', '.catWeight', function() {
    console.log('test');
    reCalc();
});
$(document).on('input', '.catName', function() {
    $(dropdown).empty();
    for(let i = 0; i<categories.length; i++){
        let name = categories[i].value;
        let opt = document.createElement('option');
        opt.textContent=name;
        opt.value=name;
        dropdown.appendChild(opt);
    }
    let tableTr = document.getElementById('table_grade_body').getElementsByTagName('tr');
    let weights = [];
    for(let i=0; i<tableTr.length-1;i++){
        let subj = tableTr[i].children[0].children[0].value;
        weights.push(subj);
    }
    let group_totals = document.getElementsByClassName('student_assignment hard_coded group_total');
    console.log(weights);
    for(let i = 0; i<group_totals.length; i++){
        let subj = group_totals[i].children[0].textContent.trim();
        console.log(subj);
        if(weights.indexOf(subj) === -1){
            group_totals[i].children[0].textContent = this.value;
        }
        else{
            weights.splice(weights.indexOf(subj), 1);
        }
    }
    reCalc();
});

function reCalc() {
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
            console.log(assignments[i]);
            let possible = '0';
            if (assignments[i].getElementsByClassName("points_possible").length > 0) {
                possible = assignments[i].getElementsByClassName("points_possible")[0].textContent;
            }
            else {
                possible = $(assignments[i].getElementsByClassName("assignment_score"))[0].getElementsByClassName("tooltip")[0].children[1].textContent.replace('/ ', '');
            }
            if (isNaN(parseFloat(possible))) {
                possible = '0';
            }
            let aTotal = document.createElement('td');
            aTotal.className = "possible points_possible";
            aTotal.textContent = possible;
            aTotal.setAttribute("hidden", "true");
            assignments[i].appendChild(aTotal);
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
}

//TABLE.JS
let tableTr = document.getElementById('table_grade_body').getElementsByTagName('tr');
for (let i = 0; i < tableTr.length - 1; i++) {
    let remDiv = document.createElement('div');
    remDiv.style = "color:red";
    remDiv.className = "remCategory";
    remDiv.innerHTML = "X";
    $(remDiv).insertBefore(tableTr[i]);
}


$(".remCategory").on('click', function() {
    this.nextElementSibling.remove();
    this.remove();
    $(dropdown).empty();
    for(let i = 0; i<categories.length; i++){
        let name = categories[i].value;
        let opt = document.createElement('option');
        opt.textContent=name;
        opt.value=name;
        dropdown.appendChild(opt);
    }
    let tableTr = document.getElementById('table_grade_body').getElementsByTagName('tr');
    let weights = [];
    for(let i=0; i<tableTr.length-1;i++){
        let subj = tableTr[i].children[0].children[0].value;
        weights.push(subj);
    }
    let group_totals = document.getElementsByClassName('student_assignment hard_coded group_total');
    console.log(weights);
    for(let i = 0; i<group_totals.length; i++){
        let subj = group_totals[i].children[0].textContent.trim();
        if(weights.indexOf(subj) === -1){
            group_totals[i].remove();
        }else{
            weights.splice(weights.indexOf(subj), 1);
        }
    }
    reCalc();
});
$("#addCatBt").on('click', function() {
    let body = document.getElementById("table_grade_body");
    let ttr = document.getElementById("tot_table_row");
    let temp = document.createElement('tr');
    temp.innerHTML = tempCat;
    let remDiv = document.createElement('div');
    remDiv.style = "color:red";
    remDiv.className = "remCategory";
    remDiv.onclick = function () {
        this.nextElementSibling.remove();
        this.remove();
        $(dropdown).empty();
        for(let i = 0; i<categories.length; i++){
            let name = categories[i].value;
            let opt = document.createElement('option');
            opt.textContent=name;
            opt.value=name;
            dropdown.appendChild(opt);
        }
        let tableTr = document.getElementById('table_grade_body').getElementsByTagName('tr');
        let weights = {};
        for(let i=0; i<tableTr.length-1;i++){
            let subj = tableTr[i].children[0].children[0].value;
            let perc = tableTr[i].children[1].children[0].value;
            weights[subj] = perc;
        }
        let group_totals = document.getElementsByClassName('student_assignment hard_coded group_total');
        console.log(weights);
        for(let i = 0; i<group_totals.length; i++){
            let subj = group_totals[i].children[0].textContent.trim();
            if(!(subj in weights)){
                group_totals[i].remove();
            }
        }
        reCalc();
    };
    remDiv.innerHTML = "X";
    $(remDiv).insertBefore(ttr);
    body.insertBefore(temp, ttr);

    $(dropdown).empty();
    for(let i = 0; i<categories.length; i++){
        let name = categories[i].value;
        let opt = document.createElement('option');
        opt.textContent=name;
        opt.value=name;
        dropdown.appendChild(opt);
    }
    let final_score = document.getElementsByClassName('student_assignment hard_coded final_grade');
    let newCatTr = document.createElement('tr');
    newCatTr.className = 'student_assignment hard_coded group_total';
    newCatTr.innerHTML = '<th class="title" scope="row">\n' +
        'CATEGORY NAME\n' +
        '        </th>\n' +
        '        <td class="due">\n' +
        '        </td>\n' +
        '\n' +
        '        <td class="status" scope="row">\n' +
        '        </td>\n' +
        '\n' +
        '        <td class="assignment_score" title="">\n' +
        '          <div style="position: relative; height: 100%;" class="score_holder">\n' +
        '              <span class="grade">NaN%</span>\n' +
        '          </div>\n' +
        '        </td>\n' +
        '        <td class="possible points_possible" aria-label="">0.00 / 0.00</td>\n' +
        '        <td class="details">\n' +
        '        </td>';
    let grades= document.getElementById("grades_summary").getElementsByTagName("tbody")[0];
    if(final_score.length > 0) {
        $(newCatTr).insertBefore(final_score);
    }
    else {
        grades.appendChild(newCatTr);
    }
    reCalc();
});
$('#recalculate').on("click", function() {
    console.log("clicked");
    reCalc();
});

//finalGradeCalc.js
$("#calculate_final").on('click', function() {
    reCalc();
    let currWeight = document.getElementById("total_grade").innerHTML;
    currWeight = currWeight.substring(0,currWeight.length-1);
    let desGrade = document.getElementById('desired_grade').value;
    let finWeight = document.getElementById('final_weight').value;
    let reqGrade = document.getElementById("req_grade");
    let currGrade = document.getElementsByClassName('student_assignment final_grade');
    console.log(currWeight + '' + currGrade.length);
    if(currGrade.length === 2) {
        currGrade = currGrade[1].innerHTML.trim();
        currGrade = currGrade.substring(7, currGrade.length - 1);
    }
    else {
        currGrade = currGrade[0].innerHTML.trim();
        currGrade = currGrade.substring(7, currGrade.length - 1);
    }
    let weightedCurr = parseFloat(currWeight) * parseFloat(currGrade);
    console.log(currGrade);
    console.log("curr: " + weightedCurr);
    let finGrade = parseFloat(desGrade) * (parseFloat(currWeight) + parseFloat(finWeight)) - weightedCurr;
    console.log("fin: " + finGrade);
    finGrade = (finGrade/parseFloat(finWeight)).toFixed(2);
    if(finGrade < -1000){
        finGrade = '<h5 style="font-max-size: small; color: red">Please Make Sure All Fields Are Inputted Correctly</h5>';
    }
    else{
        finGrade = finGrade.toString() + '%';
    }
    reqGrade.innerHTML = finGrade;
    $("#req_final_grade").show();
});
