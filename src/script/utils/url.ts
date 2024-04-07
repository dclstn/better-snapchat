import { ExternalUrls } from '../lib/constants';

export function openExternalUrl(url: ExternalUrls) {
  window.open(url, '_blank');
}
