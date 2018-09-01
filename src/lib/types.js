import PropTypes from 'prop-types'

export const EmojiPropTypes = PropTypes.shape({
  shortcode: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  staticUrl: PropTypes.string.isRequired,
  visibleInPicker: PropTypes.bool
})

export const AccountPropTypes = PropTypes.shape({
  id: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  acct: PropTypes.string.isRequired,
  uacct: PropTypes.string.isRequired,
  uri: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  locked: PropTypes.bool,
  bot: PropTypes.bool,
  createdAt: PropTypes.string.isRequired,
  note: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
  avatarStatic: PropTypes.string.isRequired,
  header: PropTypes.string.isRequired,
  headerStatic: PropTypes.string.isRequired,
  followersCount: PropTypes.number.isRequired,
  followingCount: PropTypes.number.isRequired,
  statusesCount: PropTypes.number.isRequired,
  emojis: PropTypes.arrayOf(EmojiPropTypes).isRequired,
  fields: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired
    })
  ).isRequired
})

export const InstancePropTypes = PropTypes.shape({
  uri: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  version: PropTypes.string.isRequired,
  urls: PropTypes.shape({
    streamingApi: PropTypes.string.isRequired
  }).isRequired,
  stats: PropTypes.shape({
    userCount: PropTypes.number.isRequired,
    statusCount: PropTypes.number.isRequired,
    domainCount: PropTypes.number.isRequired
  }).isRequired,
  thumbnail: PropTypes.string.isRequired,
  languages: PropTypes.arrayOf(PropTypes.string).isRequired,
  contactAccount: PropTypes.string.isRequired
})
