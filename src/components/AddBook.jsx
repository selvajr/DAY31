import React, { useState } from "react";
import { useFormik } from "formik";
// using yup for validations
import * as yup from "yup";
import axios from "axios";
const url = "https://66685eb2f53957909ff7bcd9.mockapi.io/books";

const AddBook = ({ setAddBook }) => {
  const [data, setData] = useState([]);
  // get Data
  const getData = () => {
    axios.get(url).then((res) => {
      setData(res.data);
    });
  };
  const formValidationFormik = yup.object({
    title: yup
      .string()
      .min(5, "Atleast 5 characters")
      .max(15, "Maximum 15 characters allowed")
      .required("Required"),
    isbn: yup
      .number()
      .required("Required")
      .min(1000000000, "ISBN should have 10 digits")
      .max(9999999999, "Invalid ISBN"),
    publishDate: yup.date().required("Required"),
    author: yup
      .string()
      .min(3, "Atleast 3 characters")
      .max(15, "Maximum 15 characters allowed")
      .required("Required"),
  });
  const formik = useFormik({
    initialValues: {
      title: "",
      isbn: "",
      publishDate: "",
      author: "",
    },
    validationSchema: formValidationFormik,
    onSubmit: (values) => {
      axios.post(url, values, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      getData();
      formik.values.title = "";
      formik.values.isbn = "";
      formik.values.publishDate = "";
      formik.values.author = "";
      setAddBook(false);
    },
  });
  const handleCancel = () => {
    setAddBook(false);
    formik.values.title = "";
    formik.values.isbn = "";
    formik.values.publishDate = "";
    formik.values.author = "";
  };

  return (
    <>
      <div className="containers">
        <button className="btn-x" onClick={handleCancel}>
          ❌
        </button>
        <form onSubmit={formik.handleSubmit}>
          <div className="row">
            {/* title */}
            <div>
              <strong htmlFor="title" className="text-primary gapmy">
                Title
              </strong>
              <input
                type="text"
                className="form-control m-2 input"
                name="title"
                id=""
                value={formik.values.title}
                placeholder="Enter title"
                onChange={formik.handleChange}
                onBlur={formik.handleChange}
              />
              <small className="form-text text-muted gapmy">
                {formik.errors.title}
              </small>
            </div>
            {/* author */}
            <div>
              <strong htmlFor="author" className="text-primary gapmy">
                Author
              </strong>
              <input
                type="text"
                className="form-control m-2  input"
                name="author"
                id=""
                value={formik.values.author}
                placeholder="Enter author name"
                onChange={formik.handleChange}
                onBlur={formik.handleChange}
              />
              <small className="form-text text-muted gapmy gapmy">
                {formik.errors.author}
              </small>
            </div>
          </div>
          <div className="row">
            {/* isbn */}
            <div>
              <strong htmlFor="isbn" className="text-primary gapmy">
                ISBN
              </strong>
              <input
                type="number"
                className="form-control m-2  input"
                name="isbn"
                id=""
                value={formik.values.isbn}
                placeholder="Enter isbn number"
                onChange={formik.handleChange}
                onBlur={formik.handleChange}
              />
              <small className="form-text text-muted gapmy">
                {formik.errors.isbn}
              </small>
            </div>
            {/* publishDate */}
            <div>
              <strong htmlFor="publishDate" className="text-primary gapmy">
                Publilsh Date
              </strong>
              <input
                type="date"
                className="form-control m-2 input"
                name="publishDate"
                id=""
                value={formik.values.publishDate}
                placeholder="Enter publish date"
                onChange={formik.handleChange}
                onBlur={formik.handleChange}
              />
              <small className="form-text text-muted gapmy">
                {formik.errors.publishDate}
              </small>
            </div>
          </div>
          <button className="btn btn-primary m-1 gapmy" type="submit" value="">
            Add Book
          </button>
        </form>
      </div>
    </>
  );
};

export default AddBook;
