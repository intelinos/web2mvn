import {createErrorMessage, removeErrorMessage} from './script.js';

var graph = document.getElementById("graph");
var calculato = Desmos.GraphingCalculator(graph, {
    keypad: false,
    expressions: false,
    settingsMenu: false,
    xAxisLabel: 'x',
    yAxisLabel: 'y',
    xAxisStep: 1,
    yAxisStep: 1,
    //lockViewport: true,
    xAxisArrowMode: Desmos.AxisArrowModes.POSITIVE,
    yAxisArrowMode: Desmos.AxisArrowModes.POSITIVE
    });

calculato.setMathBounds({
    left: -5,
    right: 5,
    bottom: -5,
    top: 5
});

graph.addEventListener("click", handleClick);

var points = [];

function clearPoints() {
    for (let point of points) {
        calculato.removeExpression({ id: point.x + "_" + point.y });
    }
}

function drawGraph(R){
    calculato.setExpression({id: "firstQuadrant", latex: "x >= 0\\{y>=0\\} \\{y<="+ R+" -x\\}", color: Desmos.Colors.BLUE});
    calculato.setExpression({id: "secondQuadrant", latex: "x <= 0\\{y>=0\\} \\{x^2 + y^2 <= "+R+"^2\\}", color: Desmos.Colors.BLUE});
    calculato.setExpression({id: "fourthQuadrant", latex: "x>=0 \\{x<="+R+"\\}\\{y<=0\\}\\{y>=-"+R+"/2\\}", color: Desmos.Colors.BLUE});
}

drawGraph(1);

//var r_radio = $('input[name="r_radio"]:checked').val();
$("#r_select").on("click", "input[type='radio']", function(event) {
    let r_val = $('input[name="r_radio"]:checked').val();
    clearPoints();
    drawGraph(r_val);
    removeErrorMessage();
});



export function drawPoint(x, y){
    calculato.setExpression({id: x + "_" + y, latex: "(" + x + "," + y +")", color: Desmos.Colors.ORANGE});
}

function handleClick(event){
    if (!$('input[name="r_radio"]').is(':checked')){
        createErrorMessage("Select R before pointing at the graph!");
        return;
    }
    removeErrorMessage();
    let calculatorRect = graph.getBoundingClientRect();
    let coordinates = calculato.pixelsToMath({x: event.clientX - calculatorRect.left,
                                           y: event.clientY - calculatorRect.top});
    drawPoint(coordinates.x, coordinates.y);
    points.push({x: coordinates.x, y: coordinates.y});
    //console.log(0);
    //console.log(coordinates.x);
    //console.log(coordinates.y);

    $.ajax({
        type: "POST",
        url: $("#forma").attr("action"),
        data: {x: coordinates.x, y: coordinates.y, r: $('input[name="r_radio"]:checked').val()},
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
}






