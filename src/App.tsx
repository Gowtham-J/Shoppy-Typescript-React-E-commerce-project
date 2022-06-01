import React from "react";
import { Route, Routes } from "react-router-dom";
import { Footer, Navbar, Sidebar } from "./components";
import {
  AuthWrapper,
  Home,
  About,
  Cart,
  Products,
  SingleProduct,
  Error,
} from "./pages";

function App() {
  return (
    // <AuthWrapper>
    <>
      <Navbar />
      <Sidebar />
      <Routes>
        <Route path="/">
          <Route index element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/products">
            <Route index element={<Products />} />
            <Route path=":id" element={<SingleProduct />} />
          </Route>
          <Route path="*" element={<Error />} />
        </Route>
      </Routes>
      <Footer />
    </>
    // </AuthWrapper>
  );
}

export default App;
