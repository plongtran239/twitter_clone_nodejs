import { Request, Response } from 'express'
import { ParamsDictionary } from 'express-serve-static-core'

import { RegisterReqBody } from '~/models/requests/user.request'

import usersService from '~/services/users.services'

export const loginController = (req: Request, res: Response) => {
  const { email, password } = req.body
  if (email === 'plongtran239' && password === '123123') {
    return res.json({
      message: 'Login successful'
    })
  }
  return res.status(400).json({ error: 'Login failed' })
}

export const registerController = async (req: Request<ParamsDictionary, any, RegisterReqBody>, res: Response) => {
  try {
    const result = await usersService.register(req.body)
    return res.json({
      message: 'Register successful',
      result
    })
  } catch (error) {
    return res.status(400).json({
      error: 'Register failed'
    })
  }
}
