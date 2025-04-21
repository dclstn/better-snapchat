import settings from '../../lib/settings';
import Module from '../../lib/module';
import { getProvConsts } from '../../utils/snapchat';

let oldWebAppConst: any = null;
class ProvenanceConstants extends Module {
  constructor() {
    super('Provenance Constants');
    settings.on(`SNAP_AS_MOBILE.setting:update`, this.load);
  }

  load() {
    const enabled = settings.getSetting('SNAP_AS_MOBILE');

    if (enabled && oldWebAppConst == null) {
      const provConsts = getProvConsts();
      oldWebAppConst = provConsts.SNAPCHAT_WEB_APP;
      provConsts.SNAPCHAT_WEB_APP = 0;
      provConsts[0] = 'SNAPCHAT_WEB_APP';
    }

    if (!enabled && oldWebAppConst != null) {
      const provConsts = getProvConsts();
      provConsts.SNAPCHAT_WEB_APP = oldWebAppConst;
      provConsts[oldWebAppConst] = 'SNAPCHAT_WEB_APP';
      oldWebAppConst = null;
    }
  }
}

export default new ProvenanceConstants();
