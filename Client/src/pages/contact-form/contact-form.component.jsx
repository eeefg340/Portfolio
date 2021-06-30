import React, { useState } from "react";
import Jumbotron from "react-bootstrap/Jumbotron";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import "./contact-form.styles.css";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import Grid from "@material-ui/core/Grid";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { api } from "../../components/Api/Api";
import axios from "axios";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const ContactForm = () => {
  const classes = useStyles();
  const [FirstName, setFirstName] = useState("");
  const [LastName, setLastName] = useState("");
  const [Email, setEmail] = useState("");
  const [Subject, setSubject] = useState("");
  const [TextArea, setTextArea] = useState("");
  const [error, setError] = useState("");
  const [Success, setSuccess] = useState(false);
  const [SuccessMsg, setSuccessMsg] = useState("");
  const [Loading, setLoading] = useState(false);

  const SendForm = async (e) => {
    e.preventDefault();
    const options = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const PayLoad = {
      FirstName: FirstName,
      LastName: LastName,
      Email: Email,
      Subject: Subject,
      TextArea: TextArea,
    };

    try {
      setLoading(true);
      const response = await axios.post(`${api}mail`, PayLoad, options);
      setSuccessMsg(response.data.msg);
      setSuccess(response.data.Success);
      setLoading(false);
    } catch (e) {
      console.log(e.message);
      setError(e.response.data.err);
      setSuccess(false);
      setLoading(false);
    }
  };

  return (
    <div id="contact">
      <h1 className="pt-3 text-center font-details-b pb-3">CONTACT ME</h1>
      <Jumbotron className="contact-jumbotron">
        <Row>
          <Col className="d-flex justify-content-center flex-wrap">
            <Container component="main" maxWidth="xs">
              <CssBaseline />
              <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                  <AccountBoxIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                  Contact with me
                </Typography>
                <form className={classes.form} noValidate onSubmit={SendForm}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        autoComplete="fname"
                        name="firstName"
                        onChange={(e) => setFirstName(e.target.value)}
                        variant="outlined"
                        disabled={Success}
                        required
                        fullWidth
                        id="firstName"
                        label="First Name"
                        autoFocus
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        variant="outlined"
                        required
                        disabled={Success}
                        onChange={(e) => setLastName(e.target.value)}
                        fullWidth
                        id="lastName"
                        label="Last Name"
                        name="lastName"
                        autoComplete="lname"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        variant="outlined"
                        required
                        disabled={Success}
                        fullWidth
                        onChange={(e) => setEmail(e.target.value)}
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        variant="outlined"
                        required
                        disabled={Success}
                        onChange={(e) => setSubject(e.target.value)}
                        fullWidth
                        name="subject"
                        label="What project are we talking about?"
                        autoComplete="fname"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextareaAutosize
                        aria-label="minimum height"
                        onChange={(e) => setTextArea(e.target.value)}
                        rowsMin={2}
                        disabled={Success}
                        cl
                        placeholder="Give me more information I need to know"
                      />
                    </Grid>
                  </Grid>
                  <Button
                    type="submit"
                    fullWidth
                    disabled={Success}
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                  >
                    Send
                  </Button>
                </form>

                {Success ? (
                  <div style={{ color: "green", textAlign: "center" }}>
                    {SuccessMsg}
                  </div>
                ) : (
                  <div style={{ color: "red", textAlign: "center" }}>
                    {error}
                  </div>
                )}
                {Loading ? <CircularProgress /> : null}
              </div>
            </Container>
          </Col>
        </Row>
      </Jumbotron>
    </div>
  );
};

export default ContactForm;
