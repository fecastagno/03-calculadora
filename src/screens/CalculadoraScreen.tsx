import { Text, View } from 'react-native';
import { BotonCalc } from '../components/BotonCalc';
import { styles } from '../theme/appTheme';
import { useCalculadora } from '../hooks/useCalculadora';

export const CalculadoraScreen = () => {

  // importación del hook
  const {
    resultadoHistorico,
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
  } = useCalculadora()

  return (
    <View style={styles.calculadoraContainer}>

      {/* borrar cero resultado chico */}
      {
        (resultadoHistorico !== '0') &&
        (<Text style={styles.resultadoChico}> {resultadoHistorico} </Text>)
      }
      {/* borrar cero resultado chico */}
      {
        (numeroAnterior !== '0') &&
        (<Text style={styles.resultadoChico}> {numeroAnterior} </Text>)
      }

      <Text
        style={styles.resultado}
        numberOfLines={1}
        //adjustsFontSizeToFit={true} línea equivalente
        adjustsFontSizeToFit

      >{numero}

      </Text>

      {/* los view son como los div */}
      {/* fila de botones */}
      <View style={styles.fila}>
        <BotonCalc texto="C" color="#9B9B9B" accion={limpiar} />
        <BotonCalc texto="+/-" color="#9B9B9B" accion={positivoNegativo} />
        <BotonCalc texto="del" color="#9B9B9B" accion={borrarUltimoNumero} />
        <BotonCalc texto="/" color="#FF9427" accion={botonDividir} />
      </View>

      {/* 2 fila de botones */}
      <View style={styles.fila}>
        <BotonCalc texto="7" accion={armarNumero} />
        <BotonCalc texto="8" accion={armarNumero} />
        <BotonCalc texto="9" accion={armarNumero} />
        <BotonCalc texto="*" color="#FF9427" accion={botonMultiplicar} />
      </View>

      {/* 3 fila de botones */}
      <View style={styles.fila}>
        <BotonCalc texto="4" accion={armarNumero} />
        <BotonCalc texto="5" accion={armarNumero} />
        <BotonCalc texto="6" accion={armarNumero} />
        <BotonCalc texto="-" color="#FF9427" accion={botonRestar} />
      </View>

      {/* 4 fila de botones */}
      <View style={styles.fila}>
        <BotonCalc texto="1" accion={armarNumero} />
        <BotonCalc texto="2" accion={armarNumero} />
        <BotonCalc texto="3" accion={armarNumero} />
        <BotonCalc texto="+" color="#FF9427" accion={botonSumar} />
      </View>

      {/* 5 fila de botones */}
      <View style={styles.fila}>
        <BotonCalc texto="0" accion={armarNumero} ancho />
        <BotonCalc texto="." accion={armarNumero} />
        <BotonCalc texto="=" color="#FF9427" accion={calcular} />
      </View>
    </View>
  )
}
