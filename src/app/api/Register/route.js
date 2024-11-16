import initDB from "@/Helpers/initDB";
import bcrypt from "bcrypt";
import User from "@/Modal/User";
import jwt from "jsonwebtoken";
initDB();
const saltRounds = 10;
import { NextResponse } from "next/server";
import Authentication from "@/Middleware/Authentication";
import RootAuth from "@/Middleware/RootAuth";

export async function POST(request) {
  try {
    const Data = await request.json();
    const { phoneNo, userData, password, role } = Data;
    const hashPassword = await bcrypt.hash(password, saltRounds);
    console.log(Data);

    const checkPhoneExists = await User.find({ phoneNo });
    const checkEmailExists = await User.find({ email: userData.email });

    if (checkEmailExists || checkPhoneExists) {
      throw new Error("Already Exists!");
    }

    const userAdd = await User.create({
      image:
        userData.gender === "male"
          ? "/img/maleUser.svg"
          : "/img/femaleUser.svg",
      phoneNo,
      ...userData,
      role,
      password: hashPassword,
    });
    console.log(userAdd);

    return NextResponse.json({
      isSuccess: true,
      userExist: false,
      UserName: userAdd.name,
      UserID: userAdd._id,
      UserRole: userAdd.role,
      UserPhone: userAdd.phoneNo,
      UserEmail: userAdd.email,
      UserGender: userAdd.gender,
      message: "Register Success",
      token: genToken(userAdd?._id),
    });
  } catch (error) {
    return NextResponse.json(
      {
        isSuccess: false,
        errorMsg: error.message,
      },
      {
        status: 404,
      }
    );
  }
}
export const PUT = Authentication(async (req, userid) => {
  try {
    const Data = await req.json();
    const { userData } = Data;

    const checkUser = await User.findByIdAndUpdate(userid, {
      ...userData,
      image:
        userData?.gender === "male"
          ? "/img/maleUser.svg"
          : "/img/femaleUser.svg",
    });
    if (checkUser) {
      return NextResponse.json({
        isSuccess: true,
        userExist: true,
        isUpdated: true,
        message: "User Updated",
      });
    }

    throw new Error("User Not Found");
  } catch (error) {
    return NextResponse.json(
      {
        isSuccess: false,
        isUpdated: false,
        errorMsg: error.message,
      },
      {
        status: 404,
      }
    );
  }
});

export const GET = async (request) => {
  try {
    const url = new URL(request.url);
    const searchParams = new URLSearchParams(url.search);
    const page = searchParams.get("page"); // Retrieves the value of the 'page' parameter
    const users = await User.find();
    console.log(users);

    return NextResponse.json({
      isSuccess: true,
      users,
    });
  } catch (error) {
    return NextResponse.json(
      {
        data: null,
        error: error.message,
        errorMsg: "Internal Server Error",
        isSuccess: false,
      },
      {
        status: 500,
      }
    );
  }
};

const genToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "2160h" });
};
