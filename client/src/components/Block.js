import React from 'react';
import {Card, makeStyles, Typography} from "@material-ui/core";
import colors from "../constants/colors";

const Block = ({block: {data, id}}) => {
  const classes = useStyles();
  return (
    <Card className={classes.card}>
      <Typography className={classes.blue} variant="subtitle1">{id}</Typography>
      <Typography variant="subtitle1">{data}</Typography>
    </Card>
  );
};

const useStyles = makeStyles((theme) => ({
  card: {
    backgroundColor: colors.gray,
    display: "block",
    marginBottom: "5px",
    padding: "5px",
  },
  blue: {
    color: colors.blue
  }
}))

export default Block;