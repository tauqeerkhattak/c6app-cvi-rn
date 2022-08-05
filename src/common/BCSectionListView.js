//
//  Created by Eason Lin on 2020/07/01.
//  Copyright © 2020年 Bacchus. All rights reserved.
//

import {
    SectionList,
    View,
    Text,
    Dimensions,
    RefreshControl,
    Animated,
} from 'react-native';

const { width, height } = Dimensions.get('window')
import React from 'react'

class BCSectionListView extends React.Component {
    constructor(props) {
        super(props)
        const { refresh } = props 
        this.state={
            refresh: refresh
        }
    }

    render() {
        const { data, renderItem, renderSectionHeader, renderSectionFooter, renderSeparator, renderEmptyList, onEndReached, style, sectionStyle, stickySectionHeadersEnabled, refresh, onRefresh, onScroll, scrollEnabled } = this.props 

        const bcRenderItem = (!!renderItem) ? renderItem:this.renderItem;
        const bcRenderSectionHeader = (!!renderSectionHeader) ? renderSectionHeader:this.renderSectionHeader;
        const bcRenderSectionFooter = (!!renderSectionFooter) ? renderSectionFooter:this.renderSectionFooter;
        const bcRenderSeparator = (!!renderSeparator) ? renderSeparator:this.renderSeparator;
        const bcRenderEmptyComponent = (!!renderEmptyList) ? renderEmptyList:this.renderEmptyList;
        const bcOnEndReached = (!!onEndReached) ? onEndReached:this.onEndReached;
        // const bcOnScroll = (!!onScroll) ? onScroll:this.onScroll;
        // const bcOnRefresh = (!!onRefresh)? onRefresh: this.onRefresh;

        const contentContainerStyle = (!!sectionStyle && !!sectionStyle.contentContainerStyle)?sectionStyle.contentContainerStyle:{}
        const containerStyle = (!!style)?style:{}
        
        // const { refresh } = this.state;

        return(
            <SectionList
                scrollEnabled={(this.props.scrollEnabled !== null || this.props.scrollEnabled !== undefined)?this.props.scrollEnabled:true}
                bounces={(this.props.bounces !== null || this.props.bounces !== undefined)?this.props.bounces:true}
                stickySectionHeadersEnabled={!stickySectionHeadersEnabled}
                style={[containerStyle]}
                sections={data}
                listKey={(item, index) => item + index}
                keyExtractor={(item, index) => item + index}
                renderItem={bcRenderItem}
                renderSectionHeader={bcRenderSectionHeader}
                renderSectionFooter={bcRenderSectionFooter}
                ItemSeparatorComponent={bcRenderSeparator}
                ListEmptyComponent={bcRenderEmptyComponent}
                contentContainerStyle = {contentContainerStyle}
                onEndReached = {bcOnEndReached}
                onEndReachedThreshold = {0}
                onScroll={this.onScroll}
                refreshControl={
                    this.refreshController()
                }
            />
        )
    }

    refreshController = () => {
        const { refresh, onRefresh } = this.props;

        
        // console.log((refresh == undefined))
        return (
            <RefreshControl refreshing={(refresh == undefined)?false:refresh} onRefresh={onRefresh}/>
        )
    }

    renderItem = ({section, item , index}) => {
        return (
            <View style={{flex:1, height:100, backgroundColor:'lightblue', marginBottom:8, alignItems:'center', justifyContent:'center'}}>
                <Text style={{fontSize:14}}>Item {index}</Text>
            </View>
        )
    }

    renderSectionHeader = (item) => {
        const section = item.section;
        return (
            <View>
                {(section.title) && (
                    <View style={{flex:1, height:60, backgroundColor:'white', justifyContent:'center', paddingLeft:16}}>
                        <Text style={{fontSize:18}}>{section.title}</Text>
                    </View>
                )}
            </View>
        )
    }

    renderSectionFooter = (item) => {
        return (
            <View/>
        )
    }

    renderSeparator = () => {
        return (
            <View style={{flex:1, height:2, backgroundColor:'red'}}/>
        )
    }

    renderEmptyList = () => {
        return (
            <View />
        )
    }
    onEndReached = (info) => {

    }

    onScroll = (item) => {
        const { onScroll } = this.props
        if(onScroll !== undefined) {
            onScroll(item)
        }
    }
}

export default BCSectionListView