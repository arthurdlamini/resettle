import React, { useEffect, useState } from "react";
import { BsArrow90DegDown, BsTicketDetailedFill } from "react-icons/bs";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { ScrollToTop } from "../../../ScrollTotop";
import { useDispatch, useSelector } from "react-redux";
import api from "../../../ApiInterceptor";
import Spinner from "../../Pages/Spinner";
import { loading } from "../../../context/userSlice";
import { FileIcon, defaultStyles } from "react-file-icon";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import { FaAngleDown, FaEye } from "react-icons/fa";
import AddFieldYield from "../Fieldyield/AddFieldYield";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { MdDelete } from "react-icons/md";
import { Button, Modal } from "react-bootstrap";
import HomesteadsRep from "./HomesteadRep";
import HomesteadRep from "./HomesteadRep";
import GravesRep from "./GravesRep";
import FieldRep from "./FieldRep";
import BuildingRep from "./BuildingRep";
import StructureRep from "./StructureRep";
import TreesRep from "./TreesRep";
function Reports() {
 
  const isLoading = useSelector((state) => state.user.isLoading);

  const { pathname } = useLocation();
  //scroll to top when page loads
  useEffect(() => {
    ScrollToTop();
  }, [pathname]);
  
  return (
    <div>
      <h4 className="text-center my-3">
        <BsTicketDetailedFill className="mx-3 edit-icon" />
        Reports View
      </h4>
      {isLoading && (
        // Render the loading spinner while loading is true
        <Spinner />
      )}
      <div>
      <HomesteadRep />
      <GravesRep/>
      <FieldRep/>
      <BuildingRep/>
      <StructureRep/>
      <TreesRep/>
      </div>
     
    </div>
  );
}

export default Reports;
