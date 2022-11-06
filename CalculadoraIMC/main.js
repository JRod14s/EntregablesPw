function calculandoIMC(){
    let peso = document.getElementById("peso").value;
    let altura = document.getElementById("altura").value/100;
    let resultado = document.getElementById("resultado");
  
    if(altura !== "" && peso !== ""){
  
      let imc = (peso / (altura * altura)).toFixed(2);
      let mensagem = ""; 
  
      if(imc < 18.5){
        mensagem = "Esta bajo de peso!"
      }else if(imc < 25){
        mensagem = "Su peso es ideal!"
      }else if(imc <30){
        mensagem = "Esta por encima del peso ideal"
      }else if( imc < 35){
        mensagem = "Cuidado! Puede tener obesidad grado I"
      }else if( imc < 40){
        mensagem = "Cuidado! Puede tener obesidad grado II"
      }else
        mensagem = "Cuidado! Puede tener obesidad grado III"
  
      resultado.textContent = `Su IMC es ${imc}. ${mensagem}`;
  
      }else{
        resultado.textContent = "Por favor, rellene todos los campos"
    }
  
  }
  
  bottonCalcular.addEventListener("click", calculandoIMC);