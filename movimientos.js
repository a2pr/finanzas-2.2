var ss = SpreadsheetApp.getActiveSpreadsheet();
var sheet= ss.getSheets()[0];


function transfers(ano, mes, dia, banco){
    var res=0;
    res+= transferTo(ano, mes, dia, banco);
    res-= transferBy(ano, mes, dia, banco);

    //console.log(res);
    return res;
}

// date, banco llegada
function transferTo(ano, mes, dia, bancoL) {
    var time= new Date(ano, mes,dia );
    var movimientos=getValues(bancoL, 26);
    var res=0;

    for(var i=0, len=movimientos.length; i<len ; i++){

        if(movimientos[i].time.getFullYear()== ano && movimientos[i].time.getMonth()== mes && movimientos[i].time.getDate()==dia){
            //console.log(movimientos[i]);
            res+= movimientos[i].monto;

        }
    }
    return res;

}

// date, banco Salida
function transferBy(ano, mes, dia, bancoS){
    var time= new Date(ano, mes,dia );
    var movimientos=getValues(bancoS, 21);
    var res=0;

    for(var i=0, len=movimientos.length; i<len ; i++){

        if(movimientos[i].time.getFullYear()== ano && movimientos[i].time.getMonth()== mes && movimientos[i].time.getDate()==dia){
            //console.log(movimientos[i]);
            res+= movimientos[i].monto;

        }
    }

    return res;


}

function test_myfunc(){

    transfers(2019, 11, 1,'Bradesco');
}
// banco, opcion de columna 21 salida, 26 llegada
function getValues(banco, opt){
    var movimientos=[]
    var cuentas= sheet.getRange("A:AB").getValues();
    len=cuentas.length;
    for(var i=0; i<len ; i++){
        if(cuentas[i][3]=='Movimiento'){
            if(cuentas[i][opt]== banco){
                var data={
                    'time': cuentas[i][0],
                    'monto': cuentas[i][1],
                    'banco': cuentas[i][opt]
                }
                movimientos.push(data);
            }
        }
    }
    return movimientos;
}