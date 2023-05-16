// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "./auth/supabase";
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
  const { refresh_token } = JSON.parse(req.body);
  // もしrefresh tokenが存在していない場合
  if (!refresh_token) {
    return res.status(400).end();
  }

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
  return res.status(500).end();
}
