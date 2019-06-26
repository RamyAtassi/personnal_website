import React, { Component } from 'react';
import Navbar from './Navbar';
import Jumbotron from './Jumbotron';
import Project from './Project';
import Alert from './Alert';
import Footer from './Footer';
import { Container, Row } from 'reactstrap';

// REDUX
import { connect } from 'react-redux';

class MainScreen extends Component {

  constructor(){
    super()
    this.state={
      visible: false
    }
  }

  componentDidMount = () => {

    // API ALL PROJECTS
    fetch('https://capsule-exams.herokuapp.com/api/capsule/projects')
    .then(res => res.json())
    .then(data => {
      this.props.handleProjects(data.projects)
    })
    .catch(err => console.log(err))

    // MY LIKED PROJECTS
    fetch('https://capsule-exams.herokuapp.com/all-projects')
    .then(res => res.json())
    .then(data => {
      this.props.handleLikeProjects(data.data)
    })
    .catch(err => console.log(err))

  }



  render() {

    const projects = this.props.fetchProjects;
    const likedprojects = this.props.likedprojects;

    const projectsList = projects.map((project, i) => {
      var islike = false;
        for (var y = 0; y < likedprojects.length; y++) {

          if (project.idproject === likedprojects[y].idproject) {
            islike = true;
            break;
          }

        }

        return(
          <Project
            name={project.name}
            desc={project.desc}
            pic_url={project.pic_url}
            stack_back={project.stack_back}
            stack_front={project.stack_front}
            days_spent={project.days_spent}
            idproject={project.idproject}
            like={islike}
            displayOnlyLike={this.props.viewonlylike}
            key={i}/>
        )

    })

    const alertsList = this.props.alert.map((alert, i) => {
      return(
        <Alert style={styles.alert} key={i} msg={alert.msg} isOpen={alert.status} alertType={alert.alertType} fade={true}/>
      )
    })

    return (
        <div>
          <Navbar/>
          <div style={styles.main}>
          {alertsList}
          </div>
          <Jumbotron/>
            <Container>
              <Row>
              { projectsList }
              {
                this.props.viewonlylike && this.props.likedprojects.length < 1
                  ? <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', textAlign: 'center', margin: 100, color: '#FD6861'}}><h3>Aucun projet dans le TOP 3...</h3></div>
                  : ''
              }
              </Row>
            </Container>
          <Footer/>
        </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    handleProjects: function(projects) {
        dispatch({
          type: 'getprojects',
          projects
        })
    },
    handleLikeProjects: function(projects) {
        dispatch({
          type: 'getlikedprojects',
          projects
        })
    },

  }
}

const styles = {
  main: {
    position: 'fixed',
    top: 54,
    left: 0,
    width: '100%',
    zIndex: 999999
  },
  alert: {
    margin: '0 auto',
  }
}

function mapStateToProps(state) {
  return {
    fetchProjects: state.projects,
    likedprojects: state.likedprojects,
    viewonlylike: state.viewonlylike,
    alert: state.alert,
  }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MainScreen);
