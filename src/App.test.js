import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import App from './App';

const middlewares = [];
const mockStore = configureStore(middlewares);

describe('AppComponent', () => {
  it('renders without crashing', () => {
    const initialState = {
      loading: true,
      isLoggedIn: false,
      user: null,
      data: null,
    };
    const store = mockStore(initialState);
    const div = document.createElement('div');

    ReactDOM.render(
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>,
      div
    );
  });
});
