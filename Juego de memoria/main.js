var movimientos = 0;
var grupoTarjetas1 = [ ["🦄", "🍦"], ["💦", "🧠"],  ["🧔", "😎"],  ["🙉", "💣"] ];
var nivelActual = 0;
var niveles=[
     {
      tarjeta:grupoTarjetas1[0],
      movimientosMax:3
     },
      {
      tarjeta:grupoTarjetas1[0].concat(grupoTarjetas1[1]),
      movimientosMax:8 
      },
  {
      tarjeta:grupoTarjetas1[0].concat(grupoTarjetas1[1],grupoTarjetas1[2]),
    movimientosMax: 12   
  },
  {
tarjeta:grupoTarjetas1[0].concat(grupoTarjetas1[1],grupoTarjetas1[2],grupoTarjetas1[3]),
   movimientosMax:15
  }
];

function maxContador(){
      var movimientosMaxTexto = niveles[nivelActual].movimientosMax;
      if(movimientosMaxTexto < 10){
        movimientosMaxTexto = "0"+ movimientosMaxTexto;
      }
     document.querySelector("#movTotal").innerText=movimientosMaxTexto;
    }


function iniciarJuego(){
  document.querySelector("#acabanMovimientos").style.visibility="hidden";
   document.querySelector("#endGame").style.visibility="hidden";
   document.querySelector("#gameOver").style.visibility="hidden";
    maxContador();
    movimientos= 0;
   document.querySelector("#mov").innerText= "00";
   function barajeaTarjetas(lasTarjetas){
     var totalTarjetas = lasTarjetas.concat(lasTarjetas);
    var resultado = totalTarjetas.sort(
      function(){
        return 0.5 - Math.random();
      }
    );
   return resultado;
    }
  
  function reparteTarjetas(lasTarjetas){
    var tarjetasBarajeadas = barajeaTarjetas(lasTarjetas);
    var mesa = document.querySelector("#mesa");
   mesa.innerHTML = "";
  tarjetasBarajeadas.forEach (function (elemento){
     var tarjeta = document.createElement("div");
     tarjeta.innerHTML = 
     "<div class='tarjeta' data-valor= " + 
       elemento +
       ">"+
     "<div class='tarjeta__contenido'>" +
     elemento +
     "</div>" +
 "</div>"
 ;
     mesa.appendChild(tarjeta);
   }); 
  
  function descubrir() {
  var totalDescubiertas = document.querySelectorAll(".descubierta:not(.Acertada)");
    if(totalDescubiertas.length > 1){
      return;
    }
   this.classList.add("descubierta");
    
    var descubiertas = document.querySelectorAll(".descubierta:not(.Acertada)");
    if( descubiertas.length < 2){
      return;
    }
  comparaTarjetas(descubiertas);
    
      function actualizaContador(){
      var movimientosTexto;
      movimientos++;
      movimientosTexto = movimientos;
        
        if(movimientos > niveles[nivelActual].movimientosMax){
          function finJuego(){
            document.querySelector("#acabanMovimientos").style.visibility="visible";
          }
          setTimeout(finJuego,1500);
          return;
        }
        
      if (movimientos<10){
      movimientosTexto = "0" + movimientos;
      }
      document.querySelector("#mov").innerText=movimientosTexto;
      }
      actualizaContador();
    
      var cartasRestantes = document.querySelectorAll(".tarjeta:not(.Acertada)");
      if(cartasRestantes.length === 0){
      setTimeout(finalizar,1500);
      }
    
    
    
 }

   document.querySelectorAll(".tarjeta").forEach( function(tarjetitaa){
    tarjetitaa.addEventListener("click", descubrir);
   });  
    
   }
  reparteTarjetas(niveles[nivelActual].tarjeta);
   

  }

    
  
    function finalizar(){
     if(nivelActual < niveles.length -1 ){
        document.querySelector("#endGame").style.visibility="visible";
     }else{
        document.querySelector("#gameOver").style.visibility="visible";
     }
   }
  
    //////////error no carga siguiente juego///
    
 function subirNivel(){
      nivelActual++;
      }
   
      function actualizaNivel(){
        var nivelActualTexto = nivelActual + 1;
       if(nivelActualTexto < 10){
         nivelActualTexto ="0"+ nivelActualTexto;
       }
        document.querySelector("#nivel").innerText = nivelActualTexto ;
      }
    function cargaNuevoNivel(){
     subirNivel();
     actualizaNivel();
     document.querySelector("#endGame").style.visibility="hidden";
      iniciarJuego();
    }
  document.querySelector("#levelUp").addEventListener("click",cargaNuevoNivel);

  function reiniciar(){
         movimientos = 0; 
         nivelActual = 0;  
         iniciarJuego();
         actualizaNivel();
      }
  
document.querySelectorAll(".reiniciar").forEach(function(reinicio){ reinicio.addEventListener("click",reiniciar);
 });        


function iniciaReloj(){
  var segundos = 0;
  var minutos = 0;
  var segundosTexto;
  var minutosTexto;
 
  function relojCorre(){
       segundos ++;
     if(segundos > 59){
       segundos = 00;
       minutos++;
       }
    
     if(minutos > 59){
       minutos = 00;
       }
    
    segundosTexto = segundos;
    minutosTexto = minutos;
    
    if(segundos < 10){
     segundosTexto = "0"+ segundos ;
    } 
     if(minutos < 10){
     minutosTexto =  "0"+minutos ;
    } 
     
    document.querySelector("#segundos").innerText = segundosTexto;
    document.querySelector("#minutos").innerText = minutosTexto;
    
    }  
 setInterval(relojCorre, 1000);
}
//iniciaReloj();
 // reparteTarjetas();
 


