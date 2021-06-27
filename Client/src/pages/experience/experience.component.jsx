import React from "react";
import Container from "react-bootstrap/Container";
import Jumbotron from "react-bootstrap/Jumbotron";
import Card from "react-bootstrap/Card";
import L_ACCENTURE from "../../assets/img/experience/accenture-3.svg";
import Tilt from "react-tilt";
import "./experience.styles.css";

const Experience = () => {
  return (
    <div id="experience">
      <h1 className="pt-3 text-center font-details-b pb-3">EXPERIENCE</h1>
      <Jumbotron className="jumbo-style">
        <Container>
          <Tilt options={{ max: 25 }}>
            <Card>
              <Card.Header
                as="h5"
                className="d-flex justify-content-center flex-wrap"
              >
                <Card.Img
                  variant="top"
                  className="img-resize"
                  src={L_ACCENTURE}
                  alt="Accenture logo"
                />
              </Card.Header>
              <Card.Body className="d-flex justify-content-center flex-column">
                <div>
                  <Card.Title className="text-center">
                  Application web developer
                  </Card.Title>
                </div>
                <div>
                  <Card.Text className="text-center style">
                    <strong className="body-title-style ">
                      Full Stack web Developer
                    </strong>
                    <br />
                    <strong>Technology:</strong> React JS,hooks, Node js,
                    express.js, MongoDB
                    <br />
                    <strong>Duration:</strong> June 2019 - Present
                    <br />
                    <strong> Description </strong>
                    <ul className="text-left">
                      <strong>Why to choose me ?</strong>
                      <li>
                        Performs quality tests on the whole system i build
                      </li>
                      <li>Personal customization</li>
                      <li>
                        Works with specific technologies which gives me to give
                        you all my Rich experience at quality work.
                      </li>
                      <li>Attentive to the customer's needs Uncompromising</li>
                      <li>Quick communication</li>
                      <li>
                        I will not take on a project that i think i can not
                        produce the best.
                      </li>
                      <br></br>
                      <strong>What you will be provided with ?</strong>
                      <li>Security for your web</li>
                      <li>Responsive design</li>
                      <li>
                        Panel admin - to control on orders/users, alerts, and
                        more features
                      </li>
                      <li>Domain and Hosting (I will charge extra amount)</li>
                      <li>Payment system to receive payments from customer</li>
                      <li>user-login</li>
                      <li>Additional features</li>
                      {/* <li><strong>Co-created</strong> React Document used as a guide for new developers.</li> */}
                    </ul>
                  </Card.Text>
                </div>
              </Card.Body>
            </Card>
          </Tilt>
        </Container>
      </Jumbotron>
    </div>
  );
};

export default Experience;
