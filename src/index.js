import "core-js/features/map";
import "core-js/features/set";
import React from "react";
import ReactDOM from "react-dom";
import bridge from "@vkontakte/vk-bridge";
import App from "./App";
import * as Sentry from "@sentry/react";
import { Integrations } from "@sentry/tracing";

if (process.env.NODE_ENV === "production") {
	Sentry.init({
	  dsn: "https://991714dbc8434ce59e34dcd6670b705a@o441195.ingest.sentry.io/5537071",
	  integrations: [
	    new Integrations.BrowserTracing(),
	  ],
	  tracesSampleRate: 0.3,
	  release: process.env.REACT_APP_VERSION || "broken-release"
	});
	Sentry.setUser({
		id: (window.location.href.match(/vk_user_id=([0-9]+)/gmu)||['0']).pop().toString().replace('vk_user_id=','')
	})
}
// Init VK  Mini App
bridge.send("VKWebAppInit");

ReactDOM.render(<App />, document.getElementById("root"));
if (process.env.NODE_ENV === "development") {
  import("./eruda").then(({ default: eruda }) => {}); //runtime download
}
