import { faDownload } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Loading, Tooltip } from '@nextui-org/react';
import React from 'react';
import ThemeProvider from '../../../common/components/ThemeProvider';

const PREVIEW_SOURCE_SELECTOR = 'img[loading="lazy"], video';

export default function SaveButton({ parentNode }: { parentNode: Element }) {
  const [loading, setLoading] = React.useState(false);

  const downloadImage = React.useCallback(async () => {
    const node = parentNode.querySelector(PREVIEW_SOURCE_SELECTOR);
    if (node == null) {
      return;
    }
    setLoading(true);
    const src = node.getAttribute('src') as string;
    const source = await fetch(src);
    const sourceBlob = await source.blob();
    const sourceURL = URL.createObjectURL(sourceBlob);
    const link = document.createElement('a');
    link.href = sourceURL;
    link.download = 'snapchat';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setLoading(false);
  }, [parentNode, setLoading]);

  return (
    <ThemeProvider>
      <div style={{ position: 'absolute' }}>
        <Tooltip placement="bottom" content="This will not notify the sender.">
          <Button
            auto
            isDisabled={loading}
            onPress={() => downloadImage()}
            // @ts-ignore
            icon={!loading ? <FontAwesomeIcon icon={faDownload} fixedWidth /> : null}
          >
            {loading ? <Loading color="currentColor" size="sm" /> : null}
            Source
          </Button>
        </Tooltip>
      </div>
    </ThemeProvider>
  );
}
