"use client";

import { useState } from "react";
import { uploadAvatarAction } from "../actions/upload-avatar.action";

export function AvatarUpload() {
  const [loading, setLoading] = useState(false);

  async function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];

    if (!file) return;

    setLoading(true);

    await uploadAvatarAction(file);

    setLoading(false);
  }

  return (
    <div className="border rounded-md border-solid p-2">
      <input type="file" onChange={handleChange} />

      {loading && <p>Uploading...</p>}
    </div>
  );
}
