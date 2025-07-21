// Global css can be only imported in app.js
import "../globals.css";
import { Provider } from "react-redux";
import store from "../Store/Store";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import axios from "axios";
import { useEffect } from "react";
import Header from "../components/Header";
export const App = ({ Component, pageProps, data }) => {
  const currentUser = data;
  useEffect(() => {
    if (currentUser) {
      store.dispatch({ type: "User/setUser", payload: currentUser });
      store.dispatch({ type: "User/logUser", payload: true });
    } else {
      store.dispatch({ type: "User/logUser", payload: false });
    }
  }, [currentUser]);

  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <Header />
        <Component {...pageProps} />
      </Provider>
    </QueryClientProvider>
  );
};

App.getInitialProps = async (appContext) => {
  // request object comes by next js itself only on server
  let response;
  try {
    if (typeof window === "undefined") {
      response = await axios.get(
        "http://ingress-nginx-controller.ingress-nginx.svc.cluster.local/api/v1/users/protect",
        {
          headers: appContext.ctx.req.headers,
        }
      );
    } else {
      response = await axios.get("/api/v1/users/protect");
    }
  } catch (error) {
    console.log(
      "Error fetching data:",
      error.response?.data?.message || error.message
    );
    return { data: null };
  }
  return { data: response.data };
};

export default App;
