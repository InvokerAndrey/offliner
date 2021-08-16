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
import ShippingScreen from './screens/ShippingScreen'
import PaymentScreen from './screens/PaymentScreen'
import PlaceOrderScreen from './screens/PlaceOrderScreen'
import OrderScreen from './screens/OrderScreen'
import UserListScreen from './screens/UserListScreen'
import UserEditScreen from './screens/UserEditScreen'
import PhoneListScreen from './screens/PhoneListScreen'
import PhoneEditScreen from './screens/PhoneEditScreen'
import OrderListScreen from './screens/OrderListScreen'



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
            <Route path="/shipping" component={ShippingScreen} />
            <Route path="/payment" component={PaymentScreen} />
            <Route path="/placeorder" component={PlaceOrderScreen} />
            <Route path="/order/:id" component={OrderScreen} />
            <Route path="/phone/:id" component={PhoneScreen} />
            <Route path="/cart/:id?" component={CartScreen} />  {/* ? means id is not nessesary */}

            <Route path="/admin/userlist" component={UserListScreen} />
            <Route path="/admin/phonelist" component={PhoneListScreen} />
            <Route path="/admin/orderlist" component={OrderListScreen} />
            <Route path="/admin/user/:id/edit" component={UserEditScreen} />
            <Route path="/admin/phone/:id/edit" component={PhoneEditScreen} />
          </Container>
        </main>
      <Footer />
    </Router>
  );
}

export default App;
