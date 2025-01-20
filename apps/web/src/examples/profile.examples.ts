import { Database } from '../../types/supabase';

type Profile = Database['public']['Tables']['profiles']['Row'];

let id = 1;

export class ExampleProfile implements Profile {
  avatar_url: string | null;
  full_name: string | null;
  id: string;
  updated_at: string | null;
  username: string | null;
  website: string | null;

  constructor({
    avatar_url = null,
    full_name = null,
    updated_at = '2024-02-20T14:12:05.335714+00:00',
    username = 'lukeskywalker',
    website = null,
  }: Partial<Profile>) {
    this.avatar_url = avatar_url;
    this.full_name = full_name;
    this.id = id.toString();
    this.updated_at = updated_at;
    this.username = username;
    this.website = website;
    id++;
  }
}
