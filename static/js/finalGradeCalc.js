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
