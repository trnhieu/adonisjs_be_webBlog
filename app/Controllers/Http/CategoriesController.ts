import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Category from 'App/Models/Category'

export default class CategoriesController {
  public async index({ response }: HttpContextContract) {
    const data = await Category.query().preload('blogs')
    return response.json(data)
  }

  public async store({ request, response }: HttpContextContract) {
    const { name } = request.all()
    await Category.create({ name })
    return response.json({ name })
  }
}
