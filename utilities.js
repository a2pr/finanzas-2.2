function checkTime(ano, mes, dia, check, debug = false)
{
    let newMes, newAno, newDia;

    if (check === 0) {
        newDia = 25;
        if (mes === 0) {
            newMes = 11 - 1;
            newAno = ano - 1;
        } else if (mes === 1) {
            newMes = 11;
            newAno = ano - 1;
        } else {
            newMes = mes - 2;
            newAno = ano;
        }
    } else {
        newDia = 24;
        if (mes === 0) {
            newMes = 11;
            newAno = ano - 1;
        } else {
            newMes = mes - 1;
            newAno = ano;
        }
    }

    let time = new Date(newAno, newMes, newDia);

    if (debug) {
        console.log(time, "new time");
    }
    return time;
}

function timeMatchInterval(arr, initDate, endDate)
{
    let newArr = [];
    arr.forEach((item, index) => {
        if (item.time.getFullYear() === initDate.getFullYear()
            && item.time.getMonth() === initDate.getMonth()
            && item.time.getDate() >= initDate.getDate()
            ||
            item.time.getFullYear() === endDate.getFullYear()
            && item.time.getMonth() === endDate.getMonth()
            && item.time.getDate() <= endDate.getDate()) {
            newArr.push(item)
        }
    });

    return newArr;
}

function timeMatchDate(arr, time)
{
    let newArr = [];
    arr.forEach((item) => {
        if (item.time.getFullYear() === time.getFullYear()
            && item.time.getMonth() === time.getMonth()
            && item.time.getDate() === time.getDate()
        ) {
            newArr.push(item)
        }
    });

    return newArr;
}

function timeMatchMonth(arr, time)
{
    let newArr = [];
    arr.forEach((item) => {
        if (
            item.time.getFullYear() === time.getFullYear()
            && item.time.getMonth() === time.getMonth()
        ) {
            newArr.push(item)
        }
    });

    return newArr;
}

/**
 *
 * @param arr
 * @param timeInit
 * @param timeEnd
 * @returns {[]}
 */
function byTimeDateInterval(arr, timeInit, timeEnd)
{
    let newArr = [];
    arr = timeMatchMonth(arr, timeInit);
    arr.forEach((item) => {
        if (item.time.getDate() >= timeInit.getDate() && item.time.getDate() <= timeEnd.getDate()) {
            newArr.push(item);
        }
    });

    return newArr;
}

function checkSubfondo(subfondos)
{

    subfondos.forEach((item) => {
        if (item !== "") {
            return item;
        }
    });
}

//export {checkTime, timeMatchInterval}; exports not working in googlescripts