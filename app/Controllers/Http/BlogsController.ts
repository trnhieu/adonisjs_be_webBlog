import Application from '@ioc:Adonis/Core/Application'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Blog from 'App/Models/Blog'
export default class BlogsController {
  public async index({ response }: HttpContextContract) {
    const data = await Blog.query().preload('category').preload('user')
    return response.json({ message: 'lay thanh cong', data: data })
  }
  public async store({ request, response }: HttpContextContract) {
    const { title, content, userId, categoryId } = request.all()
    const newBlog = new Blog()
    newBlog.title = title
    newBlog.content = content
    newBlog.category_id = categoryId
    newBlog.user_id = userId
    console.log(newBlog)

    const image = request.file('image')
    if (image) {
      const imageName = `${new Date().getTime()}.${image.extname}`
      await image.move(Application.tmpPath('uploads'), { name: imageName })
      newBlog.image = imageName
    } else {
      newBlog.image = ''
    }
    await newBlog.save()
    return response.json({ message: 'tao blog thanh cong', data: newBlog })
  }
}
