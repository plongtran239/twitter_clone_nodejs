import { Request, Response } from 'express'

export const loginController = (req: Request, res: Response) => {
  const { email, password } = req.body
  if (email === 'plongtran239' && password === '123123') {
    return res.status(200).json({
      message: 'Login successful'
    })
  }
  return res.status(404).json({ error: 'Login failed' })
}
