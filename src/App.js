import React from 'react';
import { PortfolioContainer } from './portfolio-container/PortfolioContainer'
import { LoaderBar } from './utilities/commonUtils'
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
function App() {
  return (
    <div>
     <ToastContainer />
      <LoaderBar />
      <PortfolioContainer />
    </div>
  );
}

export default App;
