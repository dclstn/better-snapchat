import { externalUrls } from "../lib/constants";

export default function openExternalUrl(url: keyof typeof externalUrls) {
  window.open(externalUrls[url], '_blank');
}
