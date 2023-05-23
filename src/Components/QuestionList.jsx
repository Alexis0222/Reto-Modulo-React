import React, { useContext, useState } from "react";
import { GlobalContext } from "./GlobalContex";
import AddIcon from "@mui/icons-material/Add";
import SendIcon from "@mui/icons-material/Send";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import PlayCircleFilledOutlinedIcon from "@mui/icons-material/PlayCircleFilledOutlined";
import { Grid, CardMedia, IconButton, Box } from "@mui/material";
import { Link } from "react-router-dom";
export const QuestionList = () => {
  const [showMessage, setShowMessage] = useState(false);
  const { videos } = useContext(GlobalContext);
  const Completed = videos.every((video) => video.videoRespuesta);
  const _handleSend = () => {
    setShowMessage(true);
  };
  return (
    <div>
      <Typography variant="h4" >
        Video Cuestionario
      </Typography>
      <Box display={"flex"} justifyContent={"flex-end"}>
        <Link to="/add">
          <Button
            variant="contained"
            color="success"
            size="medium"
            startIcon={<AddIcon />}
          >
            Añadir Pregunta
          </Button>
        </Link>
      </Box>
      {showMessage && (
        <Typography variant="h5">¡Videos enviados con éxito!</Typography>
      )}
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        {videos.map((video) => (
          <Grid item xs={2} sm={4} md={4} key={video.id}>
            <Card component="li" sx={{ minWidth: 300, flexGrow: 1 }}>
              <CardContent>
                <CardMedia
                  component="video"
                  autoPlay
                  controls
                  loop
                  muted
                  src={video.videoRespuesta}
                />

                <Typography variant="subtitle1" >
                  {video.Pregunta}
                </Typography>
              </CardContent>

              <CardActions>
                <Typography variant="subtitle1" color="text.secondary">
                  Graba tu respuesta
                </Typography>
                <Link to={`/Edit/${video.id}`}>
                  <IconButton size="large">
                    <PlayCircleFilledOutlinedIcon fontSize="inherit" />
                  </IconButton>
                </Link>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Box display={"flex"} justifyContent={"flex-end"}>
        <Button
          disabled={!Completed}
          variant="contained"
          color="error"
          size="medium"
          endIcon={<SendIcon />}
          onClick={_handleSend}
        >
          Enviar
        </Button>
      </Box>
    </div>
  );
};
