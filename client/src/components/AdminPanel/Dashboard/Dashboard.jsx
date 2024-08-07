import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ScrollToTop } from "../../../ScrollTotop";
import ChartBox from "./../chartBox/ChartBox";
import { FaEye, FaHome, FaTree } from "react-icons/fa";
import BarChartBox from "./../barChartBox/BarChartBox";
import PieChartBox from "./../pieChartBox/PieChartBox";
import BigChartBox from "./../bigChartBox/BigChartBox";
import { TiTicket } from "react-icons/ti";
import { MdPendingActions } from "react-icons/md";
import { MdOutlineIncompleteCircle } from "react-icons/md";
import { FaCheckDouble } from "react-icons/fa";
import { FaArrowDownShortWide } from "react-icons/fa6";
import LoadingSpinner from "../../Pages/LoadingSpinner";
import { useDispatch, useSelector } from "react-redux";
import { loading } from "../../../context/userSlice";
import api from "../../../ApiInterceptor";
import { Link } from "react-router-dom";
import { BsBuildingFillAdd } from "react-icons/bs";
import { TbGrave } from "react-icons/tb";

function Dashboard() {
  const navigate = useNavigate();
  const isLoading = useSelector((state) => state.user.isLoading);
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const [recentHomes, setRecentHomes] = useState([]);
  const [totalhmes, setTotalHomes] = useState(0);
  const [totalBildings, setTotalBuildings] = useState(0);

  const [totalTrees, setTotalTrees] = useState(0);
  const [totalrelocated, setTotalRelocated] = useState(0);
  const [totalrelocatedgaves, setTotalRelocatedgraves] = useState(0);
  const [totalrelocatedbuildings, setTotalRelocatedbuildings] = useState(0);
  const [totalnotrelocatedgaves, setTotalNotRelocatedgraves] = useState(0);
  const [totalnotrelocatedbuildings, setTotalNotRelocatedbuildings] =
    useState(0);
  const [totalgraves, setTotalGraves] = useState(0);
  const [totalunrlocated, setTotalnrelocated] = useState(0);
  const [data, setData] = useState([]);

  //get recent tickets
  useEffect(() => {
    const recentHomes = async () => {
      try {
        const response = await api(user).get("/homesteads/recentHomes");
        setRecentHomes(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    recentHomes();
  }, []);

  const gethomesteadHistory = async () => {
    try {
      dispatch(loading(true)); // Set loading state to true before fetching data
      const { data } = await api(user).get(`/homesteads/fivemonths`);
      setData(data);
    } catch (error) {
      console.error(error);
    } finally {
      dispatch(loading(false)); // Set loading state to false after fetching data
    }
  };
  //get total homes
  const gettotalhmes = async () => {
    try {
      dispatch(loading(true)); // Set loading state to true before fetching data
      const { data } = await api(user).get("/homesteads/all");
      setTotalHomes(data);
    } catch (error) {
      console.error(error);
    } finally {
      dispatch(loading(false)); // Set loading state to false after fetching data
    }
  };

  //All ttrees
  const getTotalTrees = async () => {
    try {
      dispatch(loading(true)); // Set loading state to true before fetching data
      const { data } = await api(user).get(`/trees/all`);
      setTotalTrees(data);
    } catch (error) {
      console.error(error);
    } finally {
      dispatch(loading(false)); // Set loading state to false after fetching data
    }
  };
  //This week
  const getRelocatedHomes = async () => {
    try {
      dispatch(loading(true)); // Set loading state to true before fetching data
      const { data } = await api(user).get(`/homesteads/relocated`);
      setTotalRelocated(data);
    } catch (error) {
      console.error(error);
    } finally {
      dispatch(loading(false)); // Set loading state to false after fetching data
    }
  }; //T
  const getUnrelocatedHomes = async () => {
    try {
      dispatch(loading(true)); // Set loading state to true before fetching data
      const { data } = await api(user).get(`/homesteads/notrelocated/`);
      setTotalnrelocated(data);
    } catch (error) {
      console.error(error);
    } finally {
      dispatch(loading(false)); // Set loading state to false after fetching data
    }
  };
  const getRelocatedGraves = async () => {
    try {
      dispatch(loading(true)); // Set loading state to true before fetching data
      const { data } = await api(user).get(`/graves/relocated`);
      setTotalRelocatedgraves(data);
    } catch (error) {
      console.error(error);
    } finally {
      dispatch(loading(false)); // Set loading state to false after fetching data
    }
  }; //T
  const getUnrelocatedGraves = async () => {
    try {
      dispatch(loading(true)); // Set loading state to true before fetching data
      const { data } = await api(user).get(`/graves/notrelocated/`);
      setTotalNotRelocatedgraves(data);
    } catch (error) {
      console.error(error);
    } finally {
      dispatch(loading(false)); // Set loading state to false after fetching data
    }
  };
  const getRelocatedBuildings = async () => {
    try {
      dispatch(loading(true)); // Set loading state to true before fetching data
      const { data } = await api(user).get(`/buildings/relocated`);
      setTotalRelocatedbuildings(data);
    } catch (error) {
      console.error(error);
    } finally {
      dispatch(loading(false)); // Set loading state to false after fetching data
    }
  }; //T
  const getUnrelocatedBuildings = async () => {
    try {
      dispatch(loading(true)); // Set loading state to true before fetching data
      const { data } = await api(user).get(`/buildings/notrelocated/`);
      setTotalNotRelocatedbuildings(data);
    } catch (error) {
      console.error(error);
    } finally {
      dispatch(loading(false)); // Set loading state to false after fetching data
    }
  };

  const gettotalBuildings = async () => {
    try {
      dispatch(loading(true)); // Set loading state to true before fetching data
      const { data } = await api(user).get(`/buildings/all`);
      setTotalBuildings(data);
    } catch (error) {
      console.error(error);
    } finally {
      dispatch(loading(false)); // Set loading state to false after fetching data
    }
  };
  const getTotalGraves = async () => {
    try {
      dispatch(loading(true)); // Set loading state to true before fetching data
      const { data } = await api(user).get(`/graves/all`);
      setTotalGraves(data);
    } catch (error) {
      console.error(error);
    } finally {
      dispatch(loading(false)); // Set loading state to false after fetching data
    }
  };
  useEffect(() => {
    gethomesteadHistory();
    getRelocatedBuildings();
    getUnrelocatedBuildings();
    getRelocatedGraves();
    getUnrelocatedGraves();
  }, []);
  useEffect(() => {
    getUnrelocatedHomes();
  }, []);
  useEffect(() => {
    getRelocatedHomes();
  }, []);
  useEffect(() => {
    getTotalTrees();
  }, []);
  useEffect(() => {
    gettotalBuildings();
  }, []);
  useEffect(() => {
    getTotalGraves();
  }, []);
  useEffect(() => {
    gettotalhmes();
  }, []);

  const RecentHome = ({
    name,
    comment,
    time,
    ticketId,
    status,
    easting,
    southing,
  }) => {
    let shortString = comment;
    return (
      <div className="recent-div">
        <div className="recentticket">
          <div className="recent-title">{name}</div>
          <span>
            <FaEye
              className="mx-2 action-icon-edit"
              onClick={() => {
                navigate(`/homestead/view/${ticketId}`);
              }}
            />
          </span>
        </div>
        <div className="d-flex flex-column">
          <span className="text-success text-bold">
            Location:
            <span className="recent-des">{shortString}</span>
          </span>
          <span className="text-success text-bold">
            Easting:
            <span className="recent-des">{easting}</span>
          </span>
          <span className="text-success text-bold">
            Southing:
            <span className="recent-des">{southing}</span>
          </span>
        </div>
        <div className="text-muted status-div">
          <small>
            <span className="text-primary">
              {new Date(time).toLocaleString()}
            </span>
          </small>
          <span
            className={`status-text ${
              status === false ? "status-not-started" : "status-completed"
            }`}
          >
            {status===true ? "Relocated" : "Not Relocated"}
          </span>
        </div>
      </div>
    );
  };
  const HomeList = () => {
    return (
      <div>
        {recentHomes?.map((ticket, index) => {
          console.log(ticket);
          return (
            <RecentHome
              key={index}
              name={ticket?.homesteadHead?.name}
              comment={ticket?.location}
              time={ticket?.createdAt}
              ticketId={ticket?._id}
              status={ticket?.relocated}
              easting={ticket.easting}
              southing={ticket.southing}
            />
          );
        })}
      </div>
    );
  };
  const { pathname } = useLocation();
  //scroll to top when page loads
  useEffect(() => {
    ScrollToTop();
  }, [pathname]);

  const piedata = [
    { name: "Relocated", value: totalrelocated, color: "#008000" },
    {
      name: "Not Relocated",
      value: totalunrlocated,
      color: "#4169e1",
    },
  ];
  const piedatagraves = [
    { name: "Relocated", value: totalrelocatedgaves, color: "#008000" },
    {
      name: "Not Relocated",
      value: totalnotrelocatedgaves,
      color: "#4169e1",
    },
  ];
  const piedatabuildings = [
    { name: "Relocated", value: totalrelocatedbuildings, color: "#008000" },
    {
      name: "Not Relocated",
      value: totalnotrelocatedbuildings,
      color: "#4169e1",
    },
  ];
  
  return (
    <div className="dash-container my-3">
      <div className="dash box0">
        <div className="title">
          <TiTicket className="chartIcon" />
          <span className="chartBoxTitle">Recently Added Homesteads</span>
        </div>
        <div>
          {isLoading ? (
            // Render the loading spinner while loading is true
            <LoadingSpinner />
          ) : (
            <>
              <div className="">
                <HomeList />
              </div>
            </>
          )}
        </div>
        {recentHomes.length > 0 && (
          <Link to={"/homesteads"} className="chartBoxLink mt-2">
            View all
          </Link>
        )}
      </div>
      <>
        <div className="dash box1">
          <ChartBox
            count={totalhmes}
            link={"/homesteads"}
            title="Homestead Count"
            hide={true}
            icon={<FaHome className="chartIcon" />}
          />
        </div>
        <div className="dash box2">
          <ChartBox
            link={"/buildings"}
            title="Total Buildings"
            count={totalBildings}
            hide={true}
            icon={<BsBuildingFillAdd className="chartIcon" />}
          />
        </div>
        <div className="dash box3">
          <PieChartBox data={piedata} title="Homesteads" height={300} />
        </div>
        <div className="dash box4">
          <ChartBox
            count={totalTrees}
            link={"/trees"}
            title="Total Trees"
            hide={true}
            icon={<FaTree className="chartIcon" />}
          />
        </div>
        <div className="dash box5">
          <ChartBox
            count={totalgraves}
            link={"/graves"}
            title="Total Graves"
            hide={true}
            icon={<TbGrave className="chartIcon" />}
          />
        </div>
        <div className="dash box6">
          <BigChartBox data={data} title="Total Homesteads By Month" />
        </div>
        <div className="dash box7">
          <PieChartBox data={piedatagraves} title="Graves" height={100} />
        </div>
        <div className="dash box8">
          <PieChartBox data={piedatabuildings} title="Buildings" height={100} />
        </div>
      </>
    </div>
  );
}

export default Dashboard;
