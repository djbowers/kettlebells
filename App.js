import { StatusBar } from 'expo-status-bar'
import { Button, Text, View } from 'react-native'
import tw from 'twrnc'

export default function App() {
  return (
    <View style={tw`flex-col items-center`}>
      <Text>Simple & Sinister</Text>
      <Button title="Start" />
      <View style={tw`flex-row`}>
        <Text>Swings</Text>
        <Button title="+" />
      </View>
      <View style={tw`flex-row`}>
        <Text>Getups</Text>
        <Button title="+" />
      </View>
      <Button title="Done" />
      <StatusBar style="auto" />
    </View>
  )
}
