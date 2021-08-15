import { ThemeProvider } from "styled-components";
import { ApolloProvider } from "@apollo/client";
import { client } from './queries';
import { Provider } from "react-redux";
import configureStore from './store/store';
import { BrowserRouter } from "react-router-dom";
import Routes from "./Routes";

const theme = {
  colors: {
    primary: "#0070f3",
  },
}

const store = configureStore();

function App() {

  // specify base href from env varible 'PUBLIC_URL'
  // use only if application isn't served from the root
  // for development it is forced to root only
  const basename = process.env.NODE_ENV === 'development' ? '/' : '/';

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <ApolloProvider client={client}>
          <BrowserRouter basename={basename}>
            <Routes />
          </BrowserRouter>
        </ApolloProvider>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
