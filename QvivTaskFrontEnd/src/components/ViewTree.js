import Foot from "./Foot";
import { useState, useEffect } from "react";
import QRCode from "./qrCode";
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
import { TbCreativeCommonsOff, TbWorldWww } from "react-icons/tb";
import { CgWebsite } from "react-icons/cg";
import { HiDocumentText } from "react-icons/hi";
import { useParams } from "react-router-dom";
import Background from "./Background";
import obj from "../url";

function ViewTree(props) {
  const backend_url = obj.backend_url;
  const frontend_url = obj.frontend_url;
  const [userData, setUserData] = useState({});
  const { username } = useParams();
  const [defaultImg, setDefaultImg] = useState("/avtar.png");
  const [userProfileURL, setUserProfileURL] = useState("");

  useEffect(() => {
    const user = username ? username : "elite";
    // console.log('username->',user);
    fetch(`${backend_url}/${user}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((d) => {
        // console.log("d->", d);
        delete d._id;
        delete d.__v;
        delete d.username;
        if (d.photo) {
          setDefaultImg(`${backend_url}/${d.photo}`);
        }
        delete d.photo;
        setUserData(d);
      })
      .catch((error) => console.log(error));

    // Add event listener to handle mouse movement on the image

    const img = document.getElementById("imgPreview");
    if (img) {
      img.addEventListener("mousemove", handleMouseMove);
      img.addEventListener("mouseleave", handleMouseLeave);
    }
    if (user) {
      const profileURL = `${frontend_url}${user}`;
      setUserProfileURL(profileURL);
    }
  }, []);

  if (userData.error) {
    // console.log("\n\n", userData);
    return (
      <>
        <h1 className="noUser">No user exist with {username} username</h1>
        <Foot showCreate={props.showCreate} />
      </>
    );
  }

  const handleMouseMove = (e) => {
    const img = e.target;
    const container = img.parentElement;
    console.log(container);
    // Get the center coordinates of the container
    const containerRect = container.getBoundingClientRect();
    const centerX = containerRect.left + containerRect.width / 2;
    const centerY = containerRect.top + containerRect.height / 2;
  
    // Get the mouse position relative to the center of the container
    const mouseX = e.clientX - centerX;
    const mouseY = e.clientY - centerY;
  
    // Calculate the angle of rotation based on mouse position
    const maxRotation = 200; // Maximum tilt angle in degrees
    const rotationX = Math.min(Math.max((mouseY / centerY) * maxRotation, -maxRotation), maxRotation);
    const rotationY = Math.min(Math.max(-(mouseX / centerX) * maxRotation, -maxRotation), maxRotation);
  
    // Apply the rotation transformation to the image
    img.style.transition = "transform 0.1s ease-out"; // Smooth transition
    img.style.transform = `rotateX(${rotationX}deg) rotateY(${rotationY}deg)`;
  };
  const handleMouseLeave = (e) => {
    const img = e.target;
    img.style.transition = "transform 0.2s ease-out";
    img.style.transform = "none"; // Reset transformation
  };

  return (
    <>
      <Background />
      <div className="view-form-container">
        {userData.name !== "" ? <p className="name"> {userData.name} </p> : ""}
        {userData.designation !== "" ? (
          <p className="Designation"> {userData.designation} </p>
        ) : (
          ""
        )}
        <div className="imageSection">
          <img
            src={defaultImg}
            alt="Image Preview"
            id="imgPreview"
            //   onMouseMove={handleMouseMove}
          />
        </div>
        <div className="imageSection">

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
      <Foot showCreate={props.showCreate} />
    </>
  );
}

export default ViewTree;
