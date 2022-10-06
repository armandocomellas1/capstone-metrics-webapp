import React from 'react';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import MainStat from '../components/Main';
import store from '../redux/store';

describe('Main page component testing using snapshots', () => {
  it('Test Main component renders', () => {
    const tree = renderer
      .create(
        <Provider store={store}>
          <MainStat />
        </Provider>,
      );
    expect(tree).toMatchSnapshot();
  });
});
