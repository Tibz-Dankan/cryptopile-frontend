/* eslint-disable no-unused-vars */
import { useState, useContext } from "react";
import axios from "axios";
import backendBaseURL from "../../../constants/AxiosApi/axiosAuthorized.js";
import "./UploadProfileImage.css";
import { BeatLoader } from "react-spinners";
import { log } from "../../../utils/ConsoleLog.js";
import { AccessTokenContext } from "../../../context/AccessTokenContext/AccessTokenContext.js";
import jwt_decode from "jwt-decode";
import { enableButton, disableButton } from "../../../utils/ButtonState.js";
//TODO: close the upload form when the image is successfully uploaded and automat

const UploadProfileImage = () => {
  const [imageFile, setImageFile] = useState("");
  const [imageFileName, setImageFileName] = useState("");
  const [imageUploadMsg, setImageUploadMsg] = useState("");
  const [showBeatLoader, setShowBeatLoader] = useState(false);
  const [imageValidationAlertMsg, setImageValidationAlertMsg] = useState("");
  const [showImageValidationAlert, setShowImageValidationAlertMsg] =
    useState(false);
  const [showImageUploadMsg, setShowImageUploadMsg] = useState(false);
  const [showCatchError, setShowCaughtError] = useState(false);

  //   function to check for the image extensions
  // jwt decode
  const userInfoToken = sessionStorage.getItem("userInfoToken");
  const decodedUserInfo = jwt_decode(userInfoToken);
  const userId = decodedUserInfo.userId;

  const [accessToken, setAccessToken] = useContext(AccessTokenContext);
  const updateAccessTokenContextWhenNull = () => {
    if (!accessToken) {
      setAccessToken(sessionStorage.getItem("accessToken"));
    }
  };
  updateAccessTokenContextWhenNull();

  const axiosApiAuthorized = axios.create({
    baseURL: backendBaseURL,
    headers: {
      Authorization: "Bearer " + accessToken,
    },
  });

  const handleImageOnChange = (e) => {
    setImageFile(e.target.files[0]);
    setImageFileName(e.target.files[0].name);
  };

  const checkImageType = (imageType) => {
    if (
      imageType === "image/jpeg" ||
      imageType === "image/jpg" ||
      imageType === "image/png"
    ) {
      log("Valid image: " + imageFile.type);
      return true;
    } else {
      log("Invalid image type: " + imageFile.type);
      setShowImageValidationAlertMsg(true);
      setImageValidationAlertMsg(
        "Only accept image files that end with .jpeg, .jpg and .png"
      );
      // Remove the message after 5 seconds
      setTimeout(() => {
        setShowImageValidationAlertMsg(false);
        setImageValidationAlertMsg("");
      }, 5000);
      return false;
    }
  };

  const checkImageSize = (imageSize) => {
    const maximumAcceptableImageSize = 5242880; // 5mb
    if (imageSize < maximumAcceptableImageSize) {
      log("Image size: " + imageSize + " Acceptable");
      return true;
    } else {
      log("Too big image size: " + imageSize);
      setShowImageValidationAlertMsg(true);
      setImageValidationAlertMsg("Only accept image size less than 5mb");
      // Remove the message after 5 seconds
      setTimeout(() => {
        setShowImageValidationAlertMsg(false);
        setImageValidationAlertMsg("");
      }, 5000);
      return false;
    }
  };

  let formData;
  const checkImageFile = () => {
    setShowImageValidationAlertMsg(false);
    formData = new FormData();
    formData.append("file", imageFile);
    formData.append("imageFileName", imageFileName);
    formData.append("ImageCategory", "Profile");
    log(imageFile);
    log("image name: " + imageFile.name);
    log("image size: " + imageFile.size);
    log("image type: " + imageFile.type);
    log(imageFile);
    const imageType = imageFile.type;
    const imageSize = imageFile.size;
    return checkImageType(imageType) && checkImageSize(imageSize);
  };

  const uploadImageToBackend = async () => {
    try {
      if (!accessToken) return;
      setShowBeatLoader(true);
      setImageUploadMsg("Uploading image...");
      setShowImageValidationAlertMsg(false);
      setShowCaughtError(false);
      disableButton("button");
      const response = await axiosApiAuthorized.post(
        `/api/upload-profile-image-url/${userId}`,
        // {
        //   // imageName: imageSelected.name,
        //   imageFile: imageFile,
        //   imageCategory: "profile",
        // }
        formData
      );
      console.log(response);
      enableButton("button");
      if (response.status === 200) {
        setShowBeatLoader(false);
        setImageUploadMsg(true);
        // setImageUploadMsg("Uploaded successfully");
        setImageUploadMsg(
          "This feature is being revised by the technical team"
        ); //This is temporary
        // setImageSelected("");
      }
    } catch (error) {
      setShowBeatLoader(false);
      setShowCaughtError(true);
      enableButton("button");
      console.log(error);
    }
  };

  const checkImageFileAndUploadToBackend = (e) => {
    e.preventDefault();
    checkImageFile() && uploadImageToBackend();
  };
  // load the image on loading the page
  // checking for a file extension to ensure only images are selected
  return (
    <div className="upload-profile-image-wrapper">
      <form
        onSubmit={(e) => checkImageFileAndUploadToBackend(e)}
        className="upload-profile-image-form"
      >
        {showBeatLoader && (
          <div className="upload-profile-bar-loader-wrapper">
            <BeatLoader color="hsl(180, 100%, 30%)" size={8} />
            <p>uploading...</p>
          </div>
        )}
        {showImageUploadMsg && (
          <p className="upload-profile-image-msg">{imageUploadMsg}</p>
        )}
        {showCatchError && (
          <p className="upload-profile-image-catch-error">
            Sorry, something went wrong
          </p>
        )}
        <h4>Choose an Image file</h4>
        {showImageValidationAlert && (
          <p className="image-validation-alert-msg">
            {imageValidationAlertMsg}
          </p>
        )}
        <input
          type="file"
          className="choose-image-file-field"
          id="button"
          onChange={(e) => handleImageOnChange(e)}
          required
        />
        <button className="upload-btn" type="submit">
          Upload Image
        </button>
      </form>
    </div>
  );
};

export default UploadProfileImage;
