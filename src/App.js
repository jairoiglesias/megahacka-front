import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MailIcon from '@material-ui/icons/Mail';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';



import {BrowserRouter, Link, Route} from 'react-router-dom'

import QuestionScreen from './Question'
import AnswerScreen from './Answer'

const drawerWidth = 240;

require('dotenv').config()

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
      marginLeft: 20,
      marginRight: 10,
    // },
    background: 'rgb(225	150	147)'
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    // backgroundImage: "url(https://image.flaticon.com/icons/svg/952/952418.svg)",
    // backgroundPosition: 'center',
    // backgroundSize: 'cover',
    // backgroundRepeat: 'no-repeat',
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 200,
  },
  textField: {
    width: 600,
  },
  button: {
    background: 'rgb(225	150	147)'
  }
}));

function ResponsiveDrawer(props) {
  const { window } = props;
  const classes = useStyles();
  const theme = useTheme();
  
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [age, setAge] = React.useState('');
  
  const itemsMenu = [
    {
      id: 1,
      menuName: 'Perguntar',
      route: '/questions'
    },
    {
      id: 2,
      menuName: 'Responder',
      route: '/answer'
    }
  ]

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <Divider />
      <List>
        {itemsMenu.map((menuItem, menuIndex) => (
          <Link to={menuItem.route} >
            <ListItem button key={menuItem.id}>
                <ListItemIcon>{menuIndex % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                <ListItemText primary={menuItem.menuName} />
            </ListItem>
          </Link>
        ))}
      </List>
      <Divider />
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <BrowserRouter>
    
    
    <div className={classes.root}>
      {/* <CssBaseline /> */}
      <AppBar 
        position="fixed" 
        className={classes.appBar}
      >
        <Toolbar>
          {/* <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton> */}
          <Typography variant="h6" noWrap>
            Simulador de Perguntas e Respostas
          </Typography>
        </Toolbar>
      </AppBar>

      {/* <Route path="/questions">
        <QuestionScreen />
      </Route>

      <Route path="/answer">
        <AnswerScreen />
      </Route> */}

      <QuestionScreen />
      <AnswerScreen />

    </div>
    
    </BrowserRouter>

      
  );
}

ResponsiveDrawer.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default ResponsiveDrawer;
