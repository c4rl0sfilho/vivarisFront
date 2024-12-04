// src/components/IncomingCallModal.tsx
import React, { FC } from 'react';

interface IncomingCallModalProps {
  callerName: string;
  onAccept: () => void;
  onReject: () => void;
}

const IncomingCallModal: FC<IncomingCallModalProps> = ({ callerName, onAccept, onReject }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <p>{callerName} está te chamando.</p>
        <button onClick={onAccept}>Aceitar</button>
        <button onClick={onReject}>Rejeitar</button>
      </div>
    </div>
  );
};

export default IncomingCallModal;
