
import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';

import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField'

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
    minWidth: 200,
  },
  textField: {
    width: 600,
    margin: 10
  },
  textField2: {
    width: 500,
    margin: 10
  },
  button: {
    background: 'rgb(225	150	147)'
  }
}));

function QuestionScreen(props) {

    const { window, AdsStore, QuestionStore } = props;
    const classes = useStyles();
    const theme = useTheme();
    
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const [selectedItem, setSelectedItem] = React.useState({})
    const [question, setQuestion] = React.useState('')

    const handleChangeAds = (event) => {

      setSelectedItem(event.target.value)
      console.log(event.target.value)

      console.log('handleChangeAds', event.target.value)

      AdsStore.getProductKeyById({
        "_id" :  event.target.value.idProduto
      })

    };
  
    const handleDrawerToggle = () => {
      setMobileOpen(!mobileOpen);
    };

    React.useEffect(() => {
      AdsStore.fetchAds()

      console.log(QuestionStore.productId)
      console.log(AdsStore.nome)
    }, []);

    
    return (

    <main className={classes.content}>
    <div className={classes.toolbar} />

    <FormControl className={classes.formControl}>
    <InputLabel id="demo-simple-select-label">Anuncio</InputLabel>
    <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={selectedItem}
        onChange={handleChangeAds}
        value={selectedItem}
    >
        {AdsStore.getListAds.map(ads => <MenuItem value={ads}>{ads.nome}</MenuItem>)}
    </Select>
    </FormControl>
      <br />
          <br />
      <TextField
      id="standard-basic"
      label=""
      className={classes.textField2}
      value={AdsStore.productItem.nome}
      
    />
    <br />
    <br />
    <br />
      <TextField
      id="standard-basic"
      label="Defina a sua pergunta"
      multiline={true}
      className={classes.textField}
      rows={10}
      value={question}
      onChange={event => setQuestion(event.target.value)}
    />

    <TextField
      id="standard-basic"
      // label="Resposta"
      multiline={true}
      className={classes.textField}
      rows={10}
      variant="filled"
      disabled
      value={QuestionStore.answerData.answer}
    />

    <br />
    <br />

    <Button
      variant="contained"
      color="primary"
      className={classes.button}
      endIcon={<Icon>send</Icon>}
      onClick={() => {

        const questionData = {
          "ad_id": selectedItem.key,
          "product_id": AdsStore.productItem.key,
          "question": question
        }

        QuestionStore.saveQuestion(questionData)

      }}
    >
    Send
    </Button>
    
    </main>
    )

}

export default inject("QuestionStore", "AdsStore")(observer(QuestionScreen))