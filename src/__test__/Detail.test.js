import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  NavLink,
} from 'react-router-dom';
import { renderer, create, act } from 'react-test-renderer';
import { Provider } from 'react-redux';
import Details from '../components/Details';
import store from '../redux/store';

describe('test if details page works correctly renders correctly', () => {
  let root;
  act(() => {
    root = create(
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path="/*" element={<Details name="Europe" />} />
          </Routes>
        </BrowserRouter>
      </Provider>,
    );
  });
  // make assertions on root
  it('Test Main component renders', () => {
    expect(root).toMatchSnapshot();
  });
});
