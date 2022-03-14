import React from 'react';
import PropTypes from "prop-types";
import {Card, makeStyles, Typography} from "@material-ui/core";
import colors from "../constants/colors";

const Block = ({block: {attributes, id}}) => {
  const classes = useStyles();
  return (
    <Card className={classes.card}>
      <Typography className={classes.id} variant="subtitle1">{id}</Typography>
      <Typography variant="subtitle1">{attributes?.data}</Typography>
    </Card>
  );
};

const useStyles = makeStyles((theme) => ({
  card: {
    backgroundColor: colors.gray,
    display: "block",
    marginBottom: "5px",
    padding: "5px 5px 5px 10px",
  },
  id: {
    color: colors.blue,
    marginBottom: "-5px",
  }
}))

Block.propTypes = {
  block: PropTypes.shape({
    attributes: PropTypes.shape({
      data: PropTypes.string,
      hash: PropTypes.string,
      index: PropTypes.number,
      previousHash: PropTypes.string,
      timeStamp: PropTypes.string,
    }),
    id: PropTypes.string,
    type: PropTypes.string,
  }).isRequired,
};

export default Block;
