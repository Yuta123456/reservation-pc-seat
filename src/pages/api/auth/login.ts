// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "./supabase";
import { User, Session } from "@supabase/supabase-js";

type Data = {
  authResponse: {
    user: User | null;
    session: Session | null;
  };
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  // TODO: 環境変数がうまく行ってない場合
  // 良い感じに直す
  if (supabase === undefined || supabase === "") {
    return res.status(500).end();
  }
  const access_token = req.headers.authorization?.slice(7);
  const { refresh_token } = JSON.parse(req.body);
  // access tokenがある場合はそれでuserを返す
  if (access_token) {
    const { data, error } = await supabase.auth.getUser(access_token);
    if (!error) {
      return res.status(200).json({
        authResponse: {
          user: data.user,
          session: null,
        },
      });
    }
  }

  // もしrefresh tokenが存在している場合
  if (refresh_token) {
    const { data, error } = await supabase.auth.refreshSession({
      refresh_token,
    });
    if (!error) {
      return res.status(200).json({
        authResponse: {
          user: data.user,
          session: data.session,
        },
      });
    }
  }

  // もしそれ以外の場合は、普通にemailとpasswordでログイン
  const { email, password } = JSON.parse(req.body);
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (!error && data.user && data.session) {
    return res.status(200).json({ authResponse: data });
  }
  return res.status(500).end();
}
