const prisma = require("./prisma");

async function addUser(username, email, password) {
  try {
    const user = await prisma.user.create({
      data: {
        username: username,
        email: email,
        password: password
      }
    })
    console.log('PRISMA USER', user)
    return user;
  } catch (error) {
    console.log('AAAAAAAAAA', error)
  }
}

async function createPost(authorId, title, content) {
  const post = await prisma.post.create({
    data: {
      title: title,
      content: content,
      author: {
        connect: {
          id: authorId
        }
      }
    }
  })

  return post;
}

async function getAllPosts() {
  const posts = await prisma.post.findMany();

  return posts;
}

module.exports = {
  addUser,
  createPost,
  getAllPosts,
}