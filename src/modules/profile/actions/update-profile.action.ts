"use server";

import { requireAuth } from "@/modules/auth/guards/auth.guard";
import { updateProfileService } from "../services/profile.service";
import { withRequestContext } from "@/infrastructure/observability/with-request-context";

export async function updateProfileAction(formData: FormData) {
  const session = await requireAuth();

  const name = formData.get("name") as string;

  await withRequestContext(() =>
    updateProfileService(session.user.id, name),
  );
}
