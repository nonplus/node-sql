'use strict';

var Harness = require('./support');
var user = Harness.defineUserTable();
var post = Harness.definePostTable();

//shortcut: 'select * from <table>'
Harness.test({
  query : user,
  pg    : 'SELECT "user".* FROM "user"',
  sqlite: 'SELECT "user".* FROM "user"',
  mysql : 'SELECT `user`.* FROM `user`'
});

Harness.test({
  query : user.where(user.name.equals(3)),
  pg    : 'SELECT "user".* FROM "user" WHERE ("user"."name" = $1)',
  sqlite: 'SELECT "user".* FROM "user" WHERE ("user"."name" = $1)',
  mysql : 'SELECT `user`.* FROM `user` WHERE (`user`.`name` = ?)',
  params : [3]
});

Harness.test({
  query : user.where(user.name.equals(3)).where(user.id.equals(1)),
  pg    : 'SELECT "user".* FROM "user" WHERE (("user"."name" = $1) AND ("user"."id" = $2))',
  sqlite: 'SELECT "user".* FROM "user" WHERE (("user"."name" = $1) AND ("user"."id" = $2))',
  mysql : 'SELECT `user`.* FROM `user` WHERE ((`user`.`name` = ?) AND (`user`.`id` = ?))',
  params: [3,1]
});

//shortcut: no 'from'
Harness.test({
  query : post.select(post.content),
  pg    : 'SELECT "post"."content" FROM "post"',
  sqlite: 'SELECT "post"."content" FROM "post"',
  mysql : 'SELECT `post`.`content` FROM `post`'
});

Harness.test({
  query : post.select(post.content).where(post.userId.equals(1)),
  pg    : 'SELECT "post"."content" FROM "post" WHERE ("post"."userId" = $1)',
  sqlite: 'SELECT "post"."content" FROM "post" WHERE ("post"."userId" = $1)',
  mysql : 'SELECT `post`.`content` FROM `post` WHERE (`post`.`userId` = ?)',
  params: [1]
});



