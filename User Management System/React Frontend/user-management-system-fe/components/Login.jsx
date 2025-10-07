import "../src/Login.css";

const Login = () => {
  return (
    <div>
      <div className="loginbgdiv">
        <h1>Login</h1>
        <div className="logindivs">
          <p style={{ margin: 0, marginRight: "8px" }}>User id</p>
          <input
            className="inputfield"
            type="text"
            placeholder="Enter your userid"
            style={{ marginLeft: "28px" }}
          />
        </div>
        <div className="logindivs">
          <p style={{ margin: 0, marginRight: "8px" }}>Password</p>
          <input
            className="inputfield"
            type="password"
            placeholder="Enter your Password"
          />
        </div>
        <div>
          <button className="button">Login</button>
        </div>
      </div>
    </div>
  );
};

export default Login;
