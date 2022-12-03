import { DynamicRuleIds, PayloadNames, SettingIds } from '../../../common/constants';
import type { RuntimeMessage } from '../../../common/types';

const RULE = {
  id: DynamicRuleIds.BLOCK_PREVENT_TYPING_NOTIFICATION,
  priority: 1,
  action: { type: chrome.declarativeNetRequest.RuleActionType.BLOCK },
  condition: {
    urlFilter: 'messagingcoreservice.MessagingCoreService/SendTypingNotification',
    domains: ['snapchat.com'],
    resourceTypes: [chrome.declarativeNetRequest.ResourceType.XMLHTTPREQUEST],
  },
};

chrome.runtime.onMessage.addListener((message: RuntimeMessage) => {
  if (message.payloadName !== PayloadNames.SETTING_UPDATE) {
    return;
  }

  if (message.settingId !== SettingIds.PREVENT_TYPING_NOTIFICATION) {
    return;
  }

  chrome.declarativeNetRequest.updateDynamicRules({
    removeRuleIds: [DynamicRuleIds.BLOCK_PREVENT_TYPING_NOTIFICATION],
    addRules: [RULE],
  });
});
