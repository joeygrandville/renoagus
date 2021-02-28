import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import LinkButton from "../../components/LinkButton";
import { useAuth } from "../../utils/auth";
import "./admin.css";

const Admin = () => {
  const { user, app } = useAuth();
  const history = useHistory();
  useEffect(() => {
    if (!user) history.replace("/login");
  }, [user, history]);
  const txt =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
  return (
    <>
      <div className="admin-header">
        <div className="admin-header-title">Admin</div>
        <div>
          <LinkButton onClick={() => app.auth().signOut()}>logout</LinkButton>
        </div>
      </div>
      <div className="admin-container">
        {Array.from(Array(100), (_, x) => x).map((key) => (
          <p {...{ key }}>{txt}</p>
        ))}
      </div>
    </>
  );
};

export default Admin;
