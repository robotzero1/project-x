import React, { useState, useRef, useEffect } from "react";
import { Link, navigate } from "gatsby";
import { StaticImage } from "gatsby-plugin-image";
import { getUser, logout, handleAccountUpdate } from "../services/auth";
import Resizer from "react-image-file-resizer";
import Webcam from "react-webcam";
import HeaderHamburger from "../components/header-hamburger";
import {
  hamburgerGridLayer,
  profileEditSelfieOverlay,
  profileH2,
  profileCard,
  profileEditBlock,
  profileEditForm,
  profileEditFullWidth,
} from "../components/layout.module.css";

const videoConstraints = {
  facingMode: "user",
  aspectRatio: 1,
};

const ProfileEdit = () => {
  const [inputMemberEmail, setInputMemberEmail] = useState(getUser().email);
  const [inputMemberName, setInputMemberName] = useState(getUser().name);

  const fileInputRef = useRef(null);

  const webcamRef = useRef(null);
  const [imgSrc, setImgSrc] = useState(null);
  const [showCaptureButton, setShowCaptureButton] = useState(null);
  const [showClearButton, setShowClearButton] = useState(null);
  const [updateButtonText, setUpdateButtonText] = useState("UPDATE ACCOUNT");

  const clickFileInput = () => {
    fileInputRef.current.click();
  };

  const uploadImage = (event) => {
    let fileInput = false;
    if (event.target.files[0]) {
      fileInput = true;
    }
    if (fileInput) {
      try {
        Resizer.imageFileResizer(
          event.target.files[0],
          600,
          600,
          "JPEG",
          100,
          0,
          (uri) => {
            const imageSrc = uri;
            setImgSrc(imageSrc);
            localStorage.setItem("profile-image", imageSrc);
            setShowClearButton(true);
            setShowCaptureButton(null);
          },
          "base64"
        );
      } catch (err) {
        console.log(err);
      }
    }
  };

  const capture = React.useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImgSrc(imageSrc);
    localStorage.setItem("profile-image", imageSrc);
    setShowClearButton(true);
    setShowCaptureButton(null);
  }, [webcamRef, setImgSrc]);

  const clearPhoto = () => {
    setImgSrc(null);
    localStorage.removeItem("profile-image");
    setShowCaptureButton(true);
    setShowClearButton(null);
  };

  const changeEmail = ({ target }) => {
    console.log(target.value);
    setInputMemberEmail(target.value);
  };

  const changeName = ({ target }) => {
    setInputMemberName(target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("update account");
    console.log(inputMemberEmail, inputMemberName);
    handleAccountUpdate({
      inputmemberemail: inputMemberEmail,
      inputmembername: inputMemberName,
    });
    setUpdateButtonText("ACCOUNT UPDATED");
  };

  useEffect(() => {
    if (localStorage.getItem("profile-image")) {
      setImgSrc(localStorage.getItem("profile-image"));
      setShowClearButton(true);
    } else {
      setShowCaptureButton(true);
    }
  }, [localStorage.getItem("profile-image")]);

  return (
    <>
      <div className={hamburgerGridLayer} style={{ background: "black" }}>
        <HeaderHamburger menuType="full" />
      </div>
      <div style={{ display: "grid", justifyItems: "center" }}>
        <Webcam
          audio={false}
          ref={webcamRef}
          width={"370"}
          videoConstraints={videoConstraints}
          style={{
            gridArea: "1/1",
            width: "300px",
            height: "300px",
            borderRadius: "50%",
            objectFit: "cover",
            padding: "10px 30px",
          }}
        />

        <div style={{ display: "grid", gridArea: "1/1", position: "relative" }}>
          {imgSrc && (
            <img
              src={imgSrc}
              style={{ maxWidth: "100%", objectFit: "cover", width: "300px", height: "300px", borderRadius: "50%", objectFit: "cover", padding: "10px 30px"}}
            />
          )}
        </div>
        {/* <div className={profileEditSelfieOverlay}></div> */}
      </div>

      {showCaptureButton && (
            <p style={{padding: "10px"}}>Please take a selfie or upload one below</p>
          )}

      <div style={{ display: "grid", height: "auto", gridGap: "1rem", gridTemplateColumns: "repeat(2, 1fr)", padding: "0 15px" }}>
        <div style={{ display: "grid" }}>
          {showCaptureButton && (
            <button onClick={capture}>Capture selfie</button>
          )}
        </div>
        <div style={{ display: "grid"}}>
          {showCaptureButton && (
            <button onClick={clickFileInput}>Upload photo</button>
          )}
        </div>
      </div>
      <div style={{ display: "grid", height: "auto", gridGap: "1rem", gridTemplateColumns: "repeat(1, 1fr)", padding: "0 15px" }}>
        <div style={{ display: "grid" }}>
          {showClearButton && <button onClick={clearPhoto}>Clear photo</button>}
        </div>
      </div>      
      

      

      <input
        ref={fileInputRef}
        type="file"
        style={{ display: "none" }}
        onChange={uploadImage}
      />

      <div className={profileEditBlock}>
        <form
          method="post"
          className={profileEditForm}
          onSubmit={(event) => {
            handleSubmit(event);
          }}
        >
          <label className={profileEditFullWidth}>
            Email
            <input
              type="text"
              name="inputMemberEmail"
              defaultValue={inputMemberEmail}
              placeholder="Enter your new email address"
              onChange={changeEmail}
            />
          </label>
          <label className={profileEditFullWidth}>
            Name
            <input
              type="text"
              name="inputMemberName"
              defaultValue={inputMemberName}
              placeholder="Enter your new name"
              onChange={changeName}
            />
          </label>
          <button type="submit">{updateButtonText}</button>
          <div id="messagebox"></div>
        </form>
        <p style={{ fontSize: ".9rem" }}>
          Note that you name and email are only editable for 24 hours after
          creating an account. Please contact us if you need to update these.
        </p>
      </div>
    </>
  );
};

export default ProfileEdit;
