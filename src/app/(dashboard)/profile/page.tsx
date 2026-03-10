import { requireAuth } from "@/modules/auth/guards/auth.guard";
import { getProfile } from "@/modules/profile/services/profile.service";
import { ProfileForm } from "@/modules/profile/components/profile-form";
import { AvatarUpload } from "@/modules/profile/components/avatar-upload";

export default async function ProfilePage() {
  const session = await requireAuth();

  const profile = await getProfile(session.user.id);

  return (
    <div className="max-w-xl mx-auto mt-20">
      <h1 className="text-2xl font-bold mb-6">Profile</h1>

      <div className="space-y-2 flex-col  ">
        <AvatarUpload />

        <ProfileForm profile={profile} />
      </div>
    </div>
  );
}
