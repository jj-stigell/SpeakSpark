/* eslint-disable @typescript-eslint/typedef */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { Animated, Text } from 'react-native';

import {
  Notification as NotificationType, Severity, resetNotification
} from '../redux/features/notificationSlice';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { RootState } from '../redux/store';

export default function Notification(): React.JSX.Element {
  const notification: NotificationType = useAppSelector((state: RootState) => state.notification);
  const styles: any = getStyles(notification.severity);
  const dispatch = useAppDispatch();
  const position: Animated.Value = new Animated.Value(-100);  // Initial position: -100 (hidden)

  React.useEffect(() => {
    // Slide down animation
    Animated.timing(position, {
      toValue: 0,
      duration: 500,
      useNativeDriver: false
    }).start();

    // Auto-hide after 'duration' milliseconds
    const timer = setTimeout(() => {
      dispatch(resetNotification());
    }, notification.autoHideDuration);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  if (!notification.showNotification) {
    return <></>;
  }

  return (
    <Animated.View style={[styles.container, { top: position }]}>
      <Text style={styles.message}>{notification.message}</Text>
    </Animated.View>
  );
}

function getStyles(severity: Severity): any {
  const baseStyles = {
    container: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      padding: 15,
      alignItems: 'center',
      justifyContent: 'center'
    },
    message: {
      fontSize: 16,
      color: '#fff'
    }
  };

  const severityStyles = {
    info: {
      backgroundColor: '#3498db'
    },
    warning: {
      backgroundColor: '#f39c12'
    },
    error: {
      backgroundColor: '#e74c3c'
    },
    success: {
      backgroundColor: '#2ecc71'
    }
  };

  return {
    container: {
      ...baseStyles.container,
      ...severityStyles[severity]
    },
    message: baseStyles.message
  };
}
