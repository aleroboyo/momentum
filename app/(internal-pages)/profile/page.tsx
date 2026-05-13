import { redirect } from 'next/navigation'
import { getSession } from '@/lib/session'
import dbConnect from '@/lib/db'
import User from '@/models/User'
import ProfileClient from '@/components/ProfileClient'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Momentum | Profile'
}

export default async function Profile() {
  const userId = await getSession()
  if (!userId) redirect('/login')

  await dbConnect()
  const user = await User.findById(userId).select('fullName username email createdAt')
  if (!user) redirect('/login')

  return (
    <ProfileClient
      user={{
        fullName: user.fullName,
        username: user.username,
        email: user.email,
        createdAt: user.createdAt?.toISOString() ?? '',
      }}
    />
  )
}