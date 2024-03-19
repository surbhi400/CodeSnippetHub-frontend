import './App.css';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import FormPage from './pages/FormPage';
import InformationDisplayPage from './pages/InformationDisplayPage';


function App() {
  return (
     <Router>
      <Routes>
        <Route path='/' exact element={<FormPage/>}/>
         <Route path='/info' element={<InformationDisplayPage/>}/>
      </Routes>
     </Router>
  );
}

export default App;
