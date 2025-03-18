const blockWidth = 50;
const blockHeight = 50;

const borderColor = "rgba(127,127,127,1)";
const textColor = "rgba(0,0,0,1)";
const tableBgColor = "#f3ead7";
const tableBgColorToday = "#ffd570";
const mainBgColor = "#ffffff";
const borderWidth = 1;
const calendar_month = [["янв", "фев", "мар", "апр", "май", "июн"], ["июл", "авг", "сен", "окт", "ноя", "дек"]];
const day_columns = 7;
const day_rows = 7;
const max_day = 31;

const paddingCanvasTop = 20;
const paddingCanvasLeft = 20;


let blockClick = false;

const figs = [
    { color: "#ec1a3d", body: [[true, true, true], [true, true, true]], size: { width: 3 * (blockWidth + borderWidth) + borderWidth, height: 2 * (blockHeight + borderWidth) + borderWidth }, x: paddingCanvasLeft + 0, y: paddingCanvasTop + 408 + 0, isHover: false },
    { color: "#017dc5", body: [[true, false, true], [true, true, true]], size: { width: 3 * (blockWidth + borderWidth) + borderWidth, height: 2 * (blockHeight + borderWidth) + borderWidth }, x: paddingCanvasLeft + 204, y: paddingCanvasTop + 408 + 0, isHover: false },
    { color: "#98c83c", body: [[true, true, true], [false, true, true]], size: { width: 3 * (blockWidth + borderWidth) + borderWidth, height: 2 * (blockHeight + borderWidth) + borderWidth }, x: paddingCanvasLeft + 408, y: paddingCanvasTop + 408 + 0, isHover: false },
    { color: "#ffde00", body: [[true, true, false, false], [false, true, true, true]], size: { width: 4 * (blockWidth + borderWidth) + borderWidth, height: 2 * (blockHeight + borderWidth) + borderWidth }, x: paddingCanvasLeft + 612, y: paddingCanvasTop + 408 + 0, isHover: false },
    { color: "#00adef", body: [[true, true, true, true], [false, false, true, false]], size: { width: 4 * (blockWidth + borderWidth) + borderWidth, height: 2 * (blockHeight + borderWidth) + borderWidth }, x: paddingCanvasLeft + 0, y: paddingCanvasTop + 408 + 153, isHover: false },
    { color: "#8e5fa7", body: [[true, true, false], [false, true, false], [false, true, true]], size: { width: 3 * (blockWidth + borderWidth) + borderWidth, height: 3 * (blockHeight + borderWidth) + borderWidth }, x: paddingCanvasLeft + 255, y: paddingCanvasTop + 408 + 153, isHover: false },
    { color: "#01ac4e", body: [[true, false, false], [true, false, false], [true, true, true]], size: { width: 3 * (blockWidth + borderWidth) + borderWidth, height: 3 * (blockHeight + borderWidth) + borderWidth }, x: paddingCanvasLeft + 459, y: paddingCanvasTop + 408 + 153, isHover: false },
    { color: "#f47725", body: [[true, true, true, true], [true, false, false, false]], size: { width: 4 * (blockWidth + borderWidth) + borderWidth, height: 2 * (blockHeight + borderWidth) + borderWidth }, x: paddingCanvasLeft + 663, y: paddingCanvasTop + 408 + 153, isHover: false }
];


const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

