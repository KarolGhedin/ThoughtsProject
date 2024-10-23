import User from '../models/user.js'
import bcrypt from 'bcryptjs';


export default class AuthController {

    static login(req, res) {
        res.render('auth/login')
    }

    static async loginPost(req, res) {
        const { email, password } = req.body

        //find user
        const user = await User.findOne({ where: { email:email } })

        if(!user) {
            req.flash('message', 'This email is not registered.')
            res.render('auth/login')
        }

        //check if password match
        const passwordMatch = bcrypt.compareSync(password, user.password)

        if(!passwordMatch) {
            req.flash('message', 'Invalid password')
            res.render('auth/login')

            return
        }

        //initialize session
        req.session.userid = user.id

        req.flash('message', 'Welcome back!')

        req.session.save(() => {
            res.redirect('/')
        })
    }

    static register(req, res) {
        res.render('auth/register')
    }

    static async registerPost(req, res) {
        const {name, email, password, confirmpassword} = req.body

        // password match validation
        if(password != confirmpassword) {
            req.flash('message', 'The passwords need to be the same')
            res.render('auth/register')

            return
        }

        //check if user exists
        const checkifUserExists = await User.findOne({ where: {email: email} })

        if(checkifUserExists) {
            req.flash('message', 'The email is already registered.')
            res.render('auth/register')

            return
        }

        //create a password
        const salt = bcrypt.genSaltSync(10)
        const hashedPassword = bcrypt.hashSync(password, salt)

        const user = {
            name,
            email,
            password: hashedPassword,
        }

        try {
            const createUser = await User.create(user)  
            
            //initialize session
            req.session.userid = createUser.id

            req.flash('message', 'Welcome to our community!')

            req.session.save(() => {
                res.redirect('/')
            })
        } catch (error) {
            console.log(error)
        }
    }

    static logout(req, res) {
        req.session.destroy()
        res.redirect('/login')
    }
}