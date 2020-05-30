import {createContext, useEffect, useState} from 'react'
import AsyncStorage from '@react-native-community/async-storage'
import * as R from 'ramda'
import React from 'react'

export const CountContext = createContext({
  map: new Map(),
  plus: no => null,
  fetchCount: no => 0,
  reset: () => null,
})

const STORAGE_KEY = '@LS100:count'

export const CountContextProvider = ({children}) => {
  const [map, setMap] = useState(new Map())

  const initData = () =>
    AsyncStorage.getItem(STORAGE_KEY)
      .then(arrStr => (R.isNil(arrStr) ? [] : JSON.parse(arrStr)))
      .then(arr => (R.isEmpty(arr) ? new Map() : new Map(arr)))

  useEffect(() => {
    initData().then(setMap)
  }, [])

  const plus = no => {
    const count = fetchCount(no)
    map.set(no, count + 1)
    const newMapEntry = [...map]
    return AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newMapEntry)).then(
      _ => setMap(new Map(newMapEntry)),
    )
  }

  const fetchCount = no => Number(map.get(Number(no))) || 0

  const reset = () =>
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify([])).then(_ =>
      setMap(new Map()),
    )

  return (
    <CountContext.Provider value={{map, plus, fetchCount, reset}}>
      {children}
    </CountContext.Provider>
  )
}
