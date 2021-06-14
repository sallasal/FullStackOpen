import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

describe('<Blog />',() => {
  let component
  let blog
  let blogs
  let setBlogs

  beforeEach(() => {
    blog = {
      author: 'Blog author is rendered',
      title: 'Blog title is rendered',
      url: 'Blog url is rendered',
      likes: 765
    }

    blogs = []

    setBlogs = (newList => {
      blogs = newList
    })

    component = render(
      <Blog blog={ blog } blogs={ blogs } setBlogs={ setBlogs } className='testBlog'/>
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

})