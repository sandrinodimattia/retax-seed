import chai, { expect } from 'chai';
import mockery from 'mockery';
import dirtyChai from 'dirty-chai';
chai.use(dirtyChai);

import { shallow } from 'enzyme';

import React from 'react';

function noop() {}

describe('Wrapper App Page', () => {
  const appStatus = {
    leftNavOpen: true,
  };

  describe('Without DOM', () => {
    beforeEach(() => {
      mockery.enable({
        warnOnReplace: false,
        warnOnUnregistered: false,
        useCleanCache: true,
      });
      mockery.registerMock(
        'material-ui',
        require('helpers/test/materialUiMock')
      );
      mockery.registerMock(
        'react-helmet',
        require('helpers/test/reactHelmetMock')
      );
      mockery.registerMock(
        'decorators/pureRender',
        require('helpers/test/decoratorsMock').pureRender
      );
      mockery.registerMock(
        'components/LeftMenuDrawer',
        require('helpers/test/componentsMock').LeftMenuDrawer
      );
      mockery.registerMock(
        'components/ErrorManager',
        require('helpers/test/componentsMock').ErrorManager
      );
    });

    afterEach(() => {
      mockery.deregisterMock('material-ui');
      mockery.deregisterMock('react-helmet');
      mockery.deregisterMock('decorators/pureRender');
      mockery.deregisterMock('components/LeftMenuDrawer');
      mockery.deregisterMock('components/ErrorManager');
      mockery.disable();
    });

    it('should work', () => {
      const WrapperAppPage = require('../WrapperAppPage');
      const wrapper = shallow(
        <WrapperAppPage
          leftNavMenuItems={[]}
          appStatus={appStatus}
          closeLeftNav={noop}
          toggleLeftNav={noop}
        >
          <div>children</div>
        </WrapperAppPage>,
        {
          context: { muiTheme: { rawTheme: { palette: {} } } },
        }
      );

      expect(wrapper).to.have.length(1);
    });

    it('should render the app Page components', () => {
      const WrapperAppPage = require('../WrapperAppPage');
      const wrapper = shallow(
        <WrapperAppPage
          leftNavMenuItems={[]}
          appStatus={appStatus}
          closeLeftNav={noop}
          toggleLeftNav={noop}
        >
          <div>children</div>
        </WrapperAppPage>,
        {
          context: { muiTheme: { rawTheme: { palette: {} } } },
        }
      );

      expect(wrapper.find('Helmet')).to.have.length(1);
      expect(wrapper.find('AppBar')).to.have.length(1);
      expect(wrapper.find('LeftMenuDrawer')).to.have.length(1);
    });

    it('should have a children', () => {
      const WrapperAppPage = require('../WrapperAppPage');
      const wrapper = shallow(
        <WrapperAppPage
          leftNavMenuItems={[]}
          appStatus={appStatus}
          closeLeftNav={noop}
          toggleLeftNav={noop}
        >
          <div>children!</div>
        </WrapperAppPage>,
        {
          context: { muiTheme: { rawTheme: { palette: {} } } },
        }
      );

      expect(wrapper.children().last().text()).to.equal('children!');
    });
  });
});