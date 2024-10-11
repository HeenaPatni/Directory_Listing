import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store';
import DirectoryPage from './components/DirectoryPage';
import './App.css'

function App() {
    return (
        <Provider store={store}>
            <div className="App">
                <DirectoryPage />
            </div>
        </Provider>
    );
}

export default App;
