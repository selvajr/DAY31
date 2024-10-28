import React, { useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
const url = "https://66685eb2f53957909ff7bcd9.mockapi.io/authors";

const AddAuthor = ({ setAddAuthor }) => {
  const [data, setData] = useState([]);
  // get Data
  const getData = () => {
    axios.get(url).then((res) => setData(res.data));
  };
  const formValidationFormik = yup.object({
    name: yup
      .string()
      .min(5, "Atleast 5 characters")
      .max(15, "Maximum 15 characters allowed")
      .required("Required"),
    born: yup.date().required("Required"),
    bio: yup
      .string()
      .min(3, "Atleast 3 characters")
      .max(100, "Maximum 100 characters allowed")
      .required("Required"),
  });
  const formik = useFormik({
    initialValues: {
      name: "",
      born: "",
      bio: "",
    },
    validationSchema: formValidationFormik,
    onSubmit: (values) => {
      axios.post(url, values, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      getData();
      formik.values.bio = "";
      formik.values.born = "";
      formik.values.name = "";
      setAddAuthor(false);
    },
  });

  const handleCancel = () => {
    formik.values.bio = "";
    formik.values.born = "";
    formik.values.name = "";
    setAddAuthor(false);
  };
  return (
    <>
      <div className="containers">
        <button className="btn-x" onClick={handleCancel}>
          ❌
        </button>
        <form onSubmit={formik.handleSubmit}>
          <div className="row">
            {/* author name */}
            <div className="form-group col m-1">
              <label htmlFor="name" className="text-primary gapmy">
                Author name
              </label>
              <input
                type="text"
                className="form-control m-2 input"
                name="name"
                id=""
                value={formik.values.name}
                placeholder="Enter name"
                onChange={formik.handleChange}
                onBlur={formik.handleChange}
              />
              <small className="form-text text-muted gapmy">
                {formik.errors.name}
              </small>
            </div>
            <div className="row">
              {/* author bio */}
              <div className="form-group col m-1">
                <label htmlFor="bio" className="text-primary gapmy">
                  Bio
                </label>
                <input
                  type="text"
                  className="form-control m-2 input"
                  name="bio"
                  id=""
                  value={formik.values.bio}
                  placeholder="Enter bio"
                  onChange={formik.handleChange}
                  onBlur={formik.handleChange}
                />
                <small className="form-text text-muted gapmy">
                  {formik.errors.bio}
                </small>
              </div>
            </div>
          </div>
          <div className="row">
            {/* author born */}

            <div className="form-group col m-1">
              <label htmlFor="born" className="text-primary gapmy ">
                Author DOB
              </label>
              <input
                type="date"
                className="form-control m-2 input "
                name="born"
                id=""
                value={formik.values.born}
                placeholder="Enter DOB"
                onChange={formik.handleChange}
                onBlur={formik.handleChange}
              />
              <small className="form-text text-muted gapmy">
                {formik.errors.born}
              </small>
            </div>
          </div>
          <input
            className="btn btn-primary m-1 gapmy"
            type="submit"
            value="Add Author"
          />
        </form>
      </div>
    </>
  );
};

export default AddAuthor;
