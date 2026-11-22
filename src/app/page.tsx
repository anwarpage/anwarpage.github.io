import { HomeView } from '@/components/home-client';
import { getPublishedBlogPosts } from '@/lib/blog';
import { getPublishedProjects } from '@/lib/projects';

export default function HomePage() {
  const projects = getPublishedProjects();
  const posts = getPublishedBlogPosts();

  return <HomeView projects={projects} posts={posts} />;
}
