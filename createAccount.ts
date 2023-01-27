// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { User } from "@supabase/supabase-js";
import { createClient } from "@supabase/supabase-js";
type Data = {
  user: User;
};

const supabase =
  process.env.NEXT_PUBLIC_SUPABASE_URL &&
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY &&
  createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );
export default async function main(email: string, password: string) {
  if (supabase === undefined || supabase === "") {
    return;
  }
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (!error && data.user) {
    console.log(error);
    return;
  }

  return;
}

// main("reservation.pc.seat@gmail.com", "");
