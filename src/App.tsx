import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Dashboard from "./Dashboard";


const App: React.FC = () => {

    return (
        <div className="App" style={{backgroundColor: 'dark'}}>
            <Dashboard/>
        </div>
    );
}

export default App;
