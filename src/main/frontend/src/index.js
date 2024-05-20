import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { AuthProvider } from "./auth/AuthContext";
import { Provider } from "react-redux";
import { store } from "./store/store";

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <BrowserRouter>
    <AuthProvider>
      <Provider store={store}>
        <App />
      </Provider>
    </AuthProvider>
  </BrowserRouter>
);

// import React from "react";
// import ReactDOM from "react-dom";
// import { Provider } from "react-redux";
// import { store } from "./store/store";
// import App from "./App";
// import { AuthProvider } from "./auth/AuthContext";

// ReactDOM.render(
//   <Provider store={store}>
//     <AuthProvider>
//       <App />
//     </AuthProvider>
//   </Provider>,
//   document.getElementById("root")
// );
