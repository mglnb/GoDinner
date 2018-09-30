import Echo from "laravel-echo";
import Pusher from "pusher-js";
window.Pusher = Pusher;
const urlHml =
  window.location.protocol === "https:"
    ? "https://godinner-backend.herokuapp.com"
    : "http://localhost:8000";

export default new Echo({
    broadcaster: "pusher",
    key: "409fe30205f628b99f0d",
    cluster: "us2",
    encrypted: true,
    authEndpoint: urlHml + "/broadcasting/auth",
    auth: {
      headers: {
        Authorization: localStorage.getItem('token')
      }
    }
  });