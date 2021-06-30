const {Router} = require('express');
const router = Router();

router.get('/', function(request, response){
    response.sendFile('index.html', { root: '.' });
});


router.post('/1'  , (req,res)=>{

            var text = req.body.arr;
            // Se recibe el input como un arreglo.Se asigna una posicion de arreglo para cada ejercicio. 
            
            text.splice(0,1);
            text.splice(0,1);
            text = text.join(',');
            text = text.split(',,');
            var stringresult = '';
            
            
            for(var i=0; i< text.length;i++){
                var waiting = Array();
                var free = Array();
                var conjunto = text[i].split(',');
                var sw = 0;

                for(var j=0;j<conjunto.length;j++){ //Se divide en free[] las plazas que se van desocupando y en waiting[] los carros esperando

                    if(conjunto[j] == '99'){
                        sw =2;
                    }

                    if(sw==1){
                        free.push(conjunto[j]);
                    }
                    if(sw==0){
                        waiting.push(conjunto[j]);
                    }   

                    if(sw==2){
                        sw = 1;
                    }

                }
                
                    var moviendose = waiting.slice(); // Copia del arreglo waiting [] para ir actualizando las posiciones despues de moverse
                    var resultado =  waiting.slice(); // Copia del arreglo waiting [] para ir almacenando los que ya parquearon

 
                    for(var j = 0 ; j<free.length;j++){ //Inicia la logica de parqueadero
                        plazadisponible = free[j];
                        var masalto = 0 ;
                        var sw = false;
                        var indice = 0;
                        var menoromayor = 0;

                       for(y=0;y<moviendose.length;y++){ //Se verifica si existe un carro esperando  en una posicion 1<=x<lugar_disponible
                            if( parseInt(moviendose[y]) < plazadisponible && parseInt(moviendose[y]) != 0){
                                menoromayor = 1;
                                var masalto = 21 ;
                            }
                        }
                    
                        for(var k = 0 ; k < moviendose.length;k++){

                            if(plazadisponible == moviendose[k]){ //Se verifica cuando el carro parquea en el mismo lugar en el que esta
                                moviendose[k]= 0 ; 
                                resultado[k] = plazadisponible;
                                sw = true;
                            }else{  // Se verifica si el lugar disponible debe ser ocupado por un carro a la derecha o a la izquierda

                                if(menoromayor==1){
                                 var temp =  parseInt(moviendose[k]) - plazadisponible  ;   
                                    if( (Math.abs(temp)<masalto)  && (temp<0) && (parseInt(moviendose[k])!= 0)  ){
                                        masalto = Math.abs(temp);
                                        indice  = k;  
                                    }
                                }else{

                                    if( parseInt(moviendose[k]) > masalto){
                                    masalto = moviendose[k];
                                    indice  = k;
                                    }   
                               
                                }


                            }

                            
                        }
                        
                    
                        if(sw == false){ // Se calculan los movimientos y se asignan los movimientos al array moviendose[]
                            if( parseInt(plazadisponible) < parseInt(moviendose[indice])){
                                movimientos = (20 - parseInt(moviendose[indice])) + parseInt(plazadisponible);
                            }else{
                                movimientos = parseInt(plazadisponible) - parseInt(moviendose[indice]);
                            }
                           
                            resultado[indice] = plazadisponible;
                            moviendose[indice] = 0 ;

                            for(var z = 0 ; z < moviendose.length;z++){
                                if(parseInt(moviendose[z]) != 0){
                                    if((parseInt(moviendose[z]) + movimientos) >20 ){
                                        moviendose[z] = (parseInt(moviendose[z]) + movimientos) - 20;
                                    }else{
                                        moviendose[z] = parseInt(moviendose[z]) + movimientos;
                                    }
                                    
                                }
                            }

                        }

                    }         
                   
                    for(x=0;x<resultado.length;x++){ // Se verifica cual carro quedo sin parquear para colocarlo en 0 (nunca encontro espacio)

                        if(parseInt(moviendose[x]) != 0){
                            resultado[x] = 0 ;
                        }
                    }
                    
                    for(var h = 0 ; h<waiting.length;h++){ // Se generan los string con los resultads
                        if(parseInt(resultado[h]) == 0){
                             stringresult = stringresult + 'El auto de la posicion inicial '+waiting[h]+' no aparco \r\n' ;
                        }else{
                             stringresult = stringresult + 'El auto de la posicion inicial '+waiting[h]+' aparco en '+resultado[h]+ '\r\n' ;
                        }
                       
                    }
                     stringresult = stringresult + '\r\n';
            }
            res.status(200).send(stringresult);
});

router.post('/2' , (req,res)=>{
    var text = req.body.arr;
    res.status(200).send("En proceso");
});

router.post('/3' , (req,res)=>{
    var text = req.body.arr;
    var stringresult ='';
    do{     // Se ejecuta el ciclo hasta que no queden mas datos por procesar.
        var trayectos = Array(); //array con los trayectos
        var esferas = Array(); // array con las esferas 

        var longitud = parseInt(text[0]); // longitud del trayecto

        for(var i=1;i<=longitud;i++){
            var temp = text[i].split(' ');
            trayectos.push(temp[0]);
            esferas.push(temp[1]);
        }

        //se eliminan los bloques de longitud y trayectos del ejercicio que ya se pasaron a trayectos[] y esferas[]
        text.splice(0,1);
        
        for(var i=0;i<longitud;i++){
            text.splice(0,1);
            
        }
                   
        /*Logica del Ejercicio */
        var totalesferas=0;
        for(var k=0;k<esferas.length;k++){
            totalesferas = parseInt(esferas[k]) + totalesferas; // Se calcula el numero total de esferas a distribuir
        }

        

        var asignacion =  esferas.slice(); //Se genera un array de esferas para modificar y colocar la distribucion final
        var trayectostemp =  trayectos.slice(); // se genera un array de trayectos para ir marcando los que ya le asigno esfera
        for(var x = 0 ; x<asignacion.length;x++){
            asignacion[x] = "0";
        }
        

        for(var z=totalesferas ; z>0;z--){  // Se asignan esferas y se marcan trayectos con esfera asignada
            var masalto =0;
            var index = 0;
            
            for(var i=1 ;i<trayectostemp.length;i++){
                if(parseInt(trayectostemp[i]) > masalto ){
                    masalto = parseInt(trayectostemp[i]);
                    index = i;
                }

            }
            trayectostemp[index]="0";
            asignacion[index] = "1";

        }
           

        if(trayectos.length>0){ // Se realizan las sumas y divisiones de acuerdo a las esferas por trayecto
            var total = 0;
            asignacion[0] = "0";
            

            for( var i = 0 ; i<trayectos.length;i++){
                if( parseInt(asignacion[i]) == 1 ){
                    total = total + (parseInt(trayectos[i]) / 2);
                }else{
                    total = total + parseInt(trayectos[i]);
                }
            }
            stringresult = stringresult + total + '\r\n';
        }

        }while(text.length > 0)

    res.status(200).send(stringresult);
});

module.exports = router;