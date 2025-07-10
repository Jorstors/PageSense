"use client";

import { Menu, User, LogOut, LayoutDashboardIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface MenuItem {
  title: string;
  url: string;
  description?: string;
  icon?: React.ReactNode;
  items?: MenuItem[];
}

interface NavbarProps {
  logo?: {
    url: string;
    src: string;
    alt: string;
    title: string;
  };
  menu?: MenuItem[];
  auth?: {
    login: {
      title: string;
      url: string;
    };
    signup: {
      title: string;
      url: string;
    };
  };
}

const whiteLogoSrc = `${process.env.NEXT_PUBLIC_URL}/WOB-Big.png`;

const Navbar = ({
  logo = {
    url: "https://www.pagesense.co",
    src: whiteLogoSrc,
    alt: "logo",
    title: "Pagesense.co",
  },
  menu = [
    { title: "Home", url: "/" },
    { title: "Tool", url: "/tool" },
    { title: "Templates", url: "/templates" },
    { title: "About", url: "/about" },
  ],
  auth = {
    login: { title: "Login", url: "/auth/login" },
    signup: { title: "Sign up", url: "/auth/signup" },
  },
}: NavbarProps) => {
  const { user, loading, signOut } = useAuth();

  async function handleSignOut(){
    console.log("Signing out...");
    try {
      await signOut();
      console.log("Sign out successful, navigating...");
      // Force a hard navigation to the homepage
      window.location.href = "/";
    } catch (error) {
      console.error("Error signing out:", error);
    }
  }

  return (
    <section className="py-4 grid place-items-center bg-background/100">
      <div className="container px-2 md:px-14">
        {/* desktop nav */}
        <nav className="hidden lg:flex w-full items-center justify-between">
          {/* left side: logo + menu */}
          <div className="flex items-center gap-6">
            <a href={logo.url} className="flex items-center gap-2">
              <div className="relative w-8 h-8">
                <Image
                  src={logo.src}
                  fill
                  priority
                  alt={logo.alt}
                  className="object-contain"
                />
              </div>
              <span className="text-lg font-semibold tracking-tighter">
                {logo.title}
              </span>
            </a>
            <div className="flex items-center gap-6">
              <NavigationMenu>
                <NavigationMenuList>
                  {menu.map((item) => renderMenuItem(item))}
                </NavigationMenuList>
              </NavigationMenu>
            </div>
          </div>

          {/* right side: auth buttons or user menu */}
          <div className="flex items-center gap-2">
            {loading ? (
              <div className="w-28 h-9 rounded-md bg-muted animate-pulse" />
            ) : user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="flex items-center gap-2">
                    <User className="size-4" />
                    {user.displayName || user.email?.split('@')[0] || 'User'}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard" className="flex items-center gap-2">
                    <LayoutDashboardIcon className="size-4" />
                      Dashboard
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleSignOut} className="flex items-center gap-2 text-red-600">
                    <LogOut className="size-4" />
                    <p>Sign out</p>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Button asChild variant="outline" size="sm">
                  <a href={auth.login.url}>{auth.login.title}</a>
                </Button>
                <Button asChild size="sm" variant="default" className="alt-button">
                  <a href={auth.signup.url}>{auth.signup.title}</a>
                </Button>
              </>
            )}
          </div>
        </nav>

        {/* mobile nav (sheet trigger, etc.) */}
        <div className="flex lg:hidden items-center justify-between">
          {/* alt logo */}
          <a href={logo.url} className="flex items-center gap-2">
            <div className="relative w-8 h-8">
              <Image
                src={logo.src}
                fill
                priority
                alt={logo.alt}
                className="object-contain"
              />
            </div>
            <span className="text-lg font-semibold tracking-tighter">
              {logo.title}
            </span>
          </a>
          {/* mobile menu trigger */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon">
                <Menu className="size-4" />
              </Button>
            </SheetTrigger>
            <SheetContent className="dark overflow-y-auto bg-sidebar text-sidebar-foreground">
              <SheetHeader>
                <SheetTitle className="flex items-center gap-2">
                  <a href={logo.url} className="flex items-center gap-2">
                    <div className="relative w-8 h-8">
                      <Image
                        src={logo.src}
                        fill
                        priority
                        alt={logo.alt}
                        className="object-contain"
                      />
                    </div>
                  </a>
                </SheetTitle>
              </SheetHeader>
              <div className="flex flex-col gap-6 p-4">
                <Accordion
                  type="single"
                  collapsible
                  className="flex w-full flex-col gap-4"
                >
                  {menu.map((item) => renderMobileMenuItem(item))}
                </Accordion>

                <div className="flex flex-col gap-3">
                  {loading ? (
                    <div className="w-full h-10 rounded-md bg-muted animate-pulse" />
                  ) : user ? (
                    <>
                      <Button asChild variant="outline" className="justify-start">
                        <Link href="/dashboard" className="flex items-center gap-2">
                          <LayoutDashboardIcon className="size-4" />
                          Dashboard
                        </Link>
                      </Button>
                      <Button
                        onClick={handleSignOut}
                        variant="ghost"
                        className="justify-start text-red-600 hover:text-red-700"
                      >
                        <LogOut className="size-4 mr-2" />
                        Sign out
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button asChild variant="outline">
                        <a href={auth.login.url}>{auth.login.title}</a>
                      </Button>
                      <Button asChild variant="default" className="alt-button">
                        <a href={auth.signup.url}>{auth.signup.title}</a>
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </section>
  );
};

const renderMenuItem = (item: MenuItem): JSX.Element => {
  if (item.items) {
    return (
      <NavigationMenuItem key={item.title}>
        <NavigationMenuTrigger>{item.title}</NavigationMenuTrigger>
        <NavigationMenuContent className="bg-popover text-popover-foreground">
          {item.items.map((subItem) => (
            <NavigationMenuLink asChild key={subItem.title} className="w-80">
              <SubMenuLink item={subItem} />
            </NavigationMenuLink>
          ))}
        </NavigationMenuContent>
      </NavigationMenuItem>
    );
  }

  return (
    <NavigationMenuItem key={item.title}>
      <NavigationMenuLink
        href={item.url}
        className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-accent"
      >
        {item.title}
      </NavigationMenuLink>
    </NavigationMenuItem>
  );
};

const renderMobileMenuItem = (item: MenuItem): JSX.Element => {
  if (item.items) {
    return (
      <AccordionItem key={item.title} value={item.title} className="border-b-0">
        <AccordionTrigger className="text-md py-0 font-semibold hover:no-underline">
          {item.title}
        </AccordionTrigger>
        <AccordionContent className="mt-2">
          {item.items.map((subItem) => (
            <SubMenuLink key={subItem.title} item={subItem} />
          ))}
        </AccordionContent>
      </AccordionItem>
    );
  }

  return (
    <a key={item.title} href={item.url} className="text-md font-semibold">
      {item.title}
    </a>
  );
};

const SubMenuLink = ({ item }: { item: MenuItem }): JSX.Element => {
  return (
    <a
      className="flex flex-row gap-4 rounded-md p-3 leading-none no-underline transition-colors outline-none select-none hover:bg-muted hover:text-accent"
      href={item.url}
    >
      <div className="text-foreground">{item.icon}</div>
      <div>
        <div className="text-sm font-semibold">{item.title}</div>
        {item.description && (
          <p className="text-sm leading-snug text-muted-foreground">
            {item.description}
          </p>
        )}
      </div>
    </a>
  );
};

export { Navbar };
