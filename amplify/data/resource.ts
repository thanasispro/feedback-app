import { type ClientSchema, a, defineData } from '@aws-amplify/backend';

const schema = a.schema({
  User: a.model({
    username: a.string().required(),
    name: a.string().required(),
    image: a.string(),
    comments: a.hasMany('Comment', 'userId'),
  }).authorization((allow) => [allow.owner()]),

  Feedback: a.model({
    title: a.string().required(),
    description: a.string().required(),
    category: a.enum(['UI', 'UX', 'Enhancement', 'Feature', 'Bug']),
    status: a.enum(['Suggestion', 'Planned', 'InProgress', 'Live']),
    upvotes: a.integer().default(0),
    comments: a.hasMany('Comment', 'feedbackId'),
  }).authorization((allow) => [allow.owner()]),

  Comment: a.model({
    content: a.string().required(),
    replyingTo: a.string(),
    userId: a.id(),
    user: a.belongsTo('User', 'userId'),
    feedbackId: a.id(),
    feedback: a.belongsTo('Feedback', 'feedbackId'),
  }).authorization((allow) => [allow.owner()]),
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: 'userPool',
  },
});