function drawTable() {
    ctx.fillStyle = borderColor;
    ctx.fillRect(paddingCanvasLeft, paddingCanvasTop, (blockWidth + borderWidth) * day_columns + borderWidth, (blockHeight + borderWidth) * day_rows + borderWidth);

    ctx.font = "24px serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    calendar_month.forEach((row, y) => {
        row.forEach((cell, x) => {

            ctx.fillStyle = tableBgColor;
            if (y * 6 + x == new Date().getMonth()) {
                ctx.fillStyle = tableBgColorToday;
            }
            ctx.fillRect(paddingCanvasLeft + x * (blockWidth + borderWidth) + borderWidth, paddingCanvasTop + y * (blockHeight + borderWidth) + borderWidth, (blockWidth + 0 * borderWidth), (blockHeight + 0 * borderWidth));

            ctx.fillStyle = textColor;
            ctx.fillText(cell, paddingCanvasLeft + (blockWidth) / 2 + x * (blockWidth + borderWidth), paddingCanvasTop + (blockWidth) / 2 + y * (blockHeight + borderWidth));

        });
    });

    ctx.fillStyle = mainBgColor;
    ctx.fillRect(paddingCanvasLeft + 6 * (blockWidth + borderWidth) + borderWidth, paddingCanvasTop + 0 * (blockHeight + borderWidth), (1 * blockWidth + 1 * borderWidth), (2 * blockHeight + 2 * borderWidth));

    for (let i = 0; i < max_day; i++) {
        let x = i % day_columns;
        let y = 2 + Math.floor(i / day_rows);
        ctx.fillStyle = tableBgColor;
        if (i + 1 == new Date().getDate()) {
            ctx.fillStyle = tableBgColorToday;
        }
        ctx.fillRect(paddingCanvasLeft + x * (blockWidth + borderWidth) + borderWidth, paddingCanvasTop + y * (blockHeight + borderWidth) + borderWidth, (blockWidth + 0 * borderWidth), (blockHeight + 0 * borderWidth));

        ctx.fillStyle = textColor;
        ctx.fillText("" + (i + 1), paddingCanvasLeft + (blockWidth) / 2 + x * (blockWidth + borderWidth), paddingCanvasTop + (blockWidth) / 2 + y * (blockHeight + borderWidth));
    }

    ctx.fillStyle = mainBgColor;
    ctx.fillRect(paddingCanvasLeft + 3 * (blockWidth + borderWidth) + borderWidth, paddingCanvasTop + 6 * (blockHeight + borderWidth) + borderWidth, (4 * blockWidth + 4 * borderWidth), (1 * blockHeight + 1 * borderWidth));
}

function drawFigurs() {
    figs.forEach(fig => {
        drawFigur(fig, fig.x, fig.y);
    });
}

function drawFigur(fig, offsetX, offsetY) {
    fig.body.forEach((row, y) => {
        row.forEach((cell, x) => {
            if (cell) {
                if (fig.isHover) {
                    ctx.shadowOffsetX = 2;
                    ctx.shadowOffsetY = 2;
                    ctx.shadowBlur = 2;
                    ctx.shadowColor = "rgba(0, 0, 0, 0.5)";
                }
                ctx.fillStyle = borderColor;
                ctx.fillRect(x * (blockWidth + borderWidth) + offsetX, y * (blockHeight + borderWidth) + offsetY, blockWidth + 2 * borderWidth, blockHeight + 2 * borderWidth);

                ctx.shadowOffsetX = 0;
                ctx.shadowOffsetY = 0;
                ctx.shadowBlur = 0;
                ctx.shadowColor = "rgba(0, 0, 0, 0)";

                ctx.fillStyle = fig.color;
                ctx.fillRect(borderWidth + x * (blockWidth + borderWidth) + offsetX, borderWidth + y * (blockHeight + borderWidth) + offsetY, blockWidth, blockHeight);
            }
        })
    });
}

function draw() {
    ctx.fillStyle = mainBgColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    drawTable();
    drawFigurs();

    requestAnimationFrame(draw);
}
requestAnimationFrame(draw);

function getFigureOnCursor(x, y) {
    let searchId = null;
    for (let i = figs.length - 1; i >= 0; i--) {
        if (x >= figs[i].x && x + 1 < figs[i].x + figs[i].size.width && y >= figs[i].y && y + 1 < figs[i].y + figs[i].size.height) {
            //figs[i].body

            let fX = Math.floor((x - figs[i].x) / (blockWidth + borderWidth));
            let fY = Math.floor((y - figs[i].y) / (blockHeight + borderWidth));

            if (figs[i].body[fY][fX]) {
                searchId = i;
                break;
            }
        }
    }
    return searchId;
}

function rotate(fig) {
    //rotate(figs[i])
    let newBody = [];
    let mI = fig.body.length;
    let mJ = fig.body[0].length;

    fig.body.forEach((row, i) => {
        row.forEach((cell, j) => {
            if (newBody[j] === undefined) {
                newBody[j] = [];
            }
            newBody[j][mI - i - 1] = cell;
        });
    });
    fig.body = newBody;
    let oldH = fig.size.height;
    let oldW = fig.size.width;
    fig.size.height = fig.size.width;
    fig.size.width = oldH;
    if ((mJ % 2 == 0 && mI % 2 != 0) || (mJ % 2 != 0 && mI % 2 == 0)) {
        //fig.x += Math.floor((oldW - oldH) / 2);
        fig.y += Math.floor((oldH - oldW));
    } else {
        fig.x += Math.floor((oldW - oldH) / 2);
        fig.y += Math.floor((oldH - oldW) / 2);
    }
}
function reflect(fig) {
    let newBody = [];
    let mI = fig.body.length;
    let mJ = fig.body[0].length;


    //reflect
    fig.body.forEach((row, i) => {
        if (newBody[i] === undefined) {
            newBody[i] = [];
        }
        newBody[mI - i - 1] = row;
    });
    fig.body = newBody;
    return;
}

