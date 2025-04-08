import { useState } from "react";
import "./App.css";
import { Container, Row, Col, Table } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  let [FormData, setFormData] = useState({
    uname: "",
    uemail: "",
    uphone: "",
    umessage: "",
    index: "",
  });

  let [userData, setUserData] = useState([]);

  let getvalue = (event) => {
    let oldData = { ...FormData };
    let inputName = event.target.name;
    let inputValue = event.target.value;
    oldData[inputName] = inputValue;
    setFormData(oldData);
  };

  let handlesubmit = (event) => {
    event.preventDefault();

    let currentUserFormdata = {
      uname: FormData.uname,
      uemail: FormData.uemail,
      uphone: FormData.uphone,
      umessage: FormData.umessage,
    };

    let cheakFilterUser = userData.filter(
      (v) => v.uemail === FormData.uemail || v.uphone === FormData.uphone
    );

    if (cheakFilterUser.length === 1) {
      toast.error("Email or phone number already exists!");
    } else {
      let olduserdata = [...userData, currentUserFormdata];
      setUserData(olduserdata);
      setFormData({
        uname: "",
        uemail: "",
        uphone: "",
        umessage: "",
        index: "",
      });
      toast.success("Form submitted successfully!");
    }
  };

  let deleteRow = (index) => {
    let filterdataafterdelete = userData.filter((v, i) => i !== index);
    setUserData(filterdataafterdelete);
    toast.info("Row deleted");
  };

  return (
    <Container fluid>
      <ToastContainer />
      <Container>
        <Row>
          <Col className="text-center py-5">
            <h1>Enquiry Now</h1>
          </Col>
        </Row>
        <Row>
          <Col lg={5}>
            <div className="App">
              <form onSubmit={handlesubmit}>
                <div className="text-start my-3">
                  <label>UserName</label>
                  <input
                    type="text"
                    onChange={getvalue}
                    value={FormData.uname}
                    name="uname"
                    className="form-control"
                  />
                </div>

                <div className="text-start my-3">
                  <label>Email</label>
                  <input
                    type="email"
                    onChange={getvalue}
                    value={FormData.uemail}
                    name="uemail"
                    className="form-control"
                  />
                </div>

                <div className="text-start my-3">
                  <label>Phone No.</label>
                  <input
                    type="tel"
                    onChange={getvalue}
                    value={FormData.uphone}
                    name="uphone"
                    className="form-control"
                  />
                </div>

                <div className="text-start my-3">
                  <label>Message</label>
                  <textarea
                    name="umessage"
                    onChange={getvalue}
                    value={FormData.umessage}
                    className="form-control"
                    rows="4"
                  />
                </div>

                <div className="text-start my-3">
                  <button className="btn btn-primary" type="submit">
                    {FormData.index !== "" ? "Update" : "Save"}
                  </button>
                </div>
              </form>
            </div>
          </Col>
          <Col lg={7}>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Message</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {userData.length >= 1 ? (
                  userData.map((obj, i) => {
                    return (
                      <tr key={i}>
                        <td>{i + 1}</td>
                        <td>{obj.uname}</td>
                        <td>{obj.uemail}</td>
                        <td>{obj.uphone}</td>
                        <td>{obj.umessage}</td>
                        <td>
                          <button onClick={() => deleteRow(i)}>Delete</button>
                          <button>Edit</button>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan={6}>No Data Found</td>
                  </tr>
                )}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
    </Container>
  );
}

export default App;
