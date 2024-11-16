import initDB from "@/Helpers/initDB";
import bcrypt from "bcrypt";
import User from "@/Modal/User";
import jwt from "jsonwebtoken";
initDB();
import { NextResponse } from "next/server";
export async function POST(request) {
  try {
    const Data = await request.json();
    const { email, password, role } = Data;

    const findUser = await User.findOne({ email, role });

    if (!findUser) {
      throw new Error("User not Found");
    }
    const checkPassword = await bcrypt.compare(password, findUser.password);

    if (checkPassword) {
      return NextResponse.json({
        isSuccess: true,
        userExist: false,
        UserName: findUser.name,
        UserID: findUser._id,
        UserRole: findUser.role,
        UserPhone: findUser.phoneNo,
        UserEmail: findUser.email,
        UserGender: findUser.gender,
        message: "Login Success",
        token: genToken(findUser?._id),
      });
    }
    throw new Error("Invalid Credentials");
  } catch (error) {
    return NextResponse.json(
      {
        isSuccess: false,
        errorMsg: error.message,
      },
      {
        status: 500,
      }
    );
  }
}

const genToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "2160h" });
};
