import { d as defineEventHandler, a as useAuth, t as toWebRequest } from '../../../nitro/nitro.mjs';
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

const ____all_ = defineEventHandler(async (event) => {
  const auth = await useAuth();
  return auth.handler(toWebRequest(event));
});

export { ____all_ as default };
//# sourceMappingURL=_...all_.mjs.map
