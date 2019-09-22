const blogs = [{
  'title': 'John Smith\'s life',
  'author': 'John Smith',
  'url': 'www.google.com',
  'likes': 7,
  'user': {
    'username': 'John Smith',
    'name': 'John Smith 34',
    'id': '5d59a03ccd58918385085787'
  },
  'id': '5d5cd2d9f31dcec36c9fc30c'
}, {
  'title': 'Drake ft. Drake',
  'url': 'drake.com',
  'author': 'drake',
  'user': {
    'username': 'testuser',
    'name': 'Test User',
    'id': '5d5cdb18e9c2cfd2e5c7972c'
  },
  'likes': 6,
  'id': '5d612328853aa40b47e02e8f'
}, {
  'title': 'Best Book',
  'url': 'everyone.ca',
  'author': 'Everyone',
  'user': {
    'username': 'testuser',
    'name': 'Test User',
    'id': '5d5cdb18e9c2cfd2e5c7972c'
  },
  'likes': 0,
  'id': '5d61297bdfab3204ef39487c'
}, {
  'title': 'title1',
  'url': 'url1',
  'author': 'author1',
  'user': {
    'username': 'testuser',
    'name': 'Test User',
    'id': '5d5cdb18e9c2cfd2e5c7972c'
  },
  'likes': 2,
  'id': '5d61325cdfab3204ef39487e'
}, {
  'title': 'fsdaf',
  'url': 'fdsaf',
  'author': 'sdfasf',
  'user': {
    'username': 'testuser',
    'name': 'Test User',
    'id': '5d5cdb18e9c2cfd2e5c7972c'
  },
  'likes': 0,
  'id': '5d6132f1dfab3204ef394880'
}, {
  'title': 'sdafdf',
  'url': 'asdf',
  'author': 'asdf',
  'user': {
    'username': 'testuser',
    'name': 'Test User',
    'id': '5d5cdb18e9c2cfd2e5c7972c'
  },
  'likes': 0,
  'id': '5d613310dfab3204ef394881'
}, {
  'title': 'frank',
  'url': 'sdff.com',
  'author': 'hi',
  'user': {
    'username': 'testuser',
    'name': 'Test User',
    'id': '5d5cdb18e9c2cfd2e5c7972c'
  },
  'likes': 1,
  'id': '5d873b79a88edaf971df72b9'
}]

const getAll = () => {
  return Promise.resolve(blogs)
}

export default { getAll }