import { BrowserRouter, Route, Routes } from "react-router-dom";

import ProtectedRoute from '../components/ProtectedRoute';
import LogIn from "../pages/LogIn";
import SignUp from "../pages/SignUp";
import Start from "../pages/Start";
/* import Layout from '../components/Layout'; */
import Board from "../pages/Board";
import Home from "../pages/Home";
import PageNotFound from "../pages/PageNotFound";

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
					<Route path="*" element={<PageNotFound />} />
				</Routes>
			</BrowserRouter>
		</>
	);
}

export default AppRouter;
