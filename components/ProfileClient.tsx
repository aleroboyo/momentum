'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import PasswordVisibility from '@/components/PasswordVisibility'

interface ProfileClientProps {
  user: {
    fullName: string
    username: string
    email: string
    createdAt: string
  }
}

const ProfileClient = ({ user }: ProfileClientProps) => {
  const router = useRouter()

  const [modal, setModal] = useState<null | 'edit' | 'password' | 'delete'>(null)

  const [profileData, setProfileData] = useState({
    fullName: user.fullName,
    username: user.username,
  })

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  })

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const memberSince = user.createdAt
    ? new Date(user.createdAt).toLocaleDateString('en-GB', {
        month: 'long',
        year: 'numeric',
      })
    : ''

  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccess('')

    if (!profileData.fullName.trim()) { setError('Full name is required'); return }
    if (!profileData.username.trim()) { setError('Username is required'); return }

    setLoading(true)
    try {
      const res = await fetch('/api/user', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(profileData),
      })

      const data = await res.json()
      if (!res.ok) { setError(data.error || 'Something went wrong'); return }

      setSuccess('Profile updated!')

      router.refresh()
      setTimeout(() => { setModal(null); setSuccess('') }, 1000)

    } catch { setError('Something went wrong') }
    finally { setLoading(false) }
  }

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccess('')

    if (!passwordData.currentPassword || !passwordData.newPassword || !passwordData.confirmPassword) {
      setError('All fields are required'); return
    }
    if (passwordData.newPassword.length < 8) {
      setError('Password must be at least 8 characters'); return
    }

    if (!/[A-Z]/.test(passwordData.newPassword)) {
      setError('Password must contain at least one capital letter'); return
    }

    if (!/[!@#$%^&*(),.?":{}|<>_\-]/.test(passwordData.newPassword)) {
      setError('Password must contain at least one symbol'); return
    }
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setError('Passwords do not match'); return
    }

    setLoading(true)
    try {
      const res = await fetch('/api/auth/change-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          currentPassword: passwordData.currentPassword,
          newPassword: passwordData.newPassword,
        }),
      })

      const data = await res.json()
      if (!res.ok) { setError(data.error || 'Something went wrong'); return }

      setSuccess('Password changed!')
      setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' })
      setTimeout(() => { setModal(null); setSuccess('') }, 1000)

    } catch { setError('Something went wrong') }
    finally { setLoading(false) }
  }

  const handleDelete = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/auth/delete-account', { method: 'DELETE' })
      if (!res.ok) { setError('Something went wrong'); return }
      router.push('/signup')
    } catch { setError('Something went wrong') }
    finally { setLoading(false) }
  }

  const closeModal = () => {
    setModal(null)
    setError('')
    setSuccess('')
  }

  return (
    <div className="min-h-screen p-6 md:p-10 lg:px-65 font-inter text-[#24421E]">

      <div className="flex flex-col items-center text-center mb-8 gap-2">

        <div className="w-20 h-20 rounded-full bg-[#24421E] text-[#fff5d7] flex items-center justify-center text-3xl font-medium mb-2">
          {user.fullName.charAt(0).toUpperCase()}
        </div>

        <h1 className="text-2xl font-medium">{user.fullName}</h1>
        <p className="text-[#24421E]/60">@{user.username}</p>
      </div>

      <div className="bg-white rounded-3xl border border-[#24421E]/10 mb-6 overflow-hidden">

        <div className="px-6 py-4 border-b border-[#24421E]/10">
          <p className="text-xs text-[#24421E]/50 mb-1">Full Name</p>
          <p className="font-medium">{user.fullName}</p>
        </div>

        <div className="px-6 py-4 border-b border-[#24421E]/10">
          <p className="text-xs text-[#24421E]/50 mb-1">Username</p>
          <p className="font-medium">@{user.username}</p>
        </div>

        <div className="px-6 py-4">
          <p className="text-xs text-[#24421E] font-medium mb-1">Email</p>
          <p className="text-[#24421E]/60">{user.email}</p>
        </div>

      </div>

      <div className="flex flex-col md:flex-row gap-3 mb-6">
        <button
          onClick={() => { setModal('edit'); setError(''); setSuccess('') }}
          className="w-full py-3 rounded-full bg-[#24421E] text-[#fff5d7] font-medium hover:opacity-90 transition-all"
        >
          Edit Profile
        </button>
        <button
          onClick={() => { setModal('password'); setError(''); setSuccess('') }}
          className="w-full py-3 rounded-full border-2 border-[#24421E] text-[#24421E] font-medium hover:bg-[#24421E] hover:text-[#fff5d7] transition-all"
        >
          Change Password
        </button>
      </div>

      {memberSince && (
        <p className="text-center text-sm text-[#24421E]/50 mb-8">
          Member since {memberSince}
        </p>
      )}

      <div className="bg-white rounded-3xl p-6 border border-red-100">
        <p className="text-sm text-[#24421E]/60 mb-4">
          Deleting your account permanently removes all your habits and logs.
        </p>
        <button
          onClick={() => setModal('delete')}
          className="w-full py-3 rounded-full border-2 border-red-400 text-red-400 font-medium hover:bg-red-400 hover:text-white transition-all"
        >
          Delete Account
        </button>
      </div>

      {modal === 'edit' && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-[#fff5d7] rounded-3xl p-8 w-full max-w-md">
            <h2 className="text-xl font-medium text-[#24421E] mb-6">Edit Profile</h2>

            <form onSubmit={handleProfileSubmit} className="flex flex-col gap-4">

              <div>
                <label className="text-sm text-[#24421E]/60 mb-1 block">Full Name</label>
                <input
                  type="text"
                  value={profileData.fullName}
                  onChange={(e) => setProfileData({ ...profileData, fullName: e.target.value })}
                  className="w-full h-12 px-4 rounded-full border-2 border-[#24421E]/30 focus:border-[#24421E] focus:outline-none bg-transparent text-[#24421E]"
                />
              </div>

              <div>
                <label className="text-sm text-[#24421E]/60 mb-1 block">Username</label>
                <input
                  type="text"
                  value={profileData.username}
                  onChange={(e) => setProfileData({ ...profileData, username: e.target.value })}
                  className="w-full h-12 px-4 rounded-full border-2 border-[#24421E]/30 focus:border-[#24421E] focus:outline-none bg-transparent text-[#24421E]"
                />
              </div>

              {error && <p className="text-red-500 text-sm">{error}</p>}
              {success && <p className="text-green-600 text-sm">{success}</p>}

              <div className="flex gap-3 mt-2">
                <button type="button" onClick={closeModal}
                  className="flex-1 py-2 rounded-full border-2 border-[#24421E] text-[#24421E] text-sm">
                  Cancel
                </button>
                <button type="submit" disabled={loading}
                  className="flex-1 py-2 rounded-full bg-[#24421E] text-[#fff5d7] text-sm font-medium disabled:opacity-50">
                  {loading ? 'Saving...' : 'Save'}
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

      {modal === 'password' && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-[#fff5d7] rounded-3xl p-8 w-full max-w-md">
            <h2 className="text-xl font-medium text-[#24421E] mb-2">Change Password</h2>
            <p className="text-xs text-[#24421E]/60 mb-6">
              Must be 8+ characters with a capital letter and symbol
            </p>

            <form onSubmit={handlePasswordSubmit} className="flex flex-col gap-4">

              <PasswordVisibility
                label="Current Password"
                placeholder="Enter current password"
                name="currentPassword"
                value={passwordData.currentPassword}
                onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
              />

              <PasswordVisibility
                label="New Password"
                placeholder="Enter new password"
                name="newPassword"
                value={passwordData.newPassword}
                onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
              />

              <PasswordVisibility
                label="Confirm New Password"
                placeholder="Re-enter new password"
                name="confirmPassword"
                value={passwordData.confirmPassword}
                onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
              />

              {error && <p className="text-red-500 text-sm">{error}</p>}
              {success && <p className="text-green-600 text-sm">{success}</p>}

              <div className="flex gap-3 mt-2">
                <button type="button" onClick={closeModal}
                  className="flex-1 py-2 rounded-full border-2 border-[#24421E] text-[#24421E] text-sm">
                  Cancel
                </button>
                <button type="submit" disabled={loading}
                  className="flex-1 py-2 rounded-full bg-[#24421E] text-[#fff5d7] text-sm font-medium disabled:opacity-50">
                  {loading ? 'Changing...' : 'Change Password'}
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

      {modal === 'delete' && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-[#fff5d7] rounded-3xl p-8 max-w-sm w-full text-center">
            <p className="text-xl font-medium text-[#24421E] mb-2">Delete Account?</p>
            <p className="text-sm text-[#24421E]/60 mb-6">
              This permanently deletes your account, all habits and all logs. This cannot be undone.
            </p>

            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

            <div className="flex gap-3 justify-center">
              <button onClick={handleDelete} disabled={loading}
                className="py-2 px-6 rounded-full bg-red-400 text-white text-sm font-medium disabled:opacity-50">
                {loading ? 'Deleting...' : 'Yes, delete'}
              </button>
              <button onClick={closeModal}
                className="py-2 px-6 rounded-full border-2 border-[#24421E] text-[#24421E] text-sm font-medium">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}

export default ProfileClient           