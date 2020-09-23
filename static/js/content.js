//find all the image in answer feed,thumbnail and ad feeds and add blurclasses
var blurImage = function(){
    $('.answer_body_preview').find("img").addClass('blurimage');
    $('.ui_layout_thumbnail').addClass('blurthumb');
    $('.HyperLinkFeedStory ').find("img").addClass('blurimage');
    $('.hyperlink_image').addClass('blurthumb');
}

//find all the image in answer feed,thumbnail and ad feeds and remove blurclasses
var unblurImage=function(){
    $('.answer_body_preview').find("img").removeClass('blurimage');
    $('.ui_layout_thumbnail').removeClass('blurthumb');
    $('.HyperLinkFeedStory ').find("img").removeClass('blurimage');
    $('.hyperlink_image').removeClass('blurthumb');
}

var addListeners=function(){
    $( "<style> .blurimage { -webkit-filter: blur(50px); filter: blur(50px) } .blurthumb { -webkit-filter: blur(5px); -moz-filter: blur(5px); -o-filter: blur(5px); -ms-filter: blur(5px); filter: blur(5px); width: 100px; height: 100px; background-color: #ccc;}</style>" ).appendTo( "head" );
    blurImage();

    $(window).scroll(function(){
        blurImage();
    });

    $('.ui_qtext_more_link').click(function(){
        blurImage();
    });

    $('.blurimage').click(function(){
        $(this).removeClass('.blurimage'); //if user wanted to see image let them click and see
    });

    $('.blurthumb').click(function(){
        $(this).removeClass('.blurthumb'); //if user wanted to see image let them click and see
    });
}

var removeListeners=function(){
    $(window).unbind('scroll');
    $('.ui_qtext_more_link').unbind('click');
    $('.blurimage').unbind('click');
    $('.blurthumb').unbind('click');
    unblurImage();
}
//
// function calcIndGrades(index){
//
// }

//message listener for background
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse)    {

    if(request.command === "clicked"){
        let assignments = document.getElementById("grades_summary").querySelectorAll(".student_assignment:not(.hard_coded):not(.dropped)");
        let scores = {};
        let weightedGrades = {}
        for(let i = 0; i<assignments.length; i++){
            let subj = assignments[i].getElementsByClassName("context")[0].textContent;
            let score = assignments[i].getElementsByClassName("what_if_score")[0].textContent;
            if (isNaN(parseFloat(score))){
                score = '0'
            }
            let possible = assignments[i].getElementsByClassName("points_possible")[0].textContent;
            if (isNaN(parseFloat(possible))){
                possible = '0'
            }
            console.log(subj +  '  ' + score + '   ' + possible);
            if(subj in scores){
                scores[subj][0] += parseFloat(score);
                scores[subj][1] += parseFloat(possible);
            }
            else {
                scores[subj] = [parseFloat(score), parseFloat(possible)];
            }
        }
        $.get(chrome.runtime.getURL('/templates/table.html'), function(data) {
            let loc = document.getElementById("print-grades-container");
            let cont = document.createElement("div");
            let doc = new DOMParser().parseFromString(data, 'text/html');
            let table= doc.getElementById("tot_table_row");
            let finalTot = 0;

            for (const [subj, vals] of Object.entries(scores)) {
                let tempTr = document.createElement("tr");
                let tempTh = document.createElement("th");
                tempTh.textContent = subj;
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