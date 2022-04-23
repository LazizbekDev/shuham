import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./screens/Dashboard";
import Ticket from "./screens/Ticket";

export const App = () => {

    return (
        <div className="app">
            <Router>
                <Routes>
                    <Route path={'/'} element={<Dashboard />} />
                    <Route path={'/yangi'} element={<Ticket />} />
                    <Route path={'/shu/:id'} element={<Ticket editMode={true} />} />
                </Routes>
            </Router>
        </div>
    );
}