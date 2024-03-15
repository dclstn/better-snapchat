import { EventTypes, SettingIds } from '../../lib/constants';
import settings from '../../lib/settings';
import dom from '../../utils/dom';
import { getConversationMetadataFromNode } from '../../utils/snapchat';
import styles from './styles.module.css';

const BETTER_SNAPCHAT_CONVERSATION_ID_PREFIX = 'better-snapchat-conversation-';
const STATUS_SELECTOR = 'div[role="listitem"] span[id^="status-"]';
const STREAK_CONTAINER_SELECTOR = `div[id^=${BETTER_SNAPCHAT_CONVERSATION_ID_PREFIX}]`;

const FOUR_HOURS = 4 * 60 * 60 * 1000;

function serializeConversationId({ str }: { str: string }) {
  return `${BETTER_SNAPCHAT_CONVERSATION_ID_PREFIX}${str}`;
}

function patchStatusNode(node: HTMLElement) {
  const statusContainer = node.parentElement;
  if (statusContainer == null) {
    return;
  }

  const metadata = getConversationMetadataFromNode(node);
  if (metadata == null) {
    return;
  }

  const { conversationId, streak } = metadata;
  const serializedId = serializeConversationId(conversationId);
  if (streak == null || streak.count === 0 || document.getElementById(serializedId) != null) {
    return;
  }

  const { expirationTimestampMs } = streak;
  const expirationDate = new Date(expirationTimestampMs);
  const isExpiring = expirationDate.getTime() - Date.now() < FOUR_HOURS;

  const div = document.createElement('div');
  div.setAttribute('id', serializedId);

  const streakNode = document.createElement('span');
  streakNode.textContent = `${isExpiring ? '⌛️' : '🔥'} ${streak.count}`;

  const bulletSpan = document.createElement('span');
  bulletSpan.classList.add(styles.streakBullet);
  bulletSpan.textContent = '·';

  div.appendChild(bulletSpan);
  div.appendChild(streakNode);
  statusContainer.appendChild(div);
}

let listener: any = null;

class ShowStreaks {
  constructor() {
    this.load();
    settings.on(`${SettingIds.SHOW_STREAKS}.${EventTypes.SETTING_UPDATE}`, () => this.load());
  }

  load() {
    const enabled = settings.getSetting(SettingIds.SHOW_STREAKS);

    if (enabled && listener == null) {
      const statusNodes = document.querySelectorAll(STATUS_SELECTOR);
      statusNodes.forEach((node) => patchStatusNode(node as HTMLElement));
      listener = dom.on(STATUS_SELECTOR, (node) => patchStatusNode(node));
    }

    if (!enabled && listener != null) {
      listener();
      listener = null;
      const streakNodes = document.querySelectorAll(STREAK_CONTAINER_SELECTOR);
      streakNodes.forEach((node) => node.remove());
    }
  }
}

export default new ShowStreaks();