let dragged = null;
let offsetX = 0;
let offsetY = 0;
let isMoved = true;
canvas.addEventListener("mousedown", function (event) {
    let x = event.clientX - event.target.offsetLeft - event.target.clientLeft;
    let y = event.clientY - event.target.offsetTop - event.target.clientTop;

    dragged = getFigureOnCursor(x, y);

    if (dragged !== null) {
        offsetX = (x - figs[dragged].x);
        offsetY = (y - figs[dragged].y);
        figs.push(figs.splice(dragged, 1)[0]);
        dragged = figs.length - 1;
    }
    isMoved = false;
});

canvas.addEventListener("mousemove", function (event) {

    let x = event.clientX - event.target.offsetLeft - event.target.clientLeft;
    let y = event.clientY - event.target.offsetTop - event.target.clientTop;

    figs.forEach(fig => {
        fig.isHover = false;
    });

    let i = getFigureOnCursor(x, y);
    if (i !== null) {
        canvas.style.cursor = "pointer";
        figs[i].isHover = true;
    } else {
        canvas.style.cursor = "";
    }

    if (dragged !== null) {
        figs[dragged].x = x - offsetX;
        figs[dragged].y = y - offsetY;
    }
    isMoved = true;
});
canvas.addEventListener("mouseup", function (event) {
    if (dragged !== null) {
        let x = event.clientX - event.target.offsetLeft - event.target.clientLeft;
        let y = event.clientY - event.target.offsetTop - event.target.clientTop;

        figs[dragged].x = Math.min(Math.max(x - offsetX, 0), canvas.width - figs[dragged].size.width);
        figs[dragged].y = Math.min(Math.max(y - offsetY, 0), canvas.height - figs[dragged].size.height);


        if (!isMoved) {
            let islkm = event.button == 0;
            //let ismkm = event.button == 1;
            let ispkm = event.button == 2;


            if (islkm) {
                rotate(figs[dragged]);
            } else if (ispkm) {
                reflect(figs[dragged]);
            }
        }

        figs[dragged].x = (blockWidth + borderWidth) * Math.round((figs[dragged].x - paddingCanvasLeft) / (blockWidth + borderWidth)) + paddingCanvasLeft;
        figs[dragged].y = (blockHeight + borderWidth) * Math.round((figs[dragged].y - paddingCanvasLeft) / (blockHeight + borderWidth)) + paddingCanvasTop;

        dragged = null;
        offsetX = 0;
        offsetY = 0;

        let arr = [[0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0], [0, 0, 0]];
        figs.forEach(fig => {
            fig.body.forEach((row, y) => {
                row.forEach((cell, x) => {
                    if (cell) {
                        let aY = (fig.y - paddingCanvasTop) / (blockHeight + borderWidth) + y;
                        let aX = (fig.x - paddingCanvasLeft) / (blockWidth + borderWidth) + x;

                        if (arr[aY] !== undefined && arr[aY][aX] !== undefined) {
                            arr[aY][aX] = 1;
                        }
                    }
                });
            });
        });

        let cellEmpty = []
        arr.forEach(function (row, y) {
            row.forEach(function (cell, x) {
                if (cell === 0) {
                    cellEmpty.push({ x: x, y: y });
                }
            });
        });

        if (cellEmpty.length == 2) {
            //собрано число
            const today = new Date();
            let day = { x: (today.getDate() - 1) % 7, y: 2 + Math.floor((today.getDate() - 1) / 7) };
            let month = { x: today.getMonth() % 6, y: Math.floor(today.getMonth() / 6) };

            if (
                (cellEmpty[0].x == month.x && cellEmpty[0].y == month.y &&
                    cellEmpty[1].x == day.x && cellEmpty[1].y == day.y)
                ||
                (cellEmpty[1].x == month.x && cellEmpty[1].y == month.y &&
                    cellEmpty[0].x == day.x && cellEmpty[0].y == day.y)

            ) {
                //победа
                alert("Поздравляю вы победили!");
            }
        }

    }

    setTimeout(function () { blockClick = false; }, 150);
});
