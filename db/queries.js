const prisma = require("./prisma");

async function findUserByUsername(username) {
  const user = await prisma.user.findFirst({
    where: {
      username: username
    }
  })

  return user;
}

async function findUserByEmail(email) {
  const user = await prisma.user.findFirst({
    where: {
      email: email
    }
  })

  return user;
}

async function createUser(username, email, password) {
  try {
    const user = await prisma.user.create({
      data: {
        username: username,
        email: email,
        password: password,
      },
    });
    console.log("PRISMA USER", user);
    return user;
  } catch (error) {
    console.log("AAAAAAAAAA", error);
  }
}

async function createPost(authorId, title, content) {
  const post = await prisma.post.create({
    data: {
      title: title,
      content: content,
      author: {
        connect: {
          id: authorId,
        },
      },
    },
  });

  return post;
}

async function createComment(authorId, postId, content) {
  const comment = await prisma.comment.create({
    data: {
      content: content,
      authorId: authorId,
      postId: postId,
    },
    include: {
      post: true,
      author: true
    },
  });

  return comment;
}

async function getAllPosts() {
  const posts = await prisma.post.findMany({
    where: {
      isPublished: true
    },
    include: {
      author: true
    },
    orderBy: {
      timestamp: 'desc'
    }
  });

  return posts;
}

async function getPost(postId) {
  const post = await prisma.post.findFirst({
    where: {
      id: postId,
    },
    include: {
      author: true,
      comments: {
        orderBy: {
          timestamp: 'desc'
        },
        include: {
          author: true
        }
      }
    },
  });

  return post;
}

async function updatePost(
  userId,
  postId,
  newTitle,
  newContent,
  newIsPublished,
) {
  const post = await prisma.post.update({
    where: {
      id: postId,
      authorId: userId,
    },
    data: {
      title: newTitle,
      content: newContent,
      isPublished: newIsPublished,
    },
  });

  return post;
}

async function deletePost(userId, postId) {
  const post = await prisma.post.delete({
    where: {
      id: postId,
      authorId: userId,
    },
  });

  return post;
}

async function setAuthor(userId) {
  const author = await prisma.user.update({
    where: {
      id: userId
    },
    data: {
      isAuthor: true
    }
  })

  return author;
}

module.exports = {
  findUserByUsername,
  findUserByEmail,
  createUser,
  createPost,
  createComment,
  getPost,
  updatePost,
  deletePost,
  getAllPosts,
  setAuthor
};
