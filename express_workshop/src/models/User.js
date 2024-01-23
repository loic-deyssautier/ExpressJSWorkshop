const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true,
      unique: false
    },
    picture: {
      type: Array,
      required: false,
      unique: false
    }, 
    groups: {
      type: Array,
      required: false,
      unique: false
    },
    email: {
      type: String,
      required: false,
      unique: false
    },
    role: {
      type: String,
      required: false,
      enum: ['user', 'admin'],
      default: 'user'
    },
    subscription: {
      type: Array,
      required: false,
      unique: false
    }
  },
  { timestamps: true }
);

userSchema.pre('save', async function (next) {
  const user = this;
  if (!user.isModified('password')) return next();

  try {
    const salt = await bcrypt.genSalt();
    user.password = await bcrypt.hash(user.password, salt);
    next();
  } catch (error) {
    return next(error);
  }
});

userSchema.methods.comparePassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

const User = mongoose.model('User', userSchema);

module.exports = User;