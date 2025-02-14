
import { ProfileForm } from "@/components/auth/ProfileForm"

export default function Profile() {
  return (
    <div className="container max-w-2xl py-8">
      <h1 className="text-2xl font-bold mb-8">Profile Settings</h1>
      <ProfileForm />
    </div>
  )
}
