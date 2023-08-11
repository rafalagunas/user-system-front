import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBInput,
} from "mdb-react-ui-kit";

import axios from "axios";
import "./admin.css";

const Admin = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    isAdmin: true,
  });
  const navigate = useNavigate();

  const onLogin = async (e, data) => {
    e.preventDefault();
    console.log(data);
    if (formData.username != "" || formData.password != "") {
      let response = await axios
        .post(
          "http://localhost:8080/user/admin",
          { ...data },
          {
            headers: {
              "Content-type": "application/json; charset=UTF-8",
            },
          }
        )
        .then((response) => {
          return response.data;
        })
        .catch((err) => {
          let status = err.toJSON().status;
          if (status === 400) {
            alert("You are not an Administrator");
          }
        });

      if (response) {
        console.log(response);
        alert(JSON.stringify(response.users));
        // navigate(`/update_profile/`, { state: { username: data.username } });
      }
    } else {
      alert("Please enter a username/password");
    }
  };

  return (
    <MDBContainer style={{ paddingTop: "80px" }} className="my-5 gradient-form">
      <MDBRow>
        <MDBCol col="6" className="mb-5">
          <div className="d-flex flex-column ms-5">
            <div className="text-center">
              <img
                src="https://lever-client-logos.s3.us-west-2.amazonaws.com/d17fb03b-b286-4901-a97e-4dd1ce570019-1684802786612.png"
                style={{ width: "305px" }}
                alt="logo"
              />
            </div>

            <div style={{ marginTop: "50px" }}>
              <p>Register your account</p>
              <MDBInput
                wrapperClass="mb-4"
                label="username/email"
                id="form1"
                type="email"
                onChange={(e) => {
                  setFormData({ ...formData, username: e.target.value });
                }}
                value={formData.username}
              />
              <MDBInput
                wrapperClass="mb-4"
                label="Password"
                id="form2"
                type="password"
                onChange={(e) => {
                  setFormData({ ...formData, password: e.target.value });
                  console.log(formData);
                }}
                value={formData.password}
              />

              <div className="text-center pt-1 mb-5 pb-1">
                <MDBBtn
                  onClick={(e) => {
                    onLogin(e, formData);
                  }}
                  className="mb-4 w-100 gradient-custom-2"
                >
                  Login
                </MDBBtn>
              </div>
            </div>
          </div>
        </MDBCol>

        <MDBCol col="6" className="mb-5">
          <div className="d-flex flex-column  justify-content-center gradient-custom-2 h-100 mb-4">
            <div className="text-white px-3 py-4 p-md-5 mx-md-4">
              <h4 className="mb-4">We are more than just a company</h4>
              <p className="small mb-0">
                Nearshore staff augmentation & product development
              </p>
            </div>
          </div>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};

export default Admin;
