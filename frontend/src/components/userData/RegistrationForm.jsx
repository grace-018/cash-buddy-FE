import { useState } from "react";
import { Link } from "react-router-dom";
import baseURL from "../../api/fetch";

function RegistrationForm() {
  const styles = {
    backgroundColor: "#AEE2FF",
  };
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  const handleNameChange = (event) => {
    setUsername(event.target.value);
  };
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };
  const handlePasswordChange = (event) => {
    const value = event.target.value;
    setPassword(value);
  };

  const handleClosePopup = () => {
    <Link to="/" />;
    setShowPopup(false);
  };

  const handleRegister = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(`${baseURL}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          email,
          password,
        }),
      });

      const responseData = await response.json();

      if (!response.ok) {
        alert(`Failed to register ${responseData.message}`);
      }

      if (response.ok) {
        setShowPopup(true);
      }
    } catch (error) {
      alert("An error occurred", error.message);
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
            <h2 className="text-center mb-4">Be part of Cash Buddy Family!</h2>
            <form onSubmit={handleRegister}>
              <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  placeholder="Enter your name"
                  value={username}
                  onChange={handleNameChange}
                  required
                />
              </div>
              <div className="mb-3">
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={handleEmailChange}
                  required
                />
              </div>
              <div className="mb-3">
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={handlePasswordChange}
                  required
                />
              </div>
              <div className="text-center">
                <div className="d-grid gap-2 d-sm-flex justify-content-sm-center mb-2">
                  <button type="submit" className="btn btn-primary me-sm-2">
                    Register
                  </button>
                </div>
                <p>
                  Already have an account? Login
                  <Link to="/login"> here </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
      {/* Popup Modal */}
      <div
        className={`modal ${showPopup ? "show" : ""}`}
        style={{ display: showPopup ? "block" : "none" }}
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Complete Registration</h5>
              <button
                type="button"
                className="close"
                onClick={handleClosePopup}
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <p>Thank you for Registering!</p>
            </div>
            <div className="modal-footer">
              <Link to="/"> Proceed to Log-in </Link>
            </div>
          </div>
        </div>
      </div>
      <div
        className={`modal-backdrop fade ${showPopup ? "show" : ""}`}
        style={{ display: showPopup ? "block" : "none" }}
      ></div>
      {/* End Popup Modal */}
    </div>
  );
}

export default RegistrationForm;
