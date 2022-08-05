import {
    RecoilRoot,
    atom,
    selector,
    useRecoilState,
    useRecoilValue,
} from 'recoil';

import _ from 'lodash';

import * as API from '../../ApiCenter/CSApiV1Center/CSApi'

export const getHomeSampleList = selector({
    key: 'HomeSampleList',
    get: async ({get}) => {
        const response = await API.homeSampleList();
        // const getTokenResponse = await API.getToken();
        // console.log(getTokenResponse)
        const dataList = response.data;

        const updatedList = _.filter(dataList, function(data) { return data.winery === 'Schrader'; });
        console.log(updatedList)

        return updatedList;
    },
});