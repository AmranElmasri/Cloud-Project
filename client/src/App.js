import Sidebar from "./components/Sidebar/Sidebar";
import { Routes, Route, Navigate } from "react-router-dom";
import { ConfigureCache, GetForm, InsertForm, ListKeys, Statistics } from "./pages";
import axios from "axios";
 

function App() {


  // setInterval(async() => {
  //   await axios.get('/api/v1/update-statistics');
  //   console.log("object");
  // }, 300000);
  
  const fakeRequest = async() => {
    axios.get('/api/v1/update-statistics');
    console.log("object");
  }
  fakeRequest();


  return (
    <Sidebar>
      <Routes>
        <Route path="/" element={<Navigate to="insertImage" />} />
        <Route path="/insertImage" element={<InsertForm />} />
        <Route path="/getImage" element={<GetForm />} />
        <Route path="/listKeys" element={<ListKeys />} />
        <Route path="/mem-cache" element={<ConfigureCache/>} />
        <Route path="/statistics" element={<Statistics/>} />
      </Routes>
    </Sidebar>
  );
}

export default App;
