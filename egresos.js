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
        if (cuentas[i][3] === 'Egreso' && cuentas[i][23] === 'Egreso') {
            if (cuentas[i][24] === banco) {
                var data = {
                    'time': cuentas[i][0],
                    'monto': cuentas[i][1],
                    'banco': cuentas[i][24]
                }
                egresos.push(data);
            }
        }
    }


    egresos= timeMatchDate(egresos, time);
    egresos.forEach((item)=>{
        res+= item.monto;
    });

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

    egresos = timeMatchDate(egresos, time);
    egresos.forEach((item) => {
        let eSubFondo;
        if (item.fondo === fondo) {
            item.subFondo.forEach((i) => {
                if (i !== "") {
                    eSubFondo = i;
                }
            });

            if (eSubFondo === subFondo) {
                //console.log(item);
                res += item.monto;
            }
        }
    });
    if (time.getDate() === 5) {
        res += getGastosCreditos(ano, mes, dia, fondo, subFondo, res)
    }
    console.log(res);
    return res;
}

//testing with mocking values
function test_myFunctionEgresos()
{
    //getEgresosByBanco(2020, 4, 5, 'Bradesco');
    //getGastos(2020, 4, 5, 'Casa', 'Comida');
    //getCortesCreditos(2020,1,5,'Corte de Tarjeta de Credito');
    getGastosCreditos(2020, 1, 5, 'Gastos Personales', 'Gastos laborales', 0);
    //getCortesNubank(2020,1,26,'Corte de Tarjeta de Credito nuBank');
}

//gets credito values
function getGastosCreditos(ano, mes, dia, fondo, subFondo, res)
{
    let BANK = 'Bradesco/credito';
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
                };
                //console.log(data);
                egresosCredito.push(data);
            }
        }
    }

    egresosCredito = timeMatchInterval(egresosCredito, timeInit, timeEnd);
    //console.log(egresosCredito );

    egresosCredito.forEach((item) => {
        let eSubFondo;
        if (item.fondo === fondo) {

            item.subFondo.forEach((i) => {
                if (i !== "") {
                    eSubFondo = i;
                }
            });

            if (eSubFondo === subFondo) {
                //console.log(item);
                resGasto += item.monto;
            }
        }

    });

    return resGasto;
}


function getCortesCreditos(ano, mes, dia, razon)
{
    var cortes = [];
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

                cortes.push(data);
            }
        }
    }
    //console.log(Cortes);
    cortes = timeMatchDate(cortes, time);

    cortes.forEach((item) => {
        if (item.razon === razon) {
            //console.log(Cortes[i]);
            res += item.monto;
        }
    });

    //console.log(res, 'final')
    return res;
}

function getCortesNubank(ano, mes, dia, razon)
{
    var cortes = [];
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

                cortes.push(data);
            }
        }
    }

    cortes = timeMatchDate(cortes, time);
    cortes.forEach((item) => {
        if (item.razon === razon) {
            //console.log(Cortes[i]);
            res += item.monto;
        }
    });

    //console.log(res, 'final')
    return res;
}

