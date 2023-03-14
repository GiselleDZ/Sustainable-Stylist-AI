import { useRouteError, isRouteErrorResponse } from "react-router-dom";

import "./error.css";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  const isResError = isRouteErrorResponse(error);

  return (
    <div id="error-page">
      <h1 id="error-title">Oops!</h1>
      <h3>Sorry an unexpected error occured.</h3>
      {isResError ? (
        <div id="detailed-error">
          <h2 id="error-status">
            {error.status}: {error.statusText}
          </h2>
          <p id="error-text">{error.data}</p>
        </div>
      ) : (
        <i>Unknown Error</i>
      )}
    </div>
  );
}
