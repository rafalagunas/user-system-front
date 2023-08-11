import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBInput,
} from "mdb-react-ui-kit";

import axios from "axios";
import "./profile.css";

const UpdateProfile = () => {
  const { state } = useLocation();

  const [formData, setFormData] = useState({
    username: state.username || "",
    password: "",
    lastname: "",
    email: "",
    SSN: "",
    birthday: "",
    phone: "",
  });
  const [tokens, setTokens] = useState([]);

  useEffect(() => {
    const tokens = JSON.parse(localStorage.getItem("tokens"));
    if (tokens) {
      console.log(tokens);
      setTokens(tokens);
    }
  }, []);
  const navigate = useNavigate();

  const onUpdate = async (e, data) => {
    e.preventDefault();
    console.log(data);
    if (
      data.username != "" &&
      data.password != "" &&
      data.lastname != "" &&
      data.email != "" &&
      data.SSN != "" &&
      data.birthday != "" &&
      data.phone != ""
    ) {
      let response = await axios
        .post(
          "http://localhost:8080/user/add_information",
          { ...data },
          {
            headers: {
              "Content-type": "application/json; charset=UTF-8",
              Authorization: `Bearer ${tokens.accessToken}`,
            },
          }
        )
        .then((response) => {
          console.log(response.data);
          return response.data;
        })
        .catch((err) => {
          let status = err.toJSON().status;

          if (status == 404) {
            alert("invalid password");
          } else {
            alert("your token has expired, please login");
            navigate("/login");
          }
        });

      if (response) {
        alert(response.message);
      }
    } else {
      alert("Please enter a username/password");
    }
  };

  return (
    <MDBContainer style={{ paddingTop: "0px" }} className="my-5 gradient-form">
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
                label="username"
                id="form1"
                type="text"
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

              <MDBInput
                wrapperClass="mb-4"
                label="Lastname"
                id="form3"
                type="text"
                onChange={(e) => {
                  setFormData({ ...formData, lastname: e.target.value });
                  console.log(formData);
                }}
                value={formData.lastname}
              />

              <MDBInput
                wrapperClass="mb-4"
                label="email"
                id="form4"
                type="email"
                onChange={(e) => {
                  setFormData({ ...formData, email: e.target.value });
                  console.log(formData);
                }}
                value={formData.email}
              />

              <MDBInput
                wrapperClass="mb-4"
                label="SSN"
                id="form5"
                type="number"
                onChange={(e) => {
                  setFormData({ ...formData, SSN: e.target.value });
                  console.log(formData);
                }}
                value={formData.SSN}
              />
              <MDBInput
                wrapperClass="mb-4"
                label="Birthday"
                id="form6"
                type="date"
                onChange={(e) => {
                  setFormData({ ...formData, birthday: e.target.value });
                  console.log(formData);
                }}
                value={formData.birthday}
              />
              <MDBInput
                wrapperClass="mb-4"
                label="Phone"
                id="form7"
                type="tel"
                onChange={(e) => {
                  setFormData({ ...formData, phone: e.target.value });
                  console.log(formData);
                }}
                value={formData.phone}
              />
              <div className="text-center pt-1 mb-5 pb-1">
                <MDBBtn
                  onClick={(e) => {
                    onUpdate(e, formData);
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

export default UpdateProfile;
