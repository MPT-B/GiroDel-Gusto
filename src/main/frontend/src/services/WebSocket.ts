// import SockJS from "sockjs-client";
// import { Client } from "@stomp/stompjs";
// import { reviewAdded } from "../slices/reviewSlice";

// const connectWebSocket = (dispatch: any) => {
//   const token = localStorage.getItem("auth_token");
//   const socket = new SockJS("http://localhost:8080/ws");
//   const stompClient = new Client({
//     webSocketFactory: () => socket,
//     reconnectDelay: 5000,
//     debug: (str) => {
//       console.log(new Date(), str);
//     },
//     connectHeaders: {
//       Authorization: `Bearer ${token}`,
//     },
//     onConnect: () => {
//       console.log("Connected");
//       stompClient.subscribe("/topic/reviews", (message) => {
//         try {
//           console.log("test");
//           console.log(JSON.parse(message.body).content);
//           const newReview = JSON.parse(message.body);
//           dispatch(reviewAdded(newReview));
//         } catch (error) {
//           console.error("Error processing message:", error);
//         }
//       });
//     },
//     onStompError: (frame) => {
//       console.error("Broker reported error: " + frame.headers["message"]);
//       console.error("Additional details: " + frame.body);
//     },
//     onWebSocketClose: (event) => {
//       console.log("WebSocket closed: ", event);
//     },
//     onDisconnect: () => {
//       console.log("Disconnected");
//     },
//   });

//   stompClient.activate();

//   return stompClient;
// };

// export default connectWebSocket;
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";
import { getAuthToken } from "../auth/authToken";

const connectWebSocket = (reviewId: any, onMessageReceived: any) => {
  const socket = new SockJS("http://localhost:8080/ws");
  const stompClient = new Client({
    webSocketFactory: () => socket,
    reconnectDelay: 5000,
    debug: (str) => {
      console.log(new Date(), str);
    },
    connectHeaders: {
      Authorization: `Bearer ${getAuthToken()}`,
    },
    onConnect: () => {
      console.log("Connected");
      stompClient.subscribe(`/topic/review/${reviewId}`, (message) => {
        onMessageReceived(message.body);
      });
    },
    onStompError: (frame) => {
      console.error("Broker reported error: " + frame.headers["message"]);
      console.error("Additional details: " + frame.body);
    },
    onWebSocketClose: (event) => {
      console.log("WebSocket closed: ", event);
    },
    onDisconnect: () => {
      console.log("Disconnected");
    },
  });

  stompClient.activate();

  return stompClient;
};

export default connectWebSocket;