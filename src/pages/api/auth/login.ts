// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "./supabase";
import { User, Session } from "@supabase/supabase-js";

type Data = {
  authResponce: {
    user: User | null;
    session: Session | null;
  };
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  // console.log(process.env.NEXT_PUBLIC_SUPABASE_URL);
  // TODO: 環境変数がうまく行ってない場合
  // 良い感じに直す
  if (supabase === undefined || supabase === "") {
    return res.status(500).end();
  }
  const { email, password } = JSON.parse(req.body);
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  // console.log(email, password, data, error);
  if (!error && data.user && data.session) {
    return res.status(200).json({ authResponce: data });
  }
  return res.status(500).end();
}
