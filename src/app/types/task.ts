export interface Task {
  id: string;
  title: string;
  text: string;
  created_at: string;
  tags: { id: string; name: string }[];
  detail?: boolean;
}
