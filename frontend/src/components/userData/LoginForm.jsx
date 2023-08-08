import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import baseURL from "../../api/fetch";

function LoginForm({ setLoggedIn }) {
  const styles = {
    backgroundColor: "#1b7895",
    color: "whitesmoke",
  };

  const linkStyle = {
    color: "#DEECFF",
  };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const mail = "grace.sio18@gmail.com";

  const navigate = useNavigate();

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const loggedIn = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(`${baseURL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const responseData = await response.json();
      if (!response.ok) {
        alert(`Login Failed ${responseData.message}`);
      }

      if (response.ok) {
        setMessage("Login successful");
        const token = responseData.token;
        localStorage.setItem("token", JSON.stringify(token));
        setLoggedIn(true);
        navigate("/expense");
      }
    } catch (error) {
      alert(`An error occurred ${error.message}`);
    }
  };

  return (
    <div
      className="d-flex align-items-center justify-content-center vh-100"
      style={styles}
    >
      <div id="register" className="container">
        <div className="row justify-content-center">
          <div className="col-lg-6">
            <div className="text-center mb-4">
              <img
                src="./assets/cash-buddy-logo.png"
                alt="Cash Buddy Logo"
                className="img-fluid"
              />
            </div>
            <form onSubmit={loggedIn}>
              <div className="mb-3">
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  placeholder="Enter your email"
                  onChange={handleEmailChange}
                />
              </div>
              <div className="mb-3">
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  placeholder="Enter your password"
                  onChange={handlePasswordChange}
                />
              </div>
              <div className="text-center mb-3">
                <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
                  <button type="submit" className="btn btn-primary me-sm-2">
                    Log-in
                  </button>
                </div>
              </div>
              <p className="text-center mb-3">
                If you don't have an account, you can
                <Link to="/register" style={linkStyle}>
                  {" "}
                  create one now.{" "}
                </Link>
              </p>
              <p className="text-center mb-3">
                Need help? Contact{" "}
                <a style={linkStyle} href={`mailto:${mail}`}>
                  {mail}
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
