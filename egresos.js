//año, mes, dia, fondo, subfondo

var ss = SpreadsheetApp.getActiveSpreadsheet();
var sheet = ss.getSheets()[0];

function getEgresosByBanco(ano, mes, dia, banco)
{
    var time = new Date(ano, mes, dia);
    var egresos = [];
    var res = 0;
    var cuentas = sheet.getRange("A:AB").getValues();
    len = cuentas.length;
    for (var i = 0; i < len; i++) {
        if (cuentas[i][3] == 'Egreso' && cuentas[i][23] == 'Egreso') {
            if (cuentas[i][24] == banco) {
                var data = {
                    'time': cuentas[i][0],
                    'monto': cuentas[i][1],
                    'banco': cuentas[i][24]
                }
                egresos.push(data);
            }
        }
    }

    for (var i = 0, len = egresos.length; i < len; i++) {

        if (egresos[i].time.getFullYear() == ano && egresos[i].time.getMonth() == mes && egresos[i].time.getDate() == dia) {
            console.log(egresos[i]);
            res += egresos[i].monto;

        }
    }
    //console.log(res);
    return (res);
}


//get values for day to day
function getGastos(ano, mes, dia, fondo, subFondo)
{
    var time = new Date(ano, mes, dia);
    var egresos = [];
    var res = 0;
    var cuentas = sheet.getRange("A:AB").getValues();
    len = cuentas.length;
    for (var i = 0; i < len; i++) {
        if (cuentas[i][3] == 'Egreso' && cuentas[i][23] == 'Egreso') {
            if (cuentas[i][24] == 'Bradesco' || cuentas[i][24] == 'NuBank') {
                var data = {
                    'time': cuentas[i][0],
                    'monto': cuentas[i][1],
                    'fondo': cuentas[i][8],
                    'subFondo': [
                        cuentas[i][11], cuentas[i][12],
                        cuentas[i][13], cuentas[i][14],
                        cuentas[i][15], cuentas[i][16],
                        cuentas[i][17], cuentas[i][18],
                        cuentas[i][19], cuentas[i][20]],
                    'cuentaDeSalida': cuentas[i][24]
                }

                egresos.push(data);
            }
        }
    }

    for (var i = 0, len = egresos.length; i < len; i++) {

        if (egresos[i].time.getDate() == time.getDate()
            && egresos[i].time.getMonth() == time.getMonth()
            && egresos[i].time.getFullYear() == time.getFullYear()) {
            if (egresos[i].fondo == fondo) {
                var eSubFondo = checkSubfondo(egresos[i].subFondo);
                if (eSubFondo == subFondo) {
                    //console.log(egresos[i]);
                    res += egresos[i].monto;
                }
            }

        }
    }
    if (time.getDate() == 5) {
        res += getGastosCreditos(ano, mes, dia, fondo, subFondo, res)
    }
    console.log(res);
    return res;
}

//testing with mocking values
function test_myFunctionEgresos()
{
    //getEgresosByBanco(2020, 4, 5, 'Bradesco');
    getGastos(2020, 4, 5, 'Casa', 'Comida');
    //getCortesCreditos(2020,1,5,'Corte de Tarjeta de Credito');
    //getGastosCreditos(2020,1,5,'Gastos Personales','Gastos laborales',0);
    //getCortesNubank(2020,1,26,'Corte de Tarjeta de Credito nuBank');
}

