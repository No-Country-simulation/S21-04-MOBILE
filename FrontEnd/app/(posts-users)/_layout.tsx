import { Redirect, Stack } from "expo-router";
import React from "react";

const CheckAuthenticationLayout = () => {
  const status = "unauthenticated";

  if (status === "unauthenticated") {
    // Guardar la ruta del usuario
    return <Redirect href={"/auth/login"} />;
  }

  return (
    <Stack
      screenOptions={{
        headerShadowVisible: false,
      }}
    ></Stack>
  );
};

export default CheckAuthenticationLayout;
