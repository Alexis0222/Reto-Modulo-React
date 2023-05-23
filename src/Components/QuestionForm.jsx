import {
  TextField,
  Button,
  Typography,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Box,
} from "@mui/material";
import { Link } from "react-router-dom";
import React, { useState, useContext, useEffect, useRef } from "react";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import { GlobalContext } from "./GlobalContex";
import { useNavigate, useParams } from "react-router-dom";
import StopIcon from "@mui/icons-material/Stop";
import PlayCircleFilledOutlinedIcon from "@mui/icons-material/PlayCircleFilledOutlined";
import { red } from "@mui/material/colors";
export const QuestionForm = () => {
  const { addQuestion, videos, updateQuestion } = useContext(GlobalContext);
  const [video, setVideo] = useState({
    id: "",
    Pregunta: "",
    videoRespuesta: null,
  });
  const [recording, setRecording] = useState(0);
  const [timer, setTimer] = useState(null);
  const [timerFormat, setTimerFormat] = useState("0:00");
  const [showCircle, setShowCircle] = useState(true);
  const [showCompleted, setShowCompleted] = useState(false);
  const navigate = useNavigate();
  const params = useParams();
  const videoRef = useRef(null);
  const mediaRecorderRef = useRef(null);

  const _handleChange = (e) => {
    setVideo({ ...video, [e.target.name]: e.target.value });
  };
  const _handleSubmit = (e) => {
    e.preventDefault();
    if (video.id) {
      updateQuestion(video);
      navigate("/");
    } else {
      addQuestion(video);
      navigate("/");
    }
  };

  const DataAvailable = (event) => {
    if (event.data.size > 0) {
      const blob = new Blob([event.data], { type: "video/webm" });
      const videoUrl = URL.createObjectURL(blob);
      setVideo((prevVideo) => ({
        ...prevVideo,
        videoRespuesta: videoUrl,
      }));
    }
  };

  const _startRecording = () => {
    if (
      mediaRecorderRef.current &&
      mediaRecorderRef.current.state === "inactive"
    ) {
      mediaRecorderRef.current.start();

      setTimerFormat("0:00");
      setTimer(
        setInterval(() => {
          setShowCircle((prevShowCircle) => !prevShowCircle);

          setRecording((prevTime) => prevTime + 1);
        }, 1000)
      );
    }
  };

  const _stopRecording = () => {
    if (
      mediaRecorderRef.current &&
      mediaRecorderRef.current.state === "recording"
    ) {
      mediaRecorderRef.current.stop();
      setRecording(0);
      setShowCircle(true);
      setShowCompleted(true);
      clearInterval(timer);
    }
  };

  useEffect(() => {
    const questionFound = videos.find((task) => task.id === params.id);

    if (questionFound) {
      setVideo(questionFound);
    }
  }, [params.id, videos]);

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        videoRef.current.srcObject = stream;
        mediaRecorderRef.current = new MediaRecorder(stream);

        mediaRecorderRef.current.addEventListener(
          "dataavailable",
          DataAvailable
        );
      })
      .catch((error) => {
        console.error("No encuentro la camara:", error);
      });

    return () => {
      if (
        mediaRecorderRef.current &&
        mediaRecorderRef.current.state === "recording"
      ) {
        mediaRecorderRef.current.stop();
      }
    };
  }, []);

  useEffect(() => {
    if (recording !== 0) {
      const minutes = Math.floor(recording / 60);
      const seconds = recording % 60;
      const formated = `${minutes}:${seconds < 10 ? "0" + seconds : seconds}`;
      setTimerFormat(formated);
    }
    if (recording > 120) {
      _stopRecording();
    }
  }, [recording]);

  return (
    <>
      <Typography gutterBottom variant="h5" component="div">
        {video.id ? "Graba Tu Respuesta" : "Añadiendo una nueva pregunta"}
      </Typography>

      {video.id ? (
        <div>
          <Card sx={{}}>
            <CardContent>
              <Box display={"flex"} justifyContent={"flex-start"}>
                <Link to="/">
                  <Button variant="contained" color="error" size="medium">
                    Regresar
                  </Button>
                </Link>
              </Box>
              <Box>
                <Typography
                  gutterBottom
                  variant="h6"
                  component="div"
                  display={"flex"}
                  justifyContent={"flex-end"}
                >
                  <Typography
                    gutterBottom
                    variant="h6"
                    component="div"
                    display="flex"
                    justifyContent="flex-end"
                  >
                    {timerFormat}/2:00
                    {showCircle ? (
                      <FiberManualRecordIcon sx={{ color: red[500] }} />
                    ) : (
                      <FiberManualRecordIcon color="disabled" />
                    )}
                  </Typography>
                </Typography>
                <Typography gutterBottom variant="h5" component="div">
                  <video ref={videoRef} autoPlay muted></video>
                </Typography>
              </Box>
              <Typography variant="body2" color="text.secondary">
                {video.Pregunta}
              </Typography>
            </CardContent>
            <CardActions disableSpacing>
              <Box flexGrow={1} display={"flex"} justifyContent={"flex-start"}>
                {recording === 0 ? (
                  <Button
                    variant="contained"
                    onClick={_startRecording}
                    startIcon={<PlayCircleFilledOutlinedIcon />}
                  >
                    Iniciar Grabacion
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    color="error"
                    onClick={_stopRecording}
                    startIcon={<StopIcon />}
                  >
                    Detener Grabacion
                  </Button>
                )}
              </Box>
              <Box display={"flex"} justifyContent={"space-between"}>
                <Button
                  disabled={!showCompleted}
                  variant="contained"
                  color="success"
                  size="medium"
                  onClick={_handleSubmit}
                >
                  Finalizar
                </Button>
              </Box>
            </CardActions>
          </Card>
          <Typography variant="body2" color="text.secondary"></Typography>
        </div>
      ) : (
        <>
          <Box>
            <Box display={"flex"} justifyContent={"flex-start"}>
              <Link to="/">
                <Button variant="contained" color="error" size="medium">
                  Regresar
                </Button>
              </Link>
            </Box>
            <Box>
              <TextField
                placeholder="Pregunta"
                variant="filled"
                name="Pregunta"
                value={video.Pregunta}
                onChange={_handleChange}
              />
            </Box>
            <Button
              variant="contained"
              color="success"
              size="medium"
              onClick={_handleSubmit}
            >
              Añadir Pregunta
            </Button>
          </Box>
        </>
      )}
    </>
  );
};
