import { DynamicRuleIds, PayloadNames } from '../common/constants';

chrome.runtime.onMessage.addListener((message) => {
  if (message.payload !== PayloadNames.PREVENT_TYPING_NOTIFICATION) {
    return;
  }

  chrome.declarativeNetRequest.updateDynamicRules({
    removeRuleIds: [DynamicRuleIds.BLOCK_PREVENT_TYPING_NOTIFICATION],
  });

  if (message.value === true) {
    chrome.declarativeNetRequest.updateDynamicRules({
      addRules: [
        {
          id: DynamicRuleIds.BLOCK_PREVENT_TYPING_NOTIFICATION,
          priority: 1,
          action: { type: chrome.declarativeNetRequest.RuleActionType.BLOCK },
          condition: {
            urlFilter: 'messagingcoreservice.MessagingCoreService/SendTypingNotification',
            domains: ['snapchat.com'],
            resourceTypes: [chrome.declarativeNetRequest.ResourceType.XMLHTTPREQUEST],
          },
        },
      ],
    });
  }
});
