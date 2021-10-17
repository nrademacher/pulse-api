import { AuthenticationError } from 'apollo-server-express';

export function catchAuthError(
  errorCandidate: unknown,
  fallbackErrorMessage: string,
) {
  const message =
    errorCandidate instanceof Error
      ? errorCandidate.message
      : fallbackErrorMessage;

  throw new AuthenticationError(message);
}
