import "./App.css";
import "./index.css";
import Form from "./components/Form";
import { useState } from "react";
import Table from "./components/Table";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

function App() {
  const [value, setValue] = useState({
    firstName: "",
    lastName: "",
    gender: "Default",
    city: "",
    phoneNumber: "",
    name: "",
    relationship: "",
    hospitalPreference: "",
    insuranceCompany: "",
    policyNumber: "",
    physianName: "",
    homePhone: "",
    workPhone: "",
    address: "",
    allerGies: "",
    birthday: "",
    state: "",
    country: "",
  });
  const [users, setUsers] = useState([]);
  const [show, setShow] = useState(false);
  const [submitOperation, setSubmitOperation] = useState("add");
  const fetchdata = async () => {
    const result = await axios.get("http://localhost:4000/showData");
    setUsers(result.data.outPut);
  };
  return (
    <div className="App">
      <Form
        value={value}
        setValue={setValue}
        users={users}
        setUsers={setUsers}
        show={show}
        setShow={setShow}
        submitOperation={submitOperation}
        setSubmitOperation={setSubmitOperation}
        fetchdata={fetchdata}
      />
      <Table
        users={users}
        setUsers={setUsers}
        setShow={setShow}
        setValue={setValue}
        setSubmitOperation={setSubmitOperation}
        fetchdata={fetchdata}
      />
    </div>
  );
}

export default App;
