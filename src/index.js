import React,{Suspense} from 'react';
import ReactDOM from 'react-dom';
import './css/bootstrap.css'
import './css/index.css'
import {FirebaseAppProvider} from 'reactfire';
import 'firebase/auth';
import db from './config/db.js'
import { Provider } from "react-redux"
import store from './config/Store.js'
const App = React.lazy(() => import('./App'));



ReactDOM.render(
    <FirebaseAppProvider firebaseConfig={db.Config} >
      <Suspense fallback={'Conectando al servidor...'} >  
        <Provider store={store} > 
          <App />
        </Provider>
      </Suspense>
    </FirebaseAppProvider>,
  document.getElementById('root')
);