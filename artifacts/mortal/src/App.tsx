import { Router, Switch, Route } from 'wouter';
import { CartProvider } from '@/context/CartContext';
import Home from '@/pages/Home';
import CategoryPage from '@/pages/CategoryPage';

export default function App() {
  return (
    <Router>
      <CartProvider>
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/category/:cat" component={CategoryPage} />
          <Route>
            <Home />
          </Route>
        </Switch>
      </CartProvider>
    </Router>
  );
}
