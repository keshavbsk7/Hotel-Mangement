const userModel = require('../models/userModels')

const getTopHotelsByYear = async (req, res) => {
  try {
    const { startYear, endYear } = req.query;

    // Parse startYear and endYear to integers
    const start = parseInt(startYear);
    const end = parseInt(endYear);

    // Use MongoDB Aggregation Framework to calculate revenue and filter by year
    const topHotels = await userModel.aggregate([
        {
          $match: {
            $expr: {
              $and: [
                { $gte: [{ $toInt: { $substr: ['$checkin', 0, 4] } }, start] }, // Extract year from checkin string and convert to integer
                { $lte: [{ $toInt: { $substr: ['$checkin', 0, 4] } }, end] } // Extract year from checkin string and convert to integer
              ]
            }
          }
        },
        {
          $group: {
            _id: '$branch',
            revenue: {
              $sum: {
                $add: ['$Foodexpense', '$Roomexpense']
              }
            }
          }
        },
        {
          $sort: {
            revenue: -1
          }
        },
        {
          $limit: 5 // Limit to top 5 branches
        }
      ]);

    res.status(200).json({ success: true, data: topHotels });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error', success: false });
  }
};


const getTopCustomersByBranch = async (req, res) => {
  try {
    const {branch } = req.query;
    const pipeline = [
      {
        $addFields: {
          totalRevenue: { $sum: ['$Roomexpense', '$Foodexpense'] },
	        year: { $year: { $dateFromString: { dateString: '$checkin' } } }
        }
      },
      
      {
        $match: {branch:branch}
      },
      {
        $sort: {
          totalRevenue: -1, 
        },
      },
      {
        $group: {
          _id: {
            branch: '$branch',
            year: '$year'
          },
          customers: {
            $push: {
              name: '$name',
              totalRevenue: '$totalRevenue',
            }
          }
        }
      },
      
      {
        $project: {
          _id: 0,
          branch: '$_id.branch',
          year: '$_id.year',
          topCustomers: {
            $slice: ['$customers', 1],
          }
        }
      },
      {
        $sort: {
          year: 1, 
        },
      }
    ];

    const topCustomers = await userModel.aggregate(pipeline);
    res.status(200).json({ success: true, data: topCustomers });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error', success: false });
  }
};

const yearwiseCitywiseRevenueController = async (req, res) => {
  try {
    const { startYear, endYear, branch } = req.query;
    console.log(`Received request with startYear: ${startYear}, endYear: ${endYear}, branch: ${branch}`);
    // Extract the year from the checkin field using aggregation
    const start = parseInt(startYear);
    const end = parseInt(endYear);
    const filteredResults = await userModel.aggregate([
      {
        $addFields: {
          year: { $year: { $dateFromString: { dateString: '$checkin' } } }
        }
      },
      {
        $match: {branch:branch}
      },
      {
        $match: {
          
          $expr: {
            $and: [
              { $gte: [{ $toInt: { $substr: ['$checkin', 0, 4] } }, start] }, 
              { $lte: [{ $toInt: { $substr: ['$checkin', 0, 4] } }, end] }, // Extract year from checkin string and convert to integer
            ]
          }
        }
      },
      {
        $sort: {
          year: 1
        }
      },
      {
        $group: {
          _id: { branch: '$branch' },
          totalRevenue: {
            $sum: { $add: ['$Roomexpense', '$Foodexpense'] }
          }
        }
      },
      

      
    ]);

    res.status(200).json({ success: true, data: filteredResults });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error', success: false });
  }
};

module.exports = { yearwiseCitywiseRevenueController };



const analyticalQueryController = async (req, res) => {
    try {
      const averageRoomExpense = await userModel.aggregate([
        {
          $group: {
            _id: null,
            averageRoomExpense: { $avg: { $toDouble: '$Roomexpense' } },
          },
        },
      ]);
  
      if (averageRoomExpense && averageRoomExpense.length > 0) {
        res.status(200).json({
          message: 'Analytical query executed successfully',
          success: true,
          data: { averageRoomExpense: averageRoomExpense[0].averageRoomExpense },
        });
      } else {
        res.status(404).json({ message: 'No data found', success: false });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error', success: false });
    }
  };
  

const registerController = async(req,res) => {
    try{
        const existingUser = await userModel.findOne({email:req.body.email})
        if (existingUser){
            return res.status(200).send({message:'User already exists',success:false});
        }

        const password = req.body.password
        console.log(req.body)
        //req.body.state = req.body.state[0]
        req.body.roomtype = req.body.roomtype[0] 
        const newUser = new userModel(req.body)
        await newUser.save()
        res.status(201).send({message:'Registered Successfully',success:true})
        
    

    } catch(error){
        console.log(error)
        res.status(500).send({success:false, message:'Register controller'})
    }
}
const getUserById = async (req, res) => {
  try {
    console.log('hi');
    const { userId } = req.params;
    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found', success: false });
    }
    res.status(200).json({ message: 'User found successfully', success: true, data: user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error', success: false });
  }
};
const loginController = async(req,res) => {
    try{
        const user = 1
        if(!user){
            return res.status(200).send({message:'User not found',success:false})
        }
        const isMatch= ('password'=='password')
        if(!isMatch){
            return res.status(200).send({message:'Invalid Password',success:false})
        }
        res.status(200).send({message:'Login Success',success:true})
    } catch(error){
        console.log(error)
        res.status(500).send({message:error.message})
    }
}

const searchController = async(req,res) =>{
  try {
      console.log('Inside search');
      const user = await userModel.findOne({name:req.body.name});
      
      if(!user){
          res.status(200).send({message:'User not found',success:false})
      }
      console.log(user);
      res.status(201).send({message:'Searched Successfully',success:true,data:user})

  } catch (error) {
      console.log(error);        
  }
}

module.exports = {analyticalQueryController,loginController, registerController, searchController,getUserById,yearwiseCitywiseRevenueController,getTopCustomersByBranch,getTopHotelsByYear}