import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { IoMdRemoveCircleOutline } from "react-icons/io";
import { ScrollToTop } from "../../../ScrollTotop";
import { loading } from "../../../context/userSlice";
import Spinner from "../../Pages/Spinner";
import api from "../../../ApiInterceptor";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { FileIcon, defaultStyles } from "react-file-icon";
import { MdDelete } from "react-icons/md";
import { IoCloudUploadOutline } from "react-icons/io5";
function NewHome() {
  //get user from global state
  const user = useSelector((state) => state.user.user);
  const isAdmin = useSelector((state) => state.user.isAdmin);
  const isLoading = useSelector((state) => state.user.isLoading);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [priority, setPriority] = useState([]);
  const [person, setPerson] = useState([]);
  const [errorImage, setErrorImage] = useState();
  const [home, setHome] = useState({
    homesteadHead: "",
    images: [],
    location: "",
    southing: "",
    easting: "",
  });

  //Get Person
  useEffect(() => {
    //dispatch(loading(true));
    api(user)
      .get(`/person/`)
      .then((res) => {
        setPerson(res.data);
        //	dispatch(loading(false));
      })
      .catch((err) => {
        console.log(err);
        //	dispatch(loading(false));
      });
  }, []);

  //Notifications function
  const notifySuccess = (name) => {
    toast.success(`${name}`, {
      position: toast.POSITION.TOP_RIGHT,
      //	autoClose: 2000,
    });
  };
  //Notifications function
  const notifyError = (name) => {
    toast.error(`${name}`, {
      position: toast.POSITION.TOP_RIGHT,
      //	autoClose: 2000,
    });
  };
  //Set default values

  // .required('Phone No is required') //the field is required
	//   .matches(/^\d+$/, 'Phone must be a valid number')// if your want a number
	//   .min(8,"Minimum") //minium charecters
	//   .max(12,"Maxii"),//maximum charecters
  const validationSchema = Yup.object().shape({
    easting: Yup.string().required("This field is required").matches(/^\d.?\d*/, 'Easting must be a valid number'),
    southing: Yup.string().required("This field is required").matches(/^\d.?\d*/, 'Southing must be a valid number'),
    homesteadHead: Yup.string().required("This field is required"),
    location: Yup.string().required("This field is required").max(150,"Text too long"),
  });
  const formOptions = { resolver: yupResolver(validationSchema) };
  const { register, handleSubmit, reset, formState } = useForm(formOptions);
  const { errors } = formState;
  const [fileList, setFileList] = useState([]);
  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    if (selectedFiles.length >= 6) {
      notifyError("Selected files should not exceed 5 files");
    } else {
      const maxSizeInBytes = 2 * 1024 * 1024; // 2 MB

      const validFiles = selectedFiles.filter(
        (file) => file.size <= maxSizeInBytes
      );

      if (validFiles.length === selectedFiles.length) {
        // All files are within the size limit
        setFileList(validFiles);
      } else {
        // Some files exceed the size limit
        notifyError("Some file size exceeds the limit (2 MB).");
        // You can display an error message to the user or handle it as needed.
      }
    }
  };
  const handleDeleteFile = (index) => {
    const updatedFileList = [...fileList];
    updatedFileList.splice(index, 1);
    setFileList(updatedFileList);
  };
  const getFileTypeIcon = (fileName, index) => {
    const extension = fileName.split(".").pop().toLowerCase();
    if (["jpg", "jpeg", "png", "gif", "webp"].includes(extension)) {
      // Image file
      return (
        <div className="file-item pt-2" style={{ width: "50px" }}>
          <img
            src={URL.createObjectURL(fileList[index])}
            alt={fileName}
            style={{ maxWidth: "100%", height: "50px", objectFit: "cover" }}
          />

          <span
            style={{
              width: "100%",
              display: "block",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {fileName}
          </span>
        </div>
      );
    } else {
      // Other file types (using react-file-icon)
      return (
        <div className="file-item pt-2" style={{ width: "50px" }}>
          <FileIcon extension={extension} {...defaultStyles[extension]} />
          <span
            style={{
              width: "100%",
              display: "block",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {fileName}
          </span>
        </div>
      );
    }
  };
  //log home
  const handleLoghome = (data) => {
    // console.log(home)
    // const formData = new FormData();
    // formData.append('eastern', data.eastern);
    // formData.append('location', data.location);
    // formData.append('southern', data.southern);
    // formData.append('size', data.size);
    // if (fileList?.length > 0) {
    // 	fileList.forEach((file, index) => {
    // 		formData.append('file', file);
    // 	});
    // }
    // formData.append('homesteadHead', data.homesteadHead);
    dispatch(loading(true));
    api(user)
      .post(
        "/homesteads",
        { ...home }
        // , {
        // headers: {
        // 	'Content-Type': 'multipart/form-data',
        // },
      )
      .then((response) => {
        console.log(response);
        if (response.data?._id) {
          notifySuccess(`Homestead Added.`);
          navigate("/homesteads");
        } else {
          dispatch(loading(false));
          notifyError(response.data?.error);
        }
      })
      .catch((error) => {
        notifyError(error);
        dispatch(loading(false));
        console.log(error);
      });
    // setHome({
    // 	homesteadHead: '',
    // 	members: '',
    // 	images: '',
    // 	location: '',
    // 	size: '',
    // 	southern: '',
    // 	eastern: '',
    // });
    // reset({
    // 	homesteadHead: '',
    // 	members: '',
    // 	images: '',
    // 	location: '',
    // 	size: '',
    // 	southern: '',
    // 	eastern: '',
    // });
  };

  const { pathname } = useLocation();
  //scroll to top when page loads
  useEffect(() => {
    ScrollToTop();
  }, [pathname]);
  return (
    <div className="">
      <div className="container my-3 ">
        <div className="card  ">
          <div className="card-body">
            <h5 className="card-title text-center font-weight-bold">
              New Homestead
            </h5>
            <form className="mx-5" onSubmit={handleSubmit(handleLoghome)}>
              {/* <!-- location --> */}
              <div className="form-group list-bold my-4">
                <label htmlFor="location">Location</label>
                <textarea
                  className={`form-control ${
                    errors.location ? "is-invalid" : ""
                  }`}
                  {...register("location")}
                  rows="3"
                  name="location"
                  value={home.location}
                  onChange={(e) => {
                    setHome({
                      ...home,
                      location: e.target.value,
                    });
                  }}
                ></textarea>
                <div className="invalid-feedback">
                  {errors.location?.message}
                </div>
              </div>

              {/* <!-- Attachment --> */}
              {/* <div className="form-group list-bold my-4">
                <label htmlFor="attachment">
                  Home Images{" "}
                  <small className="text-danger font-weight-light">
                    (File size limit 2MB)
                  </small>
                </label>
                <br></br>
                <div
                  className="card mt-2 bg-light"
                  onClick={() => document.getElementById("attachment").click()}
                  style={{ cursor: "pointer" }}
                >
                  <div className="card-body text-center ">
                    <IoCloudUploadOutline style={{ fontSize: "30px" }} />
                    <br /> <span>Upload Files</span>
                    <input
                      type="file"
                      className="form-control-file"
                      id="attachment"
                      onChange={handleFileChange}
                      multiple
                      style={{ display: "none" }}
                    />
                  </div>
                </div>
                {fileList.length > 0 && (
                  <div className="deletecontainer mt-4">
                    {fileList.map((file, index) => (
                      <>
                        <div
                          key={index}
                          className="card d-flex align-items-center"
                          style={{ width: "60px" }}
                        >
                          {getFileTypeIcon(file.name, index)}
                        </div>
                        <span
                          className="filedelete"
                          onClick={() => handleDeleteFile(index)}
                        >
                          <MdDelete className="mx-2 filedelete" />
                        </span>
                      </>
                    ))}
                  </div>
                )}
              </div> */}

              {/* <!-- type --> */}
              <div className="form-group list-bold my-4">
                <label htmlFor="homesteadHead">Homestead Owner</label>
                {person && (
                  <select
                    className={`form-select ${
                      errors.homesteadHead ? "is-invalid" : ""
                    }`}
                    {...register("homesteadHead")}
                    name="homesteadHead"
                    aria-label="user role"
                    value={home.homesteadHead}
                    onChange={(e) => {
                      setHome({
                        ...home,
                        homesteadHead: e.target.value,
                      });
                    }}
                  >
                    <option value={null} defaultValue>
                      Select Owner
                    </option>
                    {person?.map((item) => (
                      <option value={item._id} key={item._id}>
                        {item.name}
                      </option>
                    ))}
                  </select>
                )}
                <div className="invalid-feedback">
                  {errors.homesteadHead?.message}
                </div>
              </div>
              <div className="form-group list-bold my-4">
                <label htmlFor="email">Easting</label>
                <input
                  {...register("easting")}
                  className={`form-control ${
                    errors.easting ? "is-invalid" : ""
                  }`}
                  name="easting"
                  value={home.easting}
                  onChange={(e) => {
                    setHome({
                      ...home,
                      easting: e.target.value,
                    });
                  }}
                ></input>
                <div className="invalid-feedback">
                  {errors.easting?.message}
                </div>
              </div>

              <div className="form-group list-bold my-4">
                <label htmlFor="phone">Southing</label>

                <input
                  type="tel"
                  {...register("southing")}
                  className={`form-control ${
                    errors.southing ? "is-invalid" : ""
                  }`}
                  value={home.southing}
                  id="phone"
                  name="southing"
                  onChange={(e) => {
                    setHome({
                      ...home,

                      southing: e.target.value,
                    });
                  }}
                />
                <div className="invalid-feedback">
                  {errors.southing?.message}
                </div>
              </div>

              <div className="text-end my-4 gap-3 d-flex justify-content-end">
                <button
                  className="btn btn-danger"
                  onClick={() => {
                    navigate(-1);
                  }}
                >
                  Back
                </button>
                <button type="submit" className="btn btn-primary">
                  Add Homestead
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewHome;
