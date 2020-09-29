let template = '<tr>' +
                '   <th><input class="catName" value="CATEGORY NAME"></th>' +
                '   <td contenteditable="true">0%</td>' +
                '   <td>0.00</td>' +
            '</tr>';

let categories = document.getElementsByClassName("catName");
let dropdown = document.getElementById('selCategory');

document.querySelector("#addAssignment").onclick = function(event) {
    let tb = document.getElementById("grades_summary").getElementsByTagName('tbody')[0];
    let tempTr = document.createElement('tr');
    let aTitle = document.createElement('th');
    let aName = document.createElement('a');
    let aCategory = document.createElement('div');
    tempTr.className = 'student_assignment assignment_graded editable';
    aTitle.className = 'title';
    aName.id = 'assignment_name';
    aName.textContent = document.getElementById('selTitle').textContent;
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
    aScoreS2.id = 'assignment_score';
    aScoreS2.textContent = document.getElementById('selScore').textContent;
    let aScoreD2 = document.createElement('div');
    aScoreD2.style = 'display: none;';
    let aScoreS3 = document.createElement('span');
    aScoreS3.className = 'original_points';
    aScoreS3.textContent = document.getElementById('selScore').textContent;
    aScoreS1.appendChild(aScoreS2);
    aScoreD1.appendChild(aScoreS1);
    aScoreD2.appendChild(aScoreS3);
    aScoreD1.appendChild(aScoreD2);
    aScoreDiv.appendChild(aScoreD1);
    tempTr.appendChild(aScoreDiv);

    let aTotal = document.createElement('td')
    aTotal.className = "possible points_possible"
    aTotal.textContent = document.getElementById('selTotal').textContent;
    tempTr.appendChild(aTotal);
    let remDiv = document.createElement('td');
    let remBt = document.createElement('button');
    remBt.textContent = 'X';
    remBt.className = 'remBt';
    remBt.onclick = function(){$(this).parent().parent().remove()};
    remDiv.appendChild(remBt);
    tempTr.appendChild(remDiv);
    tb.insertBefore(tempTr, tb.firstChild.nextSibling);
}


document.querySelector("#addCatBt").onclick = function(event) {
    let body = document.getElementById("tot_table_row");
    $(template).insertBefore(body);

    $(dropdown).empty();
    for(let i = 0; i<categories.length; i++){
        let name = categories[i].value;
        let opt = document.createElement('option');
        opt.textContent=name;
        opt.value=name;
        dropdown.appendChild(opt);

    }
}

$('.catName').on("change", function() {
    $(dropdown).empty();
    for(let i = 0; i<categories.length; i++){
        let name = categories[i].value;
        let opt = document.createElement('option');
        opt.textContent=name;
        opt.value=name;
        dropdown.appendChild(opt);

    }
});

$('#recalculate').on("click", function() {
    let assignments = document.getElementById("grades_summary").querySelectorAll(".student_assignment:not(.hard_coded):not(.dropped)");
    let scores = {};
    let weightedGrades = {}
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
        if(subj in scores){
            scores[subj][0] += parseFloat(score);
            scores[subj][1] += parseFloat(possible);
        }
        else {
            scores[subj] = [parseFloat(score), parseFloat(possible)];
        }
    }

    let body = document.getElementById("tot_table_row");
    let finalTot = 0;
    let finalWeight = 0;
    for (const [subj, vals] of Object.entries(scores)) {
        for(let i = 0; i<categories.length; i++){
            if (categories[i].value === subj){
                let weight = parseFloat(categories[i].parentElement.nextSibling.textContent);
                let finalTd = categories[i].parentElement.nextSibling.nextSibling;
                let finalVals = 0;
                if(vals[1] !== 0){
                    finalVals = vals[0] / vals[1] * 100;
                }
                finalWeight += weight;
                finalTot += (finalVals / 100 * weight);
                finalTd.textContent = finalVals.toFixed(2).toString();
            }
            if (finalWeight > 100){
                finalWeight = 100;
            }
            document.getElementById("final_grade").textContent = (finalTot *100/finalWeight).toFixed(2).toString() + '%';
        }
    }
});