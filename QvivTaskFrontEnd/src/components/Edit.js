import React, { useEffect, useState } from 'react'
import Nav_bar from './Nav_bar'
import Foot from './Foot'
import Sign_in from './Sign_in'
import Alertmst from './Alertmst'
import Background from './Background'
import obj from '../url'
import { Oval } from 'react-loader-spinner'
import { useNavigate } from "react-router-dom";

function Edit(props) {
    // backend_url
    const backend_url = obj.backend_url
    const navigate = useNavigate();
    // userstates 
    const [userData, setUserData] = useState({})
    const [image, setImage] = useState(null)
    const [msg, setMsg] = useState("")
    const [defaultImg, setDefaultImg] = useState('/avtar.png')
    const [username, setUsername] = useState()
    const [showLoader, setShowLoader] = useState(false)
    useEffect(() => {
        // if token present then fetch data and url 
        if (props.authToken != null) {    
            fetch(`${backend_url}/api/linktree/view`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "authToken": props.authToken,
                },
            }).then((response => response.json())).then((d) => {
                if (d.msg === 'data found') {
                    delete d.data._id;
                    delete d.data.__v;
                    setUsername(d.data.username)
                    delete d.data.username;
                    setUserData(d.data)
                }
            }).catch(error => console.log(error))
            // set image url
            fetch(`${backend_url}/api/linktree/image`, {
                headers: {
                    "username": username,
                },
            }
            ).then(data => data.json()).then(data => {
                if (data.msg === 'found') {
                    setDefaultImg(`${backend_url}/${data.img}`)
                }
            })
        }
    }, [])

    // handle form submit event 
    async function handleSubmit(e) {
        e.preventDefault();
        // Submit data to backend 
        setShowLoader(true)
        const response = await fetch(`${backend_url}/api/linktree/edit`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "authToken": props.authToken
            },
            body: JSON.stringify(userData),
        }).catch(error => console.log(error))
        const data = await response.json();
        // upload image 
        if (image) {
            const formData = new FormData();
            formData.append('photo', image);
            // console.log(image)
            await fetch(`${backend_url}/api/linktree/uploadImage`, {
                method: "POST",
                headers: {
                    "authToken": props.authToken
                },
                body: formData,
            }).catch(error => console.log(error))
        }


        if (data.msg === 'data submitted') {
            setMsg("Data Submitted")
        }
        setShowLoader(false)
        window.scrollTo(0, 0)
        navigate('/');
    }

    function handleInput(e) {
        setUserData({
            ...userData,
            [e.target.name]: e.target.value
        })
        // console.log(userData)
    }

    const handlePhoto = (e) => {
        // console.log(e.target.files[0])
        if (e.target.files[0]) {
            document.getElementById("imgPreview").src = URL.createObjectURL(e.target.files[0]);
            setImage(e.target.files[0]);
        } else {
            document.getElementById("imgPreview").src = defaultImg;
            setImage(null);
        }
    }

    // if user is not login then show login page 
    if (props.authToken === null) {
        return <Sign_in authToken={props.authToken} setAuthToken={props.setAuthToken} />
    }
    return (
        <>
            <Nav_bar authToken={props.authToken} setAuthToken={props.setAuthToken} />
            <Alertmst msg={msg} setMsg={setMsg} />
            <Background />
            <div className="loader"></div>
            <div className="link-form-container">
                <p className="title">EDIT LINK TREE</p>
                <form className="form" onSubmit={handleSubmit}>
                    <div className="link-input-group">
                        <label htmlFor="name">Name</label>
                        <input type="text" name="name" id="name" placeholder="Your name here" value={userData.name} onChange={handleInput} />
                    </div>
                    <div className="link-input-group">
                        <label htmlFor="designation">Designation</label>
                        <input type="text" name="designation" id="designation" placeholder="Your designation here" value={userData.designation} onChange={handleInput} />
                    </div>
                    <div className="link-input-group">
                        <label htmlFor="Profile">Profile photo</label>
                        <input type="file" name="Profile" id="Profile" accept="image/*" onChange={handlePhoto} />
                        <img src={defaultImg} alt='Image Preview' id='imgPreview' />
                    </div>
                    <div className="link-input-group">
                        <label htmlFor="about">About</label>
                        <input type="text" name="about" id="about" placeholder="About section" value={userData.about} onChange={handleInput} />
                    </div>
                    <div className='flex-container'>
                        <div className="link-input-group half">
                            <label htmlFor="portfolio">Portfolio</label>
                            <input type="text" name="portfolio" id="portfolio" placeholder="Portfolio profile url here" value={userData.portfolio} onChange={handleInput} />
                        </div>
                        <div className="link-input-group half">
                            <label htmlFor="resume">Resume</label>
                            <input type="text" name="resume" id="resume" placeholder="Resume profile url here" value={userData.resume} onChange={handleInput} />
                        </div>
                        <div className="link-input-group half">
                            <label htmlFor="website">Website</label>
                            <input type="text" name="website" id="website" placeholder="Website profile url here" value={userData.website} onChange={handleInput} />
                        </div>
                    </div>

                    <p className="sub-title">SOCIAL MEDIA</p>
                    <div className='flex-container'>
                        <div className="link-input-group half">
                            <label htmlFor="linkedIn">LinkedIn</label>
                            <input type="text" name="linkedIn" id="linkedIn" placeholder="LinkedIn profile url here" value={userData.linkedIn} onChange={handleInput} />
                        </div>
                        <div className="link-input-group half">
                            <label htmlFor="twitter">Twitter</label>
                            <input type="text" name="twitter" id="twitter" placeholder="Twitter profile url here" value={userData.twitter} onChange={handleInput} />
                        </div>
                        <div className="link-input-group half">
                            <label htmlFor="instagram">Instagram</label>
                            <input type="text" name="instagram" id="instagram" placeholder="Instagram profile url here" value={userData.instagram} onChange={handleInput} />
                        </div>
                        <div className="link-input-group half">
                            <label htmlFor="facebook">Facebook</label>
                            <input type="text" name="facebook" id="facebook" placeholder="Facebook profile url here" value={userData.facebook} onChange={handleInput} />
                        </div>
                    </div>
                    <p className="sub-title">CODING PLATFORMS</p>
                    <div className='flex-container'>
                        <div className="link-input-group half">
                            <label htmlFor="hackerRank">HackerRank</label>
                            <input type="text" name="hackerRank" id="hackerRank" placeholder="HackerRank profile url here" value={userData.hackerRank} onChange={handleInput} />
                        </div>
                        <div className="link-input-group half">
                            <label htmlFor="hackerEarth">HackerEarth</label>
                            <input type="text" name="hackerEarth" id="hackerEarth" placeholder="HackerEarth profile url here" value={userData.hackerEarth} onChange={handleInput} />
                        </div>
                        <div className="link-input-group half">
                            <label htmlFor="codeChef">CodeChef</label>
                            <input type="text" name="codeChef" id="codeChef" placeholder="CodeChef profile url here" value={userData.codeChef} onChange={handleInput} />
                        </div>
                        <div className="link-input-group half">
                            <label htmlFor="codeforces">Codeforces</label>
                            <input type="text" name="codeforces" id="codeforces" placeholder="Codeforces profile url here" value={userData.codeforces} onChange={handleInput} />
                        </div>
                        <div className="link-input-group half">
                            <label htmlFor="leetCode">LeetCode</label>
                            <input type="text" name="leetCode" id="leetCode" placeholder="LeetCode profile url here" value={userData.leetCode} onChange={handleInput} />
                        </div>
                        <div className="link-input-group half">
                            <label htmlFor="geeksforgeeks">GeeksforGeeks</label>
                            <input type="text" name="geeksforgeeks" id="geeksforgeeks" placeholder="GeeksforGeeks profile url here" value={userData.geeksforgeeks} onChange={handleInput} />
                        </div>
                        <div className="link-input-group half">
                            <label htmlFor="gitHub">GitHub</label>
                            <input type="text" name="gitHub" id="gitHub" placeholder="GitHub profile url here" value={userData.gitHub} onChange={handleInput} />
                        </div>
                        <div className="link-input-group half">
                            <label htmlFor="codePen">CodePen</label>
                            <input type="text" name="codePen" id="codePen" placeholder="CodePen profile url here" value={userData.codePen} onChange={handleInput} />
                        </div>
                    </div>

                    <button className="sign" type='submit'>
                    {showLoader ?
                            <Oval
                                height={25}
                                width={25}
                                color="black"
                                wrapperStyle={{}}
                                wrapperclassName="loader_react"
                                visible={true}
                                ariaLabel='oval-loading'
                                secondaryColor="grey"
                                strokeWidth={5}
                                strokeWidthSecondary={5}
                            /> : 'Save'}
                        </button>
                </form>
            </div>
            <Foot />
        </>
    )
}

export default Edit