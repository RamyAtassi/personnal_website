import React from "react";
import { Jumbotron, Button } from "reactstrap";
import { connect } from "react-redux";

const Jumbo = props => {
  return (
    <div>
      <Jumbotron fluid className="Jumbotron" style={{ marginTop: 40 }}>
        <h1 className="display-3" style={{ fontWeight: "bold" }}>
          Ramy Atassi
        </h1>

        <p className="lead">Summary of main projects</p>
        <hr className="my-2" />
        <p>Full-Stack projects</p>
        <p className="lead">
          <Button color="dark" onClick={() => props.viewonlylike(true)}>
            Discover my projects
          </Button>
        </p>
      </Jumbotron>
    </div>
  );
};

function mapDispatchToProps(dispatch) {
  return {
    viewonlylike: function(view) {
      dispatch({
        type: "viewonlylike",
        view
      });
    }
  };
}

export default connect(
  null,
  mapDispatchToProps
)(Jumbo);
