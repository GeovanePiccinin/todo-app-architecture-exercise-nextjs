import {
  getOrCreateProfile,
  updateProfile,
} from "../repositories/profile.repository";

export async function getProfile(userId: string) {
  return getOrCreateProfile(userId);
}

export async function updateProfileService(userId: string, name: string) {
  return updateProfile(userId, { name });
}

export async function updateAvatar(userId: string, avatarUrl: string) {
  return updateProfile(userId, { avatarUrl });
}
