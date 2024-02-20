<%@page contentType="text/html" pageEncoding="UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<jsp:useBean id="data" class="beans.DataList" scope="session" />

<!DOCTYPE html>
<html lang="ru-RU">
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="author" content="Строзенко Константин Викторович">
        <meta name="description" content="Веб-программирование: Лабораторная работа №2.">
        <meta name="keywords" content="ITMO, ИТМО, ПИиКТ, ВТ, Лабораторная работа, Веб-программирование" />
        <link rel="stylesheet" href="styles.css">
        <title>Лабораторная работа №2 | Веб-программирование</title>
    </head>

    <header>
        <h1>Строзенко Константин Викторович P3231 Вариант 2848294</h1>
    </header>

    <body>
        <div class="main">
        <div class="forms">
            <form id="forma" action="${pageContext.request.contextPath}/controller" method="post">
                <div class="x_select">
                    <label for="x_select">Choose X:</label>
                    <select name="x_select" id="x_select" required>
                        <option value="">-- Please, choose X --</option>
                        <option value="-2">-2</option>
                        <option value="-1.5">-1.5</option>
                        <option value="-1">-1</option>
                        <option value="-0.5">-0.5</option>
                        <option value="0">0</option>
                        <option value="0.5">0.5</option>
                        <option value="1">1</option>
                        <option value="1.5">1.5</option>
                        <option value="2">2</option>
                    </select>
                </div>
                <div class="y_select">
                    <p>Выберите значение Y:</p>
                    <input type="text" name="y_text" id="y_text" required maxlength="7" />
                </div>

                <div id="r_select">
                    <p>Выберите значение R:</p>
                    <input type="radio" id="r_plus_1" name="r_radio" value="1" >
                    <label for="r_plus_1"> 1 </label>

                    <input type="radio" id="r_plus_2" name="r_radio" value="2">
                    <label for="r_plus_2"> 2 </label>

                    <input type="radio" id="r_plus_3" name="r_radio" value="3">
                    <label for="r_plus_3"> 3 </label>

                    <input type="radio" id="r_plus_4" name="r_radio" value="4">
                    <label for="r_plus_4"> 4 </label>

                    <input type="radio" id="r_plus_5" name="r_radio" value="5">
                    <label for="r_plus_5"> 5 </label>
                </div>

                <div id="submit">
                    <input type="submit" id="submit_button" value="Проверить">
                </div>
            </form>
        </div>

        <div id="graph-container">
            <div id="graph"></div>
        </div>
        </div>

        <div id="error_block">

        </div>

        <div class="table_div">
            <table id="res_table">
                <thead>
                <tr>
                    <th>X</th>
                    <th>Y</th>
                    <th>R</th>
                    <th>Result</th>
                </tr>
                </thead>
                <tbody id="res_data">
                    <c:forEach var="data_item" items="${data.dataList}">
                        <tr>
                            <c:if test="${data_item.x - data_item.x.intValue() == 0}">
                                <td>${data_item.x.intValue()}</td>
                            </c:if>
                            <c:if test="${data_item.x - data_item.x.intValue() != 0}">
                                <td>${data_item.x}</td>
                            </c:if>
                            <c:if test="${data_item.y - data_item.y.intValue() == 0}">
                                <td>${data_item.y.intValue()}</td>
                            </c:if>
                            <c:if test="${data_item.y - data_item.y.intValue() != 0}">
                                <td>${data_item.y}</td>
                            </c:if>
                            <td>${data_item.r.intValue()}</td>
                            <td>${data_item.result ? "Hit" : "Miss"}</td>
                        </tr>
                    </c:forEach>
                </tbody>
            </table>
        </div>
        <script type = "text/javascript" src = "http://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
        <script src = "https://www.desmos.com/api/v1.8/calculator.js?apiKey=dcb31709b452b1cf9dc26972add0fda6"></script>
        <script type="module" src = "scripts/graph.js"></script>
        <script type="module" src = "scripts/script.js"></script>
    </body>
</html>