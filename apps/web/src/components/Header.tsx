import { NavLink } from 'react-router-dom';

import { supabase } from '../supabaseClient';
import { Badge } from './ui/badge';
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

  return (
    <div className="flex items-center justify-between border-b p-1">
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger className="flex gap-1">
              <h1 className="text-lg font-medium">BellSkill</h1>
              <Badge>Beta</Badge>
            </NavigationMenuTrigger>
            <NavigationMenuContent>
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
      <NavigationMenu>
        <NavigationMenuList>
          <div className="flex gap-1">
            <NavigationMenuItem>
              <NavigationMenuLink
                asChild
                className={navigationMenuTriggerStyle()}
              >
                <NavLink to="/">Start workout</NavLink>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink
                asChild
                className={navigationMenuTriggerStyle()}
              >
                <NavLink to="/history">History</NavLink>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </div>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
};
