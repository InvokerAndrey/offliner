import { Container } from 'react-bootstrap'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import Header from './components/Header'
import Footer from './components/Footer'
import HomeScreen from './screens/HomeScreen'
import PhoneScreen from './screens/PhoneScreen'
import PhonesScreen from './screens/PhonesScreen'
import CartScreen from './screens/CartScreen'
import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen'
import ProfileScreen from './screens/ProfileScreen'


function App() {
  return (
    <Router>
      <Header />
        <main className="py-3">
          <Container>
            <Route path="/" component={HomeScreen} exact />
            <Route path="/login" component={LoginScreen} />
            <Route path="/register" component={RegisterScreen} />
            <Route path="/profile" component={ProfileScreen} />
            <Route path="/phones" component={PhonesScreen} />
            <Route path="/phone/:id" component={PhoneScreen} />
            <Route path="/cart/:id?" component={CartScreen} />  {/* ? means id is not nessesary */}
          </Container>
        </main>
      <Footer />
    </Router>
  );
}

export default App;
