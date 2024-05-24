import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";
import { getAuthToken } from "../auth/authToken";

const connectWebSocket = (onMessageReceived: any) => {
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
      stompClient.subscribe(`/topic/review`, (message) => {
        console.log("Received WebSocket message: ", message);
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
