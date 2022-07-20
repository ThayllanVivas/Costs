import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Home from './components/pages/Home'
import Company from './components/pages/Company'
import Contact from './components/pages/Contact'
import NewProject from './components/project/NewProject'
import Projects from './components/pages/Projects'
import Project from './components/project/Project'

import Container from './components/layout/Container'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'


function App() {
  return (
    <Router>
      <Navbar />
      <Container customClass="min_height">
         <Routes>
            <Route exact element={<Home />} path="/"/>
            <Route element={<Projects />} path="/projects"/>
            <Route element={<Company />} path="/company"/>
            <Route element={<Contact />} path="/contact"/>
            <Route element={<NewProject />} path="/newproject"/>
            <Route element={<Project />} path="/project/:id"/>
          </Routes>
      </Container> 
      <Footer />
    </Router>
  );
}

export default App;
