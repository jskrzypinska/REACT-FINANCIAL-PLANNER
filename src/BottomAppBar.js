import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import Icon from "@material-ui/core/Icon";
import { Button, Modal } from "@material-ui/core";
import { ExpensesForm } from "./components/ExpensesForm";
import { IncomesForm } from "./components/IncomesForm";
import costs from "./icons/costs.svg";
import revenues from "./icons/revenues.svg";
import { signOut } from "./services/AuthService";
import { useAuth } from "./hooks/useAuth";
import { Link, withRouter } from "react-router-dom";
// import Link from "@material-ui/core/Link";
const useStyles = makeStyles(theme => ({
  text: {
    padding: theme.spacing(2, 2, 0)
  },
  // paper: {
  //   paddingBottom: 50
  // },
  list: {
    marginBottom: theme.spacing(2)
  },
  subheader: {
    backgroundColor: theme.palette.background.paper
  },
  appBar: {
    top: "auto",
    bottom: 0
  },
  grow: {
    flexGrow: 1
  },
  fabButton: {
    position: "absolute",
    zIndex: 1,
    top: -30,
    left: 0,
    right: 0,
    margin: "0 auto",
    fontSize: 15,
    "&:disabled": {
      display: "none"
    }
  },
  paper: {
    position: "absolute",
    height: "auto",
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 4),
    outline: "none",
    top: "20%",
    left: 0,
    right: 0,
    margin: "0 auto",
    display: "flex",
    justifyContent: "space-around"
  },
  paperButton: {
    position: "absolute",
    height: "auto",
    backgroundColor: theme.palette.background.paper,
    // border: "2px solid #000",
    boxShadow: theme.shadows[5],
    // padding: theme.spacing(2, 4, 4),
    padding: "30px 20px",
    outline: "none",
    top: "60%",
    left: 0,
    right: 0,
    margin: "0 auto",
    display: "flex",
    justifyContent: "space-around"
  }
}));

// const LinkDashboard = React.forwardRef((props, ref) => (
//   <RouterLink innerRef={ref} {...props} />
// ));

const useIconStyles = makeStyles(theme => ({
  active: {
    color: "white"
  },
  inactive: {
    color: "grey"
  }
}));

const NavIconButton = withRouter(props => {
  const { location, to } = props;
  const isIconActive = location.pathname === to;
  const classes = useIconStyles();

  return (
    <Link to={props.to}>
      <IconButton edge={props.edge || "start"} aria-label="Charts">
        <Icon
          className={isIconActive ? classes.active : classes.inactive}
          fontSize="large"
          color={"primary"}
        >
          {props.icon}
        </Icon>
      </IconButton>
    </Link>
  );
});

export default function BottomAppBar(props) {
  const { onFormInput } = props;
  const classes = useStyles();
  const isLoggedIn = useAuth();

  const [open, setOpen] = React.useState(false);
  const [openExpenses, setOpenExpenses] = React.useState(false);
  const [openIncomes, setOpenIncomes] = React.useState(false);

  const handleOpen = () => {
    isLoggedIn && setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleOpenExpenses = () => {
    setOpenExpenses(true);
  };

  const handleCloseExpenses = () => {
    setOpenExpenses(false);
  };
  const handleOpenIncomes = () => {
    setOpenIncomes(true);
  };

  const handleCloseIncomes = () => {
    setOpenIncomes(false);
  };

  const onFormInputted = data => {
    onFormInput(data);
    setOpenExpenses(false);
    setOpenIncomes(false);
    setOpen(false);
  };

  return (
    <React.Fragment>
      <SimpleModal />

      <CssBaseline />

      <AppBar position="fixed" color="primary" className={classes.appBar}>
        <Toolbar>
          <NavIconButton to="/" icon="dashboard" />
          <NavIconButton to="/history" icon="list_alt" />
          <Fab
            style={{ backgroundColor: "rgb(195, 50, 50)", color: "white" }}
            disabled={!isLoggedIn}
            //color="rgb(195, 50, 50)"
            aria-label="Add"
            className={classes.fabButton}
            onClick={handleOpen}
          >
            <AddIcon />
          </Fab>
          <div className={classes.grow} />
          <NavIconButton to="/Charts" icon="assessment" />
          <NavIconButton to="/login" icon="person" />
          <IconButton color="inherit" aria-label="Charts" onClick={signOut}>
            <Icon fontSize="large">arrow_forward</Icon>
            {/* <Typography variant="button">Wykresy</Typography> */}
          </IconButton>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );

  function SimpleModal() {
    return (
      <React.Fragment>
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={open}
          style={{ minWidth: 100 }}
          onClose={handleClose}
        >
          <div className={classes.paperButton}>
            <Button
              style={{
                fontSize: 20,
                marginRight: 12,
                backgroundColor: "rgba(195, 50, 50, 1)",
                color: "white"
              }}
              variant="contained"
              onClick={handleOpenExpenses}
            >
              Dodaj wydatki
              <img src={costs} alt="costs" />
            </Button>
            <Button
              style={{
                fontSize: 20,
                marginLeft: 12,
                backgroundColor: "rgba(68, 105, 132, 1)",
                color: "white"
              }}
              color="primary"
              variant="contained"
              onClick={handleOpenIncomes}
            >
              Dodaj przychody
              <img src={revenues} alt="revenues" />
            </Button>
          </div>
        </Modal>

        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={openExpenses}
          onClose={handleCloseExpenses}
          style={{ minWidth: 100 }}
        >
          <div className={classes.paper}>
            <ExpensesForm onFormInput={onFormInputted} />
          </div>
        </Modal>
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={openIncomes}
          onClose={handleCloseIncomes}
          style={{ minWidth: 100 }}
        >
          <div className={classes.paper}>
            <IncomesForm onFormInput={onFormInputted} />
          </div>
        </Modal>
      </React.Fragment>
    );
  }
}
