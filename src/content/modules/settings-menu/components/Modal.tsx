import React from 'react';
import { Modal, Button, Text, Divider, StyledButtonGroup } from '@nextui-org/react';
import AllowScreenshot from './AllowScreenshot';
import PreventTypingNotification from './PreventTyping';
import SaveImage from './SaveImage';
import styles from './Modal.module.css';
import AlwaysPresent from './AlwaysPresent';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose, faCoffee, faGhost, faHeart } from '@fortawesome/free-solid-svg-icons';

export default function App({ visible, closeHandler }: { visible: boolean; closeHandler: () => void }) {
  return (
    <Modal aria-labelledby="modal-title" open={visible} onClose={closeHandler}>
      <Modal.Header
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: 20,
        }}
      >
        <Text id="modal-title" size={18}>
          Better Snapchat
        </Text>
        <Button light auto onPress={() => closeHandler()} icon={<FontAwesomeIcon icon={faClose} />} />
      </Modal.Header>
      <Divider />
      <Modal.Body style={{ padding: 20 }}>
        <div className={styles.checkboxColumn}>
          <AllowScreenshot />
          <PreventTypingNotification />
          <SaveImage />
          <AlwaysPresent />
        </div>
      </Modal.Body>
      <Divider />
      <Modal.Footer
        style={{ padding: 20, display: 'flex', justifyContent: 'space-between', flexDirection: 'row', gap: 20 }}
      >
        <Button
          flat
          color="warning"
          onPress={() => {
            window.open('https://www.buymeacoffee.com/dclstn', '_blank');
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: 10,
            }}
          >
            <FontAwesomeIcon icon={faCoffee} />
            <Text color="inherit">Buy me a Coffee</Text>
          </div>
        </Button>
        <Button flat auto onClick={() => closeHandler()}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
