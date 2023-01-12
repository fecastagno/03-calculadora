import {useRef, useState} from 'react';


enum Operadores {
    sumar, restar, multiplicar, dividir
}

export const useCalculadora = () => {    
    
  const [numeroAnterior, setNumeroAnterior] = useState('0')
  const [numero, setNumero] = useState('0')

  // useRef cambiar una variable sin renderizar
  const ultimaOperacion = useRef<Operadores>()

  const limpiar = () => {
    setNumero('0')
    setNumeroAnterior('0')
  }

  const armarNumero = (numeroTexto: string) => {

    // no aceptar más de 1  punto
    if (numero.includes('.') && numeroTexto === '.') return

    if (numero.startsWith('0') || numero.startsWith('-0')) {

      // Punto decimal
      if (numeroTexto === '.') {
        setNumero(numero + numeroTexto)

        // evaluar si es otro cero y hay un punto
      } else if (numeroTexto === '0' && numero.includes('.')) {
        setNumero(numero + numeroTexto)

        // evaluar si es diferente de cero y no tiene un punto
      } else if (numeroTexto !== '0' && !numero.includes('.')) {
        setNumero(numeroTexto)

        // evitar 000.000
      } else if (numeroTexto === '0' && !numero.includes('.')) {
        setNumero(numero)

      } else {
        setNumero(numero + numeroTexto)
      }

    } else {
      setNumero(numero + numeroTexto)
    }
  }

  const positivoNegativo = () => {
    if (numero.includes('-'))
      setNumero(numero.replace('-', ''))
    else
      setNumero('-' + numero)
  }

  // solucion mia
  const borrarUltimoNumero = () => {
    if (numero.length === 1 || // si hay un nro o un nro negativo, poner 0
      (numero.length === 2 && numero.includes('-')))
      setNumero('0')
    else //borrar ultimo nro desde pos 0 a la anteúltima
      setNumero(numero.slice(0, -1))
  }

  // solucion profesor
  // const btnDelete = () => {
  //   let negativo = ''
  //   let numeroTemp = numero
  //   if (numero.includes('-')){
  //     negativo = '-'
  //     numeroTemp = numero.substr(1)
  //   }

  //   if (numeroTemp.length > 1) {
  //     setNumero(negativo + numeroTemp.slice(0,-1))
  //   } else
  //     setNumero('0')
  // }

  const cambiarNumeroPorAnterior = () => {
    if (numero.endsWith('.')) {
      setNumeroAnterior(numero.slice(0, -1))
    } else
      setNumeroAnterior(numero)

    setNumero('0')
  }

  const botonDividir = () => {
    cambiarNumeroPorAnterior()
    ultimaOperacion.current = Operadores.dividir
  }

  const botonMultiplicar = () => {
    cambiarNumeroPorAnterior()
    ultimaOperacion.current = Operadores.multiplicar
  }

  const botonRestar = () => {
    cambiarNumeroPorAnterior()
    ultimaOperacion.current = Operadores.restar
  }

  const botonSumar = () => {
    cambiarNumeroPorAnterior()
    ultimaOperacion.current = Operadores.sumar
  }

  const calcular = () => {

    const numero1 = Number(numero)
    const numero2 = Number(numeroAnterior)

    switch (ultimaOperacion.current) {
      case Operadores.sumar:
        setNumero(`${numero1 + numero2}`)
        break;

      case Operadores.restar:
        setNumero(`${numero2 - numero1}`)
        break;

      case Operadores.multiplicar:
        setNumero(`${numero1 * numero2}`)
        break;

      case Operadores.dividir:
        if(numero1 === 0) break
        setNumero(`${numero2 / numero1}`)
        break;
    }

    setNumeroAnterior('0')
  }

  // lo que retorna el hook: funciones, métodos, etc...
  return {
    numeroAnterior,
    numero,
    limpiar,
    positivoNegativo,
    borrarUltimoNumero,
    botonDividir,
    armarNumero,
    botonMultiplicar,
    botonRestar,
    botonSumar,
    calcular
  }

}
