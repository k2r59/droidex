import { d as defineEventHandler, r as requireSession, p as progressCollection } from '../../nitro/nitro.mjs';
import 'mongodb';
import 'better-auth';
import 'better-auth/adapters/mongodb';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'vue-router';

const progress_get = defineEventHandler(async (event) => {
  const session = await requireSession(event);
  const progress = await progressCollection();
  const doc = await progress.findOne({ userId: session.user.id }, { projection: { _id: 0 } });
  return doc != null ? doc : {
    userId: session.user.id,
    collection: {},
    rebirth: 0,
    superRebirth: 0,
    cycle: 1,
    novaCrystals: 0,
    shopLevels: {},
    updatedAt: /* @__PURE__ */ new Date()
  };
});

export { progress_get as default };
//# sourceMappingURL=progress.get.mjs.map
