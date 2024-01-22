
const helloWorldGet = async (req, res, next) => {
    try {
      res.status(201).json({ message: 'Hello world' });
    } catch (error) {
      next(error);
    }
};

module.exports = { 
    helloWorldGet
};


  