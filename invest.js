//submitted by form
var ss = SpreadsheetApp.getActiveSpreadsheet();
var sheet= ss.getSheets()[0];
var cuentas= sheet.getRange("A:AB").getValues();


function investByYear(ano, subFondo) {
    let ingresos=[];
    let res=0;
    let cuentas= sheet.getRange("A:AB").getValues();
    let len=cuentas.length;
    let percentFondo= getPercent(subFondo);
    for(var i=0; i<len ; i++){

        if(cuentas[i][3]==='Ingreso'&& cuentas[i][2]==='R$' && cuentas[i][4]==='Pago de Salario'){
            let data={
                'time': cuentas[i][0],
                'monto': cuentas[i][1],
                'moneda':cuentas[i][2],

                'cuentaDeSalida': cuentas[i][24]
            };
            ingresos.push(data);

        }
    }
    //console.log(ingresos);

    ingresos.forEach((item)=>{
       if(item.time.getFullYear()===ano){
           let value= percent(item.monto, percentFondo);
           //console.log(value, 'here');
           res+=value
       }
    });

    console.log(res);
    return res;
}

function getPercent(value){

    if(value==='CBD'){
        //console.log('CBD');
        return 2.8;
    }
    if(value==='Onix'){
        //console.log('Onix');
        return 0.75;
    }
    if(value==='Previsorio'){
        //console.log('Previsorio');
        return 1.45;
    }
}

function test_myfunc(){

    investByYear(2020,'Onix');
}