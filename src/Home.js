import {Alert, SafeAreaView, ScrollView} from 'react-native'
import {Button, Icon, ListItem} from 'react-native-elements'
import React, {useContext} from 'react'
import * as R from 'ramda'
import {CountContext} from './CountContext'

export const Home = ({navigation}) => {
  const {fetchCount, reset} = useContext(CountContext)
  return (
    <SafeAreaView>
      <ScrollView>
        {R.range(1, 97).map(no => (
          <ListItem
            key={no}
            title={no + '번째'}
            badge={{
              value: fetchCount(no),
              textStyle: {color: 'white'},
            }}
            onPress={() => navigation.navigate('Sentence', {no})}
            chevron
            topDivider
            bottomDivider
          />
        ))}
        <Button
          icon={<Icon name={'delete'} color="#ffffff" />}
          title={'카운팅 전체 리셋'}
          buttonStyle={{backgroundColor: 'black'}}
          onPress={() =>
            Alert.alert(
              '리셋',
              '모든 카운트를 0으로 설정하시겠습니까?',
              [
                {text: 'OK', onPress: reset},
                {
                  text: 'Cancel',
                  onPress: () => null,
                  style: 'cancel',
                },
              ],
              {cancelable: false},
            )
          }
        />
      </ScrollView>
    </SafeAreaView>
  )
}
