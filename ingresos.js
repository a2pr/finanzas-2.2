//submitted by form
var ss = SpreadsheetApp.getActiveSpreadsheet();
var sheet= ss.getSheets()[0];
var cuentas= sheet.getRange("A:AB").getValues();

function ingresosByInterval(ano, mes, init,final) {
    var timeInit= new Date(ano, mes,init );
    var timeEnd=new Date(ano, mes,final );
    var ingresos=[];
    var res=0;
    var cuentas= sheet.getRange("A:AB").getValues();
    len=cuentas.length;
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

    ingresos = byTimeDateInterval(ingresos ,timeInit, timeEnd);

    ingresos.forEach((item)=>{
       res+= item.monto;
    });

    return res;
}

function otrosIngresosByFondos(ano, mes, init,final,fondo, subFondo) {
    var timeInit= new Date(ano, mes,init );
    var timeEnd=new Date(ano, mes,final );
    let ingresos=[];
    var res=0;

    var cuentas= sheet.getRange("A:AB").getValues();
    len=cuentas.length;
    for(var i=0; i<len ; i++){
        if(cuentas[i][3]=='Ingreso' && cuentas[i][23]=='Ingreso'){
            var data={
                'time': cuentas[i][0],
                'monto': cuentas[i][1],
                'moneda':cuentas[i][2],
                'fondo':cuentas[i][10],
                'subFondo': [
                    cuentas[i][11],cuentas[i][12],
                    cuentas[i][13],cuentas[i][14],
                    cuentas[i][15],cuentas[i][16],
                    cuentas[i][17], cuentas[i][18],
                    cuentas[i][19], cuentas[i][20]] ,
                'cuentaDeSalida': cuentas[i][24]
            }
            ingresos.push(data);

        }
    }

    ingresos = byTimeDateInterval(ingresos, timeInit, timeEnd);
    ingresos.forEach((item)=>{
        if (item.fondo === fondo) {
            let iSubFondo = checkSubfondo(item.subFondo);
            iSubFondo.forEach((item) => {
                    if (item === subFondo) {
                        //console.log(egresos[i]);
                        res += item.monto;
                    }
                }
            );
        }
    });

    //console.log(ingresos);
    //console.log(res, 'final');
    return res;
}


function ingresosByBanco(ano, mes, day,banco){
    var time= new Date(ano, mes,day );
    var ingresos=[];
    var res=0;
    var cuentas= sheet.getRange("A:AB").getValues();
    len=cuentas.length;
    for(var i=0; i<len ; i++){
        if(cuentas[i][24]==banco && cuentas[i][23]=='Ingreso'){
            var data={
                'time': cuentas[i][0],
                'monto': cuentas[i][1],
                'moneda':cuentas[i][2],
                'cuentaDeSalida': cuentas[i][24]
            }
            ingresos.push(data);

        }
        if(cuentas[i][3]=='Ingreso'&& cuentas[i][2]=='R$' && cuentas[i][4]=='Pago de Salario'){
            if(banco== 'Bradesco'){
                var data={
                    'time': cuentas[i][0],
                    'monto': cuentas[i][1],
                    'moneda':cuentas[i][2],
                    'cuentaDeSalida': cuentas[i][24]
                }
                ingresos.push(data);
            }

        }
    }


    ingresos= timeMatchDate(ingresos, time);

    ingresos.forEach((item)=>{
        res+= item.monto;
    });

    //console.log(ingresos);
    return res;
}

//testing with mocking values
function test_myFunction(){
    //otrosIngresosByFondos(2020, 0, 1,15,'Ahorros', 'CBD')
    ingresosByInterval(2020,4,1,15)
    //ingresosByBanco(2020, 0,10,'Bradesco');
}