import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useState } from "react";
import axios from "axios";
import swal from "sweetalert";
function Inputform({
  value,
  setValue,
  setUsers,
  users,
  show,
  setShow,
  submitOperation,
  setSubmitOperation,
  fetchdata,
}) {
  // for modal box
  const [fullscreen, setFullscreen] = useState(true);

  function handleShow(breakpoint) {
    setFullscreen(breakpoint);
    setShow(true);
  }
  // modal box ends

  //reset button
  const handleReset = () => {
    setValue({
      firstName: "",
      lastName: "",
      gender: "Default",
      name: "",
      relationship: "",
      city: "",
      hospitalPreference: "",
      insuranceCompany: "",
      policyNumber: "",
      physianName: "",
      phoneNumber: "",
      homePhone: "",
      workPhone: "",
      address: "",
      allerGies: "",
      birthday: "",
      state: "",
      country: "",
    });
  };

  const isValid = (user) => {
    if (user.firstName === "" && user.lastName === "") {
      return false;
    }
    return true;
  };

  const addUser = (userData) => {
    axios
      .post("http://localhost:4000/setUser", {
        userData,
      })
      .then(function (res) {
        console.log(res);
        setUsers((preValue) => [...preValue, res.data]);
      })
      .catch(function (err) {
        console.log(err);
        swal("Oops!", "Something went wrong!", "error");
      });
  };

  const updateUser = (userData) => {
    axios
      .put(`http://localhost:4000/updateData/${userData._id}`, {
        userData,
      })
      .then(function (res) {
        console.log(res);
        fetchdata();
      })
      .catch(function (err) {
        console.log(err);
        swal("Oops!", "Something went wrong!", "error");
      });
  };

  let handleClickSubmit = (e) => {
    e.preventDefault();
    if (!isValid(value)) {
      // console.log("isvalid");
      swal("Oops!", "Please Fill The Form Correctly!", "error");
      return;
    }
    if (submitOperation === "add") {
      addUser(value);
    } else if (submitOperation === "update") {
      updateUser(value);
    }
    setShow(false);
  };

  return (
    <>
      {/* modal box */}
      <Button
        className="me-2 mb-2"
        onClick={() => {
          handleShow(true);
          setSubmitOperation("add");
        }}
      >
        Add New User
      </Button>
      <Modal show={show} fullscreen={fullscreen} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add New User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={(e) => handleClickSubmit(e)}>
            <div className="alert alert-danger">
              <p>
                <strong>Emergency Contact info</strong>
              </p>
            </div>
            <div className="row">
              <div className="col-md-2">
                <label htmlFor="firstName">First Name</label>
              </div>
              <div className="col-md-4 ">
                <input
                  type="text"
                  name="firstName"
                  className="form-control"
                  value={value.firstName}
                  onChange={(e) => {
                    setValue((preVal) => ({
                      ...preVal,
                      firstName: e.target.value,
                    }));
                  }}
                  id="firstName"
                  placeholder="First Name"
                />
              </div>
              <div className="col-md-2">
                <p htmlFor="firstName">
                  <u>Emergency Contact Info</u>
                </p>
              </div>
            </div>
            <br />

            {/* second Row */}
            <div className="row">
              <div className="col-md-2">
                <label htmlFor="lastName">Last Name</label>
              </div>
              <div className="col-md-4 ">
                <input
                  type="text"
                  name="lastName"
                  className="form-control"
                  value={value.lastName}
                  onChange={(e) => {
                    setValue((preVal) => {
                      return { ...preVal, lastName: e.target.value };
                    });
                  }}
                  id="lastName"
                  placeholder="Last Name"
                />
              </div>
              <div className="col-md-2">
                <label htmlFor="name">Name</label>
              </div>
              <div className="col-md-3 ">
                <input
                  value={value.name}
                  onChange={(e) => {
                    setValue((preVal) => {
                      return { ...preVal, name: e.target.value };
                    });
                  }}
                  type="text"
                  className="form-control"
                  id="name"
                  placeholder="Name"
                />
              </div>
            </div>
            <br />
            {/* third Row */}
            <div className="row">
              <div className="col-md-2">
                <label htmlFor="lastName">Gender</label>
              </div>
              <div className="col-md-4 ">
                <select
                  value={value.gender}
                  onChange={(e) => {
                    setValue((preVal) => ({
                      ...preVal,
                      gender: e.target.value,
                    }));
                  }}
                  className="form-select"
                >
                  <option value="Default" disabled>
                    -Select Gender-
                  </option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Others">Other</option>
                </select>
              </div>
              <div className="col-md-2">
                <label htmlFor="relationShip">Relationship</label>
              </div>
              <div className="col-md-3 ">
                <input
                  type="text"
                  value={value.relationship}
                  onChange={(e) => {
                    setValue((preVal) => {
                      return { ...preVal, relationship: e.target.value };
                    });
                  }}
                  className="form-control"
                  id="relationShip"
                  placeholder="Enter Relationship"
                />
              </div>
            </div>
            <br />
            {/* fourth Row */}
            <div className="row">
              <div className="col-md-2">
                <label htmlFor="lastName">Date of Birth</label>
              </div>
              <div className="col-md-4 ">
                <input
                  value={value.birthday}
                  onChange={(e) => {
                    setValue((preVal) => {
                      return { ...preVal, birthday: e.target.value };
                    });
                  }}
                  className="form-control"
                  type="date"
                  id="birthday"
                  name="birthday"
                ></input>
              </div>
              <div className="col-md-2">
                <label htmlFor="relationShip">Address</label>
              </div>
              <div className="col-md-3 ">
                <div className="form-group">
                  <textarea
                    value={value.address}
                    onChange={(e) => {
                      setValue((preVal) => {
                        return { ...preVal, address: e.target.value };
                      });
                    }}
                    className="form-control"
                    id="exampleFormControlTextarea3"
                    rows="5"
                  ></textarea>
                </div>
              </div>
            </div>
            <br />
            {/* fifth Row */}
            <div className="row">
              <div className="col-md-2">
                <p htmlFor="firstName">
                  <u>Medical Information</u>
                </p>
              </div>
            </div>
            {/* sixth row */}
            <div className="row">
              <div className="col-md-2">
                <label htmlFor="lastName">Hospital Preference</label>
              </div>
              <div className="col-md-4 ">
                <input
                  type="text"
                  value={value.hospitalPreference}
                  onChange={(e) => {
                    setValue((preVal) => {
                      return { ...preVal, hospitalPreference: e.target.value };
                    });
                  }}
                  className="form-control"
                  id="hospitalPreference"
                  placeholder="Hospital Preference"
                />
              </div>
              <div className="col-md-2">
                <label htmlFor="relationShip">City</label>
              </div>
              <div className="col-md-3 ">
                <input
                  type="text"
                  className="form-control"
                  value={value.city}
                  onChange={(e) => {
                    setValue((preVal) => {
                      return { ...preVal, city: e.target.value };
                    });
                  }}
                  id="city"
                  placeholder="City"
                />
              </div>
            </div>
            {/* seventh row */}
            <div className="row">
              <div className="col-md-2">
                <label htmlFor="insuranceCompany">Insurance Company</label>
              </div>
              <div className="col-md-4 ">
                <input
                  value={value.insuranceCompany}
                  onChange={(e) => {
                    setValue((preVal) => {
                      return { ...preVal, insuranceCompany: e.target.value };
                    });
                  }}
                  type="text"
                  className="form-control"
                  id="insuranceCompany"
                  placeholder="Insurance Company"
                />
              </div>
              <div className="col-md-2">
                <label htmlFor="state">State</label>
              </div>
              <div className="col-md-3 ">
                <select
                  className="form-select"
                  value={value.state}
                  onChange={(e) => {
                    setValue((preVal) => {
                      return { ...preVal, state: e.target.value };
                    });
                  }}
                >
                  <option value="selectState">-Select-</option>
                  <option value="WestBengal">West Bengal</option>
                  <option value="Odissa">Odissa</option>
                  <option value="">Other</option>
                </select>
              </div>
            </div>
            {/* eight seventh */}
            <div className="row">
              <div className="col-md-2">
                <label htmlFor="policyNumber">Policy Number</label>
              </div>
              <div className="col-md-4 ">
                <input
                  value={value.policyNumber}
                  onChange={(e) => {
                    setValue((preVal) => {
                      return { ...preVal, policyNumber: e.target.value };
                    });
                  }}
                  type="number"
                  className="form-control"
                  id="policyNumber"
                  placeholder="Policy Number"
                />
              </div>
              <div className="col-md-2">
                <label htmlFor="country">Country</label>
              </div>
              <div className="col-md-3 ">
                <select
                  className="form-select"
                  value={value.country}
                  onChange={(e) => {
                    setValue((preVal) => {
                      return { ...preVal, country: e.target.value };
                    });
                  }}
                >
                  <option value="-Select Country-">-Select-</option>
                  <option value="Ind">India</option>
                  <option value="Aus">Australia</option>
                  <option value="">Other</option>
                </select>
              </div>
            </div>
            <br />
            {/* ningth row */}
            <div className="row">
              <div className="col-md-2">
                <label htmlFor="physianName">Physian's Name</label>
              </div>
              <div className="col-md-4 ">
                <input
                  value={value.physianName}
                  onChange={(e) => {
                    setValue((preVal) => {
                      return { ...preVal, physianName: e.target.value };
                    });
                  }}
                  type="text"
                  className="form-control"
                  id="physianName"
                  placeholder="Physian's Name"
                />
              </div>
              <div className="col-md-2">
                <label htmlFor="state">Home Phone</label>
              </div>
              <div className="col-md-3 ">
                <input
                  value={value.homePhone}
                  onChange={(e) => {
                    setValue((preVal) => {
                      return { ...preVal, homePhone: e.target.value };
                    });
                  }}
                  type="number"
                  className="form-control"
                  id="homePhone"
                  placeholder="Home Phone"
                />
              </div>
            </div>
            {/* tenth row*/}
            <div className="row">
              <div className="col-md-2">
                <label htmlFor="phoneNumber">Phone Number</label>
              </div>
              <div className="col-md-4 ">
                <input
                  type="number"
                  className="form-control"
                  value={value.phoneNumber}
                  onChange={(e) => {
                    setValue((preVal) => {
                      return { ...preVal, phoneNumber: e.target.value };
                    });
                  }}
                  id="phoneNumber"
                  placeholder="Phone Number"
                />
              </div>
              <div className="col-md-2">
                <label htmlFor="workphone">Work Phone</label>
              </div>
              <div className="col-md-3 ">
                <input
                  value={value.workPhone}
                  onChange={(e) => {
                    setValue((preVal) => {
                      return { ...preVal, workPhone: e.target.value };
                    });
                  }}
                  type="number"
                  className="form-control"
                  id="homePhone"
                  placeholder="Work Phone"
                />
              </div>
            </div>
            <br />
            {/* eleventh row */}
            <div className="row">
              <div className="col-md-2">
                <label htmlFor="relationShip">Allergies(if any)</label>
              </div>
              <div className="col-md-3 ">
                <div className="form-group">
                  <textarea
                    value={value.allerGies}
                    onChange={(e) => {
                      setValue((preVal) => {
                        return { ...preVal, allerGies: e.target.value };
                      });
                    }}
                    className="form-control"
                    id="exampleFormControlTextarea3"
                    rows="5"
                  ></textarea>
                </div>
              </div>
            </div>
            {/* twelfth row */}
            <div className="row">
              <div className="col-md">
                <button type="submit" className="btn btn-primary btn">
                  Submit
                </button>
                <button
                  type="button"
                  onClick={handleReset}
                  className="btn btn-primary btn btn-2"
                >
                  Reset
                </button>
              </div>
            </div>
          </form>
        </Modal.Body>
      </Modal>
      {/* modal end */}
    </>
  );
}

export default Inputform;
