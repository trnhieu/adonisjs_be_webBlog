import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'

export default class UsersController {
  public async register({ request, response }: HttpContextContract) {
    const { userName, email, password } = request.all()
    const data = await User.create({ user_name: userName, email: email, password: password })
    return response.json({ message: 'tao thanh cong', data: data })
  }
  public async login({ auth, request, response }: HttpContextContract) {
    const { userName, password } = request.all()
    try {
      const token = await auth.attempt(userName, password)
      return response.json({ message: 'dang nhap thanh cong', token: token })
    } catch (err) {
      return response.json({ message: err })
    }
  }
}
