import {drawPoint} from './graph.js';

const forma = document.querySelector("form");
const x_select = document.getElementById("x_select");
const y_select = document.getElementById("y_text");
const r_select = document.getElementsByName("r_radio");

export function createErrorMessage(message) {
    let error_block = document.getElementById("error_block");
    error_block.innerHTML = "<p id='error'>"+message+"</p>";
}

export function removeErrorMessage() {
    let error_block = document.getElementById("error");
    if (error_block == null) {
        return;
    }
    error_block.remove();
}

forma.addEventListener("submit", (event) => {
    event.preventDefault();
    var x, r;
    let x_valid = false;
    let r_valid = false;

    for (var radio of r_select) {
        if (radio.checked) {
            r = radio.value;
            r_valid = true;
        }
    }
    if (!r_valid) {
        console.log("Choose R!");
        createErrorMessage("R is not selected!");
        return;
    }

    if (isNaN(y_select.value)) {
        console.log("not a number");
        createErrorMessage("Y must be a number!");
        return;
    }
    if (!(y_select.value >= -5 && y_select.value <= 5)) {
        console.log("wrong y");
        createErrorMessage("Y must be >= -5 and <= 5");
        return;
    }
    removeErrorMessage();
    drawPoint(x_select.value, y_select.value);
    //console.log(x_select.value);
    //console.log(y_select.value);
    //console.log(r);

    $.ajax({
                type: 'POST',
                data: { r: r, x: x_select.value, y: y_select.value },
                url: $("#forma").attr("action"),
                success: function(data){
                                let table = document.getElementById('res_table');
                                let newRow = table.insertRow(1);
                                let cell1 = newRow.insertCell(0);
                                let cell2 = newRow.insertCell(1);
                                let cell3 = newRow.insertCell(2);
                                let cell4 = newRow.insertCell(3);
                                cell1.innerHTML = data.x;
                                cell2.innerHTML = data.y;
                                cell3.innerHTML = data.r;
                                cell4.innerHTML = data.result ? 'Hit' : 'Miss';
                        }
                });
});

