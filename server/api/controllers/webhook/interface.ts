export interface Issue {
  key: string;
  fields: Fields;
  user: User;
  changelog: Changelog;
}

interface Fields {
  //eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

interface Changelog {
  items: Items[];
}

export interface User {
  displayName: string;
  emailAddress: string;
}

interface Items {
  field: string;
  fieldtype: string;
  from: string | null;
  fromString: string | null;
  to: string | null;
  toString: string;
}
