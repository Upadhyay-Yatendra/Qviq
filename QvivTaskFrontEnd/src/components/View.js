import React from "react";
import Nav_bar from "./Nav_bar";
import Sign_in from "./Sign_in";
import Foot from "./Foot";
import QRCode from "./qrCode";
import { useState, useEffect } from "react";

// icons
import {
  FaGithub,
  FaCodepen,
  FaHackerrank,
  FaInstagram,
  FaFacebookSquare,
  FaLinkedin,
  FaTwitter,
} from "react-icons/fa";
import {
  SiHackerearth,
  SiLeetcode,
  SiGeeksforgeeks,
  SiCodechef,
  SiCodeforces,
} from "react-icons/si";
import { TbWorldWww } from "react-icons/tb";
import { CgWebsite } from "react-icons/cg";
import { HiDocumentText } from "react-icons/hi";
import Alertmst from "./Alertmst";
import Background from "./Background";

import obj from "../url";

function View(props) {
  // backend_url and frontend_url
  const backend_url = obj.backend_url;
  const frontend_url = obj.frontend_url;
  // const backend_url = 'http://localhost:3000'
  // const frontend_url = 'http://localhost:3001'
  // userstates
  const [userData, setUserData] = useState({});
  const [username, setUsername] = useState("");
  const [msg, setMsg] = useState("");
  const [defaultImg, setDefaultImg] = useState("/avtar.png");
  const [userProfileURL, setUserProfileURL] = useState("");
  useEffect(() => {
    // if user is login then fetch data
    if (props.authToken !== null) {
      fetch(`${backend_url}/api/linktree/view`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authToken: props.authToken,
        },
      })
        .then((response) => response.json())
        .then((d) => {
          if (d.msg === "data found") {
            delete d.data._id;
            delete d.data.__v;
            if (d.data.photo) {
              setDefaultImg(`${backend_url}/${d.data.photo}`);
            }
            delete d.data.photo;
            setUsername(d.data.username);
            delete d.data.username;
            setUserData(d.data);
          }
        })
        .catch((error) => console.log(error));

      if (username) {
        const profileURL = `${frontend_url}/${user}`;
        setUserProfileURL(profileURL);
      }
    }

    const img = document.getElementById("imgPreview");
    if (img) {
      img.addEventListener("mousemove", handleMouseMove);
      img.addEventListener("mouseleave", handleMouseLeave);
    }

  }, []);

  // handle copy url btn
  function handleCopy() {
    navigator.clipboard.writeText(`${frontend_url}/${username}`);
    setMsg("Profile Url Copied");
  }

  if (props.authToken === null) {
    return (
      <Sign_in authToken={props.authToken} setAuthToken={props.setAuthToken} />
    );
  }

  const handleMouseMove = (e) => {
    const img = e.target;
    const container = img.parentElement;

    // Get the center coordinates of the container
    const containerRect = container.getBoundingClientRect();
    const centerX = containerRect.left + containerRect.width / 2;
    const centerY = containerRect.top + containerRect.height / 2;

    // Get the mouse position relative to the center of the container
    const mouseX = e.clientX - centerX;
    const mouseY = e.clientY - centerY;

    // Calculate the angle of rotation based on mouse position
    // const maxRotation = 100; // Maximum tilt angle in degrees
    const rotationX = (mouseY / centerY) * 200;
    const rotationY = -(mouseX / centerX) * 200;
    // console.log("rotationX", rotationX, "rotationY ", rotationY);
    // Apply the rotation transformation to the image
    img.style.transition = "transform 0.1s ease-out"; // Smooth transition over 0.2 seconds
    img.style.transform = `rotateX(${rotationX}deg) rotateY(${rotationY}deg)`;
  };
  const handleMouseLeave = (e) => {
    const img = e.target;
    img.style.transition = "transform 0.2s ease-out";
    img.style.transform = "none"; // Reset transformation
  };

  return (
    <>
      <Nav_bar authToken={props.authToken} setAuthToken={props.setAuthToken} />
      <Alertmst msg={msg} setMsg={setMsg} />
      <Background />
      <button class="Btn" onClick={handleCopy}>
        <span class="text">Copy This Profile Url</span>
        <span class="svgIcon">
          <svg
            fill="white"
            viewBox="0 0 384 512"
            height="3em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M280 64h40c35.3 0 64 28.7 64 64V448c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V128C0 92.7 28.7 64 64 64h40 9.6C121 27.5 153.3 0 192 0s71 27.5 78.4 64H280zM64 112c-8.8 0-16 7.2-16 16V448c0 8.8 7.2 16 16 16H320c8.8 0 16-7.2 16-16V128c0-8.8-7.2-16-16-16H304v24c0 13.3-10.7 24-24 24H192 104c-13.3 0-24-10.7-24-24V112H64zm128-8a24 24 0 1 0 0-48 24 24 0 1 0 0 48z"></path>
          </svg>
        </span>
      </button>
      <div className="view-form-container">
        {userData.name !== "" ? <p className="name"> {userData.name} </p> : ""}
        {userData.designation !== "" ? (
          <p className="Designation"> {userData.designation} </p>
        ) : (
          ""
        )}
        <div id="imageSection">
          <img src={defaultImg} alt="Image Preview" id="imgPreview" />
          <QRCode userProfileURL={userProfileURL} />
        </div>
        {userData.about !== "" ? <p className="about">{userData.about}</p> : ""}

        <div className="form">
          <div className="flex-container">
            {userData.portfolio !== "" ? (
              <a
                href={userData.portfolio}
                target="_blank"
                className="view-group half"
              >
                <div>
                  <CgWebsite /> Portfolio
                </div>
                <p>{userData.portfolio}</p>
              </a>
            ) : (
              ""
            )}
            {userData.resume !== "" ? (
              <a
                href={userData.resume}
                target="_blank"
                className="view-group half"
              >
                <div>
                  <HiDocumentText /> Resume
                </div>
                <p>{userData.resume}</p>
              </a>
            ) : (
              ""
            )}
            {userData.website !== "" ? (
              <a
                href={userData.website}
                target="_blank"
                className="view-group half"
              >
                <div>
                  <TbWorldWww /> Website
                </div>
                <p>{userData.website}</p>
              </a>
            ) : (
              ""
            )}
          </div>
          {userData.instagram ||
          userData.facebook ||
          userData.linkedIn ||
          userData.twitter ? (
            <p className="sub-title">SOCIAL MEDIA</p>
          ) : (
            ""
          )}
          <div className="flex-container">
            {userData.linkedIn !== "" ? (
              <a
                href={userData.linkedIn}
                target="_blank"
                className="view-group half"
              >
                <div>
                  <FaLinkedin /> LinkedIn
                </div>
                <p>{userData.linkedIn}</p>
              </a>
            ) : (
              ""
            )}
            {userData.twitter !== "" ? (
              <a
                href={userData.twitter}
                target="_blank"
                className="view-group half"
              >
                <div>
                  <FaTwitter /> Twitter
                </div>
                <p>{userData.twitter}</p>
              </a>
            ) : (
              ""
            )}
            {userData.instagram !== "" ? (
              <a
                href={userData.instagram}
                target="_blank"
                className="view-group half"
              >
                <div>
                  <FaInstagram /> Instagram
                </div>
                <p>{userData.instagram}</p>
              </a>
            ) : (
              ""
            )}
            {userData.facebook !== "" ? (
              <a
                href={userData.facebook}
                target="_blank"
                className="view-group half"
              >
                <div>
                  <FaFacebookSquare /> Facebook
                </div>
                <p>{userData.facebook}</p>
              </a>
            ) : (
              ""
            )}
          </div>

          {userData.hackerRank ||
          userData.hackerEarth ||
          userData.codeChef ||
          userData.codeforces ||
          userData.leetCode ||
          userData.geeksforgeeks ||
          userData.gitHub ||
          userData.codePen ? (
            <p className="sub-title">CODING PLATFORMS</p>
          ) : (
            ""
          )}
          <div className="flex-container">
            {userData.hackerRank !== "" ? (
              <a
                href={userData.hackerRank}
                target="_blank"
                className="view-group half"
              >
                <div>
                  <FaHackerrank /> HackerRank
                </div>
                <p>{userData.hackerRank}</p>
              </a>
            ) : (
              ""
            )}
            {userData.hackerEarth !== "" ? (
              <a
                href={userData.hackerEarth}
                target="_blank"
                className="view-group half"
              >
                <div>
                  <SiHackerearth /> HackerEarth
                </div>
                <p>{userData.hackerEarth}</p>
              </a>
            ) : (
              ""
            )}
            {userData.codeChef !== "" ? (
              <a
                href={userData.codeChef}
                target="_blank"
                className="view-group half"
              >
                <div>
                  <SiCodechef /> CodeChef
                </div>
                <p>{userData.codeChef}</p>
              </a>
            ) : (
              ""
            )}
            {userData.codeforces !== "" ? (
              <a
                href={userData.codeforces}
                target="_blank"
                className="view-group half"
              >
                <div>
                  <SiCodeforces /> Codeforces
                </div>
                <p>{userData.codeforces}</p>
              </a>
            ) : (
              ""
            )}
            {userData.leetCode !== "" ? (
              <a
                href={userData.leetCode}
                target="_blank"
                className="view-group half"
              >
                <div>
                  <SiLeetcode /> LeetCode
                </div>
                <p>{userData.leetCode}</p>
              </a>
            ) : (
              ""
            )}
            {userData.geeksforgeeks !== "" ? (
              <a
                href={userData.geeksforgeeks}
                target="_blank"
                className="view-group half"
              >
                <div>
                  <SiGeeksforgeeks /> GeeksforGeeks
                </div>
                <p>{userData.geeksforgeeks}</p>
              </a>
            ) : (
              ""
            )}
            {userData.gitHub !== "" ? (
              <a
                href={userData.gitHub}
                target="_blank"
                className="view-group half"
              >
                <div>
                  {" "}
                  <FaGithub /> GitHub
                </div>
                <p>{userData.gitHub}</p>
              </a>
            ) : (
              ""
            )}
            {userData.codePen !== "" ? (
              <a
                href={userData.codePen}
                target="_blank"
                className="view-group half"
              >
                <div>
                  {" "}
                  <FaCodepen /> CodePen
                </div>
                <p>{userData.codePen}</p>
              </a>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
      <Foot />
    </>
  );
}

export default View;
