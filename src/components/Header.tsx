import { ButtonIcon, SunIcon } from '@radix-ui/react-icons';
import { NavLink } from 'react-router-dom';

import { supabase } from '../supabaseClient';
import './Header.styles.css';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from './ui/navigation-menu';
import { Separator } from './ui/separator';

export const Header = () => {
  const handleClickCommunity = () =>
    window.open('https://discord.gg/BrBp87mSbA', '_blank');
  const handleSignOut = () => supabase.auth.signOut();

  function handleClickLightDarkMode() {
    if (localStorage.theme === 'dark' || !('theme' in localStorage)) {
      //add class=dark in html element
      document.documentElement.classList.add('dark');
    } else {
      //remove class=dark in html element
      document.documentElement.classList.remove('dark');
    }

    if (localStorage.theme === 'dark') {
      localStorage.theme = 'light';
    } else {
      localStorage.theme = 'dark';
    }
  }

  return (
    <NavigationMenu className="grid grid-cols-1 sm:grid-cols-3">
      <NavigationMenuList>
        <NavigationMenuItem className="mr-auto">
          <NavigationMenuTrigger className="flex items-center gap-1">
            <img
              src="/favicon.svg"
              alt="BellSkill Logo"
              className="h-2.5 w-2.5"
            />
            <h1 className="text-lg font-medium">BellSkill</h1>
            <Badge>Beta</Badge>
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <NavigationMenuLink
              asChild
              className={navigationMenuTriggerStyle()}
            >
              <NavLink to="/account">Account</NavLink>
            </NavigationMenuLink>
            <NavigationMenuLink
              asChild
              className={navigationMenuTriggerStyle()}
            >
              <span onClick={handleClickCommunity}>Discord Community</span>
            </NavigationMenuLink>
            <Separator />
            <NavigationMenuLink
              asChild
              className={navigationMenuTriggerStyle()}
            >
              <span onClick={handleSignOut}>Sign Out</span>
            </NavigationMenuLink>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>

      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
            <NavLink to="/">Start</NavLink>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
            <NavLink to="/movements">Explore</NavLink>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
            <NavLink to="/history">History</NavLink>
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>

      <Button
        variant="ghost"
        size="icon"
        onClick={handleClickLightDarkMode}
        className="ml-auto"
      >
        <SunIcon />
      </Button>
    </NavigationMenu>
  );
};
