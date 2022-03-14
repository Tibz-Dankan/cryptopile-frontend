import { useState } from "react";
import axios from "axios";
import axiosApiAuthorized from "./axiosAuthorized.js";
import "./../css/UploadProfileImage.css";
import { BeatLoader } from "react-spinners";

const UploadProfileImage = () => {
  const [imageSelected, setImageSelected] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [imageUploadMsg, setImageUploadMsg] = useState("");
  const [showBeatLoader, setShowBeatLoader] = useState(false);

  //   function to check for the image extensions

  const uploadImage = async (e) => {
    const formData = new FormData();
    formData.append("file", imageSelected);
    formData.append("upload_preset", "rxckqye9");
    try {
      e.preventDefault();
      setShowBeatLoader(true);
      setImageUploadMsg("Uploading image...");
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/dlmv4ot9h/image/upload`,
        formData
      );
      console.log(response);
      if (response.status === 200) {
        setImageUrl(response.data.secure_url);
        // upload the image url to the backend
        uploadImageUrlToBackend();
        console.log(imageUrl);
      }
    } catch (error) {
      setShowBeatLoader(false);
      setImageUploadMsg("");
      console.log(error);
    }
  };
  // react spinner when uploading an image
  // function to store url in the database
  const uploadImageUrlToBackend = async () => {
    try {
      setShowBeatLoader(true);
      setImageUploadMsg("Uploading url...");
      const userId = localStorage.getItem("userId");
      const response = await axiosApiAuthorized.post(
        `/api/upload-profile-image-url/${userId}`,
        {
          imageUrl: imageUrl,
          imageCategory: "profile",
        }
      );
      console.log(response);
      if (response.status === 200) {
        setShowBeatLoader(false);
        setImageUrl(response.data.secure_url);
        setImageUploadMsg("Uploaded successfully");
        setImageSelected("");
      }
    } catch (error) {
      setShowBeatLoader(false);
      setImageUploadMsg("");
      console.log(error);
    }
  };

  // load the image on loading the page
  // checking for a file extension to ensure only images are selected

  return (
    <div className="upload-profile-image-wrapper">
      <form onSubmit={uploadImage} className="upload-profile-image-form">
        {showBeatLoader ? (
          <div className="the-bar-loader">
            <BeatLoader color="hsl(180, 100%, 30%)" />
            <p>{imageUploadMsg}</p>
          </div>
        ) : null}
        <h4>Choose an Image file</h4>
        <input
          type="file"
          className="choose-image-file-field"
          onChange={(e) => setImageSelected(e.target.files[0])}
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
