import mongoose from "mongoose"
import validator from "validator"
import bcrypt from "bcrypt"

// Interface that describes the user type for creating a new user
interface userType {
    name:string,
    email:string,
    password:string,
    confirmPassword:string
}

// Interface that describes the user document in the database
interface userDocument extends mongoose.Document {
    name:string,
    email:string,
    password:string,
    confirmPassword:string|undefined,
    correctPassword(candidatePassword:string,userPassword:string):boolean
}

// Interface that describes the user model with a static method to create a document
// This allows us to use the createDocument method on the User model
interface userModel extends mongoose.Model<userDocument> {
    createDocument(document:userType):userDocument,
}


const userSchema = new mongoose.Schema<userDocument>({
    name:{
        type:String,
        required:[true,"Enter name"]
    },
    email:{
        type:String,
        required:[true,"Enter email"],
        validate:[validator.isEmail,"Please enter valid email"],
        unique:true,
    },
    password:{
        type:String,
        required:[true,"Enter password"],
        select:false
    },
    confirmPassword:{
        type:String,
        validate:{
            validator:function(val:string):boolean{
                return val===this.password
            },
            message:"passwords don't match"
        },
        select:false
    }
},{
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
})

userSchema.statics.createDocument = function(document:userType){
    return new User(document)
}


// Middleware to hash the password before saving the user document
userSchema.pre("save",async function(next){
    // If the password is not modified, skip hashing
    if(!this.isModified('password')) return next()
    
    this.password = await bcrypt.hash(this.password,12)
    this.confirmPassword = undefined 
})

// Method to check if the provided password matches the hashed password in the database
userSchema.methods.correctPassword = async function (candidatePassword:string,userPassword:string){
    return await bcrypt.compare(candidatePassword,userPassword)
}


const User = mongoose.model<userDocument,userModel>("users",userSchema)

export default User
