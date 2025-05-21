import settings from '../../lib/settings';
import Module from '../../lib/module';
import { getSnapchatStore } from '../../utils/snapchat';

let oldUpdatePlaybackData: any = null;

const newUpdatePlaybackData = () => {};

const store = getSnapchatStore();

class StoryReadReceipts extends Module {
  constructor() {
    super('Story Read Receipts');
    store.subscribe((storeState: any) => storeState.friendStories, this.load);
    settings.on('PREVENT_STORY_READ_RECEIPTS.setting:update', () => this.load());
  }

  load(friendStories?: any) {
    friendStories = friendStories ?? store.getState().friendStories;
    if (friendStories == null) {
      return;
    }

    const preventStoryReadReceipts = settings.getSetting('PREVENT_STORY_READ_RECEIPTS');
    const changedValues: any = {};

    if (preventStoryReadReceipts && friendStories.updatePlaybackData !== newUpdatePlaybackData) {
      oldUpdatePlaybackData = friendStories.updatePlaybackData;
      changedValues.updatePlaybackData = newUpdatePlaybackData;
    }

    if (!preventStoryReadReceipts && oldUpdatePlaybackData != null) {
      changedValues.updatePlaybackData = oldUpdatePlaybackData;
      oldUpdatePlaybackData = null;
    }

    if (Object.keys(changedValues).length === 0) {
      return;
    }

    store.setState({ friendStories: { ...friendStories, ...changedValues } });
  }
}

export default new StoryReadReceipts();
