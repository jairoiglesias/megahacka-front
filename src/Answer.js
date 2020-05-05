import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';

import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField'

import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';


import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';

import {inject, observer} from 'mobx-react'

const drawerWidth = 240;


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
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
    minWidth: 400,
  },
  textField: {
    width: 600,
  },
  button: {
    background: 'rgb(225	150	147)'
  }
}));

function AnswerScreen(props) {

    const { window, AdsStore, QuestionStore } = props;
    const classes = useStyles();
    const theme = useTheme();
    
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const [answer, setAnswer] = React.useState('');
    const [open, setOpen] = React.useState(false);
  
    const itemsMenu = ['Perguntar', 'Responder']


    const handleOpen = () => {
      setOpen(true);
    };

    const handleClose = () => {
      setOpen(false);
    };
  
    // const handleChange = (event) => {
    //   setAge(event.target.value);
    // };
  
    const handleDrawerToggle = () => {
      setMobileOpen(!mobileOpen);
    };

    return (

    <main className={classes.content}>
    <div className={classes.toolbar} />

    <FormControl className={classes.formControl}>
    <InputLabel id="demo-simple-select-label">Perguntas</InputLabel>
    <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        // value={age}
        // onChange={handleChange}
    >
        <MenuItem value={10}>{QuestionStore.questionData.question}</MenuItem>
        {/* <MenuItem value={20}>PlayStation</MenuItem>
        <MenuItem value={30}>Macbook Air</MenuItem> */}
    </Select>
    </FormControl>
    <br />

    <br />
    <br />
    <br />
    <TextField
      id="standard-basic"
      label="Defina a sua resposta"
      multiline={true}
      className={classes.textField}
      variant="filled"
      rows={10}
      value={answer}
      onChange={event => setAnswer(event.target.value)}
    />

    <br />
    <br />

    <Button
      variant="contained"
      color="primary"
      className={classes.button}
      endIcon={<Icon>send</Icon>}
      onClick={() => {
        
        const answerData = {
          "question_code": QuestionStore.questionCode,
          "answer": answer
        }

        handleOpen()

        QuestionStore.saveAnswer(answerData)

      }}
    >
    Send
    </Button>

    <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message="Sucesso"
        action={
          <React.Fragment>
            <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
              <CloseIcon fontSize="small" />
            </IconButton>
          </React.Fragment>
        }
      />
    
    </main>
    )

}

export default inject("QuestionStore", "AdsStore")(observer(AnswerScreen))

// export default AnswerScreen