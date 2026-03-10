"use client";

import { updateProfileAction } from "../actions/update-profile.action";

import { ProfileDTO } from "../types/profile.types";

type Props = {
  profile: ProfileDTO | null;
};

export function ProfileForm({ profile }: Props) {
  return (
    <form className="flex flex-col gap-1" action={updateProfileAction}>
      <input
        type="text"
        className="border border-solid p-2"
        name="name"
        placeholder="profile name"
        defaultValue={profile?.name ?? ""}
      />

      <button
        className="border border-solid rounded-md p-2 bg-green-600 text-white"
        type="submit"
      >
        Save
      </button>
    </form>
  );
}
