import settings from '../../lib/settings';
import Module from '../../lib/module';
import { getSnapchatStore } from '../../utils/snapchat';
import { logInfo } from '../../lib/debug';

const store = getSnapchatStore();

let oldOnActiveConversationInfoUpdated: any = null;

const newOnActiveConversationInfoUpdated = (activeConversationInfo: any) => {
    for (const [, value] of activeConversationInfo.entries()) {
        if (value.peekingParticipants.length > 0) {
            logInfo('Peeking');
        }
    }
    return oldOnActiveConversationInfoUpdated(activeConversationInfo);
};

class ActiveConversationInfo extends Module {
    constructor() {
        super('ActiveConversationInfo');
        store.subscribe((storeState: any) => storeState.presence, this.load);
        settings.on('HALF_SWIPE_NOTIFICATION.setting:update', () => this.load());
    }

    load(presenceClient?: any) {
        console.log("OKAY");
        console.log('ActiveConversationInfo.load', presenceClient);
        presenceClient = presenceClient ?? store.getState().presence;
        if (presenceClient == null || oldOnActiveConversationInfoUpdated != null) {
            return;
        }
        const halfSwipeNotificationEnabled = settings.getSetting('HALF_SWIPE_NOTIFICATION');
        const changedValues: any = {};

        if (halfSwipeNotificationEnabled && presenceClient.onActiveConversationInfoUpdated !== newOnActiveConversationInfoUpdated) {
            oldOnActiveConversationInfoUpdated = presenceClient.onActiveConversationInfoUpdated;
            changedValues.onActiveConversationInfoUpdated = newOnActiveConversationInfoUpdated;
        }

        if (!halfSwipeNotificationEnabled && oldOnActiveConversationInfoUpdated != null) {
            changedValues.onActiveConversationInfoUpdated = oldOnActiveConversationInfoUpdated;
            oldOnActiveConversationInfoUpdated = null;
        }

        if (Object.keys(changedValues).length === 0) {
            return;
        }

        store.setState({ presence: { ...presenceClient, ...changedValues } });
    }
}

export default new ActiveConversationInfo();