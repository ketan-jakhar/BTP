import React, { useState, useEffect } from "react";

import Product from "./pages/Product";
import Carpool from "./pages/CarPool";
import Home from "./pages/Home";
import Recycle from "./pages/Recycle";
import Register from "./pages/Register";
import Login from "./pages/Login";

import Cart from "./pages/Cart";
import Recent from "./pages/Recent";
// import Checkout from "./pages/Checkout";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CreateProduct from "./pages/CreateProduct";
import CreateRecycle from "./pages/CreateRecycle";
import CreateCarpool from "./pages/CreateCarpool";
import CarpoolList from "./pages/CarPool";

const App = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='/carpool' element={<Carpool />} />
				<Route path='/recycle' element={<Recycle />} />
				<Route path='/shop' element={<Product />} />
				<Route path='/register' element={<Register />} />
				<Route path='/login' element={<Login />} />
				<Route path='/product/create' element={<CreateProduct />} />
				<Route path='/recycle/create' element={<CreateRecycle />} />
				<Route path='/carpool/create' element={<CreateCarpool />} />

				<Route path='/cart' element={<Cart />} />
				<Route path='/recent' element={<Recent />} />
				{/* <Route path='/checkout' element={<Checkout />} /> */}
				<Route path='/product' element={<Product />} />
			</Routes>
		</BrowserRouter>
	);
};

export default App;
