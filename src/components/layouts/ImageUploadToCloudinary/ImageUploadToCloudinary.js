import { useState } from "react";
import axios from "axios";
import "./ImageUploadToCloudinary.css";
import axiosApiUnAuthorized from "../../../AxiosApi/axiosUnAuthorized.js";
import { BeatLoader } from "react-spinners";

const ImageUploadToCloudinary = () => {
  const [imageSelected, setImageSelected] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [imageCategory, setImageCategory] = useState("");
  const [imageUploadMsg, setImageUploadMsg] = useState("");
  const [showBeatLoader, setShowBeatLoader] = useState(false);

  // UploadImage function uploading the image to cloudinary
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
        setShowBeatLoader(false);
        uploadImageUrlToBackend();
        console.log(imageUrl);
      }
    } catch (error) {
      console.log(error);
      setShowBeatLoader(false);
    }
  };

  // https://res.cloudinary.com/dlmv4ot9h/image/upload/v1647263806/xwi9r12edlnqlov9cewh.jpg

  // function to store url in the database
  const uploadImageUrlToBackend = async () => {
    try {
      setShowBeatLoader(true);
      setImageUploadMsg("Uploading url...");
      const response = await axiosApiUnAuthorized.post(
        `/api/upload-website-image-url`,
        {
          imageUrl: imageUrl,
          imageCategory: imageCategory,
        }
      );
      console.log(response);
      if (response.status === 200) {
        setShowBeatLoader(false);
        setImageUploadMsg("Uploaded successfully");
        setImageSelected("");
      }
    } catch (error) {
      setShowBeatLoader(false);
      setImageUploadMsg("");
      console.log(error);
    }
  };

  return (
    <div
      className="upload-image-wrapper"
      style={{
        // backgroundImage: `url("https://res.cloudinary.com/dlmv4ot9h/image/upload/v1641992849/pn2aozlq0zulc2yz25ho.jpg")`,
        // backgroundImage: `url(https://res.cloudinary.com/dlmv4ot9h/image/upload/v1647263806/xwi9r12edlnqlov9cewh.jpg)`,
        backgroundImage: `url(https://res.cloudinary.com/dlmv4ot9h/image/upload/v1647268251/zphcwzcjgn5h8gbhpxb0.jpg)`,
        width: "100%",
        height: "100%",
        backgroundSize: "cover",
        filter: "opacity(0.9)",
      }}
    >
      {showBeatLoader ? (
        <div className="beat-loader">
          <BeatLoader color={"hsl(180, 100%, 60%)"} />
          <p>{imageUploadMsg}</p>
        </div>
      ) : null}
      <form onSubmit={uploadImage} className="image-upload-form">
        <input
          type="text"
          className="image-category"
          value={imageCategory}
          onChange={(e) => setImageCategory(e.target.value)}
          placeholder="Image Category"
          required
        />
        <input
          type="file"
          className="choose-file-field"
          onChange={(e) => setImageSelected(e.target.files[0])}
          required
        />
        <button type="submit">upload image</button>
      </form>
    </div>
  );
};

export default ImageUploadToCloudinary;
