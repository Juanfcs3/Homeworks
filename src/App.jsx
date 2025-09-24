import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import LinkedListPage from "./pages/LinkedListPage";
import DoubleLinkedListPage from "./pages/DoubleLinkedListPage";

export default function App() {
	return (
		<Router>
			<header style={{ padding: 12, background: "#222", color: "white" }}>
				<nav style={{ display: "flex", gap: 12 }}>
					<Link style={{ color: "white" }} to="/linked">1- Linked List</Link>
					<Link style={{ color: "white" }} to="/double">2- Double Linked List</Link>
				</nav>
			</header>

			<main style={{ padding: 20 }}>
				<Routes>
					<Route path="/" element={<div>Seleccione para que se vea</div>} />
					<Route path="/linked" element={<LinkedListPage />} />
					<Route path="/double" element={<DoubleLinkedListPage />} />
				</Routes>
			</main>
		</Router>
	);
}
