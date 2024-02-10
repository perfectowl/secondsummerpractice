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
            [56.88825273596357, 53.24672451358026],
            [56.88775942856213, 53.247089294006315],
            [56.88764197345519, 53.24738970141595],
            [56.88736007968625, 53.24753990512079],
            [56.88720738633661, 53.24683180194089],
            [56.88645565609743, 53.24711075167842],
            [56.885891848454364, 53.247282413055366],
            [56.88616200734902, 53.24865570407099],
            [56.88557470290206, 53.249149230529724],
            [56.88597407093423, 53.25052252154534],
            [56.886150261350885, 53.251552489807075],
            [56.88634994281488, 53.25183143954465],
            [56.88646740199918, 53.252282050659126],
            [56.88741880773083, 53.25185289721676],
            [56.88775942856213, 53.25333347659296],
            [56.888346698536814, 53.2529257808227],
            [56.888276226629124, 53.252282050659126],
            [56.88903966518834, 53.25157394747918],
        ]]);
        KosmonavtovPark.events.add('click', function () {
            giveAnswer('kosmonavtov');

        });

        GorkovoPark = new ymaps.Polygon([[
            [56.8488365960892, 53.198156160049365],
            [56.848419192817616, 53.19816688888542],
            [56.84841331386491, 53.19769482009879],
            [56.845336692630255, 53.19773196706639],
            [56.8455248341844, 53.19952368268832],
            [56.848861785717915, 53.19899796972143],
        ]]);
        GorkovoPark.events.add('click', function () {
            giveAnswer('gorkovo');
        });

        KirovaPark = new ymaps.Polygon([[
            [56.8665386493506,53.151381804138154],
            [56.86430566665708,53.15228302636715],
            [56.86303633261475,53.15322716394041],
            [56.862401649374426,53.154514624267556],
            [56.86101471133009,53.15717537561033],
            [56.860356485378304,53.158591581970164],
            [56.860074384981914,53.16125233331294],
            [56.86037999364826,53.1635268465576],
            [56.860356485378304,53.166659666686954],
            [56.86026245215017,53.16923458734125],
            [56.860356485378304,53.172152830749496],
            [56.8601684186847,53.17614395776363],
            [56.86132031228332,53.176272703796364],
            [56.86157889574736,53.176658941894516],
            [56.86280126600871,53.17648728051752],
            [56.86282477273607,53.17301113763423],
            [56.86367100504228,53.17009289422604],
            [56.86411761989845,53.17039330163572],
            [56.86538691709783,53.1699641481933],
            [56.8659040257796,53.168590857177676],
            [56.86799589218611,53.17202408471676],
            [56.869758609743464,53.169878317504825],
            [56.86790187823973,53.16030819573973],
            [56.866961725724465,53.158977820068316],
            [56.86679719659453,53.15721829095454],
            [56.866820700800446,53.15515835443113],
            [56.86719676607799,53.15472920098871],
        ]]);
        KirovaPark.events.add('click', function () {
            giveAnswer('kirova');
        });

        myMap.geoObjects.add(KosmonavtovPark);
        myMap.geoObjects.add(GorkovoPark);
        myMap.geoObjects.add(KirovaPark);
    }
    return ymaps;
}

//Берем ответ, основываясь на словаре
function giveAnswer(chosenpark) {
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
    let resultText = "Введите данные";
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
