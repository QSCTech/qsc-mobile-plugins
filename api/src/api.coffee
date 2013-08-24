message = new Message
M =
  kvdb: new KVDB(message)
  view: new View(message)
  config: new Config(message)
  user: new User(message)
