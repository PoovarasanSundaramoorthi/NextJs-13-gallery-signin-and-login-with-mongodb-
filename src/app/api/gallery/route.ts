import { NextResponse } from "next/server";
const todos = [
  {
    id: 1,
    todo: "Do something nice for someone I care about",
    completed: true,
    userId: 26,
  },
  {
    id: 2,
    todo: "Memorize the fifty states and their capitals",
    completed: false,
    userId: 48,
  },
];

const data = [
  {
    id: 1,
    name: "poovarasan",
  },
];

export async function GET(request: Request) {
  return NextResponse.json({ todos, data });
}

export async function POST(req: any, res: any, next: any) {
  const data = req.body;
}
