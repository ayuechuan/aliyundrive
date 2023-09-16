import { EventEmitter } from 'events';
import React, { FC, useRef } from 'react';

const EventBusContext = React.createContext(new EventEmitter());

export const EventBusProvider: FC<React.PropsWithChildren> = ({ children }) => {
  const eventBus = useRef<EventEmitter>(new EventEmitter());

  return (
    <EventBusContext.Provider value={eventBus.current}>
      {children}
    </EventBusContext.Provider>
  )
};

export const useEventBus = () => {
  return React.useContext(EventBusContext);
}