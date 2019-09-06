import {Box, Typography} from "@material-ui/core";


export function Footer(){

  return <Box mt={5}>
    <Typography variant="body2" color="textSecondary" align="center">
      Copyright © Kazoo {new Date().getFullYear()}.
    </Typography>
  </Box>
}
