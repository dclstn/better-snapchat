import React from 'react';

let broadcastChannel: BroadcastChannel | null = null;
if (process.env.EXTENSION_ID != null) {
  broadcastChannel = new BroadcastChannel(process.env.EXTENSION_ID);
}

export const LicenseContext = React.createContext<boolean>(false);

export default function ActiveLicenseProvider({ children }: { children: React.ReactNode }) {
  const [verified, setVerified] = React.useState(false);

  React.useEffect(() => {
    if (broadcastChannel == null) {
      throw new Error('BroadcastChannel is not defined');
    }

    function requestLicenseVerification() {
      if (broadcastChannel == null) {
        return;
      }

      broadcastChannel.postMessage({
        world: 'main',
        type: 'verifyLicense',
        extensionId: process.env.EXTENSION_ID,
      });
    }

    async function handleLicenseVerification(event: MessageEvent<any>) {
      if (event.data.world !== 'service_worker') {
        return;
      }
      const { type, data } = event.data;
      if (type !== 'licenseVerification') {
        return;
      }
      setVerified(data.verified);
    }

    requestLicenseVerification();

    broadcastChannel.addEventListener('message', handleLicenseVerification);
    return () => {
      broadcastChannel?.removeEventListener('message', handleLicenseVerification);
    };
  }, []);

  return <LicenseContext.Provider value={verified}>{children}</LicenseContext.Provider>;
}
