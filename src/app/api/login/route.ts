// import User from "./model";

import { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import connectDB from "../../../../lib/database";
import User from "./model";

// export async function POST(req, res, next) {
//   const data = req.body;
//   const login = await User.find({ email: data.email });
//   if (login.length === 0) {
//     const randomId = Math.random().toString(30).substring(2, 10) + Math.random().toString(30).substring(2, 10);
//     const datas = { ...data, token: randomId };
//     const createUser = await User.create(datas);

//     res.status(200).json({
//       status: "Success",
//       message: "SignUp Successfully",
//       createUser,
//     });
//   } else {
//     res.status(400).json({
//       status: "Exist",
//       message: "Data Already Exist",
//     });
//   }
// }

// export async function PATCH(req, res, next) {
//   const data = req.body;
//   const datas = await User.findOne({ email: data.email });
//   if (datas) {
//     res.status(200).json({
//       status: "Success",
//       message: "SignUp Successfully",
//       datas,
//     });
//   } else {
//     res.status(400).json({
//       status: "Bad request",
//       message: "Invalid Credential",
//     });
//   }
// }

// import mongoose from "mongoose";

// const User = mongoose.model("Users", {
//   userName: String,
//   email: String,
//   password: String,
// });

// import mongoose from "mongoose";

// const UsersSchema = new mongoose.Schema({
//   name: String,
//   email: String,
//   password: String,
// });

// const Users = mongoose.model("Users", UsersSchema);

// export { Users };

// export default {
//   async getUsers() {
//     const users = await Users.find();
//     return users;
//   },
//   async createUser(name, email, password) {
//     const user = new Users({ name, email, password });
//     await user.save();
//     return user;
//   },
// };

export async function POST(req: NextRequest) {
  const data = await req.json();
  try {
    // await console.log("data", data);
    await connectDB();
    const login = await User.find({ email: data.email });
    if (login.length === 0) {
      const randomId = Math.random().toString(30).substring(2, 10) + Math.random().toString(30).substring(2, 10);
      const datas = { ...data, token: randomId };
      const createUser = await User.create(datas);
      return NextResponse.json({
        status: 201,
        message: "Success",
        createUser,
      });
    } else {
      return NextResponse.json({
        status: 400,
        message: "User Already Exist",
      });
    }
  } catch (err) {
    console.log("err", err);
  }
}

export async function PATCH(req: NextRequest) {
  const data = await req.json();
  try {
    // await console.log("data", data);
    await connectDB();
    const login = await User.findOne({ email: data.email, password: data.password });
    if (login) {
      return NextResponse.json({
        status: 201,
        message: "Success",
        login,
      });
    } else {
      return NextResponse.json({
        status: 400,
        message: "User doesn't Exist",
      });
    }
  } catch (err) {
    console.log("err", err);
  }
}
