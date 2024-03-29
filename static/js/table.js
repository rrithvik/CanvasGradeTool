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