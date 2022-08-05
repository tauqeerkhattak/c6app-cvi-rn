import React, {useEffect, useState} from "react";
import * as NB from 'native-base';
import {NativeBaseProvider} from "native-base/src/core/NativeBaseProvider";
import {StyleSheet, View,} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import FastImage from "react-native-fast-image";
import {theme} from "../common/csTheme";
import * as RN from "react-native";

const EWalletScreen = () => {
    const [data,setData] = useState([]);
    const [tabPage, setTabPage] = useState(0);

    const getData = async  () => {

        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        let raw = JSON.stringify({
            "longitude": 190.999,
            "latitude": 13.0909,
            "pageNo": 1,
            "pageSize": 10
        });

        let requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };
        const response = await fetch("http://13.251.34.67:8099/main-service/store/get-store", requestOptions);
        const data = await response.json();
        setData(data.data.list);
    }

    const onChangeTab = (changeTabProps) => {
        const newTabIndex = changeTabProps.i;
        setTabPage(newTabIndex);
    };

    useEffect( () => {
        console.log('HELLO2');
        getData();
    }, []);

    return (<NativeBaseProvider>
        <NB.Tab></NB.Tab>
    </NativeBaseProvider>);
}

const Available = ({data}) => {
    const [searchText, setSearchText] = useState('Search in Stamps');
    return (<NB.View backgroundColor={"#FFF"} style={{flex: 1}}>
        {/*SearchBar*/}
        <View style={{justifyContent: 'center',marginTop:10,padding: 10}}>
            <NB.Input
                variant={'rounded'}
                borderColor="#000"
                height={10}
                borderRadius={30}
                borderWidth={1}
                value={searchText}
                onChangeText={setSearchText}
                InputRightElement={
                    <NB.Icon
                        as={
                            <Ionicons
                                name="ios-search"
                                size={15}
                                color={'#000'}
                                style={{marginHorizontal: 15}}
                            />
                        }
                    />
                }
            />
        </View>
        <NB.FlatList
            // style={{backgroundColor: '#e5e5e5'}}
            data={data}
            numColumns={2}
            contentContainerStyle={{
                padding: 10,
            }}
            keyExtractor={(item, index) => `available_key_${index}`}
            renderItem={({item,index}) => {
                console.log("INDEX yeh hai "+index);
                return (
                    <Card item={item} index={index}/>
                );
            }}
        />
    </NB.View>);
};

const { width, height } = RN.Dimensions.get('window')

const Card = ({item,index}) => {
    // const cellPaddingLeft = (index % 2 === 0) ? 4:1.5;
    // const cellPaddingRight = (index % 2 === 0) ? 1.5:4;

    const imgWidth = width * 0.4;
    const imgHeight = imgWidth * 197/141
    const [image,setImage] = useState(item.photoUrl);
    return (
            <NB.Box
                flex={1}
                p={3}
                rounded={'xl'}
                borderWidth={0.5}
                borderColor={'#00000029'}
                margin={1} elevation={8.0}
                backgroundColor={"#FFF"}
            >
                <FastImage source={{uri: image}} style={{height:imgHeight, borderRadius:8}} onError={() => {
                    setImage('https://demofree.sirv.com/nope-not-here.jpg')
                }}/>
                <NB.Box>
                    <NB.HStack alignItems={'center'} mt={1} space={1}>
                        <FastImage source={{uri: item.iconUrl}} style={{width:36, height:36}}/>
                        <NB.Text mr={5} fontSize={'xs'}>{item.storeName}</NB.Text>
                    </NB.HStack>
                    <NB.HStack alignItems={'center'} mt={1} space={1}>
                        <Ionicons name={'calendar'} size={13} color={theme.colors.csPrimary[600]} />
                        <NB.Text mr={5} fontSize={'2xs'} fontWeight={'600'} lineHeight={'sm'}>1 Jan 2023 - 1 Apr 2023</NB.Text>
                    </NB.HStack>
                    <NB.HStack alignItems={'center'} mt={1} space={1}>
                        <Ionicons name={'location'} size={13} color={theme.colors.csPrimary[600]} />
                        <NB.Text mr={5} fontSize={'2xs'} fontWeight={'600'} lineHeight={'sm'}>{item.distance} m</NB.Text>
                    </NB.HStack>
                </NB.Box>
            </NB.Box>

    );
}

const Expired = () => {
    return (
        <NB.View style={styles.container}>
            <NB.Text>Expired</NB.Text>
        </NB.View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFF',
    },
    img:{
        width: '100%',
        height: '50%',
        borderRadius: 10
    },
    tabLabel: {
        fontSize: 16,
        // fontWeight: 'bold',
        textTransform: 'capitalize',
    },
    tabIndicator: {
        backgroundColor: '#fe7013',
    },
    cardPriceRow: {
        marginTop: 10,
        marginBottom: 5,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    priceText: {
        fontSize: 12,
    },
    totalPrice: {
        fontSize: 8,
        opacity: 0.5,
        textDecorationLine: 'line-through',
        marginTop: 3,
        marginLeft: 3,
    },
    travelTimeText: {
        fontSize: 10,
    },
    iconRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginBottom: 5,
    },
    helpIconView: {position: 'absolute', bottom: 5, right: 5},
});

export default EWalletScreen;
