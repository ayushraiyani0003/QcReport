import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Dashbord from "./Componant/Dashboard";
import Login from "./Componant/Login";
import BlankReport from "./Componant/BlankReport";
import UserList from "./Componant/userlist";
import Setting from "./Componant/setting";
import Header from "./Componant/Header";
import ReportForm from "./Componant/blankreport2";
import TableComponent from "./Componant/table";


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashbord />} />
        <Route path="/blank-report" element={<BlankReport />} />
        <Route path="/userlist" element={<UserList />} />
        <Route path="/setting" element={<Setting />} />
        <Route path="/header" element={<Header />} />
        <Route path="/blankreport2" element={<ReportForm />} />
        <Route path ="/table" element={<TableComponent/>}/>
      </Routes>
    </BrowserRouter>
  );
}
