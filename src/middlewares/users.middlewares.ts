import { Request, Response, NextFunction } from 'express'
import { checkSchema } from 'express-validator'

// Models
import { ErrorWithStatus } from '~/models/Errors'

// Services
import usersService from '~/services/users.services'

// Utilities
import { validate } from '~/utils/validation'

export const loginValidator = (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body
  if (!email || !password) {
    return res.status(400).json({ error: 'Please provide email or password' })
  }
  next()
}

export const registerValidator = validate(
  checkSchema({
    name: {
      notEmpty: true,
      isString: true,
      trim: true,
      isLength: {
        options: {
          min: 1,
          max: 100
        }
      }
    },
    email: {
      notEmpty: true,
      isEmail: true,
      trim: true,
      custom: {
        options: async (value) => {
          const isExistEmail = await usersService.checkExistEmail(value)
          if (isExistEmail) {
            throw new Error('Email already exists')
          }
          return isExistEmail
        }
      }
    },
    password: {
      notEmpty: true,
      isString: true,
      isLength: {
        options: {
          min: 6,
          max: 50
        }
      },
      isStrongPassword: {
        options: {
          minLength: 6,
          minLowercase: 1,
          minUppercase: 1,
          minSymbols: 1,
          minNumbers: 1
        },
        errorMessage:
          'Password must be at least 6 characters long and contain at least 1 lowercase letter, 1 uppercase letter, 1 number and 1 symbol'
      }
    },
    confirm_password: {
      notEmpty: true,
      isString: true,
      isLength: {
        options: {
          min: 6,
          max: 50
        }
      },
      isStrongPassword: {
        options: {
          minLength: 6,
          minLowercase: 1,
          minUppercase: 1,
          minSymbols: 1,
          minNumbers: 1
        },
        errorMessage:
          'Password must be at least 6 characters long and contain at least 1 lowercase letter, 1 uppercase letter, 1 number and 1 symbol'
      },
      custom: {
        options: (value, { req }) => {
          return value === req.body.password
        },
        errorMessage: 'Password confirmation does not match password'
      }
    },
    date_of_birth: {
      isISO8601: {
        options: {
          strict: true,
          strictSeparator: true
        }
      }
    }
  })
)
