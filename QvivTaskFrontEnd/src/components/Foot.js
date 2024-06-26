import React from 'react'
import { FaInstagram,FaCodepen, FaGithub } from "react-icons/fa";
import { Link } from 'react-router-dom';

function Foot(props) {
  return (
    <>
        <footer>
            <div className="social">
                <p>Follow me on social media</p>
                <ul className="wrapper">
                    <a href="https://github.com/Upadhyay-Yatendra/" target="_blank">
                        <li className="icon github">
                            <span className="tooltip">GitHub</span>
                            <span><FaGithub/></span>
                        </li>
                    </a>
                    <a href="https://www.instagram.com/" target="_blank">
                        <li className="icon instagram">
                            <span className="tooltip">Instagram</span>
                            <span><FaInstagram/></span>
                        </li>
                    </a>
                    <a href="https://codepen.io/" target="_blank">
                        <li className="icon github">
                            <span className="tooltip">CodePen</span>
                            <span><FaCodepen/></span>
                        </li>
                    </a>
                </ul>
            </div>
            {/* show create tree option only on view tree page  */}
            {props.showCreate ? <p><Link to='/'>Create Your social</Link></p> : '' }
            <p>Qviv-Task</p>
        </footer>
    </>
  )
}

export default Foot