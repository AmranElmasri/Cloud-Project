import Sidebar from "./components/Sidebar/Sidebar";
import { Routes, Route, Navigate } from "react-router-dom";
import { GetForm, InsertForm, ListKeys } from "./pages";
 

function App() {
  return (
    <Sidebar>
      <Routes>
        <Route path="/" element={<Navigate to="insertImage" />} />
        <Route path="/insertImage" element={<InsertForm />} />
        <Route path="/getImage" element={<GetForm />} />
        <Route path="/listKeys" element={<ListKeys />} />
      </Routes>
    </Sidebar>
  );
}

export default App;
