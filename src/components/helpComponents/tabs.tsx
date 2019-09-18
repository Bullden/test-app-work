import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import {Link} from "react-router-dom";
import {Redirect} from 'react-router'
import { LoginProps } from "@components/login/loginComponent";
import { environment } from "../../enviroment";
import { connect } from "react-redux";
import {LoginRequest} from "@redux/login/types";
import { RootState } from "@redux/rootReducer";
import SimplePopover from "./popup";
import ButtonComponent from "./button";
import VerifiedUserIcon from "@material-ui/icons/VerifiedUser";
import PopoverUser from "@components/user/userRoom";
import LinearIndeterminate from "./loader";
import { doLogin } from "@redux/login/sagasLogin";


const useStyles = makeStyles({
  root: {
    flexGrow: 0
  }
});
export interface LoginProps {
  doLogin: (data: LoginRequest) => object;
  isLoggedIn: boolean;
}
const CenteredTabs = (props: any) => {
  const classes = useStyles({});
  const [value, setValue] = React.useState(0);
  function handleChange(event: React.ChangeEvent<{}>, newValue: number) {
    setValue(newValue);
  }
  const isLoading = props.isLoading;
  let isLoggedIn = props.isLoggedIn;
  const local: any = localStorage.getItem("user");
  const fakeUser = {
    id: 99,
    name: "fakeUser",
    password: "fakeUser",
    email: "fakeUser",
    permissions:['fakeUser']
  };

  const roleLocal = JSON.parse(local).permissions
  const perm = roleLocal.find((x: any) => { return x})

  function handleClick() {
 
   localStorage.removeItem("user");
    
    <Redirect to ='/login' />
  }
  return (
    <div>
      {isLoading ? <LinearIndeterminate /> : null}
      <Paper className={classes.root}>
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          centered
        >
          <Tab label="Home" value="/" component={Link} to="/" />
          {!isLoggedIn &&
          JSON.parse(local).name === fakeUser.name &&
          JSON.parse(local).email === fakeUser.email &&
          JSON.parse(local).password === fakeUser.password ? (
            <Tab
              label="Registration"
              value="/registration"
              component={Link}
              to="/registration"
            />
          ) : null}
          { 'admin' === perm  ? (
            <Tab
              label="Admin User Page"
              value="/adminUserPage"
              component={Link}
              to="/adminUserPage"
            />
          ) : null}
          { 'admin' === perm  ? (
            <Tab
              label="Admin Book Page"
              value="/adminBookPage"
              component={Link}
              to="/adminBookPage"
            />
          ) : null}
          {!isLoggedIn &&
          JSON.parse(local).name === fakeUser.name &&
          JSON.parse(local).email === fakeUser.email &&
          JSON.parse(local).password === fakeUser.password ? (
            <Tab label="Login" value="/login" component={Link} to="/login" />
          ) : (
           <ButtonComponent text ='Logout' click = {handleClick} />
          )}
          <SimplePopover />         
          { 'user'=== perm  ? (
            <div style={{ marginTop: "10px" }}>
              <PopoverUser />
            </div>
          ) : null}
          { 'admin' === perm ? (
            <div style={{ marginTop: "10px" }}>
              <VerifiedUserIcon />
            </div>
          ) : null}
        </Tabs>
      </Paper>
    </div>
  );
};
const mapStateToProps = function(state: RootState) {
  return {
    role: state.login.token.permissions,
    isLoggedIn: state.login.isLoggedIn,
    isLoading: state.login.isLoading
  };
};
export default connect(mapStateToProps)(CenteredTabs);
