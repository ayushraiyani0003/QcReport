import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./Componant/Login";
import Dashboard from "./feature/dashboard/page/Dashboard";
import ISReport from "./feature/ISReport/ISReport";
import FIReport from "./feature/FIReport/FIReport";
import UserList from "./feature/userList/pages/UserList";
import Setting from "./Componant/setting";
import ErrorPage from "./components/errorpage";

import MainLayout from "./Layout/MainLayout";
import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login />} />

                <Route
                    path="/"
                    element={
                        <ProtectedRoute>
                            <MainLayout />
                        </ProtectedRoute>
                    }
                >
                    <Route index element={<Dashboard />} />
                    <Route path="dashboard" element={<Dashboard />} />
                    <Route path="fi-report" element={<FIReport />} />
                    <Route path="userlist" element={<UserList />} />
                    <Route path="settings" element={<Setting />} />
                    <Route path="is-report" element={<ISReport />} />
                    <Route path="*" element={<ErrorPage />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
};

export default App;
