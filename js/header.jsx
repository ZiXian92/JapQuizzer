import React from 'react';
import { Link } from 'react-router';
import AppBar from 'material-ui/lib/app-bar';
import LeftNav from 'material-ui/lib/left-nav';
import MenuItem from 'material-ui/lib/menus/menu-item';

const menuContent = [{
  label: 'Home',
  path: '/'
}, {
  label: 'Create Quiz',
  path: '/create'
}, {
  label: 'Resume Quiz',
  path: '/quiz'
}, {
  label: 'About',
  path: '/about'
}];

const Header = React.createClass({
  getInitialState(){
    return {
      open: false
    };
  },

  openSideNav(){
    this.setState({ open: true });
  },

  closeSideNav(){
    this.setState({ open: false });
  },

  render(){
    return (
      <div>
        <AppBar title="Japanese Quizzer" className="red-bg no-box-shadow"
          onLeftIconButtonTouchTap={this.openSideNav}></AppBar>
        <LeftNav docked={false} width={200}
          open={this.state.open} onRequestChange={open => this.setState({open})}>
          {menuContent.map(menuItem => (
            <Link to={menuItem.path} className="link" key={menuItem.label}>
              <MenuItem onTouchTap={this.closeSideNav}>{menuItem.label}</MenuItem>
            </Link>
          ))}
        </LeftNav>
      </div>
    );
  }
});

module.exports = {
  Header: Header
};
