import React from 'react';
import {configure, shallow} from 'enzyme';
import Adapter from "enzyme-adapter-react-16";

import Popup from "../../components/Popup/Popup";
import {Modal} from "reactstrap";

configure({adapter: new Adapter()});

describe('<Popup />', () => {
  it('should render <Modal />', () => {
    const wrapper = shallow(<Popup/>);
    expect(wrapper.find(Modal)).toHaveLength(1);
  });
});
