import React from "react";

const OAUTH_URLS = {
  google: "http://localhost:3000/auth/google",
  github: "http://localhost:3000/auth/github",
};

const OAuthLoginButton = ({ provider, onSuccess, onError }) => {
  const handleOAuthLogin = () => {
    const width = 500,
      height = 600;
    const left = window.screenX + (window.outerWidth - width) / 2;
    const top = window.screenY + (window.outerHeight - height) / 2.5;

    const popup = window.open(
      OAUTH_URLS[provider],
      `${provider}-login`,
      `width=${width},height=${height},left=${left},top=${top}`
    );

    // Listen for postMessage from popup
    const handleMessage = (event) => {
      // Only accept messages from your backend's origin
      if (event.origin !== "http://localhost:3000") return;
      if (event.data?.user) {
        onSuccess(event.data);
        window.removeEventListener("message", handleMessage);
        popup.close();
      } else if (event.data?.error) {
        onError(event.data.error);
        window.removeEventListener("message", handleMessage);
        popup.close();
      }
    };

    window.addEventListener("message", handleMessage);
  };

  return (
    <button onClick={handleOAuthLogin}>
      Login with {provider.charAt(0).toUpperCase() + provider.slice(1)}
    </button>
  );
};

export default OAuthLoginButton;
