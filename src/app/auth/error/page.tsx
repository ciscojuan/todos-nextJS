"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function ErrorPage() {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");
  const [errorMessage, setErrorMessage] = useState<string>("");

  useEffect(() => {
    if (error === "OAuthAccountNotLinked") {
      setErrorMessage(
        "Para confirmar tu identidad, inicia sesión con la misma cuenta que usaste originalmente."
      );
    } else if (error === "OAuthSignin") {
      setErrorMessage(
        "Error al iniciar sesión con el proveedor de autenticación."
      );
    } else if (error === "OAuthCallback") {
      setErrorMessage("Error en la respuesta del proveedor de autenticación.");
    } else if (error === "OAuthCreateAccount") {
      setErrorMessage("No se pudo crear la cuenta de OAuth.");
    } else if (error === "EmailCreateAccount") {
      setErrorMessage("No se pudo crear la cuenta de correo electrónico.");
    } else if (error === "Callback") {
      setErrorMessage("Error en la función de callback de autenticación.");
    } else if (error === "OAuthAccountNotLinked") {
      setErrorMessage(
        "Para confirmar tu identidad, inicia sesión con la misma cuenta que usaste originalmente."
      );
    } else if (error === "EmailSignin") {
      setErrorMessage(
        "Error al enviar el correo electrónico de inicio de sesión."
      );
    } else if (error === "CredentialsSignin") {
      setErrorMessage(
        "Las credenciales proporcionadas no son válidas o están incompletas."
      );
    } else if (error === "SessionRequired") {
      setErrorMessage("Esta página requiere que inicies sesión.");
    } else {
      setErrorMessage("Ha ocurrido un error inesperado.");
    }
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="p-8 bg-white rounded-lg shadow-md max-w-md w-full">
        <h1 className="text-2xl font-bold text-red-600 mb-4">
          Error de Autenticación
        </h1>
        <p className="text-gray-700">{errorMessage}</p>
        <a
          href="/api/auth/signin"
          className="mt-4 inline-block px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        >
          Volver a intentar
        </a>
      </div>
    </div>
  );
}
