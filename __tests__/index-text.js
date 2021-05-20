/**
 * @format
 */

import 'react-native';
import renderer from 'react-test-renderer';
//import React,{useState} from 'react';
import {TouchableOpacity} from 'react-native';
import Enzyme from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import {shallow, mount} from 'enzyme';
import Index from '../src/screens/Index';
Enzyme.configure({ adapter: new Adapter() });

// Note: test renderer must be required after react-native.
describe('index screen', () =>{
  it('renders correctly', () => {
    jest.mock('react-native-vector-icons/FontAwesome', () => 'Icon')
    const snap= renderer.create(<Index  />).toJSON();
    expect(snap).toMatchSnapshot();
  });
  test('Press the button to each pokemon',()=>{
    const onPressMock = jest.fn();
    const wrapper= shallow(<TouchableOpacity onPress={ onPressMock} />);
    wrapper.find('TouchableOpacity').simulate('Press')
    expect(onPressMock).toHaveBeenCalled();
    expect(onPressMock.mock.calls.length).toEqual(1);  
  });
})

