import React, {useCallback, useContext, useState} from 'react'
import {ScrollView, View} from 'react-native'
import {
  Button,
  ButtonGroup,
  Card,
  CheckBox,
  Icon,
  Text,
} from 'react-native-elements'
import {scripts} from './scripts'
import {CountContext} from './CountContext'
import debounce from 'lodash/debounce'

const debounceTime = 2000
const buttons = ['Slow', 'Fast', 'Original']

export const Sentence = ({route}) => {
  const {no} = route.params
  const script = scripts[no - 1]

  const {plus, fetchCount} = useContext(CountContext)
  const currentCount = fetchCount(no)

  const [isShownScript, setIsShownScript] = useState(false)
  const [isListening, setIsListening] = useState(false)
  const [isUsableButton, setIsUsableButton] = useState(true)
  const [speed, setSpeed] = useState(2)

  const handlePlusClick = useCallback(
    debounce(
      () => {
        if (isListening) {
          return
        }
        setIsUsableButton(false)
        plus(no)
        setTimeout(() => setIsUsableButton(true), debounceTime)
      },
      debounceTime,
      {leading: true},
    ),
    [isListening],
  )

  return (
    <ScrollView>
      <Card>
        <ButtonGroup
          onPress={setSpeed}
          selectedIndex={speed}
          buttons={buttons}
        />
        <CheckBox
          center
          title="반복듣기모드"
          checked={isListening}
          onPress={() => setIsListening(!isListening)}
        />
      </Card>
      <Card>
        <View style={{alignItems: 'center'}}>
          <Text h1>{currentCount}</Text>
        </View>
        <Button
          icon={<Icon name={isListening ? 'loop' : 'add'} color="#ffffff" />}
          title={isListening ? 'Play' : 'Listen & Speak'}
          onPress={handlePlusClick}
          disabled={!isUsableButton}
        />
      </Card>
      <Card>
        <Text style={{marginBottom: 10}}>
          {isShownScript ? script : script.replace(/[\w]/g, '_')}
        </Text>
        <CheckBox
          center
          title="문장보기"
          checked={isShownScript}
          onPress={() => setIsShownScript(!isShownScript)}
        />
      </Card>
    </ScrollView>
  )
}
