import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import * as yup from "yup";

const AuthorCard = ({ url, data, id, setData, bio, born, name }) => {
  const [edit, setEdit] = useState(false);
  // get Data
  const getData = () => {
    axios.get(url).then((res) => setData(res.data));
  };
  // delete
  const handleDelete = (id) => {
    axios.delete(`${url}/${id}`);
    getData();
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
      name: name,
      born: born,
      bio: bio,
    },
    validationSchema: formValidationFormik,
    onSubmit: (values) => {
      axios.put(`${url}/${id}`, values, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      getData();
      setEdit(false);
    },
  });

  const handleCancel = () => {
    setEdit(false);
  };
  const handleEdit = (id) => {
    setEdit(!edit);
  };
  return (
    <>
      {edit && (
        <div className="popupEdit">
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
                value="Update Author"
              />
            </form>
          </div>
        </div>
      )}
      <div className="card m-1" style={{ width: "15rem" }}>
        <div className="card-body">
          <h4 className="card-title">
            {name}
          </h4>
          <h6 className="card-title">
            { born
            }
          </h6>
          <p className="card-text" style={{ height: "6rem", overflow: "auto" }}>
            {
              bio
            }
          </p>
        </div>
        <div className="card-body">
          <button
            className="card-link btn btn-warning"
            onClick={() => handleEdit(id)}
          >
            Edit
          </button>
          <button
            className="card-link btn btn-danger"
            onClick={() => handleDelete(id)}
            type="submit"
          >
            Delete
          </button>
        </div>
      </div>
    </>
  );
};

export default AuthorCard;
