import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Header from './components/Header';
import CreateSchool from './pages/CreateSchool';
import RegisterStudent from './pages/RegisterStudent';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import AdminDashboard from './pages/AdminDashboard';
import RegisterAdmin from './pages/RegisterAdmin';
import ProtectAdmin from './utils/ProtectAdmin';
import ProtectUsers from './utils/ProtectUsers';
import Unauthorized from './pages/Unauthorized';

function App() {
  return (
    <> 
      <Router>
        <div className='container'>
          <Header />
          <Routes>
            <Route path='/login' element={<Login/>}></Route>
            <Route path='/unauthorized' element={<Unauthorized/>}></Route>
            <Route path='/registerAdmin' element={<RegisterAdmin/>}></Route>
            <Route path='/register' element={<Register/>}></Route>  
            {/* This routes needs to be protected */}
            <Route element={< ProtectUsers />} >
              <Route path='/' element={<Dashboard />}></Route>
              <Route path='/createSchool' element={<CreateSchool/>}></Route>
              <Route path='/registerStudent' element={<RegisterStudent/>}></Route>
            </Route>
            <Route element={<ProtectAdmin /> } >
              <Route path='/adminDashboard' element={<AdminDashboard/>} />
            </Route >
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
