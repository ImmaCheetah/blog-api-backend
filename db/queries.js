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

async function getPost(postId) {
  const post = await prisma.post.findFirst({
    where: {
      id: postId
    }
  });

  return post;
}

async function updatePost(userId, postId, newTitle, newContent, newIsPublished) {
  const post = await prisma.post.update({
    where: {
      id: postId,
      authorId: userId
    },
    data: {
      title: newTitle,
      content: newContent,
      isPublished: newIsPublished
    }
  })

  return post;
}

async function deletePost(userId, postId) {
  await prisma.post.delete({
    where: {
      id: postId,
      authorId: userId
    }
  })
}

module.exports = {
  addUser,
  createPost,
  getPost,
  updatePost,
  deletePost,
  getAllPosts,
}