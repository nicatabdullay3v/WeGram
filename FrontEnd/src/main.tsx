import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { store } from './redux/store.ts';
import { Provider } from 'react-redux';
import { SocketContextProvider } from './context/SocketContext.tsx';


ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <SocketContextProvider>
      <App />
    </SocketContextProvider>
  </Provider>
);

