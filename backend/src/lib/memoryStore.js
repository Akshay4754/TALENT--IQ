import { randomUUID } from "crypto";

const state = globalThis.__TALENT_IQ_MEMORY_STORE ?? {
  users: [],
  sessions: [],
};

globalThis.__TALENT_IQ_MEMORY_STORE = state;

const clone = (value) => JSON.parse(JSON.stringify(value));

const pickFields = (doc, fields) => {
  if (!doc || !fields) return doc;

  const selected = {};
  fields
    .split(/\s+/)
    .filter(Boolean)
    .forEach((field) => {
      selected[field] = doc[field];
    });

  if (doc._id) selected._id = doc._id;
  return selected;
};

const matchesFilter = (doc, filter = {}) => {
  return Object.entries(filter).every(([key, value]) => {
    if (key === "$or") {
      return value.some((entry) => matchesFilter(doc, entry));
    }

    return doc[key]?.toString() === value?.toString();
  });
};

class MemoryQuery {
  constructor(executor) {
    this.executor = executor;
    this.selectedFields = null;
    this.populateFields = [];
    this.sortSpec = null;
    this.limitCount = null;
  }

  select(fields) {
    this.selectedFields = fields;
    return this;
  }

  populate(path, fields) {
    this.populateFields.push({ path, fields });
    return this;
  }

  sort(spec) {
    this.sortSpec = spec;
    return this;
  }

  limit(count) {
    this.limitCount = count;
    return this;
  }

  async exec() {
    let result = await this.executor();

    if (Array.isArray(result)) {
      if (this.sortSpec) {
        const [[field, direction]] = Object.entries(this.sortSpec);
        result = [...result].sort((a, b) => {
          const av = new Date(a[field] ?? 0).getTime();
          const bv = new Date(b[field] ?? 0).getTime();
          return direction >= 0 ? av - bv : bv - av;
        });
      }

      if (this.limitCount != null) {
        result = result.slice(0, this.limitCount);
      }
    }

    result = applyPopulate(result, this.populateFields);
    result = applySelect(result, this.selectedFields);

    return result;
  }

  then(resolve, reject) {
    return this.exec().then(resolve, reject);
  }

  catch(reject) {
    return this.exec().catch(reject);
  }
}

const applySelect = (result, fields) => {
  if (!fields) return result;
  if (Array.isArray(result)) return result.map((entry) => pickFields(entry, fields));
  return pickFields(result, fields);
};

const applyPopulate = (result, populateFields) => {
  if (!populateFields.length) return result;

  const populateOne = (doc) => {
    if (!doc) return doc;

    let next = doc;
    for (const { path, fields } of populateFields) {
      const userId = next[path];
      if (!userId || typeof userId === "object") continue;

      const user = state.users.find((entry) => entry._id === userId);
      next = {
        ...next,
        [path]: user ? pickFields(user, fields) : null,
      };
    }

    return next;
  };

  if (Array.isArray(result)) return result.map(populateOne);
  return populateOne(result);
};

class MemoryUserDoc {
  constructor(data) {
    Object.assign(this, data);
  }

  async save() {
    const index = state.users.findIndex((entry) => entry._id === this._id);
    this.updatedAt = new Date().toISOString();
    if (index >= 0) state.users[index] = clone(this);
    return this;
  }

  select(fields) {
    return pickFields(this, fields);
  }
}

class MemorySessionDoc {
  constructor(data) {
    Object.assign(this, data);
  }

  async save() {
    const index = state.sessions.findIndex((entry) => entry._id === this._id);
    this.updatedAt = new Date().toISOString();
    if (index >= 0) state.sessions[index] = clone(this);
    return this;
  }
}

const wrapUser = (data) => (data ? new MemoryUserDoc(clone(data)) : null);
const wrapSession = (data) => (data ? new MemorySessionDoc(clone(data)) : null);

export const MemoryUserModel = {
  async create(data) {
    const timestamp = new Date().toISOString();
    const doc = {
      _id: randomUUID(),
      createdAt: timestamp,
      updatedAt: timestamp,
      ...data,
    };
    state.users.push(clone(doc));
    return wrapUser(doc);
  },

  findOne(filter) {
    return new MemoryQuery(async () => {
      const doc = state.users.find((entry) => matchesFilter(entry, filter));
      return wrapUser(doc);
    });
  },

  findById(id) {
    return new MemoryQuery(async () => wrapUser(state.users.find((entry) => entry._id === id)));
  },

  async deleteOne(filter) {
    const index = state.users.findIndex((entry) => matchesFilter(entry, filter));
    if (index >= 0) state.users.splice(index, 1);
    return { deletedCount: index >= 0 ? 1 : 0 };
  },
};

export const MemorySessionModel = {
  async create(data) {
    const timestamp = new Date().toISOString();
    const doc = {
      _id: randomUUID(),
      participant: null,
      status: "active",
      createdAt: timestamp,
      updatedAt: timestamp,
      ...data,
    };
    state.sessions.push(clone(doc));
    return wrapSession(doc);
  },

  find(filter) {
    return new MemoryQuery(async () =>
      state.sessions.filter((entry) => matchesFilter(entry, filter)).map(wrapSession)
    );
  },

  findById(id) {
    return new MemoryQuery(async () => wrapSession(state.sessions.find((entry) => entry._id === id)));
  },
};
