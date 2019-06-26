import React from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink, } from 'reactstrap';
import { connect } from 'react-redux';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  render() {
    return (
      <div>
        <Navbar color="light" light expand="md" fixed="top">
          <NavbarBrand href="/" style={{fontWeight: "bold", color: '#FD6861'}}>My Tech World</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav navbar>
              <NavItem>
                <NavLink href="#" onClick={() => this.props.viewonlylike(false)}>The projects</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="#" onClick={() => this.props.viewonlylike(true)}>TOP 3</NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    viewonlylike: function(view) {
        dispatch({
          type: 'viewonlylike',
          view
        })
    }
  }
}


export default connect(
    null,
    mapDispatchToProps
)(Header);
