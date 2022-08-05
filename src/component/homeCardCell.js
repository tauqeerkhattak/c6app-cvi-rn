import React from "react";
import * as RN from 'react-native'
import * as NB from 'native-base';

import FastImage from "react-native-fast-image";
import Ionicons from "react-native-vector-icons/Ionicons";

import { theme } from '../common/csTheme'

const { width, height } = RN.Dimensions.get('window')

function homeCardCell({item, index}) {
  const cellPaddingLeft = (index % 2 === 0) ? 4:1.5;
  const cellPaddingRight = (index % 2 === 0) ? 1.5:4;

  const imgWidth = (width - ((11*2 + 16)*2) - 12)/2
  const imgHeight = imgWidth * 197/141

  return (
    <NB.Box w={width/2} pl={cellPaddingLeft} pr={cellPaddingRight} bgColor={'white'}>
      <NB.Box flex={1} p={3} rounded={'xl'} borderWidth={0.5} borderColor={'#00000029'}>
        <FastImage source={require('../image/card_row.png')} style={{width:imgWidth, height:imgHeight, borderRadius:8}}/>              
        <NB.Box>
          <NB.HStack alignItems={'center'} mt={1} space={1}>
            <FastImage source={require('../image/smallIcon.png')} style={{width:36, height:36}}/>              
            <NB.Text mr={5} fontSize={'xs'}>STARBUCKS point card</NB.Text>
          </NB.HStack>
          <NB.HStack alignItems={'center'} mt={1} space={1}>
            <Ionicons name={'location'} size={13} color={theme.colors.csPrimary[600]} />
            <NB.Text mr={5} fontSize={'2xs'} fontWeight={'600'} lineHeight={'sm'}>10m</NB.Text>
          </NB.HStack>
        </NB.Box>
      </NB.Box>
    </NB.Box>
  )
}

export default homeCardCell;
