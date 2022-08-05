//
//  Created by Eason Lin on 2022/07/21.
//

'use strict'

import React, { Component } from 'react';
import _ from 'lodash';

import {
  fetchApiWithRequest
} from '../ApiHandler'

import {
  CSApiUrl,
  CSApiPath
} from './CSParameters'

// import { getUserProperties } from '../../DataCenter/GetUserData'

export async function signUp(userInfo) {
  // create a request object

  let requestObj = {};
  requestObj['method']    = 'POST';
  requestObj['url']       = CSApiUrl.baseUrl +
                            CSApiUrl.apiVersion +
                            CSApiPath.authPath +
                            CSApiPath.register;
  requestObj['body']      = { registerIsoCode: userInfo.userCountryCode.toLowerCase(),
                              cellphone: ('+' + userInfo.phoneCallingCode[0] + userInfo.phone),
                              username: userInfo.name,
                              password: userInfo.password,
                              role: 'GUESS' }

  console.log(requestObj)
  return fetchApiWithRequest(requestObj);
}

export async function signIn(signInProperties) {
  // create a request object

  let requestObj = {};
  requestObj['method']    = 'POST';
  requestObj['url']       = CSApiUrl.baseUrl +
                            CSApiUrl.apiVersion +
  					                CSApiPath.memberPath +
  					                CSApiPath.loginPath;
  requestObj['body']      = { account: signInProperties.phone,
                              password: signInProperties.password  }

  return fetchApiWithRequest(requestObj);
}

export async function homeSampleList() {
  // create a request object

  let requestObj = {};
  requestObj['method']    = 'GET';
  requestObj['url']       = 'https://api.sampleapis.com/wines/reds';

  return fetchApiWithRequest(requestObj);
}

export async function getToken(loginInfo) {
  // create a request object

  let requestObj = {};
  requestObj['method']    = 'POST';
  requestObj['url']       = CSApiUrl.baseUrl +
                            CSApiUrl.apiVersion +
  					                CSApiPath.authPath +
  					                CSApiPath.getToken;

  requestObj['body']      = { cellphone: loginInfo.cellphone,
                              password: loginInfo.password }

  return fetchApiWithRequest(requestObj);
}

// async function _buildHeaders() {
//   const user = await getUserProperties();
//   const userProperties = (!!user)?user.data:{}
//   if (!!userProperties.token) {
//     return {
//       Authorization: `Bearer ${userProperties.token}`,
//       'Content-Type': 'application/json'
//     };
//   }
//   return {
//     'Content-Type': 'application/json'
//   };
// }

// async function _buildUploadHeaders() {
//   const user = await getUserProperties();
//   const userProperties = (!!user)?user.data:{}
//   if (!!userProperties.token) {
//     return {
//       Authorization: `Bearer ${userProperties.token}`,
//       'Content-Type': 'multipart/form-data',
//     };
//   }
//   return {
//     'Content-Type': 'multipart/form-data',
//   };
// }

// function _buildFormData(data: Object) {
//   const formData = new FormData();
//   _buildParams(data).forEach((value: Array<any>) =>
//     formData.append(value[0], value[1])
//   );
//   return formData;
// }

// function _buildParams(data: Object) {
//   const params: Array<any> = [];
//   _.forEach(data, (value: any, key: string) => {
//     if (typeof value === 'undefined' || value === null) {
//       //
//     } else if (Array.isArray(value)) {
//       _.forEach(value, (v: Object) => params.push([key, v]));
//     } else {
//       params.push([key, value]);
//     }
//   });

//   for (let pair of params) {
//     if (pair.length > 1 && pair[1] instanceof Date) {
//       pair[1] = pair[1].getTime() / 1000;
//     }
//   }
//   return params;
// }
