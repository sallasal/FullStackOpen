const dummy = (blogs) => {
  return 7
}

const totalLikes = (blogs) => {
  const reducer = (sum, blog) => {
    return sum + blog.likes
  }

  return blogs.reduce(reducer, 0)
}

const mostLiked = (blogs) => {
  const likeAmounts = blogs.map((blog) => blog.likes)
  const maxLikeAmount = likeAmounts.reduce((first, second) => {
    return Math.max(first, second)
  },0)
  const mostLikedBlog = blogs.find((blog) => {
    return blog.likes === maxLikeAmount
  })
  return {
    title: mostLikedBlog.title,
    author: mostLikedBlog.author,
    likes: mostLikedBlog.likes
  }
}

const mostBlogs = (blogs) => {
  const writers = blogs.map((blog) => blog.author)

  const uniqueWriters = writers.filter((value, index, self) => {
    return self.indexOf(value) === index
  })

  const blogAmounts = uniqueWriters.map((writer) => {
    const blogsForWriter = blogs.filter((blog) => {
      return blog.author === writer
    })
    return blogsForWriter.length
  })

  const maxBlogAmount = blogAmounts.reduce((first, second) => {
    return Math.max(first, second)
  }, 0)

  const indexOfMaxBlogs = blogAmounts.indexOf(maxBlogAmount)
  const mostWrittenAuthor = uniqueWriters[indexOfMaxBlogs]

  return {
    author: mostWrittenAuthor,
    blogs: maxBlogAmount
  }
}

const mostLikes = (blogs) => {
  const writers = blogs.map((blog) => blog.author)

  const uniqueWriters = writers.filter((value, index, self) => {
    return self.indexOf(value) === index
  })

  const blogsForWriter = uniqueWriters.map((writer) => {
    const blogsForWriter = blogs.filter((blog) => {
      return blog.author === writer
    })
    return blogsForWriter
  })

  const likeSums = blogsForWriter.map((writerArray) => {
    const likes = writerArray.map((array => array.likes))
    return likes.reduce((sum, item) => {
      return sum + item
    }, 0)
  })

  const maxLikeAmount = likeSums.reduce((first, second) => {
    return Math.max(first, second)
  })

  const indexOfMaxLikes = likeSums.indexOf(maxLikeAmount)
  const mostLikedAuthor = uniqueWriters[indexOfMaxLikes]

  return {
    author: mostLikedAuthor,
    likes: maxLikeAmount
  }
}

module.exports = {
  dummy,
  totalLikes,
  mostLiked,
  mostBlogs,
  mostLikes
}