import { ExternalUrls } from '../lib/constants';

export default function openExternalUrl(url: ExternalUrls) {
  window.open(url, '_blank');
}
