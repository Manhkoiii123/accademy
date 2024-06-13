import createUser from "@/lib/actions/user.actions";
import { WebhookEvent } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { Webhook } from "svix";

export async function POST(req: Request) {
  const svix_id = req.headers.get("svix-id") ?? "";
  const svix_timestamp = req.headers.get("svix-timestamp") ?? "";
  const svix_signature = req.headers.get("svix-signature") ?? "";

  if (!process.env.WEBHOOK_SECRET) {
    throw new Error("WEBHOOK_SECRET is not set");
  }
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response("Bad Request", { status: 400 });
  }
  const payload = await req.json();
  const body = JSON.stringify(payload);

  const sivx = new Webhook(process.env.WEBHOOK_SECRET);

  let msg: WebhookEvent;

  try {
    msg = sivx.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    return new Response("Bad Request", { status: 400 });
  }
  const eventType = msg.type;

  //console.log("eventType", eventType); //trả ra các cái mà bên lúc tạo webhook chọn (user)
  if (eventType === "user.created") {
    //create user to database
    // có cái msg.data => chứa tt
    // console.log(msg.data);
    const { id, username, email_addresses, image_url } = msg.data;
    const user = await createUser({
      username: username!,
      name: username!,
      clerkId: id,
      email: email_addresses[0].email_address, // đọc ở cái logs trên dashboard
      avatar: image_url,
    });
    // trả ra cho người dùng
    return NextResponse.json({
      message: "Create user success",
      user,
    });
  }
  // Rest

  return new Response("OK", { status: 200 });
}
