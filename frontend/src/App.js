import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Header from './components/Header';
import CreateSchool from './pages/CreateSchool';
import RegisterStudent from './pages/RegisterStudent';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import AdminDashboard from './pages/AdminDashboard';
import RegisterAdmin from './pages/RegisterAdmin';

function App() {
  return (
    <> 
      <Router>
        <div className='container'>
          <Header />
          <Routes>
            <Route path='/' element={<Dashboard />}></Route>
            <Route path='/admin' element={<AdminDashboard />}></Route>
            <Route path='/createSchool' element={<CreateSchool/>}></Route>
            <Route path='/registerStudent' element={<RegisterStudent/>}></Route>
            <Route path='/register' element={<Register/>}></Route>  
            <Route path='/login' element={<Login/>}></Route>
            {/* This route needs to be protected */}
            <Route path='/registerAdmin' element={<RegisterAdmin/>}></Route>
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
