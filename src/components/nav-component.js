import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import AuthService from "../services/auth.service";

const NavComponent = (props) => {
  let { currentUser, setCurrentUser } = props;
  const navigate = useNavigate();
  const handleLogout = () => {
    AuthService.logout();
    window.alert("Logout Successfully, now you are redirect to the homepage.");
    setCurrentUser(null);
    navigate("/", { replace: true });
  };
  const { pathname } = useLocation();
  return (
    <div>
      {/* 对登录状态的鉴权 */}
      <nav>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container-fluid">
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav">
                {!currentUser && (
                  <li className="nav-item">
                    <Link
                      className={`nav-link ${
                        pathname === "/" ? "active" : null
                      }`}
                      to="/"
                    >
                      Home
                    </Link>
                  </li>
                )}
                {!currentUser && (
                  <li className="nav-item">
                    <Link
                      className={`nav-link ${
                        pathname === "/register" ? "active" : null
                      }`}
                      to="/register"
                    >
                      Register
                    </Link>
                  </li>
                )}
                {!currentUser && (
                  <li className="nav-item">
                    <Link
                      className={`nav-link ${
                        pathname === "/login" ? "active" : null
                      }`}
                      to="/login"
                    >
                      Login
                    </Link>
                  </li>
                )}
                {currentUser && (
                  <li className="nav-item">
                    <Link onClick={handleLogout} className="nav-link " to="">
                      Logout
                    </Link>
                  </li>
                )}
                {currentUser && (
                  <li className="nav-item">
                    <Link
                      className={`nav-link ${
                        pathname === "/profile" ? "active" : null
                      }`}
                      to="/profile"
                    >
                      Profile
                    </Link>
                  </li>
                )}
                {currentUser && (
                  <li className="nav-item">
                    <Link
                      className={`nav-link ${
                        pathname === "/course" ? "active" : null
                      }`}
                      to="/course"
                    >
                      Course
                    </Link>
                  </li>
                )}
                {/* 判断用户类型 */}
                {currentUser && currentUser.user.role === "instructor" && (
                  <li className="nav-item">
                    <Link
                      className={`nav-link ${
                        pathname === "/postCourse" ? "active" : null
                      }`}
                      to="/postCourse"
                    >
                      Post Course
                    </Link>
                  </li>
                )}
                {currentUser && currentUser.user.role === "student" && (
                  <li className="nav-item">
                    <Link
                      className={`nav-link ${
                        pathname === "/enroll" ? "active" : null
                      }`}
                      to="/enroll"
                    >
                      Enroll
                    </Link>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </nav>
      </nav>
    </div>
  );
};

export default NavComponent;
