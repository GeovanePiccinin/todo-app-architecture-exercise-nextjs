"use server";

import { requireAuth } from "@/modules/auth/guards/auth.guard";
import { updateAvatar } from "../services/profile.service";
import { supabaseAdmin } from "@/infrastructure/supabase/server";

export async function uploadAvatarAction(file: File) {
  const session = await requireAuth();

  const filePath = `avatars/${session.user.id}-${Date.now()}`;

  const { error } = await supabaseAdmin.storage
    .from("avatars")
    .upload(filePath, file);

  if (error) {
    throw new Error("Upload failed");
  }

  const { data } = supabaseAdmin.storage.from("avatars").getPublicUrl(filePath);

  await updateAvatar(session.user.id, data.publicUrl);

  return data.publicUrl;
}
