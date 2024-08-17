import React from 'react';
import ShowList from './components/ShowList';
import 'bootstrap/dist/css/bootstrap.css';
import RouterComponent from './route' 

function App() {
  return (
    <div>

      <nav className="navbar bg-dark-color py-4" >
      <a className="navbar-brand" href="/"><div className='text-white p-2 mx-2'>Podcast Player / Logo</div></a> </nav>
     
      <RouterComponent />
     
    </div>
  );
}

export default App;
