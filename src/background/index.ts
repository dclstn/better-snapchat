import { DynamicRuleIds } from '../common/constants';

chrome.declarativeNetRequest.updateDynamicRules({
  addRules: [
    {
      id: DynamicRuleIds.BLOCK_SEND_TYPING,
      priority: 1,
      action: { type: chrome.declarativeNetRequest.RuleActionType.BLOCK },
      condition: {
        urlFilter: 'messagingcoreservice.MessagingCoreService/SendTypingNotification',
        domains: ['snapchat.com'],
        resourceTypes: [chrome.declarativeNetRequest.ResourceType.XMLHTTPREQUEST],
      },
    },
  ],
  removeRuleIds: [DynamicRuleIds.BLOCK_SEND_TYPING],
});
