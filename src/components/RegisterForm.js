import React, { useState, useRef, createRef } from "react";
import { fetchReq } from "../utils/utils";
import { placeholder } from "../asset/placeholder";

const allFields = [
  "firstname",
  "lastname",
  "email",
  "password",
  "confirmPassword",
  "phone",
];

const RegisterForm = (props) => {
  let Refs = useRef([]);

  Refs.current = allFields.map(
    (ref, index) => (Refs.current[index] = createRef())
  );
  const [errors, setErrors] = useState({});

  const handleRegister = (e) => {
    const { registerCallback } = props;

    e.preventDefault();

    const firstname = Refs.current[0].current.value;
    const lastname = Refs.current[1].current.value;
    const email = Refs.current[2].current.value;
    const password = Refs.current[3].current.value;
    const confirmPassword = Refs.current[4].current.value;
    const phone = Refs.current[5].current.value;

    // console.log("1->", password.current.value)
    // console.log("2->", confirmPassword.current.value)

    if (validate(password, confirmPassword)) {
      fetchReq("/api/signup", {
        body: JSON.stringify({
          firstname: firstname,
          lastname: lastname,
          email: email,
          password: password,
          phone: phone,
          role: "expert",
        }),
      })
        .then((data) => {
          registerCallback(data);
        })
        .catch((msg) => {
          alert(msg);
        });
    }
  };

  const validate = (p, cP) => {
    let errors = {};
    let isValid = true;

    if (!p.current.value) {
      isValid = false;
      errors["password"] = "Please enter your password.";
    }

    if (!cP.current.value) {
      isValid = false;
      errors["confirmPassword"] = "Please enter your confirm password.";
    }

    if (
      typeof p.current.value !== "undefined" &&
      typeof cP.current.value !== "undefined"
    ) {
      if (p.current.value !== cP.current.value) {
        isValid = false;
        errors["password"] = "Passwords don't match.";
      }
    }
    setErrors(errors);

    return isValid;
  };

  const showPass = () => {
    const x = document.getElementById("inputPassword4");
    if (x.type === "password") {
      x.type = "text";
    } else {
      x.type = "password";
    }
  };

  return (
    <form className="registerLogin-form" onSubmit={handleRegister}>
      <div className="form-row">
        <div className="col">
          <label>First name</label>
          <input
            type="text"
            className="form-control"
            placeholder={placeholder.first_name}
            ref={Refs.current[0]}
            required
          />
        </div>
        <div className="col">
          <label>Last name</label>
          <input
            type="text"
            className="form-control"
            placeholder={placeholder.last_name}
            ref={Refs.current[1]}
            required
          />
        </div>
      </div>
      <div className="form-row">
        <div className="form-group col-md-12">
          <label>Email</label>
          <input
            type="email"
            className="form-control"
            id="inputEmail4"
            placeholder={placeholder.email}
            ref={Refs.current[2]}
            required
          />
        </div>
      </div>
      <div className="form-row">
        <div className="form-group col-md-6">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            id="inputPassword4"
            placeholder="******"
            ref={Refs.current[3]}
            required
          />
          <div className="text-danger">{errors.password}</div>
          <input
            style={{ marginTop: "5%" }}
            type="checkbox"
            onClick={showPass}
          />
          &nbsp;Show Password
        </div>
        <div className="form-group col-md-6">
          <label>Confirm Password</label>
          <input
            type="password"
            className="form-control"
            id="confirmPassword"
            placeholder="******"
            ref={Refs.current[4]}
            required
          />
          <div className="text-danger">{errors.confirmPassword}</div>
        </div>
      </div>
      <div className="form-group">
        <div className="form-group">
          <label>Phone number</label>
          <input
            type="tel"
            className="form-control"
            id="inputPhoneNumber"
            placeholder={placeholder.phone_no}
            ref={Refs.current[5]}
            required
          />
        </div>
      </div>

      <button
        type="submit"
        style={{ maxWidth: "inherit" }}
        className="apply-btn create_btn"
      >
        {" "}
        {props.confirmButtonText}{" "}
      </button>
    </form>
  );
};

export default RegisterForm;
