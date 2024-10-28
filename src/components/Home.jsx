import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="container-fluid">
      <div className="row flex-nowrap">
        <Sidebar />
        <div className="col py-3">
          <div>
            <h1>Click below to Navigate</h1>
            <button
              className="btn-primary m-5"
              color="primary"
              variant="contained"
              onClick={() => navigate("/books")}
            >
              Books
            </button>
            <button
              className="btn-primary"
              color="primary"
              variant="contained"
              onClick={() => navigate("/authors")}
            >
              Authors
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
