"use client";

import { Modal } from "./Modal";
import { dangerButton, secondaryButton } from "./styles";

type ConfirmDialogProps = {
  title: string;
  message: string;
  confirmLabel: string;
  onConfirm: () => void;
  onClose: () => void;
};

export function ConfirmDialog({
  title,
  message,
  confirmLabel,
  onConfirm,
  onClose,
}: ConfirmDialogProps) {
  return (
    <Modal title={title} onClose={onClose}>
      <p className="mt-3 text-sm text-muted">{message}</p>
      <div className="mt-6 flex justify-end gap-3">
        <button type="button" onClick={onClose} className={secondaryButton}>
          Cancelar
        </button>
        <button type="button" onClick={onConfirm} className={dangerButton}>
          {confirmLabel}
        </button>
      </div>
    </Modal>
  );
}