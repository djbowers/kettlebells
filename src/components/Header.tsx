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
    <div className="bg-background border-border flex items-center justify-between border-b p-1 shadow">
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
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
              <div className="p-1">
                <NavigationMenuLink
                  asChild
                  className={navigationMenuTriggerStyle()}
                >
                  <NavLink to="/">Start Workout</NavLink>
                </NavigationMenuLink>
                <NavigationMenuLink
                  asChild
                  className={navigationMenuTriggerStyle()}
                >
                  <NavLink to="/history">Workout History</NavLink>
                </NavigationMenuLink>
              </div>
              <Separator />
              <div className="p-1">
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
              </div>
              <Separator />
              <div className="p-1">
                <NavigationMenuLink
                  asChild
                  className={navigationMenuTriggerStyle()}
                >
                  <span onClick={handleSignOut}>Sign Out</span>
                </NavigationMenuLink>
              </div>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>

      <Button variant="ghost" size="icon" onClick={handleClickLightDarkMode}>
        <SunIcon />
      </Button>
    </div>
  );
};
