import isEmail from 'validator/lib/isEmail'
import isStrongPassword from 'validator/lib/isStrongPassword'
import isLength from 'validator/lib/isLength'

interface ValidateUserSignup {
  email: string
  password: string
  name?: string | null
}

export function validateUserSignup({ email, password, name }: ValidateUserSignup) {
  if (!isEmail(email)) {
    throw new Error('invalid_email_address')
  }

  const [, emailHost] = email.split('@')

  if (!emailHost.includes('itemis.')) {
    throw new Error('signup_requires_itemis_email_address')
  }

  if (!isStrongPassword(password)) {
    throw new Error('insufficient_password_strength')
  }

  if (name) {
    if (!isLength(name, { min: 2 })) {
      throw new Error('username_too_short')
    }

    if (!isLength(name, { max: 64 })) {
      throw new Error('username_too_long')
    }
  }

  return true
}
