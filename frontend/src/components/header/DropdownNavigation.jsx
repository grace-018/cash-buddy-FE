import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import styles from "./Header.module.css";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import TransactionContext from "../../context/TransactionContext";
import baseUrl from "../../api/fetch.js";

function DropdownNavigation({ setLoggedIn, userData }) {
  const fontColor = {
    color: "black",
  };
  const { clearData } = useContext(TransactionContext);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorText, setErrorText] = useState("");

  const userEmail = userData.email;
  const userDataId = userData.id;
  const userDataName = userData.username;

  const navigate = useNavigate();

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const handleDeactivateAccount = async (userId) => {
    userId = userDataId;
    //Display confirmation dialog to the user
    const confirmed = confirm(
      `Are you sure you want to deactivate your ${userEmail} account `
    );
    if (confirmed) {
      try {
        const token = window.localStorage.getItem("token").replace(/"/g, "");
        await fetch(`${baseUrl}/api/v1/user/deactivate/`, {
          method: "PUT",
          headers: {
            authorization: "Bearer " + token,
            "Content-Type": "application/json",
          },
        });

        //Handle successful response
        alert(`${userEmail} is now deactivated`);
        localStorage.removeItem("user");
        setLoggedIn(false);
        navigate("/login");
        localStorage.removeItem("token");
        window.location.reload(true);
      } catch (error) {
        //Handle error response
        alert(`Failed to deactivate ${userEmail}, ${error.message}`);
      }
    }
  };

  const handleViewReport = () => {
    // Logic for viewing the report
    navigate("/report");
  };

  const handleChangePassword = () => {
    // Logic for changing the password
    setShowPopup(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    //validate new Password
    if (!newPassword || !confirmPassword) {
      setErrorText("Please enter both passwords.");
      setTimeout(() => {
        setErrorText("");
      }, 3000);
      return;
    } else if (newPassword !== confirmPassword) {
      setErrorText("The two entered passwords do not match!");
      setTimeout(() => {
        setErrorText("");
      }, 3000);
      return;
    }
    try {
      //PUT request
      const token = window.localStorage.getItem("token").replace(/"/g, "");
      const response = await fetch(`${baseUrl}/api/v1/changepassword`, {
        method: "PUT",
        headers: {
          authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          oldPassword,
          newPassword,
        }),
      });

      if (!response.ok) {
        alert("Failed to change password");
      }

      if (response.ok) {
        // Handle Successful response
        setOldPassword("");
        setNewPassword("");
        setConfirmPassword("");
        setErrorText("");
        alert("Password change successful");
        setShowPopup(false);
      }
    } catch (error) {
      //Handle error response
      alert("An error occured while changing the password", error.message);
    }
  };

  const handleLogout = () => {
    setLoggedIn(false);
    navigate("/login");
    clearData();
    localStorage.removeItem("token");
    window.location.reload(true);
  };
  return (
    <Navbar
      bg="custom"
      expand="lg"
      onToggle={(isOpen) => setDropdownOpen(isOpen)}
      show={isDropdownOpen ? "true" : "false"}
      className={`${styles.dropdown} ${
        isDropdownOpen
          ? `${styles.dropdownToggle} open-dropdown`
          : styles.dropdownToggle
      }`}
    >
      <Nav
        bg="custom"
        expand="sm"
        className={`${styles.dropdown},navbar-toggler-icon`}
      >
        <NavDropdown
          title={<span className={styles.username}>{userDataName}</span>}
          id="basic-nav-dropdown"
        >
          <NavDropdown.Item onClick={handleViewReport}>
            View Report
          </NavDropdown.Item>
          <NavDropdown.Item onClick={handleChangePassword}>
            Change Password
          </NavDropdown.Item>
          <NavDropdown.Item onClick={handleDeactivateAccount}>
            Deactivate Account
          </NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
        </NavDropdown>
      </Nav>
      {/* Popup Modal */}
      <div
        className={`modal ${showPopup ? "show" : ""}`}
        style={{ display: showPopup ? "block" : "none" }}
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" style={fontColor}>
                Change Password
              </h5>
              <button
                type="button"
                className="close"
                onClick={handleClosePopup}
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    placeholder="Enter your Current Password"
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="password"
                    className="form-control"
                    id="newPassword"
                    placeholder="Enter your New Password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="password"
                    className="form-control"
                    id="confirmPassword"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="text-center">
                  <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
                    {errorText && <div>{errorText} </div>}
                    <button type="submit" className="btn btn-primary me-sm-2">
                      Change Password
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div
        className={`modal-backdrop fade ${showPopup ? "show" : ""}`}
        style={{ display: showPopup ? "block" : "none" }}
      ></div>
      {/* End Popup Modal */}
    </Navbar>
  );
}

export default DropdownNavigation;
