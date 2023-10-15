import { useRef, useState } from "react";

enum Operadores {
    sumar, resta, multiplicar, dividir
  }
  

export const useCalculadora = () => {
    const [ numeroAnterior , setnumeroAnterior ] = useState("0");
    const [ numero , setNumero ] = useState("0");
  
    const ultimaOperacion = useRef<Operadores>();
  
    const limpiar = () =>{
      setNumero("0");
      setnumeroAnterior("0");
    }
  
    const armarNumero = ( numeroTexto: string ) => {
  
      //No aceptar doble punto
      if( numero.includes(".") && numeroTexto === ".") return;
  
      if( numero.startsWith("0") || numero.startsWith("-0") ){
  
        // Punto decimal
        if(  numeroTexto === "."){
          setNumero( numero + numeroTexto );
  
          //Evaluar si es otro cero, y hay un punto
        } else if ( numeroTexto === "0" && numero.includes(".") ){
          setNumero( numero + numeroTexto );
  
          //Evaluar si es diferente de cero y no tiene un punto
        } else if ( numeroTexto !== "0" && !numero.includes(".") ){
          setNumero( numeroTexto );
  
          // Evitar 0000.0
        } else if ( numeroTexto === "0" && !numero.includes(".")){
          setNumero( numero );
        } else {
          setNumero( numero + numeroTexto )
        }
  
      }else{
        setNumero( numero + numeroTexto)
      } 
    }
  
    const btnDividir = () => {
      cambiarNumeroPorAnterior();
      ultimaOperacion.current = Operadores.dividir;
    }
    const btnMultiplicar = () => {
      cambiarNumeroPorAnterior();
      ultimaOperacion.current = Operadores.multiplicar;
    }
    const btnRestar = () => {
      cambiarNumeroPorAnterior();
      ultimaOperacion.current = Operadores.resta;
    }
    const btnSumar = () => {
      cambiarNumeroPorAnterior();
      ultimaOperacion.current = Operadores.sumar;
    }
  
    const calcular = () => {
      const num1 = Number( numero );
      const num2 = Number( numeroAnterior );
  
      switch (ultimaOperacion.current) {
        case Operadores.sumar:
          setNumero( `${ num1 + num2 }` );
          break;
  
        case Operadores.resta:
          setNumero( `${ num2 - num1 }` );
          break;
          
        case Operadores.multiplicar:
          setNumero( `${ num1 * num2 }` );
          break;
  
        case Operadores.dividir:
          setNumero( `${ num2 / num1 }` );
          break;
          
        }
        setnumeroAnterior( "0" );
    }
  
    const cambiarNumeroPorAnterior = () =>{
      if( numero.endsWith(".")) {
        setnumeroAnterior( numero.slice(0, -1) )
      }else{
        setnumeroAnterior( numero );
      }
      setNumero("0");
    }
  
    const positivoNegativo = () => {
      if( numero.includes("-")) {
        setNumero( numero.replace( "-" , "" ) );
      } else {
        setNumero( "-" + numero);
      }
    }
  
    const del = () => {
      let negativo = "";
      let numeroTemp = numero;
      if ( numero.includes("-") ){
        negativo = "-";
        numeroTemp = numero.substring(1);
      }
  
      if( numeroTemp.length > 1 ) {
        setNumero( negativo + numeroTemp.slice(0, -1) );
      } else {
        setNumero("0");
      }
    }
    
    return {
        numeroAnterior,
        numero,
        limpiar,
        positivoNegativo,
        del,
        btnDividir,
        armarNumero,
        btnMultiplicar,
        btnRestar,
        btnSumar,
        calcular
    }

}
