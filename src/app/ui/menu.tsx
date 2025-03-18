"use client";
import Link from "next/link"
import { Navbar } from "flowbite-react"
import ImmichLogo from "./immich-logo"
import ProfileMenu from "./profile-menu";

export function Menubar() {
  return (
    <Navbar fluid rounded>
      <Navbar.Brand as={Link} href="/">
        <ImmichLogo />
      </Navbar.Brand>
      <div className="flex md:order-2">
        <ProfileMenu/>
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        <Navbar.Link as={Link} href="/album">
          Albums
        </Navbar.Link>
        <Navbar.Link as={Link} href="/people">
          People
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
}
