import User from "../models/User.js"


export const signUp = async (req, res) => {
  const {username, email, password, roles} = req.body

  const newUser = new User({
    username,
    email,
    password: User.encryptPassword(password)
  })

  /* const savedUser = await newUser.save()
  console.log(newUser) */
  
  console.log(newUser)
  res.json('signUp')


}

export const signIn = async (req, res) => {
  res.json('signIn')
}