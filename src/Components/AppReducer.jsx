export default function appReducer(state, action) {
  console.log(state, action);
  switch (action.type) {
    case "Add_Question":
      return {
        videos: [...state.videos, action.payload],
      };
    case "Delete_Question":
      return {
        videos: [],
      };
    case "Update_Question":
      const updateQuestion = action.payload;
      const updatedQuestion = state.videos.map((video) => {
        if (video.id === updateQuestion.id) {
          video.id = updateQuestion.id;
          video.Pregunta = updateQuestion.Pregunta;
          video.videoRespuesta = updateQuestion.videoRespuesta;
        }
        return video;
      });
      return {
        videos: updatedQuestion,
      };
    default:
      break;
  }
}
