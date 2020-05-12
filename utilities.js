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

export {checkTime};