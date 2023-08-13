import { NextResponse } from "next/server";

export const POST = async (req) => {
    try {
        const { message } = await req.json();
        console.log(message);
        return NextResponse.json({ message: "Email sent" }, { status: 200 });
    } catch (err) {
        console.log("err", err);
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
    }