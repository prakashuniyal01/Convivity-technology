const { asyncHandler } = require ("../utils/asyncHandler.js");
const { ApiError } = require ("../utils/ApiError.js");
const { User } = require ("../models/user.model.js");
const { ApiResponse } = require ("../utils/ApiResponse.js");
const jwt = require ("jsonwebtoken");


const generateAccessAndRefreshToken = async (userID) => {
  try {
    const user = await User.findById(userID)
    const accessToken = user.generateAccessToken()
    const refreshToken = user.generateRefreshToken()

    user.refreshToken = refreshToken
    await user.save({ validateBeforeSave: false })

    return { accessToken, refreshToken }


  } catch (error) {
    throw new ApiError(500, "Something went wrong while generating referesh and access token")
  }
}

// register user
const registerUser = asyncHandler(async (req, res) => {
  /*  get user details = require frontend
        validation -not empty 
        check if user already exists: username email
        check for img check for avatar
        upload them to cloudinary, avatar
        create user object -create entery in db
        remove password and refresh token field = require response 
        check for user creation
        return response 
    */

  // destructure user data

  // get user details = require frontend validation -not empty
  const { fullName, email, userName, password } = req.body;
  console.log("email", email);
  if (
    [fullName, email, userName, password].some((field) => field?.trim() === "")
  ) {
    throw new ApiError(400, "full name is require");
  }
  //   check if user already exists: username email

  const existedUser = await User.findOne({
    $or: [{ userName }, { email }],
  });

  if (existedUser) {
    throw new ApiError(409, "User with email or username already exists");
  }
  // create user object -create entery in db
  const user = await User.create({
    fullName,
    email,
    password,
    userName, //: userName.toLowerCase()
  });

  // remove password and refresh token field = require response
  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );
  if (!createdUser) {
    throw new ApiError(
      500,
      "server fat gya h dekh le user controller me line number 65 me"
    );
  }

  return res
    .status(201)
    .json(new ApiResponse(200, createdUser, "user registered succesfully"));
});

// loggedin user
const loginUser = asyncHandler(async (req, res) => {
  // console.log(loggedInUser)
  // req body  =>
  // username or email
  // fine the user
  //password check
  // access and refresh token
  // send cookies

  const { email, userName, password } = req.body;
  if (!userName && !email) {
    throw new ApiError(400, "error login user name o email chahiye");
  }
  const user = await User.findOne({
    $or: [{ userName }, { email }],
  });
  if (!user) {
    throw new ApiError(401, "user hi nahi h ");
  }
  const isPassordValid = await user.isPassordCorrect(password);
  if (!isPassordValid) {
    throw new ApiError(401, "password sahi nahi hi nahi h ");
  }
  const { accessToken, refressToken } = await generateAccessAndRefreshToken(
    user._id
  );

  const loggedInUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );
  const options = {
    httpOnly: true,
    secure: true,
  };
  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refressToken, options)
    .json(
      new ApiResponse(
        200,
        {
          user: loggedInUser,
          accessToken,
          refressToken,
        },
        "user logged in successfully"
      )
    );
});

// loggout user
const logoutUser = asyncHandler(async (req, res) => {
  // console.log(loginUser)
  await User.findByIdAndUpdate(
    req.user._id,
    {
      $unset: {
        refressToken: 1,
      },
    },
    {
      new: true,
    }
  );

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "loged out "));
});
// db me token ko match krna user right h ki nahi
const refreshAccessToken = asyncHandler(async (req, res) => {
  try {
    const incomingRefreshToken =
      req.cookies.refressToken || req.body.refressToken;

    if (!incomingRefreshToken) {
      throw new ApiError(401, "unzuthorized request");
    }

    const decodedToken = jwt.verify(
      incomingRefreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );

    const user = await User.findById(decodedToken?._id);

    if (!user) {
      throw new ApiError(401, "user me kuch gadbad h invalid refresh token");
    }
    if (incomingRefreshToken !== user?.refressToken) {
      throw new ApiError(401, "refresh token ki validity samapt ho gyi h ");
    }
    const options = {
      httpOnly: true,
      secure: true,
    };
    const { accessToken, newRefressToken } =
      await generateAccessAndRefreshToken(user._id);

    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("newRefressToken", newRefressToken, options)
      .json(
        new ApiError(
          200,
          { accessToken, refressToken: newRefressToken },
          "access token refreshed"
        )
      );
  } catch (error) {
    throw new ApiError(401, error?.message || "invalid refresh token");
  }
});

const changeCurrentPassword = asyncHandler(async (req, res) => {
  const { oldPassword, newPassword } = req.body
  const user = await User.findById(req.user?._id)
  const isPasswordCorrect = await user.isPasswordCorrect(oldPassword)

  if (!isPasswordCorrect) {
    throw new ApiError(400, "Invalid old password")
  }

  user.password = newPassword
  await user.save({ validateBeforeSave: false })

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Password changed successfully"))
})

// current user

const getCurrentUser = asyncHandler(async (req, res) => {
  return res
    .status(200)
    .json(200, req.user, "current user fetched successfully");
});

const updateAccountDetails = asyncHandler(async (req, res) => {
  const { fullName, email } = req.body;

  if (!fullName || email) {
    throw new ApiError(400, "all fields are required");
  }

  const user = User.findByIdAndUpdate(
    req.user?._id,
    {
      $set: {
        fullName,
        email: email,
      },
    },
    { new: true }
  ).select("-password");

  return res
    .status(200)
    .json(new ApiResponse(200, user, "Account details updated successfully"));
});


module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  refreshAccessToken,
  changeCurrentPassword,
  updateAccountDetails,
  getCurrentUser
};
