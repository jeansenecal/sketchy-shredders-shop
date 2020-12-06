import React from 'react';
import data from './data';
import Product from "./components/product";
function App() {
  return (
    <div className="grid-container">
      <header className="row">
        <div>
          <a className="brand" href="index.html">amazona</a>
        </div>
        <div>
          <a href="cart.html">Cart</a>
          <a href="signin.html">Sign In</a>
        </div>
      </header>
      <main>
       <div className="row center">
         {
           data.products.map(product => (
            <Product key={product.id} product={product}/>
           ))
         }
       </div>
      </main>
      <footer className="row center">All right reserved</footer>
    </div>

  );
}

export default App;
