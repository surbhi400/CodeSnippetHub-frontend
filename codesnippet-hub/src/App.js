import './App.css';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import FormPage from './pages/FormPage';
import InformationDisplayPage from './pages/InformationDisplayPage';
import Navbar from './components/Navbar';


function App() {
  return (
     <Router>
      <Navbar />
      <Routes>
        <Route path='/' exact element={<FormPage/>}/>
         <Route path='/info' element={<InformationDisplayPage/>}/>
      </Routes>
     </Router>
  );
}

export default App;
