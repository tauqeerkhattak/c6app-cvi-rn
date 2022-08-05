import 'react-native';
import React from 'react';
import { 
  fetchApiWithRequest, 
} from '../ApiHandler';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

test('empty request', () => {
	expect.assertions(1);
	return fetchApiWithRequest().then(response => {
	  let emptyResponse = {'result':'failed', 'response': 'Empty request/url'};
	  expect(response).toEqual(emptyResponse);
	});
});

test('empty url', () => {
	expect.assertions(1);
	return fetchApiWithRequest({'method':'GET'}).then(response => {
	  let emptyResponse = {'result':'failed', 'response': 'Empty request/url'};
	  expect(response).toEqual(emptyResponse);
	});
});