//
//  Created by Eason Lin on 2022/07/25.
//

'use strict'

// import {
//   DeviceEventEmitter
// } from 'react-native';

// import * as BCAnalytics from '../Common/BCTagManager'

import axios from 'axios';

async function fetchApiWithRequest(mainRequest, withoutIndicator) {
  // return if this is a empty request or empty url.
  if (mainRequest == null || mainRequest.url == null) { return {'result':'failed', 'response': 'Empty request/url'} };

  // combine method, headers, and body into a object.
  let requestObj = handleRequests(mainRequest);

  // if (!withoutIndicator) { DeviceEventEmitter.emit('ShowLoadingIndicator'); }
  
  console.log(requestObj)
  return axios(mainRequest.url, requestObj)
  .then((responseJson) => {
    console.log(responseJson)
    // BCAnalytics.fetchLog('fetch successfully',{ URL: mainRequest.url})
    // if (!withoutIndicator) { DeviceEventEmitter.emit('HideLoadingIndicator'); }
    
    return responseJson
  })
  .catch((err) => {
    if (err.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.log(err)
      console.log(err.response.data);
      console.log(err.response.status);
      console.log(err.response.headers);
      console.log('Error', err.message);
      // if (!withoutIndicator) { DeviceEventEmitter.emit('HideLoadingIndicator'); }
      return err.response
    }
    // console.log(err)
    // BCAnalytics.fetchLog('fetch error', { URL: mainRequest.url, error: err })
  })
}

function handleRequests(mainRequest) {
  let requestObj = {};
  const defaultHeaders = {'Accept': 'application/json',
                          'Content-Type': 'application/json'}

  requestObj['method'] = (mainRequest.method)? mainRequest.method:'GET';
  requestObj['headers'] = (mainRequest.headers)? mainRequest.headers: defaultHeaders;
  if (mainRequest.body) { requestObj['data'] = mainRequest.body };
  if (mainRequest.responseType) { requestObj['responseType'] = mainRequest.responseType
                                  requestObj['transformResponse'] = undefined };

  return requestObj;
}

module.exports = {
  fetchApiWithRequest,
};