//gets credito values
//gets credito values
function getGastosCreditos(ano, mes, dia, fondo, subFondo, res)
{
    var egresosCredito = [];
    var time = new Date(ano, mes, dia);
    var timeInit = checkTime(ano, mes, dia, 0);
    var timeEnd = checkTime(ano, mes, dia, 1);
    var changeMade = false;
    var resGasto = 0;
    var cuentas = sheet.getRange("A:AB").getValues();
    len = cuentas.length;
    for (var i = 0; i < len; i++) {
        if (cuentas[i][3] == 'Egreso' && cuentas[i][23] == 'Egreso') {
            if (cuentas[i][24] == 'Bradesco/credito') {
                var data = {
                    'time': cuentas[i][0],
                    'monto': cuentas[i][1],
                    'fondo': cuentas[i][8],
                    'subFondo': [cuentas[i][10],
                        cuentas[i][11], cuentas[i][12],
                        cuentas[i][13], cuentas[i][14],
                        cuentas[i][15], cuentas[i][16],
                        cuentas[i][17], cuentas[i][18],
                        cuentas[i][19], cuentas[i][20]],
                    'cuentaDeSalida': cuentas[i][20],
                    'desc': cuentas[i][7],
                    'banco': cuentas[i][24]
                }
                //console.log(data);
                egresosCredito.push(data);
            }
        }
    }

    //console.log(time, " ", timeInit, " ", timeEnd );
    //console.log(egresosCredito, 'credito total');

    for (var i = 0, len = egresosCredito.length; i < len; i++) {
        if (egresosCredito[i].time.getFullYear() == timeInit.getFullYear()
            && egresosCredito[i].time.getMonth() == timeInit.getMonth()
            && egresosCredito[i].time.getDate() >= timeInit.getDate()
            ||
            egresosCredito[i].time.getFullYear() == timeEnd.getFullYear()
            && egresosCredito[i].time.getMonth() == timeEnd.getMonth()
            && egresosCredito[i].time.getDate() <= timeEnd.getDate()

        ) {
            if (egresosCredito[i].banco == 'Bradesco/credito') {
                if (egresosCredito[i].fondo == fondo) {
                    var eSubFondo = checkSubfondo(egresosCredito[i].subFondo);
                    if (eSubFondo == subFondo) {
                        console.log(egresosCredito[i]);
                        resGasto += egresosCredito[i].monto;

                    }
                }
            }

        }
    }

    return resGasto;
}


function getCortesCreditos(ano, mes, dia, razon)
{
    var Cortes = [];
    var time = new Date(ano, mes, dia);
    var res = 0;
    var cuentas = sheet.getRange("A:AB").getValues();
    len = cuentas.length;
    for (var i = 0; i < len; i++) {
        if (cuentas[i][3] == 'Egreso') {
            if (cuentas[i][6] == 'Corte de Tarjeta de Credito') {
                var data = {
                    'time': cuentas[i][0],
                    'monto': cuentas[i][1],
                    'razon': cuentas[i][6],
                    'desc': cuentas[i][7]
                }

                Cortes.push(data);
            }
        }
    }
    //console.log(Cortes);
    for (var i = 0, len = Cortes.length; i < len; i++) {
        if (Cortes[i].time.getDate() == dia
            && Cortes[i].time.getMonth() == mes
            && Cortes[i].time.getFullYear() == ano) {
            if (Cortes[i].razon == razon) {
                //console.log(Cortes[i]);
                res += Cortes[i].monto;
            }
        }
    }
    //console.log(res, 'final')
    return res;
}

function getCortesNubank(ano, mes, dia, razon)
{
    var Cortes = [];
    var time = new Date(ano, mes, dia);
    var res = 0;
    var cuentas = sheet.getRange("A:AB").getValues();
    len = cuentas.length;
    for (var i = 0; i < len; i++) {
        if (cuentas[i][3] == 'Egreso') {
            if (cuentas[i][6] == 'Corte de Tarjeta de Credito nuBank') {
                var data = {
                    'time': cuentas[i][0],
                    'monto': cuentas[i][1],
                    'razon': cuentas[i][6],
                    'desc': cuentas[i][7]
                }

                Cortes.push(data);
            }
        }
    }
    //console.log(Cortes);
    for (var i = 0, len = Cortes.length; i < len; i++) {
        if (Cortes[i].time.getDate() == dia
            && Cortes[i].time.getMonth() == mes
            && Cortes[i].time.getFullYear() == ano) {
            if (Cortes[i].razon == razon) {
                //console.log(Cortes[i]);
                res += Cortes[i].monto;
            }
        }
    }
    console.log(res, 'final')
    return res;
}


function checkTime(ano, mes, dia, check)
{
    var newMes;
    var newAno;
    var newDia;


    if (check == 0) {
        newDia = 25;
        if (mes == 0) {
            newMes = 11 - 1;
            newAno = ano - 1;
        } else if (mes == 1) {
            newMes = 11;
            newAno = ano - 1;
        } else {
            newMes = mes - 2;
            newAno = ano;
        }
    } else {
        newDia = 24;
        if (mes == 0) {
            newMes = 11;
            newAno = ano - 1;
        } else {
            newMes = mes - 1;
            newAno = ano;
        }
    }
    var time = new Date(newAno, newMes, newDia);
    console.log(time, "new time");
    return time;
}

function checkSubfondo(subfondos)
{

    for (var i = 0; i < subfondos.length; i++) {
        if (subfondos[i] != "") {
            return subfondos[i];
        }
    }
    return;

}