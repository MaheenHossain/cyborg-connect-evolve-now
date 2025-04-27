
import { Tables } from '@/integrations/supabase/types';

export type Category = Tables<'categories'>;

export interface Product extends Tables<'products'> {
  created_at: string;
  special?: boolean;
}
