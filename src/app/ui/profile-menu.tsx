'use client'
import { Avatar, Dropdown } from "flowbite-react"
import { useSession, signOut } from "next-auth/react";

export default function ProfileMenu() {
  const { data: session} = useSession()

  if (!session?.user) return (<></>)

  return (
      <form>
        <Dropdown
          arrowIcon={false}
          inline
          label={
            <Avatar alt="User settings" img={session.user.image!} rounded />
          }
        >
          <Dropdown.Header>
            <span className="block text-sm">{session.user.name}</span>
            <span className="block truncate text-sm font-medium">{session.user.email}</span>
          </Dropdown.Header>
          <Dropdown.Item onClick={() => signOut()}>Sign out</Dropdown.Item>
        </Dropdown>
      </form>
  );
}
