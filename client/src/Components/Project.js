import React from 'react';
import { Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button, Col, Badge, Progress } from 'reactstrap';
import { connect } from 'react-redux';

class Project extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      like: props.like
    }
  }

  // SECURITY FOR UNSAFE RELOADING (OPTIONAL)
  componentDidUpdate(prevProps, prevState) {
    if(prevProps.like !== this.props.like) {
      this.setState({like: this.props.like})
    }
  }


  handleClickLike = () => {

    const body = {
    name: this.props.name,
    desc: this.props.desc,
    pic_url: this.props.pic_url,
    stack_front: this.props.stack_front,
    stack_back: this.props.stack_back,
    days_spent: this.props.days_spent,
    idproject: this.props.idproject
    }

    if (this.props.likedprojects.length < 3) {
      fetch('https://capsule-exams.herokuapp.com/like-project', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(body)
        })
        .then(res => res.json())
        .then(data => {
          this.setState({
            like: true
          })
          this.props.newlikedproject(data.project)
          const id = Math.floor(Math.random() * 1000);
          this.props.alert("new", id)
          setTimeout( () => {
            this.props.closealert(id);
          }, 3000);

        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      const id = Math.floor(Math.random() * 1000);
      this.props.alert("error", id)
      setTimeout( () => {
        this.props.closealert(id);
      }, 3000);
    }

  }

  handleClickDislike = (idproject) => {
    fetch(`https://capsule-exams.herokuapp.com/like-project/${idproject}`, {
        method: 'DELETE'})
        .then(res => res.json())
        .then(data => {
          this.props.dislikeproject(idproject)
          this.setState({
            like: false
          })
          const id = Math.floor(Math.random() * 1000);
          this.props.alert("delete", id)
          setTimeout( () => {
            this.props.closealert(id);
          }, 3000);
        })
        .catch((error) => {
        console.error(error);
      });
  }

  render() {

    let stackFront = this.props.stack_front.map((e, i) => {
      return(
        <Badge key={i} color="secondary" style={{padding: 5, margin: 5}}>{e}</Badge>
      )
    })

    let stackBack = this.props.stack_back.map((e, i) => {
      return(
        <Badge key={i} color="secondary" style={{padding: 5, margin: 5}}>{e}</Badge>
      )
    })

    let display = {}

    !this.state.like && this.props.viewonlylike
    ? display.display = 'none'
    : display.display = ''

    return (
      <Col xs="12" md="6" lg="4" style={display}>
        <div>
          <Card style={{marginBottom: 10}}>
          <div style={{backgroundColor: "#FD6861"}}>
            <CardImg top style={{width: '50%', padding: 20}} src={this.props.pic_url} alt="Card image cap" />
          </div>
            <CardBody>
              <CardTitle style={{fontWeight: "bold", fontSize: 18}}>{this.props.name}</CardTitle>
              <CardSubtitle style={{minHeight: 50, marginBottom: 10}}>{this.props.desc}</CardSubtitle>
              <CardText><span style={{fontWeight: 'bold'}}>Stack Front</span> <br/><span>{stackFront}</span></CardText>
              <CardText><span style={{fontWeight: 'bold'}}>Stack Back</span> <br/><span>{stackBack}</span></CardText>
              <span style={{fontWeight: 'bold', textAlign: 'center', marginTop: 10, marginBottom: 10}}>{this.props.days_spent}/5 days spent</span>
                    <Progress style={{marginBottom: 20}} color='secondary' value={this.props.days_spent*100/5}/>
              {
                !this.state.like
                  ? <Button onClick={() => this.handleClickLike()} outline color="dark"> + Favorite </Button>
                  : <Button onClick={() => this.handleClickDislike(this.props.idproject)} color="dark"> - Favorite </Button>
              }

            </CardBody>
          </Card>
        </div>
      </Col>
    );
  }
}

function mapStateToProps(state) {
  return {
    viewonlylike: state.viewonlylike,
    likedprojects: state.likedprojects
  }
}

function mapDispatchToProps(dispatch) {
  return {
    newlikedproject: function(project) {
        dispatch({
          type: 'newlikedproject',
          project
        })
    },
    dislikeproject: function(idproject) {
        dispatch({
          type: 'dislikeproject',
          idproject
        })
    },
    alert: function(status, id) {
        dispatch({
          type: 'alert',
          status,
          id
        })
    },
    closealert: function(id) {
        dispatch({
          type: 'closealert',
          id
        })
    },
  }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Project);
