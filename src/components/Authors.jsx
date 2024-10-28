import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthorCard from "./AuthorCard";
import axios from "axios";
import Sidebar from "./Sidebar";

const Authors = () => {
  const navigate = useNavigate();
  const [addauthor, setAuthor] = useState(false);
  const [data, setData] = useState([]);
  const url = "https://66685eb2f53957909ff7bcd9.mockapi.io/authors";
  // get Data
  const getData = () => {
    axios.get(url).then((res) => {
      setData(res.data);
    });
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <>
      <div className="container-fluid">
        <div className="row flex-nowrap">
          <Sidebar setData={setData} />
          <div className="col py-3 " style={{ width: "100%", height: "50px" }}>
            <div className="cardArea d-flex flex-wrap gap-4 m-3 ">
              {data.map((e, i) => (
                <AuthorCard
                  key={i}
                  url={url}
                  {...e}
                  data={data}
                  setData={setData}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Authors;
