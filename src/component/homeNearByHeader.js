import React from "react";
import * as RN from 'react-native'
import * as NB from 'native-base';

import Ionicons from "react-native-vector-icons/Ionicons";

import { theme } from '../common/csTheme'
import {TouchableOpacity} from "react-native";

const { width, height } = RN.Dimensions.get('window')

function homeNearBy(props) {
  return (
    <NB.Box w={width} p={4} bgColor={'white'}>
      <NB.Box h={109}  justifyContent={'center'} borderWidth={1} borderColor={theme.colors.csPrimary[600]} rounded="xl">
        <NB.HStack>
          <NB.Center flex={1}>
            <Ionicons name={'scan'} size={30} color={theme.colors.csPrimary[600]} />
            <NB.Text fontSize={'sm'}>Scan</NB.Text>
          </NB.Center>
          <NB.Center flex={1}>
            <Ionicons name={'location'} size={30} color={theme.colors.csPrimary[600]}/>
            <NB.Text fontSize={'sm'}>Nearby</NB.Text>
          </NB.Center>
          <NB.Center flex={1}>
            <TouchableOpacity onPress={() => {
              console.log("E-Waller");
              props.toEWalletAction();
            }}>
              <NB.Center>
                <Ionicons name={'wallet'} size={30} color={theme.colors.csPrimary[600]}/>
                <NB.Text fontSize={'sm'}>E-Wallet</NB.Text>
              </NB.Center>
            </TouchableOpacity>
          </NB.Center>
          <NB.Center flex={1}>
            <Ionicons name={'search'} size={30} color={theme.colors.csPrimary[600]} />
            <NB.Text fontSize={'sm'}>Search</NB.Text>
          </NB.Center>
        </NB.HStack>
      </NB.Box>
      <NB.Text mt={6} mb={3} fontSize={'2xl'}>Near you</NB.Text>
    </NB.Box>
  )
}

export default homeNearBy;
