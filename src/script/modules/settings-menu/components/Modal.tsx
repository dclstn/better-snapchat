import React from 'react';
import { Modal } from '@mantine/core';
import styles from './Modal.module.css';
import ModalHeader from './ModalHeader';
import ModalFooter from './ModalFooter';
import ModalSettings from './ModalSettings';

function SettingsModal({
  portalTargetId,
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
  portalTargetId: string;
}) {
  const [search, setSearch] = React.useState('');
  return (
    <Modal
      withCloseButton={false}
      opened={isOpen}
      onClose={onClose}
      centered
      size="lg"
      classNames={{
        body: styles.modalBody,
        content: styles.modalContent,
      }}
      portalProps={{
        className: styles.portal,
        target: `#${portalTargetId}`,
      }}
    >
      <ModalHeader onClose={onClose} search={search} setSearch={setSearch} />
      <ModalSettings search={search} />
      <ModalFooter onClose={onClose} />
    </Modal>
  );
}

export default SettingsModal;
