import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  appBar: {
    borderRadius: 4,
    marginTop: '1rem',
    display: 'flex',
    padding: '16px',
  },
  gridContainer: {
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column-reverse',
    },
  },
  link: {
    textDecoration: 'none',
    flexDirection:'row'
  },
  marginItem: {
    marginBottom: '10px',
    flexDirection:'row',
    
  },
  trendingitem:{
    flexDirection:'row'
  },
  item:{
    flex:1
  }
}));