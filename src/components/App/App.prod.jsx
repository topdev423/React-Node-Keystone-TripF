import React, { Component, PropTypes }      from 'react';
import { connect }                          from 'react-redux';
import { Link }                             from 'react-router';
import getMuiTheme                          from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider                     from 'material-ui/styles/MuiThemeProvider';
import MoreVertIcon                         from 'material-ui/svg-icons/navigation/more-vert';
import {
  indigo100,
  indigo500,
  indigo700
}                                           from 'material-ui/styles/colors';
import {
  AppBar,
  Drawer,
  MenuItem,
  IconMenu,
  IconButton,
  FontIcon,
  FlatButton,
  Dialog,
  RefreshIndicator
}                                           from 'material-ui';
import {
  LoginForm,
  RegisterForm
}                                           from '../User';
import {
  refreshToken,
  doLogout,
  hideError
}                                           from '../../redux/actions/userActions';

const propTypes = {
  user: PropTypes.object,
  children: PropTypes.node,
  menu: PropTypes.array,
  userAgent: PropTypes.string,
  dispatch: PropTypes.func
};

class App extends Component {
  constructor(props) {
    super(props);
    this.handleToggleDrawer = this.handleToggleDrawer.bind(this);
    this.handleLoginModal = this.handleLoginModal.bind(this);
    this.handleRegisterModal = this.handleRegisterModal.bind(this);
    this.handleCloseModals = this.handleCloseModals.bind(this);
    this.handleLogout = this.handleLogout.bind(this);

    this.state = {
      showDrawer: false,
      showLoginModal: false,
      showRegisterModal: false
    };
  }

  componentDidMount() {
    if (typeof localStorage !== 'undefined' && localStorage.getItem('token') && !this.props.user.logged) {
      this.props.dispatch(refreshToken());
    }
  }

  handleToggleDrawer() {
    this.setState({
      showDrawer: !this.state.showDrawer
    });
  }

  handleLoginModal() {
    this.setState({
      showLoginModal: true,
      showRegisterModal: false
    });
    this.props.dispatch(hideError());
  }

  handleRegisterModal() {
    this.setState({
      showLoginModal: false,
      showRegisterModal: true
    });
    this.props.dispatch(hideError());
  }

  handleCloseModals() {
    this.setState({
      showLoginModal: false,
      showRegisterModal: false
    });
    this.props.dispatch(hideError());
  }

  handleLogout() {
    this.props.dispatch(doLogout());
  }

  render() {
    let registerDialog = '';
    let loginDialog = '';
    let rightButton = '';

    const muiTheme = getMuiTheme({
      palette: {
        primary1Color: indigo500,
        primary2Color: indigo700,
        primary3Color: indigo100
      }
    }, {
      avatar: {
        borderColor: null
      },
      userAgent: this.props.userAgent
    });

    if (this.props.user.logged) {
      rightButton = (
        <IconMenu
          iconButtonElement={
            <IconButton><MoreVertIcon /></IconButton>
          }
          targetOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
        >
          <MenuItem primaryText='Help' />
          <MenuItem primaryText='Sign out' onTouchTap={this.handleLogout} />
        </IconMenu>
      );
    } else {
      const indicator = this.props.user.loading
      ? (
        <RefreshIndicator
          size={20}
          left={10}
          top={5}
          status='loading'
          style={{
            display: 'inline-block',
            position: 'relative',
            float: 'left'
          }}
        />
        )
      : '';

      const actionLoginOpen = (
        <FlatButton
          label='Login'
          primary
          onTouchTap={this.handleLoginModal}
        />
      );

      const actionRegisterOpen = (
        <FlatButton
          label='Register'
          primary
          onTouchTap={this.handleRegisterModal}
        />
      );

      const actionCloseModals = (
        <FlatButton
          label='Cancel'
          primary
          onTouchTap={this.handleCloseModals}
        />
      );

      loginDialog = (
        <Dialog
          title='Login'
          actions={[indicator, actionRegisterOpen, actionCloseModals]}
          modal
          contentStyle={{ width: '320px' }}
          open={this.state.showLoginModal}
          onRequestClose={this.handleCloseModals}
          autoDetectWindowHeight
          autoScrollBodyContent
        >
          <LoginForm />
        </Dialog>
      );

      registerDialog = (
        <Dialog
          title='Register'
          actions={[indicator, actionLoginOpen, actionCloseModals]}
          modal
          contentStyle={{ width: '320px' }}
          open={this.state.showRegisterModal}
          onRequestClose={this.handleCloseModals}
          autoDetectWindowHeight
          autoScrollBodyContent
        >
          <RegisterForm />
        </Dialog>
      );

      rightButton = <FlatButton style={{ color: '#fff', margin: '6px' }} label='Login' onTouchTap={this.handleLoginModal} />;
    }

    const styles = {
      root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around'
      }
    };

    const imgUrl = 'https://goo.gl/KzEDSx';

    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div style={styles.root}>
          <AppBar
            title={<Link className='logo' to='/'>HVU</Link>}
            onLeftIconButtonTouchTap={this.handleToggleDrawer}
            iconElementRight={rightButton}
          />

          <Drawer
            id='drawer'
            docked={false}
            width={300}
            open={this.state.showDrawer}
            onRequestChange={(showDrawer) => this.setState({ showDrawer })}
          >
            <AppBar
              title='HVU Menu'
              iconElementLeft={<img src={imgUrl}/>}
            />
            {this.props.menu.map((item, i) => {
              return (
                <Link key={i} className='menu-link' to={item.url}>
                  <MenuItem
                    primaryText={item.label}
                    leftIcon={<FontIcon className='material-icons'  style={{ color: '#364B9F' }} >{item.icon}</FontIcon>}
                    onTouchTap={this.handleToggleDrawer}
                    value={item.url}
                  />
                </Link>
              );
            })}
          </Drawer>

          <div>
            {this.props.children}
          </div>
          {loginDialog}
          {registerDialog}
        </div>
      </MuiThemeProvider>
    );
  }
}

App.propTypes = propTypes;

function mapStateToProps(state) {
  const user = state.user;
  const userAgent = state.theme.userAgent;
  const menu = state.menu.items;

  return {
    user,
    userAgent,
    menu
  };
}

export default connect(mapStateToProps)(App);
