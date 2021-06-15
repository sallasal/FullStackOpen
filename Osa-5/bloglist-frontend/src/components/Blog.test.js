import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import { prettyDOM } from '@testing-library/dom'
import Blog from './Blog'

describe('<Blog />',() => {
  let component
  let blog
  let blogs
  const mockHandler = jest.fn()

  beforeEach(() => {
    blog = {
      author: 'Blog author is rendered',
      title: 'Blog title is rendered',
      url: 'Blog url is rendered',
      likes: 765,
      user: {
        id: 3,
        name: 'test user'
      },
      id:7
    }

    blogs = []

    component = render(
      <Blog blog={ blog } blogs={ blogs } setBlogs={ mockHandler } className='testBlog'/>
    )
  })

  test('renders the blog', () => {
    expect(component.container.querySelector('.testBlog')).toBeDefined()
  })

  test('at start limited info is visible', () => {
    const div = component.container.querySelector('.limitedBlogInfo')
    expect(div).not.toHaveStyle('display: none')
  })

  test('at start full info is not visible', () => {
    const div = component.container.querySelector('.fullBlogInfo')
    expect(div).toHaveStyle('display: none')
  })

  test('after clicking the show button, full information is shown', () => {
    const button = component.getByText('Show')
    fireEvent.click(button)

    const div = component.container.querySelector('.fullBlogInfo')
    expect(div).not.toHaveStyle('display: none')
  })

  test('after clicking the show button, limited information is hidden', () => {
    const button = component.getByText('Show')
    fireEvent.click(button)

    const div = component.container.querySelector('.limitedBlogInfo')
    expect(div).toHaveStyle('display: none')
  })

  test('clicking the like button calls new blogs', async () => {
    const user = blog.user
    const likeHandler = jest.fn()
    const likeComponent = render(
      <div className='fullBlogInfo'>
        Title: { blog.title }<br />
        Author: { blog.author }<br />
        URL: { blog.url }<br />
        Likes: { blog.likes }<button onClick={ likeHandler }>LikeThis</button><br />
        Creator: { user.name }<br />
      </div>
    )

    const buttonLike = likeComponent.getByText('LikeThis')
    fireEvent.click(buttonLike)
    fireEvent.click(buttonLike)

    expect(likeHandler.mock.calls).toHaveLength(2)
  })

})