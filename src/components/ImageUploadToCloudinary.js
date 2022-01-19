import { useState } from "react";
import axios from "axios";
import "./../css/ImageUploadToCloudinary.css";

const ImageUploadToCloudinary = () => {
  const [imageSelected, setImageSelected] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [imageCategory, setImageCategory] = useState("");

  const uploadImage = async (e) => {
    const formData = new FormData();
    formData.append("file", imageSelected);
    formData.append("upload_preset", "rxckqye9");
    try {
      e.preventDefault();
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/dlmv4ot9h/image/upload`,
        formData
      );
      console.log(response);
      if (response.status === 200) {
        setImageUrl(response.data.secure_url);
        console.log(imageUrl);
      }
    } catch (error) {
      console.log(error);
    }
  };
  // react spinner when uploading an image
  // function to store url in the database

  // load the image on loading the page

  // checking for a file extension to ensure only images are selected
  // store the image category in the local storage upon making request to cloudinary api
  //send image category along with image url from cloudinary for storage in the in the database
  // if the above request is successful then remove the image category from the local storage
  // for case of a profile pic, it should be stored along with the user id
  return (
    <div
      className="upload-image-wrapper"
      style={{
        backgroundImage: `url("https://res.cloudinary.com/dlmv4ot9h/image/upload/v1641992849/pn2aozlq0zulc2yz25ho.jpg")`,
        width: "100%",
        height: "600px",
        backgroundSize: "cover",
        filter: "opacity(0.9)",
      }}
    >
      <form onSubmit={uploadImage} className="image-upload-form">
        <input
          type="text"
          className="image-category"
          value={imageCategory}
          onChange={(e) => setImageCategory(e.target.value)}
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
