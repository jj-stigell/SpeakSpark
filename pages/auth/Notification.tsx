import React from 'react';
import { Alert, AlertText } from '@gluestack-ui/themed';
import { JSX } from 'react';

export type Action = 'error' | 'warning' | 'success' | 'info' | 'muted';

export default function Notification(
  { message, action }:
  { message: string, action?: Action }
): JSX.Element {

  return (
    <Alert mx="$2.5" action={action} variant="accent">
      <AlertText>{message}</AlertText>
    </Alert>
  );
}
