import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AddBook from "./AddBook";
import AddAuthor from "./AddAuthor";

const Sidebar = ({ setData }) => {
  const [addBook, setAddBook] = useState(false);
  const [addAuthor, setAddAuthor] = useState(false);
  const navigate = useNavigate();
  const handleAddBook = () => {
    setAddBook(!addBook);
  };
  const handleAddAuthor = () => {
    setAddAuthor(!addAuthor);
  };
  return (
    <>
      {(addBook || addAuthor) && (
        <div className="popup">
          {addBook && <AddBook setAddBook={setAddBook} />}
          {addAuthor && (
            <AddAuthor setAddAuthor={setAddAuthor} />
          )}
        </div>
      )}
      <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark">
        <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
          <span
            onClick={() => navigate("/")}
            href="/"
            className="d-flex align-items-center pb-3 mb-md-0 me-md-auto text-white text-decoration-none"
          >
            <span className="fs-5 d-none d-sm-inline">Menu</span>
          </span>
          <ul
            className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start"
            id="menu"
          >
            <li className="nav-item active1">
              <span
                onClick={() => navigate("/")}
                className="nav-link align-middle px-0"
              >
                <span>🏠︎</span>
                <span className="ms-1 d-none d-sm-inline">HOME</span>
              </span>
            </li>
            <li>
              <span
                href="#"
                className="nav-link px-0 align-middle"
                onClick={() => navigate("/books")}
              >
                <span>📚</span>{" "}
                <span className="ms-1 d-none d-sm-inline">BOOKS</span>
              </span>
            </li>
            <li>
              <span
                className="nav-link px-0 align-middle"
                onClick={() => navigate("/authors")}
              >
                <span>✍🏻</span>{" "}
                <span className="ms-1 d-none d-sm-inline">AUTHORS</span>
              </span>
            </li>
            <li>
              <a
                href="#submenu2"
                data-bs-toggle="collapse"
                className="nav-link px-0 align-middle "
              >
                <span>➕</span>{" "}
                <span className="ms-1 d-none d-sm-inline">ADD</span>
              </a>
              <ul
                className="collapse nav flex-column ms-1"
                id="submenu2"
                data-bs-parent="#menu"
              >
                <li className="w-100">
                  <span
                    href="#"
                    className="nav-link px-0"
                    onClick={handleAddBook}
                  >
                    {" "}
                    <span className="d-none d-sm-inline">Add</span> Books
                  </span>
                </li>
                <li>
                  <span
                    href="#"
                    className="nav-link px-0"
                    onClick={handleAddAuthor}
                  >
                    {" "}
                    <span className="d-none d-sm-inline">Add</span> Authors
                  </span>
                </li>
              </ul>
            </li>
          </ul>
          <hr />
        </div>
      </div>
    </>
  );
};

export default Sidebar;
