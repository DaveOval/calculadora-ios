
import { Text, View } from 'react-native'
import { styles } from '../theme/appTheme'

export const CalculadoraScreen = () => {
  return (
    <View style={ styles.calculadoraContainer }>
        <Text style={ styles.resultado }>1,500.00</Text>
    </View>
  )
}
