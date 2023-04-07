import { BrowserRouter, Routes, Route } from "react-router-dom";

import Start from "../pages/Start";
import SignUp from "../pages/SignUp";
import LogIn from "../pages/LogIn";
import ProtectedRoute from '../components/ProtectedRoute'
/* import Layout from '../components/Layout'; */
import Home from "../pages/Home";
import Board from "../pages/Board";

function AppRouter() {
	return (
		<>
			<BrowserRouter>
				<Routes>
					<Route index path="/" element={<Start />} />
					<Route path="registro-de-cuenta" element={<SignUp />} />
					<Route path="inicio-de-sesion" element={<LogIn />} />

					<Route path="kanbanize-lite" /* element={<Layout />} */>
						<Route
							index
							path="pagina-principal"
							element={
								<ProtectedRoute>
									<Home />
								</ProtectedRoute>
							}
						/>

						<Route
							path="board/:boardId"
							element={
								<ProtectedRoute>
									<Board />
								</ProtectedRoute>
							}
						/>
					</Route>
					{/* <Route path="*" element={<PageNotFound />} /> */}
				</Routes>
			</BrowserRouter>
		</>
	);
}

export default AppRouter;
