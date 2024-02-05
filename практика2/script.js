var parks_dict = new Map([
    ["kosmonavtov", new Map([
        ["noiselevel", "50"],
        ["square", "9"],
        ["protstrip", "1"],
    ])],
    ["gorkovo", new Map([
        ["noiselevel", "45"],
        ["square", "4"],
        ["protstrip", "0"],
    ])],
    ["kirova", new Map([
        ["noiselevel", "40"],
        ["square", "85"],
        ["protstrip", "1"],
    ])]
]);

window.onload = function () {
    document.getElementById("tablePark").addEventListener("change", giveAnswerPreset);
    document.getElementById("protstrip").addEventListener("change", giveAnswerUser);

    YAmap = initYAMap();
}

function initYAMap() {
    // Как только будет загружен API и готов DOM, выполняем инициализацию
    ymaps.ready(init);

    function init() {
        var myMap = new ymaps.Map("map", {
            center: [56.8498, 53.2045],
            zoom: 15
        }),
            // Создаем многоугольник
            KosmonavtovPark = new ymaps.Polygon([[
                // Координаты вершин
                [56.888710, 53.246800],
                [56.886905, 53.248001],
                [56.886811, 53.248302],
                [56.886905, 53.250662],
                [56.887186, 53.252464],
                [56.887257, 53.252486],
                [56.889496, 53.251434],
            ]]);
            KosmonavtovPark.events.add('click', function () {
            giveAnswer('kosmonavtov');

            //ПОЛИГОН2
            //ДОБАВИТЬ ИВЕНТ

            //ПОЛИГОН3
            //ДОБАВИТЬ ИВЕНТ
        });
        myMap.geoObjects.add(KosmonavtovPark);
        //myMap.geoObjects.add(KosmonavtovPark);
        //myMap.geoObjects.add(KosmonavtovPark);
    }
    return ymaps;
}

//Берем ответ, основываясь на словаре
function giveAnswer(chosenpark){
    let parkinfo = parks_dict.get(chosenpark);

    let noiselevel = parkinfo.get("noiselevel");
    let square = parkinfo.get("square");
    let protstrip = parkinfo.get("protstrip");

    document.getElementById("noiselevel").value = noiselevel;
    document.getElementById("square").value = square;
    document.getElementById("protstrip").value = protstrip;

    showAnswer(noiselevel, square, protstrip);
}

//Сначала читаем то, что в элементе-списке с выбором, потом обращаемся к словарю за ответом
function giveAnswerPreset() {
    let chosenpark = document.getElementById("tablePark").value;
    giveAnswer(chosenpark);
}

//Берем значения из полей (предполож заполнено юзером)
function giveAnswerUser() {
    let noiselevel = document.getElementById("noiselevel").value;
    let square = document.getElementById("square").value;
    let protstrip = document.getElementById("protstrip").value;

    showAnswer(noiselevel, square, protstrip);
}
function showAnswer(noiselevel, square, protstrip) {
    let result = 0.32 + 0.008 * parseFloat(noiselevel) - 0.0006 * parseFloat(square) - 0.088 * parseFloat(protstrip);
    //console.log("Значение коэффициента K: " + K);
    document.getElementById("result").value = result;
    //console.log(result);
    let resultText = "ДЕФОЛТ";
    switch (true) {
        case result >= 0 && result < 0.26:
            resultText = "Весьма благоприятный";
            break;
        case result >= 0.26 && result < 0.51:
            resultText = "Благоприятный";
            break;
        case result >= 0.51 && result < 0.76:
            resultText = "Относительно благоприятный";
            break;
        case result >= 0.76 && result <= 1.0:
            resultText = "Неблагоприятный";
            break;
    }
    document.getElementById("resultText").value = resultText;
}


/* Array.from() - массив из массивоподобных объектов, типа arguments, NodeList

Парк Космонавтов:
noiselevel: 50 дБА
square: 9 га
protstrip: 1

Парк им. Горького
noiselevel: 70 дБА
square: 4 га
protstrip: 0

Парк им. Кирова
noiselevel: 40 дБА
square: 85 га
protstrip: 1



document*/
