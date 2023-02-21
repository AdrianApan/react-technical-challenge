import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  container: {
    boxShadow: '0px 1px 4px 1px rgb(231 231 231)',
    borderRadius: 4,
    position: 'relative',
  },
  input: {
    fontSize: 14,
    padding: '8px 16px',
    width: '100%',
    borderRadius: 4,
    borderWidth: 0,
  },
  noSuggestions: {
    color: 'rgb(153 153 153)',
    padding: 16,
    fontSize: 14,
  },
  suggestions: {
    fontSize: 14,
    listStyle: 'none',
    marginTop: 0,
    maxHeight: 500,
    overflowY: 'scroll',
    paddingLeft: 0,
    width: '100%',
    borderRadius: '0 0 4px 4px',
    position: 'absolute',
    boxShadow: '0px 1px 4px 1px rgb(231 231 231)',
    background: 'rgb(255,255,255)',
    '& li': {
      padding: '4px 16px',
      '&:hover': {
        backgroundColor: 'rgb(219 219 220)',
        cursor: 'pointer',
      },
    },
  },
  suggestionActive: {
    backgroundColor: 'rgb(219 219 220)',
    cursor: 'pointer',
  },
}));

export default useStyles;
