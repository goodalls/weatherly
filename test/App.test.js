import React from 'react';
import { mount, shallow } from 'enzyme';
import App from '../lib/App.js';
import mockData from "./testMocks.js";

describe('App', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<App />)
  })
  it('should exist', () => {

    expect(wrapper).toBeDefined();
  });

  it('should render the h1, triviaList, and Controls component', () => {

    expect(wrapper.find('h1').length).toEqual(1);
    expect(wrapper.find('TriviaList').length).toEqual(1);
    expect(wrapper.find('Controls').length).toEqual(1);
  });

  it('should have default stat of an empty array triviaList', () => {

    expect(wrapper.state().triviaList).toEqual([]);
  });

  it('should update state', () => {
    expect(wrapper.state().triviaList).toEqual([]);

    wrapper.setState({ triviaList: mockData.results });

    expect(wrapper.state().triviaList).toEqual(mockData.results);
    expect(wrapper.state().triviaList.length).toEqual(10);
  });

});