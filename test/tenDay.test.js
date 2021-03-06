import mockData from './testCleanMockData.js';
import { shallow, mount } from 'enzyme';
import mockIcons from './testIcons.js';
import TenDay from '../lib/TenDay.js';
import React from 'react';

// How do we test the props.icons??
describe('TenDay', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<TenDay days={mockData.days} icon={mockIcons} />);
  })

  it('should exist', () => {
    expect(wrapper).toBeDefined();
  })

  it('should start with props', () => {
    expect(wrapper.instance().props.days).toEqual(mockData.days);
    expect(wrapper.instance().props.icon).toEqual(mockIcons);
    expect(wrapper.instance().props.days.length).toEqual(10);
  })

  it('should render 10 Card components', () => {
    expect(wrapper.find('Card').length).toEqual(10);
  })

  it('should mount 10 Card components', () => {
    wrapper = mount(<TenDay days={mockData.days} icon={mockIcons} />);

    expect(wrapper.find('h2').length).toEqual(10);
    expect(wrapper.find('h2').first().text()).toEqual('Wednesday');
  })

});