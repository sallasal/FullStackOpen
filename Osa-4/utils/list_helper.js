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

const writerWithMostBlogs = (blogs) => {
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

  const indexOfMaxLikes = blogAmounts.indexOf(maxBlogAmount)
  const mostWrittenAuthor = uniqueWriters[indexOfMaxLikes]

  return {
    author: mostWrittenAuthor,
    blogs: maxBlogAmount
  }
}

module.exports = {
  dummy,
  totalLikes,
  mostLiked,
  writerWithMostBlogs
}