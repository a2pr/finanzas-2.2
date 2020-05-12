//submitted by form
var ss = SpreadsheetApp.getActiveSpreadsheet();
var sheet= ss.getSheets()[0];
var cuentas= sheet.getRange("A:AB").getValues();


function investByYear(ano, subFondo) {
    var ingresos=[];
    var res=0;
    var cuentas= sheet.getRange("A:AB").getValues();
    len=cuentas.length;
    percentFondo= getPercent(subFondo);
    for(var i=0; i<len ; i++){

        if(cuentas[i][3]=='Ingreso'&& cuentas[i][2]=='R$' && cuentas[i][4]=='Pago de Salario'){
            var data={
                'time': cuentas[i][0],
                'monto': cuentas[i][1],
                'moneda':cuentas[i][2],

                'cuentaDeSalida': cuentas[i][24]
            }
            ingresos.push(data);

        }
    }
    //console.log(ingresos);
    for(i=0,len=ingresos.length;i<len;i++){
        if(ingresos[i].time.getYear()==ano ){
            value= percent(ingresos[i].monto, percentFondo);
            //console.log(value, 'here');
            res+=value

        }

    }
    console.log(res);
    return res;
}

function getPercent(value){

    if(value=='CBD'){
        //console.log('CBD');
        return 2.8;
    }
    if(value=='Onix'){
        //console.log('Onix');
        return 0.75;
    }
    if(value=='Previsorio'){
        //console.log('Previsorio');
        return 1.45;
    }
}

function test_myfunc(){

    investByYear(2020,'Onix');
}