function comparaTarjetas(tarjetasVolteadas){
  
    if( tarjetasVolteadas[0].dataset.valor ===  tarjetasVolteadas[1].dataset.valor){
       ganaste(tarjetasVolteadas);
    }else{
      perdiste(tarjetasVolteadas);
    }
}

function ganaste(tarjetasVolteadas){
  
  tarjetasVolteadas.forEach(function(acertada){
    acertada.classList.add("Acertada");
  });
    console.log("Acertaste");
    
}

function perdiste(tarjetasVolteadas){
  tarjetasVolteadas.forEach(function(acertada){
    acertada.classList.add("error");
  });
  setTimeout(
        function(){
            tarjetasVolteadas.forEach(function(elemento){
                elemento.classList.remove("descubierta");
                elemento.classList.remove("error");
              });
        }, 1500);
    
}

/*==============MESA 2==============*/

var grupoTarjetas2 = ["😻", "💋", "💦", "🧠", "🧔", "😎", "🙉", "💣"];
var totalTarjetas2 = grupoTarjetas2.concat(grupoTarjetas2);
var movimientos = 0;

function barajeaTarjetas2(){
    var resultado = totalTarjetas2.sort(
      function(){
        return 0.5 - Math.random();
      }
    );
   return resultado;
}


function reparteTarjetas2() {
  
  var tarjetasRevueltas = barajeaTarjetas2(); 
  var mesita = document.querySelector("#mesa");
  mesita.innerHTML = "";
   tarjetasRevueltas.forEach(function (element){
     var miTarjeta = document.createElement("div");
      miTarjeta.innerHTML = 
     "<div class='tarjeta' data-img=" +
        element +
        ">" +
     "<div class='tarjeta__contenido2'>" +
     element +
     "</div>" +
 "</div>"
     ;
     mesita.appendChild(miTarjeta);
   });
  
  
  function descubrir() {
    var totalDescubiertas = document.querySelectorAll(".descubierta:not(.Acertada)");
    if (totalDescubiertas.length > 1){
      return;
    }
    this.classList.add("descubierta");
    
    var cartasVolteadas = document.querySelectorAll(".descubierta:not(.Acertada)");
    if (cartasVolteadas.length < 2){
      return;
    }
  compararTarjetas(cartasVolteadas);
    
}
  
document.querySelectorAll(".tarjeta").forEach( function(tarjetitaa){
  tarjetitaa.addEventListener("click", descubrir);
 });
  function iniciaReloj(){
  var segundos = 0;
  var minutos = 1;
  var segundosTexto;
  var minutosTexto;
  var cronometro;
    
  function relojCorre(){
   segundos--;
    
     if(segundos < 0){
       segundos = 59;
       minutos--;
       }
    
     if(minutos< 0){
       segundos = 0;
       minutos = 0;
       clearInterval(cronometro);
     }
    
    segundosTexto = segundos;
    minutosTexto = minutos;
    
    if(segundos < 10){
     segundosTexto = "0"+ segundos ;
    } 
     if(minutos < 10){
     minutosTexto =  "0"+minutos ;
    } 
     
    document.querySelector("#segundos").innerText = segundosTexto;
    document.querySelector("#minutos").innerText = minutosTexto;
    
    }  
cronometro = setInterval(relojCorre, 1000);
}
  iniciaReloj(); 
  
}

function compararTarjetas(cartasVolteadas){
     if(cartasVolteadas[0].dataset.img === cartasVolteadas[1].dataset.img){
      ganar(cartasVolteadas);    
    }else{
     perder(cartasVolteadas);
    }  
}

function ganar(cartasVolteadas){
  cartasVolteadas.forEach(function(tarjetita){
    tarjetita.classList.add("Acertada");
  });
   window.alert("Ganaste! abuebo" + cartasVolteadas[0].dataset.img +cartasVolteadas[1].dataset.img);
}

function perder(cartasVolteadas){
  cartasVolteadas.forEach(function(tarjetita){
    tarjetita.classList.remove("descubierta")
  })
    window.alert("Nel, hijín, vuelvelo a intentar."+ cartasVolteadas[0].dataset.img + cartasVolteadas[1].dataset.img);
}

var numeros=[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];

function revuelveNumeros(){
  
  var numbers = numeros.sort(function(){
    return 0.5 - Math.random(); 
  })
  return numbers;
}
   

function loopNumeros(){
  
  var numerosRevueltitos = revuelveNumeros();
  var tablita = document.querySelector("#tablaNumeros");
  tablita.innerHTML = "";
  
  
  numerosRevueltitos.forEach(function(numerito){
    var numeroNuevo = document.createElement("div");
    numeroNuevo.innerHTML = 
     "<div class='numeros'>"+
     "<h1>" + numerito + "</h1>"+
   "</div>";
 tablita.appendChild(numeroNuevo);
  });
 
}

function seleccionarN(){
  this.classList.add("numberSelect");
}
document.querySelectorAll(".numeros").forEach(function(numerito){
  numerito.addEventListener("click",seleccionarN);
})


