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
  })
  const mostLikedBlog = blogs.find((blog) => {
    return blog.likes === maxLikeAmount
  })
  return {
    title: mostLikedBlog.title,
    author: mostLikedBlog.author,
    likes: mostLikedBlog.likes
  }
}

module.exports = {
  dummy,
  totalLikes,
  mostLiked
}